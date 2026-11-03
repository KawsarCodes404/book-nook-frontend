import { headers } from "next/headers"

import { auth } from "@/lib/auth"

export async function getTokenFromServer() {
  const result = await auth.api.getToken({
    headers: await headers(),
  })

  return result?.token
}
