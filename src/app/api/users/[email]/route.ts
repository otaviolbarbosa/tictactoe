import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

type GetParams = { params: { email: string } };

export const GET = async (req: Request, { params }: GetParams) => {
  const user = await prisma.user.findUnique({
    where: { 
      email: params.email
    }
  })
  
  return NextResponse.json({ user });
};
