/*
  Warnings:

  - You are about to drop the column `Hobbie` on the `cards` table. All the data in the column will be lost.
  - You are about to drop the column `unique_id` on the `cards` table. All the data in the column will be lost.
  - Added the required column `cover_image_url` to the `cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hobbie` to the `cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_image_url` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "cards_unique_id_key";

-- AlterTable
ALTER TABLE "cards" DROP COLUMN "Hobbie",
DROP COLUMN "unique_id",
ADD COLUMN     "cover_image_url" TEXT NOT NULL,
ADD COLUMN     "hobbie" TEXT NOT NULL,
ADD COLUMN     "profile_image_url" TEXT NOT NULL;
