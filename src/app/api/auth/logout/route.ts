import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });
  
  // Clear the cookie by setting Max-Age=0
  response.headers.append(
    "Set-Cookie",
    `auth_token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0;`
  );

  return response;
}
