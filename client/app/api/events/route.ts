import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = cookies().get("session")?.value;

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_RESTURL_API_SERVER}/events`,
      {
        headers: { Authorization: `Bearer ${session}` },
        withCredentials: true,
      }
    );

    console.log(response.data);

    return NextResponse.json(response.data, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 401 });
  }
}
