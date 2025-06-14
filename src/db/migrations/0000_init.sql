CREATE TABLE `brand` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`logo_id` int,
	`url` varchar(255),
	CONSTRAINT `brand_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media` (
	`id` int AUTO_INCREMENT NOT NULL,
	`url` varchar(255) NOT NULL,
	`alt` varchar(255),
	`width` int NOT NULL,
	`height` int NOT NULL,
	CONSTRAINT `media_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pedal` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`image_id` int NOT NULL,
	`brand_id` int,
	`width` double NOT NULL,
	`height` double NOT NULL,
	`url` varchar(255),
	CONSTRAINT `pedal_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pedalboard` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`image_id` int NOT NULL,
	`brand_id` int,
	`width` double NOT NULL,
	`height` double NOT NULL,
	`url` varchar(255),
	CONSTRAINT `pedalboard_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clerk_id` varchar(255) NOT NULL,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_clerk_id_unique` UNIQUE(`clerk_id`)
);
--> statement-breakpoint
CREATE TABLE `user_board` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	CONSTRAINT `user_board_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_board_item` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_board_id` int NOT NULL,
	`pedalboard_id` int,
	`pedal_id` int,
	`rotation` int NOT NULL,
	`position_x` int NOT NULL,
	`position_y` int NOT NULL,
	CONSTRAINT `user_board_item_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `brand` ADD CONSTRAINT `brand_logo_id_media_id_fk` FOREIGN KEY (`logo_id`) REFERENCES `media`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `pedal` ADD CONSTRAINT `pedal_image_id_media_id_fk` FOREIGN KEY (`image_id`) REFERENCES `media`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `pedal` ADD CONSTRAINT `pedal_brand_id_brand_id_fk` FOREIGN KEY (`brand_id`) REFERENCES `brand`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `pedalboard` ADD CONSTRAINT `pedalboard_image_id_media_id_fk` FOREIGN KEY (`image_id`) REFERENCES `media`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `pedalboard` ADD CONSTRAINT `pedalboard_brand_id_brand_id_fk` FOREIGN KEY (`brand_id`) REFERENCES `brand`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `user_board` ADD CONSTRAINT `user_board_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `user_board_item` ADD CONSTRAINT `user_board_item_user_board_id_user_board_id_fk` FOREIGN KEY (`user_board_id`) REFERENCES `user_board`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `user_board_item` ADD CONSTRAINT `user_board_item_pedalboard_id_pedalboard_id_fk` FOREIGN KEY (`pedalboard_id`) REFERENCES `pedalboard`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `user_board_item` ADD CONSTRAINT `user_board_item_pedal_id_pedal_id_fk` FOREIGN KEY (`pedal_id`) REFERENCES `pedal`(`id`) ON DELETE set null ON UPDATE cascade;