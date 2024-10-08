import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const mactchSchema = z.object({
  moves: z.string().min(1),
  userId: z.string().min(1),
  winner: z.string(),
})

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const { moves, userId, winner } = mactchSchema.partial({
      winner: true,
    }).parse(body);

    // check if user exists
    const match = await prisma.match.create({
      data: {
        movements: moves,
        userId,
        winner,
      }
    });

    return NextResponse.json(
      { match },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `[Error]: Internal server error`,
        messages: JSON.parse(error?.message ?? undefined),
      },
      { status: 500 }
    );
  }
};