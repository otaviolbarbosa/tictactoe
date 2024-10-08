import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import prisma from "./prisma";
import { compare } from "bcrypt";

// interface Credentials {
//   email: string;
//   password: string;
// }

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if(!credentials.email || !credentials.password) {
          return null;
        }

        const existingUser = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if(!existingUser) return null;

        const matchedPassword = await compare(credentials.password, existingUser.password)

        if(!matchedPassword) return null;

        return {
          id: existingUser.id,
          email: existingUser.email,
        }
      },

    }),
    Google,
  ],
  pages: {
    signIn: "/login",
  },
});
