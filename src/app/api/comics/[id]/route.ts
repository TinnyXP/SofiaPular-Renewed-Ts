// url: "/api/comics/12345"
import { NextResponse } from "next/server";
import { PrismaClient } from "@/../prisma/generated/client";

const prisma = new PrismaClient();

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    //Get the comic with the given id from the database
    const comic = await prisma.comic.findUnique({
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
    const { title } = await request.json();
    //update the comic with the given id from the database
    const comic = await prisma.comic.update({
      where: {
        id: id,
      },
      data: {
        title: title,
      }
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