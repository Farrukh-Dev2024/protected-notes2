-- AlterTable
ALTER TABLE "User" ADD COLUMN     "imageUploadCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastImageUploadDate" TIMESTAMP(3);
