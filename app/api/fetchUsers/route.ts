import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import { User } from "@/app/lib/user";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({}).sort({ createdAt: -1 });
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

