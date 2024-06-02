"use server"

import { redirect } from "next/dist/server/api-utils";

export const signOut = async() => {
    await signOut({
        redirect: true,
        callbackUrl: "/auth/signin"
    });
}