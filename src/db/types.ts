import type { InferSelectModel } from 'drizzle-orm';

import { brand, media, pedal, pedalboard, user, userBoard, userBoardItem } from './schema';

export type Brand = InferSelectModel<typeof brand>;
export type Media = InferSelectModel<typeof media>;
export type Pedal = InferSelectModel<typeof pedal>;
export type Pedalboard = InferSelectModel<typeof pedalboard>;
export type User = InferSelectModel<typeof user>;
export type UserBoard = InferSelectModel<typeof userBoard>;
export type UserBoardItem = InferSelectModel<typeof userBoardItem>;
