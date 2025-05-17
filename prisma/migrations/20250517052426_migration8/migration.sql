-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_userid_fkey";

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
