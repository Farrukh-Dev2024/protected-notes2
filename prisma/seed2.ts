import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const userdb = await prisma.user.findFirst({
    where: {id: 4}
  });
  if (userdb) {
    for (let i = 0; i < 3; i++) {
      const tmplist = await prisma.list.create({
        data: {
          title: `List ${i + 1}`,
          userid: userdb.id,
        },
      });
      for (let j = 0; j < 5; j++) {
        await prisma.listItem.create({
          data: {
            data: `Item ${j + 1}`,
            amount: Math.floor(Math.random() * 100),
            listid: tmplist.id,
          },
        });
      }
    }
  }
  console.log('🌱 Data populated');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
