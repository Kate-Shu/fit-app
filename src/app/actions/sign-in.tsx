'use server'

import { signIn } from "@/auth/auth";
import { AuthError } from "next-auth";

type SignInResponse =
  | { ok: true }
  | { ok: false; message: string };

export async function signInWithCredentials(email: string, password: string): Promise<SignInResponse> {


  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false
    });
    return { ok: true };
  } catch (error) {
    if (error instanceof AuthError && error.type === "CredentialsSignin") {
      return { ok: false, message: "Invalid email or password" };
    }
    console.error('Authorization error:', error);
    return { ok: false, message: "Sign-in failed. Please try again." };
  }
}
