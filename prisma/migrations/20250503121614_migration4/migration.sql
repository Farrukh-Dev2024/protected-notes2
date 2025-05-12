/*
  Warnings:

  - You are about to drop the `Lists` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ListItem" DROP CONSTRAINT "ListItem_listid_fkey";

-- DropForeignKey
ALTER TABLE "Lists" DROP CONSTRAINT "Lists_userid_fkey";

-- DropTable
DROP TABLE "Lists";

-- CreateTable
CREATE TABLE "List" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "List_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListItem" ADD CONSTRAINT "ListItem_listid_fkey" FOREIGN KEY ("listid") REFERENCES "List"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
