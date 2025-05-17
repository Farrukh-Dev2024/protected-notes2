import { NextRequest, NextResponse } from 'next/server';
import { User, List, ListItem,Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

type UserWithLists = Prisma.UserGetPayload<{
  include: { lists: {include: { items: true }} };
}>;  
type ListWithItems = Prisma.ListGetPayload<{
  include: { items: true };
}>;  


export async function POST(req: NextRequest) {
  return new NextResponse(
    JSON.stringify({ error: true, message: 'This endpoint is deprecated.' }),
  );      
  try {
    const body = await req.text(); // raw text, as it's JSON
    const parsed = JSON.parse(body); // optional: validate structure    
    console.log('Received JSON:', parsed);

    try{
        // Clean up user data to remove id, createdAt, updatedAt, etc.
        const cleanedUsers = parsed.map((user :UserWithLists) => ({
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        isBanned: user.isBanned,
        messages: user.messages,

            lists: user.lists.map((list) => ({
                title: list.title,
                items: list.items.map((item) => ({
                    amount: item.amount,
                    data: item.data,
                    })),
            })),
        }));

        await prisma.listItem.deleteMany({});
        await prisma.list.deleteMany({});
        await prisma.user.deleteMany({});        

        for (const user of cleanedUsers as UserWithLists[]) {
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
                    items: {
                    create: list.items.map(item => ({
                        amount: item.amount,
                        data: item.data,
                    })),
                    },
                })),
                },
            },
            });
        }


        return NextResponse.json({ success: true, received: true });
    }catch(e){
        console.error("Error parsing JSON:", e);
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 500 });
    }

    
  } catch (e) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 500 });
  }
}