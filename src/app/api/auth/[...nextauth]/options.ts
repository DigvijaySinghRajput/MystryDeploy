import { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import CredentialsProvider from "next-auth/providers/credentials";

export const authoptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter Your Email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<{
        id: string;
        _id: string;
        email: string;
        username: string;
        isverified: boolean;
        isAcceptingMessages: boolean;
      } | null> {
        await dbConnect();
        try {
          if (!credentials) {
            throw new Error("Please provide login credentials");
          }
          const user = await UserModel.findOne({
            $or: [
              { email: credentials?.email },
              { username: credentials?.email }, // making this future proof if incase username is used
            ],
          }).lean();

          if (!user) {
            throw new Error("No user found.Please check email");
          }

          if (!user.isverified) {
            throw new Error("User not verified please verify your account");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            throw new Error("Enter correct password");
          }

          return {
            id: user._id.toString(),
            _id: user._id.toString(),
            email: user.email,
            username: user.username,
            isverified: user.isverified,
            isAcceptingMessages: user.isAcceptingMessages,
          };
        } catch (err: unknown) {
          throw new Error(String(err));
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isverified = user.isverified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isverified = token.isverified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET!,
};
