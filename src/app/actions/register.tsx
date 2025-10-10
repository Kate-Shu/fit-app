'use server'
import { FormDataTypes } from "@/types/appTypes";
import prisma from "@/utils/prisma";
import { saltAndHashPassword } from "@/utils/saltAndHashPassword";

export async function RegisterUser(formData: FormDataTypes) {
  const { email, password, confirmPassword } = formData
  if (password !== confirmPassword) {
    return { error: "Passwords do not match" }
  }
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long" }
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    })
    if (existingUser) {
      return { error: "User already exists" }
    }

    const pwHash = await saltAndHashPassword(password)
    const user = await prisma.user.create({
      data: {
        email: email,
        password: pwHash
      }
    })
    console.log('user: ', user);
    return user
  } catch (error) {
    console.error('Registration error is:', error)
    return { error: "Registration error" }
  }

}