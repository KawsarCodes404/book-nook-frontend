import { authClient } from "@/lib/auth-client"

export async function getTokenFromClient() {
  const { data } = await authClient.token()
  return data?.token
}
