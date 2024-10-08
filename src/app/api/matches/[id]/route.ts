import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

type MatchParams = {
  params: {
    id: string;
  };
};
export const GET = async (req: Request, { params }: MatchParams) => {
  try {
    const matchData = await prisma.match.findUnique({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({
      match: matchData,
    });
    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        messages: JSON.parse(error?.message ?? undefined),
      },
      { status: 500 }
    );
  }
};
