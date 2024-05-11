/*
  Warnings:

  - You are about to drop the column `event_category_id` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - Made the column `phone` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `User_username_key` ON `User`;

-- AlterTable
ALTER TABLE `Event` DROP COLUMN `event_category_id`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `username`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `fullname` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `phone` VARCHAR(191) NOT NULL;
