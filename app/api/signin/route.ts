import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import { User } from "@/app/lib/user";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const user = await User.create({ email, password });

    return NextResponse.json(
        { userId: user._id },
        { status: 201 }
    );
  } catch (error) {
    console.error("Signin API error:", error);
    return NextResponse.json(
      { message: "Database connection failed" },
      { status: 500 }
    );
  }
}
