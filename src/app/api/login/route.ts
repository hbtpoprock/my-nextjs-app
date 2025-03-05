import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  const apiResponse = await fetch("http://localhost:3000/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (apiResponse.ok) {
    const { access_token } = await apiResponse.json();
    const response = NextResponse.json({ message: "Login successful" });

    response.cookies.set("auth_token", access_token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return response;
  } else {
    const errorData = await apiResponse.json();
    return NextResponse.json(
      { message: errorData.message },
      { status: apiResponse.status }
    );
  }
}
