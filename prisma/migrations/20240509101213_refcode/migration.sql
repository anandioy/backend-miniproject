/*
  Warnings:

  - A unique constraint covering the columns `[referralcode]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `referralcode` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_referralcode_key` ON `User`(`referralcode`);
