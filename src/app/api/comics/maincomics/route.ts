// url: "/api/comics/maincomics"
import { NextResponse } from "next/server";
import { BookType, PrismaClient } from "@/../prisma/generated/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { title, booktype, date, path } = body;
    const post = await prisma.comic.create({
      data: {
        title,
        booktype,
        date,
        path
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({message:'POST Error'}, { status: 500 });
  }
}

export const GET = async () => {
  try {
    const mainComics = await prisma.comic.findMany({
      where: {
        booktype: BookType.MAIN
      }
    })
    return NextResponse.json(mainComics)
  } catch (error) {
    return NextResponse.json({message:'GET Error'}, { status: 500 })
  }
}