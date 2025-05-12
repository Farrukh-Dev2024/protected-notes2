import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: 'Regular User1',
        email: 'user@example.com',
        password: '',
        role: 5, // Normal user
      },
      {
        name: 'Regular User2',
        email: 'user2@example.com',
        password: '',
        role: 5, // Normal user
      },
      {
        name: 'Regular User2',
        email: 'user3@example.com',
        password: '',
        role: 5, // Normal user
      },            
    ],
    skipDuplicates: true, // avoid throwing on duplicate emails
  });

  console.log('🌱 Users seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
