import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  const apiResponse = await fetch("http://localhost:3000/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (apiResponse.ok) {
    const data = await apiResponse.json();

    // Handle successful login, e.g., store tokens, redirect user
    return NextResponse.json(data);
  } else {
    const errorData = await apiResponse.json();
    return NextResponse.json(
      { message: errorData.message },
      { status: apiResponse.status }
    );
  }
}
