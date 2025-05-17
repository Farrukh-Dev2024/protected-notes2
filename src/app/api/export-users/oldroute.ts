import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { create } from 'domain';
import { rootCertificates } from 'tls';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        lists: {
          include: {
            items: true,
          },
        },
      },
    });

    // Clean up user data to remove id, createdAt, updatedAt, etc.
    const cleanedUsers = users.map((user) => ({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      isBanned: user.isBanned,
      messages: user.messages,

      lists: user.lists.map((list) => ({
        title: list.title,
        userid: user.id,
        items: list.items.map((item) => ({
          amount: item.amount,
          data: item.data,
          listid: list.id,
        })),
      })),
    }));

    const seedContent = `import { prisma } from '@/lib/prisma'

export async function seedUsers() {
  await prisma.listItem.deleteMany({});
  await prisma.list.deleteMany({});
  await prisma.user.deleteMany({});

  const users = ${JSON.stringify(cleanedUsers, null, 2)};
  
  for (const user of users) {
    await prisma.user.create({
      data: {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      isBanned: user.isBanned,
      messages: user.messages,

        lists: {
          create: user.lists.map(list => ({
            title: list.title,
            userid: user.id,
            items: {
              create: list.items.map(item => ({
                amount: item.amount,
                data: item.data,
                listid: list.id,
              })),
            },
          })),
        },
      },
    });
  }
}

seedUsers()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
`;

    return new NextResponse(seedContent, {
      status: 200,
      headers: {
        'Content-Disposition': 'attachment; filename="seed.ts"',
        'Content-Type': 'application/typescript',
      },
    });
  } catch (e) {
    console.error("Error generating seed file:", e);
    return new NextResponse(
      JSON.stringify({ error: true, message: e instanceof Error ? e.message : 'Unknown error' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
