import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { username, password, name, age } = await request.json();

  const apiResponse = await fetch("http://localhost:3000/user/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, name, age }),
  });

  if (apiResponse.ok) {
    const res = await apiResponse.json();
    const response = NextResponse.json({ message: res.message });
    return response;
  } else {
    const errorData = await apiResponse.json();
    return NextResponse.json(
      { message: errorData.message },
      { status: apiResponse.status }
    );
  }
}
