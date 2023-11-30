// url: "/api/reviews"
import { NextResponse } from "next/server";
import { PrismaClient } from "@/../prisma/generated/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { userid, rate, detail, created } = body;
    const post = await prisma.review.create({
      data: {
        UserId: userid,
        rate,
        detail,
        created
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({message:'POST Error'}, { status: 500 });
  }
}

export const GET = async () => {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        created: 'desc',
      },
    });
    return NextResponse.json(reviews, { status: 201 });
  } catch (error) {
    return NextResponse.json({message:'GET Error'}, { status: 201 });
  }
}