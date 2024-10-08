import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(5, "Password must be at least 5 characters long"),
});

export const GET = async () => {
  return NextResponse.json({ success: true });
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const { email, password } = registerSchema.parse(body);

    // check if user exists
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      // if (type === "getOne") {
      //   const { password: _, ...user } = userExists;

      //   return NextResponse.json({ user: user }, { status: 20 });
      // }

      return NextResponse.json(
        {
          message: "User already exists",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 4);
    const userData = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    /* eslint-disable @typescript-eslint/no-unused-vars */
    const { password: _, ...user } = userData;

    return NextResponse.json(
      { user: user, message: "User created successfully" },
      { status: 201 }
    );
    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    return NextResponse.json(
      {
        message: `[Error]: Internal server error`,
        messages: JSON.parse(error?.message ?? undefined),
      },
      { status: 500 }
    );
  }
};
