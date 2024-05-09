-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `register_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `referralcode` VARCHAR(191) NOT NULL,
    `redeemedPoints` INTEGER NOT NULL DEFAULT 0,
    `isVerified` BOOLEAN NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_referralcode_key`(`referralcode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roles` (
    `id` VARCHAR(191) NOT NULL,
    `roleId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserCoupons` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `couponId` VARCHAR(191) NOT NULL,
    `isUsed` BOOLEAN NOT NULL,
    `expiryDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
