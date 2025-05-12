/*
  Warnings:

  - You are about to drop the column `listId` on the `ListItem` table. All the data in the column will be lost.
  - You are about to drop the column `lastLogin` on the `User` table. All the data in the column will be lost.
  - Added the required column `listid` to the `ListItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ListItem" DROP CONSTRAINT "ListItem_listId_fkey";

-- AlterTable
ALTER TABLE "ListItem" DROP COLUMN "listId",
ADD COLUMN     "listid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastLogin",
ADD COLUMN     "lastlogin" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "ListItem" ADD CONSTRAINT "ListItem_listid_fkey" FOREIGN KEY ("listid") REFERENCES "Lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
