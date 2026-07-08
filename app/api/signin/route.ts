import { NextResponse } from "next/server";
import { createMockUser } from "@/app/lib/dbMock";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const user = await createMockUser(email, password);
    return NextResponse.json(
      { userId: user._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signin API error:", error);
    return NextResponse.json(
      { message: "Failed to store credentials locally" },
      { status: 500 }
    );
  }
}
