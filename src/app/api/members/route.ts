// url: "/api/reviews"
import { NextResponse } from "next/server";
import { PrismaClient } from "@/../prisma/generated/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { sub, name, email, image, provider } = body;
    const post = await prisma.user.create({
      data: {
        sub,
        name,
        email,
        image,
        provider,
        isAdmin: false,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({message:'POST Error'}, { status: 500 });
  }
}

export const GET = async () => {
  try {
    const comics = await prisma.user.findMany();
    return NextResponse.json(comics, { status: 201 });
  } catch (error) {
    return NextResponse.json({message:'GET Error'}, { status: 201 });
  }
}