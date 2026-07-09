import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import { User } from "@/app/lib/user";
import mongoose from "mongoose";

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

    // Verify it's a valid ObjectId to prevent Mongoose cast errors
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Invalid user ID format" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (user) {
      user.code = code;
      await user.save();
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Code API error:", error);
    return NextResponse.json(
      { message: "Failed to store code" },
      { status: 500 }
    );
  }
}

