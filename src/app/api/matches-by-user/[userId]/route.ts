import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

type MatchesByUserIdParams = {
  params: {
    userId: string;
  };
};
export const GET = async (req: Request, { params }: MatchesByUserIdParams) => {
  try {
    const matchesData = await prisma.match.findMany({
      where: {
        userId: params.userId,
      },
    });

    return NextResponse.json({
      matches: matchesData,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
};
