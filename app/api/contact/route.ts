import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { postMail } from "@/lib/api/resources/contact";
import { STRAPI_API_KEY, RECAPTCHA_SECRET_KEY } from "@/lib/constants";

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

  const { token } = data;

  if (!token) {
    return NextResponse.json({
      status: 405,
      errorMessage: "Token is not defined",
    });
  }

  try {
    const validation = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
    );

    if (validation.data.success) {
      const resultat = await postMail(data, STRAPI_API_KEY);

      return NextResponse.json(resultat);
    } else {
      return new Response(JSON.stringify({ message: "Failed to verify" }), {
        status: 405,
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      errorMessage: "Internal Server Error",
    });
  }
}
