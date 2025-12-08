import { auth } from "@/auth/auth";

export async function requireUserId() {
  const session = await auth();
  if (!session?.user?.id) return null;
  return session.user.id as string;
}
