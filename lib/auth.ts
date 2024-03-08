import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { connectToMongoDB } from "./db";
import User from "@/models/user.model";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session }) {
      await connectToMongoDB();
      if (session.user) {
        const user = await User.findOne({ email: session.user.email });

        if (user) {
          session.user._id = user._id;
          return session;
        } else {
          throw new Error("User not found");
        }
      } else {
        throw new Error("User not found");
      }
    },

    async signIn({ account, profile }) {
      if (account?.provider === "github") {
        await connectToMongoDB();

        try {
          const user = await User.findOne({ email: profile?.email });

          // signup the user if not found
          if (!user) {
            const newUser = await User.create({
              username: profile?.name,
              email: profile?.email,
              avatar: profile?.image,
            });

            await newUser.save();
          }
          console.log("User already exists");
          return true; // indicate successful sign-in
        } catch (error) {
          console.log("Error signing in:", error);
          console.log(error);
          return false; // indicate failed sign-in
        }
      }

      console.log("Failed signing in");
      return false; // indicate failed sign-in
    },
  },
});
