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
          if (!credentials?.message || !credentials?.signature) {
            return null;
          }

          const { publicKey, nonce } = JSON.parse(credentials.message);
          const nonceUnit8 = Signature.create(nonce);

          const isValidate = await Signature.validate(
            {
              signature: credentials.signature,
              publicKey,
            },
            nonceUnit8
          );

          if (!isValidate) {
            return null;
          }

          return {
            id: publicKey,
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/",
  },
});

export { handler as GET, handler as POST };
