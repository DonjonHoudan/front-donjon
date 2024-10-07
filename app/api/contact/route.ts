import { NextRequest, NextResponse } from "next/server";
import { postMail } from "@/lib/api/resources/contact";
import { STRAPI_API_KEY } from "@/lib/constants";

export async function POST(request: NextRequest) {
  const data = await request.json();

  if (!STRAPI_API_KEY) {
    return NextResponse.json({ status: 500, errorMessage: "STRAPI_API_KEY is not defined" });
  }

  const resultat = await postMail(data, STRAPI_API_KEY);

  return NextResponse.json(resultat);
}