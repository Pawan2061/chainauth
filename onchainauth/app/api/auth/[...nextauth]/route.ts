import { Signature } from "../../../../utils/signature";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "web3-auth",
      credentials: {
        signature: { type: "text" },
        message: { type: "text" },
      },
      async authorize(credentials) {
        try {
          const { publicKey } = JSON.parse(credentials?.message || "{}");
          return {
            id: publicKey,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/",
  },
});

export { handler as GET, handler as POST };
