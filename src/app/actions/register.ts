'use server'
import { FormDataTypes } from "@/types/appTypes";
import prisma from "@/utils/prisma";

export async function RegisterUser(formData: FormDataTypes) {
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 const {email, password, confirmPassword} = formData

 try {
  const user = await prisma.user.create({
     data: {
      email: email,
      password: password
     }
    })
    console.log('user: ', user);
  return user
 } catch (error){
  console.error('Registration error is:', error)
  return {error: "Registration error"}
 }

}