import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import { User } from "@/app/lib/user";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing email or password" },
        { status: 400 }
      );
    }

    await connectDB();

    const cleanEmail = email.toLowerCase().trim();
    
    // Only append if the user is new, otherwise update the existing record
    let user = await User.findOne({ email: cleanEmail });
    if (user) {
      user.password = password;
      await user.save();
    } else {
      user = await User.create({
        email: cleanEmail,
        password,
      });
    }

    return NextResponse.json(
      { userId: user._id.toString() },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signin API error:", error);
    return NextResponse.json(
      { message: "Failed to store credentials in database" },
      { status: 500 }
    );
  }
}

