import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LineProvider from "next-auth/providers/line";
import { PrismaClient } from "@/../prisma/generated/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    LineProvider({
      authorization: { params: { scope: "openid profile email" } },
      clientId: process.env.LINE_CLIENT_ID as string,
      clientSecret: process.env.LINE_CLIENT_SECRET as string,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

// import NextAuth from "next-auth/next";
// import type { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import LineProvider from "next-auth/providers/line";
// import { PrismaClient } from "@/../prisma/generated/client";

// const prisma = new PrismaClient();

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//     LineProvider({
//       authorization: { params: { scope: "openid profile email" } },
//       clientId: process.env.LINE_CLIENT_ID as string,
//       clientSecret: process.env.LINE_CLIENT_SECRET as string,
//     })
//   ],
//   secret: process.env.NEXTAUTH_SECRET as string,
// }

// const handler = NextAuth(authOptions)
// export { handler as GET, handler as POST }