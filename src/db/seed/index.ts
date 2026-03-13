import 'dotenv/config';
import { eq, and } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/mysql2';
import { readFileSync } from 'fs';
import mysql from 'mysql2/promise';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import * as schema from '../schema';

interface JsonItem {
  Brand: string;
  Name: string;
  Width: number;
  Height: number;
  Image: string;
}

interface SeedStats {
  brandsCreated: number;
  brandsSkipped: number;
  pedalsCreated: number;
  pedalsSkipped: number;
  pedalboardsCreated: number;
  pedalboardsSkipped: number;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const S3_BASE_URL = process.env.S3_BASE_URL;

if (!S3_BASE_URL) {
  throw new Error('S3_BASE_URL environment variable is required');
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

async function main() {
  console.log('Starting database seed...\n');

  // Create direct database connection
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  const db = drizzle(connection, { schema, mode: 'default' });

  const stats: SeedStats = {
    brandsCreated: 0,
    brandsSkipped: 0,
    pedalsCreated: 0,
    pedalsSkipped: 0,
    pedalboardsCreated: 0,
    pedalboardsSkipped: 0,
  };

  try {
    // Read JSON files
    console.log('Reading data files...');
    const pedalsPath = join(__dirname, 'data', 'pedals.json');
    const pedalboardsPath = join(__dirname, 'data', 'pedalboards.json');

    const pedals: JsonItem[] = JSON.parse(readFileSync(pedalsPath, 'utf-8'));
    const pedalboards: JsonItem[] = JSON.parse(readFileSync(pedalboardsPath, 'utf-8'));

    console.log(`Found ${pedals.length} pedals and ${pedalboards.length} pedalboards\n`);

    // Extract unique brands
    console.log('Extracting unique brands...');
    const brandNames = new Set<string>();
    [...pedals, ...pedalboards].forEach((item) => {
      if (item.Brand) {
        brandNames.add(item.Brand);
      }
    });

    console.log(`Found ${brandNames.size} unique brands\n`);

    // Wrap all inserts in a transaction for atomicity
    await db.transaction(async (tx) => {
      // Insert brands and build lookup map
      console.log('Processing brands...');
      const brandMap = new Map<string, number>();

      for (const brandName of brandNames) {
        const existing = await tx
          .select()
          .from(schema.brand)
          .where(eq(schema.brand.name, brandName))
          .limit(1);

        if (existing.length > 0) {
          brandMap.set(brandName, existing[0].id);
          stats.brandsSkipped++;
        } else {
          const [result] = await tx.insert(schema.brand).values({
            name: brandName,
            logoId: null,
            url: null,
          });
          brandMap.set(brandName, Number(result.insertId));
          stats.brandsCreated++;
        }
      }

      console.log(`Brands: ${stats.brandsCreated} created, ${stats.brandsSkipped} skipped\n`);

      // Process pedals
      console.log('Processing pedals...');
      for (const pedal of pedals) {
        const brandId = brandMap.get(pedal.Brand) ?? null;
        const mediaUrl = `${S3_BASE_URL}/pedals/${pedal.Image}`;

        // Check/insert media
        // Media width/height are pixel dimensions (placeholder 0 until images are processed with sharp)
        let mediaId: number;
        const existingMedia = await tx
          .select()
          .from(schema.media)
          .where(eq(schema.media.url, mediaUrl))
          .limit(1);

        if (existingMedia.length > 0) {
          mediaId = existingMedia[0].id;
        } else {
          const [mediaResult] = await tx.insert(schema.media).values({
            url: mediaUrl,
            alt: `${pedal.Brand} ${pedal.Name}`,
            width: 0,
            height: 0,
          });
          mediaId = Number(mediaResult.insertId);
        }

        // Check/insert pedal
        const whereConditions = brandId
          ? and(eq(schema.pedal.name, pedal.Name), eq(schema.pedal.brandId, brandId))
          : eq(schema.pedal.name, pedal.Name);

        const existingPedal = await tx.select().from(schema.pedal).where(whereConditions).limit(1);

        if (existingPedal.length > 0) {
          stats.pedalsSkipped++;
        } else {
          await tx.insert(schema.pedal).values({
            name: pedal.Name,
            imageId: mediaId,
            brandId,
            width: pedal.Width,
            height: pedal.Height,
            url: null,
          });
          stats.pedalsCreated++;
        }
      }

      console.log(`Pedals: ${stats.pedalsCreated} created, ${stats.pedalsSkipped} skipped\n`);

      // Process pedalboards
      console.log('Processing pedalboards...');
      for (const pedalboard of pedalboards) {
        const brandId = brandMap.get(pedalboard.Brand) ?? null;
        const mediaUrl = `${S3_BASE_URL}/pedalboards/${pedalboard.Image}`;

        // Check/insert media
        let mediaId: number;
        const existingMedia = await tx
          .select()
          .from(schema.media)
          .where(eq(schema.media.url, mediaUrl))
          .limit(1);

        if (existingMedia.length > 0) {
          mediaId = existingMedia[0].id;
        } else {
          const [mediaResult] = await tx.insert(schema.media).values({
            url: mediaUrl,
            alt: `${pedalboard.Brand} ${pedalboard.Name}`,
            width: 0,
            height: 0,
          });
          mediaId = Number(mediaResult.insertId);
        }

        // Check/insert pedalboard
        const whereConditions = brandId
          ? and(eq(schema.pedalboard.name, pedalboard.Name), eq(schema.pedalboard.brandId, brandId))
          : eq(schema.pedalboard.name, pedalboard.Name);

        const existingPedalboard = await tx
          .select()
          .from(schema.pedalboard)
          .where(whereConditions)
          .limit(1);

        if (existingPedalboard.length > 0) {
          stats.pedalboardsSkipped++;
        } else {
          await tx.insert(schema.pedalboard).values({
            name: pedalboard.Name,
            imageId: mediaId,
            brandId,
            width: pedalboard.Width,
            height: pedalboard.Height,
            url: null,
          });
          stats.pedalboardsCreated++;
        }
      }

      console.log(
        `Pedalboards: ${stats.pedalboardsCreated} created, ${stats.pedalboardsSkipped} skipped\n`,
      );
    });

    // Summary
    console.log('=== Seed Complete ===');
    console.log(`Brands: ${stats.brandsCreated} created, ${stats.brandsSkipped} skipped`);
    console.log(`Pedals: ${stats.pedalsCreated} created, ${stats.pedalsSkipped} skipped`);
    console.log(
      `Pedalboards: ${stats.pedalboardsCreated} created, ${stats.pedalboardsSkipped} skipped`,
    );
  } finally {
    await connection.end();
    console.log('\nDatabase connection closed.');
  }
}

main().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
