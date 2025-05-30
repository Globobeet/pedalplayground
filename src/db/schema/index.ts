import { double, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const media = mysqlTable('media', {
  id: int('id').primaryKey().autoincrement(),
  url: varchar('url', { length: 255 }).notNull(),
  alt: varchar('alt', { length: 255 }),
  width: int('width').notNull(),
  height: int('height').notNull(),
});

export const brand = mysqlTable('brand', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  logoId: int('logo_id').references(() => media.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  url: varchar('url', { length: 255 }),
});

export const pedalboard = mysqlTable('pedalboard', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  imageId: int('image_id')
    .notNull()
    .references(() => media.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  brandId: int('brand_id').references(() => brand.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  width: double('width').notNull(),
  height: double('height').notNull(),
  url: varchar('url', { length: 255 }),
});

export const pedal = mysqlTable('pedal', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  imageId: int('image_id')
    .notNull()
    .references(() => media.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  brandId: int('brand_id').references(() => brand.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  width: double('width').notNull(),
  height: double('height').notNull(),
  url: varchar('url', { length: 255 }),
});

export const user = mysqlTable('user', {
  id: int('id').primaryKey().autoincrement(),
  clerkId: varchar('clerk_id', { length: 255 }).notNull().unique(),
});

export const userBoard = mysqlTable('user_board', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
});

export const userBoardItem = mysqlTable('user_board_item', {
  id: int('id').primaryKey().autoincrement(),
  userBoardId: int('user_board_id')
    .notNull()
    .references(() => userBoard.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  pedalboardId: int('pedalboard_id').references(() => pedalboard.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  pedalId: int('pedal_id').references(() => pedal.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  rotation: int('rotation').notNull(),
  positionX: int('position_x').notNull(),
  positionY: int('position_y').notNull(),
});
