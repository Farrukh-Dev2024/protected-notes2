/*
  Warnings:

  - You are about to drop the column `userid` on the `Image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "userid";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_listitemid_fkey" FOREIGN KEY ("listitemid") REFERENCES "ListItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
