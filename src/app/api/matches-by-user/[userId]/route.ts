import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

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
    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        messages: error?.message,
      },
      { status: 500 }
    );
  }
};
