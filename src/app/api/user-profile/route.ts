import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Retrieve the Bearer token from cookies
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized: No token provided" },
      { status: 401 }
    );
  }

  try {
    // Fetch user profile data from the external API
    const apiResponse = await fetch("http://localhost:3000/user/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      return NextResponse.json(
        { message: `Error fetching user profile: ${errorData.message}` },
        { status: apiResponse.status }
      );
    }

    const userData = await apiResponse.json();
    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
