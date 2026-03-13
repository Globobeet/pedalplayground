import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { execFileSync } from 'child_process';
import 'dotenv/config';
import { readdirSync, readFileSync, mkdtempSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

const S3_BUCKET = process.env.S3_BUCKET ?? 'pedalplayground-assets';
const AWS_REGION = process.env.AWS_REGION ?? 'us-east-1';
const ORIGINAL_REPO_PATH = process.env.ORIGINAL_REPO_PATH;
const REPO_URL = 'https://github.com/PedalPlayground/pedalplayground.git';

interface UploadStats {
  uploaded: number;
  failed: number;
}

async function uploadFile(
  s3Client: S3Client,
  filePath: string,
  s3Key: string,
  stats: UploadStats,
  total: number,
): Promise<void> {
  try {
    const fileBuffer = readFileSync(filePath);
    const command = new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: s3Key,
      Body: fileBuffer,
      ContentType: 'image/png',
    });

    await s3Client.send(command);
    stats.uploaded++;
    console.log(`[${stats.uploaded + stats.failed}/${total}] Uploaded ${s3Key}`);
  } catch (error) {
    stats.failed++;
    console.error(
      `[${stats.uploaded + stats.failed}/${total}] Failed to upload ${s3Key}:`,
      error instanceof Error ? error.message : error,
    );
  }
}

async function uploadDirectory(
  s3Client: S3Client,
  localDir: string,
  s3Prefix: string,
  stats: UploadStats,
  total: number,
): Promise<void> {
  try {
    const files = readdirSync(localDir, { withFileTypes: true });
    const pngFiles = files.filter(
      (file) => file.isFile() && file.name.toLowerCase().endsWith('.png'),
    );

    for (const file of pngFiles) {
      const localPath = join(localDir, file.name);
      const s3Key = `${s3Prefix}${file.name}`;
      await uploadFile(s3Client, localPath, s3Key, stats, total);
    }
  } catch (error) {
    console.error(`Failed to read directory ${localDir}:`, error);
  }
}

async function main(): Promise<void> {
  let repoPath: string;
  let shouldCleanup = false;

  // Create S3 client with explicit credentials or default credential chain
  const credentials =
    process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
      ? {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
      : undefined;

  const s3Client = new S3Client({
    region: AWS_REGION,
    ...(credentials && { credentials }),
    ...(process.env.S3_ENDPOINT && {
      endpoint: process.env.S3_ENDPOINT,
      forcePathStyle: true,
    }),
  });

  // Determine repo path
  if (ORIGINAL_REPO_PATH) {
    console.log(`Using local repo at: ${ORIGINAL_REPO_PATH}`);
    repoPath = ORIGINAL_REPO_PATH;
  } else {
    console.log('Cloning original repository...');
    const tempDir = mkdtempSync(join(tmpdir(), 'pedalplayground-'));
    repoPath = join(tempDir, 'repo');
    try {
      execFileSync('git', ['clone', '--depth', '1', REPO_URL, repoPath], {
        stdio: 'inherit',
      });
      shouldCleanup = true;
    } catch (error) {
      console.error('Failed to clone repository:', error);
      rmSync(tempDir, { recursive: true, force: true });
      process.exit(1);
    }
  }

  const stats: UploadStats = {
    uploaded: 0,
    failed: 0,
  };

  // Define upload mappings
  const uploadMappings: Array<{ localDir: string; s3Prefix: string }> = [
    { localDir: join(repoPath, 'public/images/pedals'), s3Prefix: 'pedals/' },
    {
      localDir: join(repoPath, 'public/images/pedalboards'),
      s3Prefix: 'pedalboards/',
    },
    {
      localDir: join(repoPath, 'app/images/pedals-wide'),
      s3Prefix: 'pedals-wide/',
    },
  ];

  // Collect all files first for accurate progress tracking
  const allFiles: Array<{ local: string; s3Key: string }> = [];
  for (const { localDir, s3Prefix } of uploadMappings) {
    try {
      const files = readdirSync(localDir, { withFileTypes: true });
      const pngFiles = files.filter(
        (file) => file.isFile() && file.name.toLowerCase().endsWith('.png'),
      );
      for (const file of pngFiles) {
        allFiles.push({
          local: join(localDir, file.name),
          s3Key: `${s3Prefix}${file.name}`,
        });
      }
    } catch (error) {
      console.warn(`Warning: Could not read directory ${localDir}`);
    }
  }

  console.log(`\nFound ${allFiles.length} PNG files to upload to s3://${S3_BUCKET}/\n`);

  // Upload files
  for (const { localDir, s3Prefix } of uploadMappings) {
    console.log(`\nProcessing ${localDir} -> ${s3Prefix}`);
    await uploadDirectory(s3Client, localDir, s3Prefix, stats, allFiles.length);
  }

  // Cleanup
  if (shouldCleanup && repoPath) {
    console.log('\nCleaning up temporary directory...');
    rmSync(join(repoPath, '..'), { recursive: true, force: true });
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('Upload Summary:');
  console.log(`  Uploaded: ${stats.uploaded}`);
  console.log(`  Failed:   ${stats.failed}`);
  console.log(`  Total:    ${allFiles.length}`);
  console.log('='.repeat(60));

  if (stats.failed > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
