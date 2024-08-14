import { UserModel } from "@/models/User.model";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcryptjs from "bcryptjs";
import { Account, AuthOptions, Profile, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { connectDB } from "@/database/db";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          await connectDB();
          const user = await UserModel.findOne({ email });

          if (!user) {
            return null;
          }

          if (!password) {
            return null;
          }

          const passwordMatch = await bcryptjs.compare(password, user.password);

          if (!passwordMatch) {
            throw new Error("Invalid email or password");
          }

          return user;
        } catch (error) {
          console.log("Error", error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User | AdapterUser;
      account: Account | null;
      profile?: Profile | undefined;
      email?: { verificationRequest?: boolean } | undefined;
      credentials?: Record<string, unknown> | undefined;
    }): Promise<any | boolean> {
      if (account?.provider === "google") {
        try {
          const { name, email } = user;

          await connectDB();
          const ifUserExist = await UserModel.findOne({ email });

          if (ifUserExist) {
            user.id = ifUserExist?._id;

            return user;
          }

          const newUser = {
            name,
            email,
            image: profile?.picture,
          };

          const userNew = await UserModel.create(newUser);
          if (userNew.name === name) {
            user.id = userNew._id;
            return user;
          }
        } catch (error: any) {
          console.log(error.message);
        }
      }

      if (account?.provider === "credentials") {
        return user;
      }
      return false;
    },

    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.id = user.id || user._id;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.id = token.id || token._id;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "/signin",
  },
};
