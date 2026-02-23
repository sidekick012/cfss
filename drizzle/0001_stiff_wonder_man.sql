ALTER TABLE `user` ADD `stripe_customer_id` text;--> statement-breakpoint
ALTER TABLE `user` ADD `stripe_subscription_id` text;--> statement-breakpoint
ALTER TABLE `user` ADD `stripe_price_id` text;--> statement-breakpoint
ALTER TABLE `user` ADD `stripe_current_period_end` integer;--> statement-breakpoint
CREATE UNIQUE INDEX `user_stripe_customer_id_unique` ON `user` (`stripe_customer_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_stripe_subscription_id_unique` ON `user` (`stripe_subscription_id`);