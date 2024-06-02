import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  SignInWithEmailAndPassword,
  oauthSignIn,
} from "@/actions/user/user.actions";

const providers = [
  Google,
  GitHub,
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const user = await SignInWithEmailAndPassword(credentials); // User verification logic
      if (user.status === 400) {
        return null;
      }
      return user.data;
    },
  }),
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});


export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  providers,
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google" || account.provider === "github") {
        const { name, email, image } = user;
        const payload = {
          name,
          email,
          avatar: image,
          authType: "Oauth",
        };

        await oauthSignIn(payload);

        return true;
      }
      // Default to allow sign-in
      return true;
    },
    async jwt({ token, user }) {
      // Add user information to the token during sign-in
      if (user) {
        token.id = user._id.toString();
        token.email = user.email;
        token.name = user.name;
        token.isVerified = user.isVerified;
        token.picture = user.avatar;
      }
      return token;
    },
    async session({ session, token }) {
      // Add custom properties to the session object
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.image = token.picture;
      session.user.isVerified = token.isVerified;
      return session;
    },
  },
});
