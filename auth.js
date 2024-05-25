import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  SignInWithEmailAndPassword,
  SignUpWithEmailAndPassword,
} from "@/actions/user.actions";

const providers = [
  Google,
  GitHub, //! Not using Github provider because It becoms difficult to manage the same email,name from different providers Maybe use only one Oauth Provider Feature will be developed in the future
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      try {
        const user = await SignInWithEmailAndPassword(credentials); // Your user verification logic
        if (!user) {
          throw new Error("user not found");
        }
        return user.data;
      } catch (error) {
        return null;
      }
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

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google" || account.provider === "github") {
        const { name, email, image } = user;
        try {
          const user = SignUpWithEmailAndPassword(
            {
              name,
              email,
              image,
            },
            "oauth",
            account.provider
          );

          return user;
        } catch (err) {
          console.log(err);
        }
      }
      return user;
    },
  },
});
