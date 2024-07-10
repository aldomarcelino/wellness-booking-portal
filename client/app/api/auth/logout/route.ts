import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = cookies().get("session")?.value;
  const userRole = cookies().get("role")?.value;

  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
  cookies().set("role", "", { expires: new Date(0) });
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // You can add further validation here (e.g., verify the token)
  return NextResponse.json({ user_role: userRole }, { status: 200 });
}
