//import { PrismaClient } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma'; // Adjust the import path as necessary
import fs from 'fs';

//const prisma = new PrismaClient();

async function importData() {
  try {
    // Read the data from a file (assuming it's in JSON format)
    const rawData = fs.readFileSync('prisma/users_backup.json', 'utf-8');
    const users = JSON.parse(rawData);

    // Insert data into the database
    await prisma.user.createMany({
      data: users, // Insert all the users from the JSON file
    });

    console.log('Data imported successfully');
  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

importData()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
