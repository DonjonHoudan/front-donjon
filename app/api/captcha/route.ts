import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { postMail } from "@/lib/api/resources/contact";
import { STRAPI_API_KEY, RECAPTCHA_SECRET_KEY } from "@/lib/constants";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { token } = data;
  const secretKey: string | undefined = RECAPTCHA_SECRET_KEY;

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
      return new Response(JSON.stringify({ message: "Verified" }), {
        status: 200,
      });
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
