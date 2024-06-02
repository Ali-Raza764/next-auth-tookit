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

        const res = await oauthSignIn(payload);
        user.id = res.data._id.toString();
        user.isVerified = res.data.isVerified;
        user.image = res.data.avatar;

        return user;
      }
      // Default to allow sign-in
      return user;
    },
    async jwt({ trigger, token, user }) {
      // Add user information to the token during sign-in
      if (trigger === "update") {
        token.isVerified = session.user.isVerified;
      }
      if (user) {
        console.log(user);
        const id = user._id?.toString() || user.id;
        token.id = id;
        token.email = user.email;
        token.name = user.name;
        token.isVerified = user.isVerified;
        token.picture = user.avatar || user.image;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.image = token.picture;
      session.user.isVerified = token.isVerified;
      return session;
    },
  },
});
