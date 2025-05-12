/*
  Warnings:

  - You are about to drop the column `date` on the `ListItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ListItem" DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
