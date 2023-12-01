import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LineProvider from "next-auth/providers/line";
import { PrismaClient } from "@/../prisma/generated/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async jwt({ token, user, account, profile }) {
      if(user) {
        token.id = user.id
        token.name = user.name ?? ''
        token.email = user.email ?? ''
        token.provider = user.provider ?? ''
        token.image = user.image ?? ''
      }
      return token
    },
    async session({ session, user, token }) {
      if(token && session.user) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.provider = token.provider
        session.user.image = token.image
      }
      return session
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile:async (profile) => {
        console.log('Profile',profile)
        //
        if(!profile.sub ) {
          throw new Error('ไม่มี sub')
        }
        const checkSub = await prisma.user.findFirst({
          where: {
            sub: profile.sub 
          },
        });
        if(checkSub === null) {
          const createUser = await prisma.user.create({
            data: {
              sub: profile.sub,
              name: profile.name,
              email: profile.email,
              image: profile.picture,
              provider: 'GOOGLE',
            },
          });
        }

        return {
          id: profile.sub,
          name: profile.name ?? '-', 
          email: profile.email ?? '-',
          provider: 'GOOGLE',
          image: profile.picture ?? '-',
        }
      }
    }),
    LineProvider({
      authorization: { params: { scope: "openid profile email" } },
      clientId: process.env.LINE_CLIENT_ID as string,
      clientSecret: process.env.LINE_CLIENT_SECRET as string,
      profile:async (profile) => {
        console.log('Profile',profile)
        //
        if(!profile.sub ) {
          throw new Error('ไม่มี sub')
        }
        const checkSub = await prisma.user.findFirst({
          where: {
            sub: profile.sub 
          },
        });        
        if(checkSub === null) {
          const createUser = await prisma.user.create({
            data: {
              sub: profile.sub,
              name: profile.name,
              email: profile.email,
              image: profile.picture,
              provider: 'LINE',
            },
          });
        }

        return {
          id: profile.sub,
          name: profile.name ?? '-', 
          email: profile.email ?? '-',
          provider: 'LINE',
          image: profile.picture ?? '-',
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }