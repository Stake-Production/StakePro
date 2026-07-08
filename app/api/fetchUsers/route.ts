import { NextResponse } from "next/server";
import { getMockUsers } from "@/app/lib/dbMock";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const users = await getMockUsers();
    return NextResponse.json(
      {
        count: users.length,
        users,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Local fetch users error:", error);
    return NextResponse.json(
      { message: "Internal server error", detail: String(error) },
      { status: 500 }
    );
  }
}
