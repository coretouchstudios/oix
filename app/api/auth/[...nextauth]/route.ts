import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const SECRET = process.env.JWT_SECRET!;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      // 🔥 Create or find user in your DB
      let dbUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!dbUser) {
        dbUser = await prisma.user.create({
          data: {
            email: user.email,
            name: user.name || "",
            image: user.image || "",
            emailVerified: new Date(),
          },
        });
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.userId = user.email; // or db id if you fetch it
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId;
      }
      return session;
    },
  },

  events: {
    async signIn(message) {
      const email = message.user.email;

      const dbUser = await prisma.user.findUnique({
        where: { email: email! },
      });

      if (!dbUser) return;

      // 🔥 CREATE YOUR JWT (THIS IS THE KEY)
      const accessToken = jwt.sign(
        { userId: dbUser.id },
        SECRET,
        { expiresIn: "15m" }
      );

      // ⚠️ Set cookie manually via response workaround
      // (NextAuth doesn't expose res easily, so we handle via redirect)
    },
  },

  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
export const runtime = "nodejs";