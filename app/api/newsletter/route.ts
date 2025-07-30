import { NextRequest, NextResponse } from "next/server";
import { STRAPI_API_KEY, RECAPTCHA_SECRET_KEY } from "@/lib/constants";
import { postAbonnement } from "@/lib/api/resources/newsletter";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const secretKey: string | undefined = RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json({
      status: 500,
      errorMessage: "RECAPTCHA_SECRET_KEY is not defined",
    });
  }

  if (!STRAPI_API_KEY) {
    return NextResponse.json({
      status: 500,
      errorMessage: "STRAPI_API_KEY is not defined",
    });
  }

  try {
    const resultat = await postAbonnement(data, STRAPI_API_KEY);

    return NextResponse.json(resultat);
  } catch (error) {
    return NextResponse.json({
      status: 500,
      errorMessage: "Internal Server Error",
    });
  }
}
