import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import * as z from 'zod';


const userSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
  })

export async function POST(req:Request) {
  try {
    const body = await req.json();
    const { username, email, password } = userSchema.parse(body) ;
     const existingUserByEmail = await db.user.findUnique({
      where: { email: email }
    });
    if (existingUserByEmail) {
      return NextResponse.json({ user: null, message:" User with this email already exists"},{status :409})
    }

  
    const existingUserByUsername = await db.user.findUnique({
      where: { username: username }
    });
    if (existingUserByUsername) {
      return NextResponse.json({ user: null, message:" User with this userName already exists"},{status :409})
    }

        const hashPassword = await hash(password,10)
    const newUser = await db.user.create({
        data:{
            email,
            username,
            password: hashPassword
        }
    })
      const{password: newUserPassword,...rest} = newUser;

    return NextResponse.json({User:rest,message: "successfully created user"},{status:201});
  } catch (error) {
    return NextResponse.json(
      { message: `Something went wrong!` },
      { status: 500 },
    );
  }
}
