'use server'
import { prisma } from "@/lib/prisma"
import { compare,hash } from "bcryptjs"
import { z } from 'zod';

import { auth } from "@/lib/auth"

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET is not defined in the environment variables.");
}

// Create User
export async function createUser(email: string, password: string) {
  'use server'
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    throw new Error("User already exists")
  }

  const hashedPassword = await hash(password+process.env.NEXTAUTH_SECRET, 10)

  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      lists: {
        create: [
          { title: "MyExpenses", order: 0, items: { create: [
              { data: "Bought MS Office", amount: 10, order: 0 },
              { data: "Bought GTA 5", amount: 20, order: 1 },
              { data: "Bought Tekken 7", amount: 30, order: 2 },
            ] } },
        ],
      }  
    },
  })
}

// Read/Get User by email or ID
export async function getUser(identifier: { email?: string }) {
  'use server'
  if (!identifier.email) {
    return null;
  }
  return await prisma.user.findFirst({
    where: { email: identifier.email },
    // include: {
    //   lists: {
    //     include: {
    //       items: true,
    //     },
    //   },
    // },    
  })
}

export async function getUserLists(identifier: { email?: string }) {
  'use server'
  if (!identifier.email) {
    return null;
  }
  const userdb = await prisma.user.findFirst({
    where: { email: identifier.email },
    include: {
      lists: {
        orderBy: { order: 'asc' },
        include: {
          items: {
            orderBy: { order: 'asc' },
          },
        },
      },
    },    
  }) 
  return userdb?.lists; 
}
// Update User
export async function updateUser(
  id: number,
  data: {
    email?: string
    password?: string
    messages?: string
    name?: string
  }
) {
  'use server'
  const updatedData = { ...data }

  if (data.password) {
    updatedData.password = await hash(data.password+process.env.NEXTAUTH_SECRET, 10)
  }

  return await prisma.user.update({
    where: { id },
    data: updatedData,
  })
}

// Delete User
export async function deleteUser(id: number) {
  'use server'
  return await prisma.user.delete({
    where: { id },
  })
}

// compair password
export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  'use server'
  return await compare(password+process.env.NEXTAUTH_SECRET, hashedPassword);
}

//get messages
export async function getMessages(id: number) {
  'use server'
  const user = await prisma.user.findUnique({
    where: { id },
    select: { messages: true },
  })
  return user?.messages;
}

  // Validation schema
  const schema = z.object({
    name: z.string().min(4, 'Name is required').regex(/^[A-Za-z0-9 ]+$/, 'Name can only contain letters/numbers and spaces'),
    currentPassword: z.string().min(6, 'Minimum password length is 6').max(20,'Maximum password length is 20').optional(),
    newPassword: z.string().min(6, 'Minimum password length is 6').max(20,'Maximum password length is 20').optional(),
    confirmPassword: z.string().min(6, 'Minimum password length is 6').max(20,'Maximum password length is 20').optional(),

  })
  .refine((data) => {
    // If current password is provided, validate password logic
    if (data.currentPassword ) {
        console.log("data.currentPassword %o",data.currentPassword);
      return (
        data.newPassword &&
        data.newPassword.length >= 6 &&
        data.newPassword === data.confirmPassword
      );
    }
    return true; // Skip validation if currentPassword is not entered
  }, {
    path: ['confirmPassword'],
    message: 'New passwords must match and be at least 6 characters.',
  });
  type PrevState = {
    success?: boolean;
    error?: boolean;
    messages?: string;
    zerrors?: Record<string, string>;
  };
export async function updateUserProfile(prevState: PrevState, formData: FormData): Promise<{ success?: boolean; error?: boolean; messages?: string; zerrors?: Record<string, string>; }> {

  'use server'
   console.log("prevState %o",prevState);
   console.log("formData %o",formData);

  // Convert FormData to a plain object
  const formObj: Record<string, string> = {};
  formData.forEach((value, key) => {
    formObj[key] = value.toString();
  });
  if (formObj.currentPassword === "") { 
    delete formObj.currentPassword;
    delete formObj.newPassword;
    delete formObj.confirmPassword; 
  }
  // Validate the form data using the schema
  const result = schema.safeParse(formObj);
  if (!result.success) {
    return { error: true, messages: "Error in data" , zerrors: result.error.flatten().fieldErrors as Record<string, string> }; // Return validation errors
  }

  // Simulate updating the user profile (e.g., saving to a database)
  try {
    // Example of updating the user profile in a database (pseudo code)
    // await updateUserInDatabase(formObj);
    const session = await auth();
    const userdb = await getUser({ email: session?.user?.email as string });

    if (!userdb) {
      return {error: true, messages: "An error occured while updating profile" , zerrors: { } };
    } else{
      if (formObj.currentPassword && formObj.newPassword === formObj.confirmPassword) {
        const isPasswordValid = await comparePassword(formObj.currentPassword, userdb.password);
        if (!isPasswordValid) {
          console.log("Password is not valid");
          return { error: true,  zerrors: {currentPassword: "Incorrect password" } };
        } else {
          await updateUser(userdb.id, {name:formObj.name, password: formObj.newPassword });
          return { success: true };
        }
      }else{
        await updateUser(userdb.id, {name:formObj.name });
      }
      await updateUser(userdb.id, { name: formObj.name });
      console.log('Profile updated successfully', formObj);
      return { success: true };
  
    }
  } catch (error) {
    console.error("Error updating profile: ", error);
    return {error: true, messages: "An error occured while updating profile"  };
  }   
  return { success: true };
}

