import { NextResponse } from "next/server";
import { User } from "@/app/lib/user";

export async function GET() {
  try {
    // Fetch all users with email & password only
    const users = await User.find({}, { email: 1, password: 1, _id: 0 }).lean();

    return NextResponse.json(
      {
        count: users.length,
        users,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch users error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
