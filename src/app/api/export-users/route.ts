import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { create } from 'domain';
import { rootCertificates } from 'tls';

export async function GET() {
  return new NextResponse(
    JSON.stringify({ error: true, message: 'This endpoint is deprecated.' }),
  );  
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

    const seedContent = JSON.stringify(users, null, 2); 


    return new NextResponse(seedContent, {
      status: 200,
      headers: {
        'Content-Disposition': 'attachment; filename="database.json"',
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
      console.error("Error generating seed file:", e);
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 500 });
    
  }
}
