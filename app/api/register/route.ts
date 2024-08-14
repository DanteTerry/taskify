import { connectDB } from "@/database/db";
import { UserModel } from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  return NextResponse.json({ message: "Hello", session });
};

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const data = await req.json();

    const { name, email, password } = data;

    console.log(name, email, password);

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Please fill all fields" },
        {
          status: 400,
        }
      );
    }
    const ifUserExists = await UserModel.findOne({ email });
    if (ifUserExists) {
      return NextResponse.json(
        { error: "User already exists" },
        {
          status: 400,
        }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const user = await UserModel.create(userData);

    if (!user) {
      return NextResponse.json(
        { error: "couldn't create user" },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      { success: true, message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
};
