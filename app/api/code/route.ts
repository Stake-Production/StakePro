import { NextResponse } from "next/server";
import { updateMockUserCode } from "@/app/lib/dbMock";

export async function POST(req: Request) {
  try {
    const { userId, code } = await req.json();

    if (!userId || !code) {
      return NextResponse.json(
        { message: "Missing data" },
        { status: 400 }
      );
    }

    const updated = await updateMockUserCode(userId, code);
    if (updated) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to store code" },
      { status: 500 }
    );
  }
}
