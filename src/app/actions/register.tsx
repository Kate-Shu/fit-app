'use server'
import { FormDataTypes } from "@/types/appTypes";
import prisma from "@/utils/prisma";
import { saltAndHashPassword } from "@/utils/saltAndHashPassword";

type RegisterResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

export async function RegisterUser(formData: FormDataTypes): Promise<RegisterResult> {
  const { email, password, confirmPassword } = formData
  if (password !== confirmPassword) {
    return { ok: false, message: "Passwords do not match" }
  }
  if (password.length < 6) {
    return { ok: false, message: "Password must be at least 6 characters long" }
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    })
    if (existingUser) {
      return { ok: false, message: "User already exists" }
    }

    const pwHash = await saltAndHashPassword(password)

    const user = await prisma.user.create({
      data: {
        email: email,
        password: pwHash
      },

    })
    console.log('user: ', user);
    return { ok: true, message: "Registration succesfull" }

  } catch (error) {
    console.error('Registration error is:', error)
    return { ok: false, message: "Registration error" }
  }

}