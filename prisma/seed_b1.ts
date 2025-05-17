import { prisma } from '@/lib/prisma'

export async function seedUsers() {
  await prisma.listItem.deleteMany({});
  await prisma.list.deleteMany({});
  await prisma.user.deleteMany({});

  const users = [
  {
    "name": "NewUser",
    "email": "farrukhaleem.dev2024@gmail.com",
    "password": "$2b$10$yXJJOfaYSnpWrX91xXmJx.56a.4pnMrEjfhzkqDBtExYgDve8Jsma",
    "role": 5,
    "isBanned": false,
    "messages": "",
    "lists": [
      {
        "title": "list1",
        "userid": 6,
        "items": [
          {
            "amount": 11,
            "data": "item1",
            "listid": 22
          },
          {
            "amount": 2,
            "data": "item2",
            "listid": 22
          }
        ]
      },
      {
        "title": "list2",
        "userid": 6,
        "items": []
      }
    ]
  }
];
  
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