export async function updateListTitle(id: number, prevTitle: string, newTitle: string) {
  'use server'
  try {
    const session = await auth();
    if (!session) { return false; }
    const email = session?.user?.email as string;
    const userdb = await prisma.user.findFirst({ 
      where: { email },
      include: {
        lists: {
          include: {
            items: true,
          },
        },
      },    
    });
    const list = userdb?.lists.find((list) => list.id === id); 
    newTitle = await escapeHtml(newTitle);
    if (prevTitle !== newTitle && newTitle !== "") {
      await prisma.list.update({
        where: { id: id },
        data: { title: newTitle },
      });
    }
    return true;
  }catch (error) {
    console.error("Error updating list title: ", error);
    return false;
  }  
  return true;
}

export async function createListTitle(newTitle: string) {
  'use server'
  try {
    const session = await auth();
    if (!session) { return false; }
    const email = session?.user?.email as string;
    const userdb = await prisma.user.findFirst({ 
      where: { email },
      include: {
        lists: {
          include: {
            items: true,
          },
        },
      },    
    });
    
    const lastindex = userdb?.lists.findLastIndex((index)=> {return index;}); 
    const order = lastindex ? lastindex + 1 : 0;

    newTitle = await escapeHtml(newTitle);
    if (newTitle !== "" && userdb) {
      await prisma.list.create({
        data: { title: newTitle, order: order, userid: userdb?.id },
      });
    }
    
    return true;
  }catch (error) {
    console.error("Error creating list title: ", error);
    return false;
  }  
  return true;
}

export async function deleteListTitle(id: number) {
  'use server'
  try {
    const session = await auth();
    if (!session) { return false; }
    const email = session?.user?.email as string;
    const userdb = await prisma.user.findFirst({ 
      where: { email },
      include: {
        lists: {
          include: {
            items: true,
          },
        },
      },    
    });
    const list = userdb?.lists.find((list) => list.id === id); 
    if (!list) {
      console.error("List not found" , id);
    }else{
      await prisma.list.delete({
        where: { id: id },
      });
    }  

    return true;
  }catch (error) {
    console.error("Error deleting list title: ", error);
    return false;
  }  
  return true;
}
export async function createListItem( listid: number, data: string, amount: number) {
  'use server'
  try{
    const session = await auth();
    if (!session) { return false; }
    const email = session?.user?.email as string;
    const userdb = await prisma.user.findFirst({ where: { email }, include: { lists: { include: {items: true,} } } });
    const list = userdb?.lists.find((list) => list.id === listid);

    if (!list) {
      console.error("List not found" , listid);
    }else{
      const lastindex = list.items.findLastIndex((index)=> {return index;}); 
      const order = lastindex ? lastindex + 1 : 0;
      data = await escapeHtml(data);
      if (data !== "" && userdb) {
        await prisma.listItem.create({
          data: { data: data, amount: amount, order: order, listid: listid },
        });
      }
    }
  }catch (error) {
    console.error("Error creating list item: ", error);
    return false;
  }
  return true;
}

export async function updateListItem(listid: number,itemid: number, newData: string, newAmount: number) {
  'use server'
  try {
    const session = await auth();
    if (!session) { return false; }
    const email = session?.user?.email as string;
    const userdb = await prisma.user.findFirst({ 
      where: { email },
      include: {
        lists: {
          include: {
            items: true,
          },
        },
      },    
    });
    const list = userdb?.lists.find((list) => list.id === listid); 
    const item = list?.items.find((item) => item.id === itemid);
    if (!list || !item) {
      console.error("List or item not found" , listid, itemid);
    }else{

    }  
    const mnewData = await escapeHtml(newData);
    const mnewAmount = Number(newAmount.toString());
    if (userdb) {
      await prisma.listItem.update({
        where: { id: itemid },
        data: { data: mnewData, amount: mnewAmount },
      });
    }
    return true;
  }catch (error) {
    console.error("Error updating listitem : ", error);
    return false;
  }  
  return true;
}

export async function deleteListItem(listid: number,itemid: number) {
  'use server'
  try {
    const session = await auth();
    if (!session) { return false; }
    const email = session?.user?.email as string;
    const userdb = await prisma.user.findFirst({ 
      where: { email },
      include: {
        lists: {
          include: {
            items: true,
          },
        },
      },    
    });
    const list = userdb?.lists.find((list) => list.id === listid); 
    const item = list?.items.find((item) => item.id === itemid);
    if (!list || !item) {
      console.error("List or item not found" , listid, itemid);
    }else{

    }  
    if (userdb && list && item) {
      //console.log("Deleting listitem %o", itemid);
      await prisma.listItem.delete({
        where: { id: itemid },  
     })
    }
  }catch (error) {
    console.error("Error deleting listitem : ", error);
    return false;
  }  
  return true;
}
export async function escapeHtml(str: string): Promise<string> {
  const truncated = str.length > 600 ? str.slice(0, 600) + "......." : str;

  // Allow only specific tags
  const allowedTags = /<\/?(b|i|u|br|span)>/gi;

  // Temporarily escape allowed tags
  const preserved = truncated.replace(allowedTags, (match) =>
    `%%${btoa(match)}%%`
  );

  // Escape the rest of the HTML
  const escaped = preserved
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  // Restore allowed tags
  return escaped.replace(/%%(.*?)%%/g, (_, encoded) =>
    atob(encoded)
  );
}