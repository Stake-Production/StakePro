import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import { User } from "@/app/lib/user";

export async function POST(req: Request) {
  try {
    const { userId, code } = await req.json();

    if (!userId || !code) {
      return NextResponse.json(
        { message: "Missing data" },
        { status: 400 }
      );
    }

    await connectDB();

    await User.findByIdAndUpdate(userId, { code });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to store code" },
      { status: 500 }
    );
  }
}
