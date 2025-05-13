-- DropForeignKey
ALTER TABLE "ListItem" DROP CONSTRAINT "ListItem_listid_fkey";

-- AddForeignKey
ALTER TABLE "ListItem" ADD CONSTRAINT "ListItem_listid_fkey" FOREIGN KEY ("listid") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;
