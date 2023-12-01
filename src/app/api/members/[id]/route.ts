// url: "/api/comics/12345"
import { NextResponse } from "next/server";
import { PrismaClient } from "@/../prisma/generated/client";

const prisma = new PrismaClient();

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    //Get the comic with the given id from the database
    const comic = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!comic) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(comic);
  } catch (error) {
    return NextResponse.json({ message: 'GET Error', error }, { status: 500 });
  }
}

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const { sub, name, email, image, provider } = await request.json();
    //update the comic with the given id from the database
    const comic = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        sub,
        name,
        email,
        image,
        provider,
        isAdmin: false,
      },
    });
    if (!comic) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(comic, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'PATCH Error', error }, { status: 500 });
  }
}

export const DELETE = async (request: Request, { params }: any) => {
  try {
    const { id } = params;
    //Delete the comic with the given id from the database
    const comic = await prisma.comic.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json("Deleted", { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'DELETE Error', error }, { status: 500 });
  }
}