import { prisma } from '@/lib/prisma'; // Adjust the import path as necessary
import fs from 'fs';

//const prisma = new PrismaClient(); //if we directly create from generaated client

async function exportData() {
  try {
    // Export users data to JSON file
    const users = await prisma.user.findMany();
    fs.writeFileSync('prisma/users_backup.json', JSON.stringify(users, null, 2)); // Save as JSON

    console.log('Data exported successfully');
  } catch (error) {
    console.error('Error exporting data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

exportData()
.catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
