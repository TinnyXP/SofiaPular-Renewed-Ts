// url:/api/posts/12345
import { PrismaClient } from "@/../prisma/generated/client";
import { NextResponse } from "next/server"

const prisma = new PrismaClient();

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const post = await prisma.review.findUnique({
      where: {
        id
      }
    });

    if (!post) {
      return NextResponse.json(
        { message: "Post not found" },
        { status: 404 }
      )
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ message: "GET Error", error }, { status: 500 })
  }
};

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    const body = await request.json();
    const { rate, detail, created } = body;
    const { id } = params;
    const updatePost = await prisma.review.update({
      where: {
        id
      },
      data: {
        rate,
        detail,
        created,
      }
    })
    if (!updatePost) {
      return NextResponse.json(
        { message: "Post not found" },
        { status: 404 }
      )
    }
    return NextResponse.json(updatePost);
  } catch (error) {
    return NextResponse.json({ message: "update Error", error }, { status: 500 })
  }
};

export const DELETE = async (request: Request, { params }: any) => {
  try {
    const { id } = params;
    await prisma.review.delete({
      where: {
        id
      }
    });
    return NextResponse.json("Post has been deleted");
  } catch (error) {
    return NextResponse.json({ message: "DELETE Error", error }, { status: 500 })
  }
};