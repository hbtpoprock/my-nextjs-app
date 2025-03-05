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

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";

  const backendUrl = `http://localhost:3000/user/search?query=${query}&page=${page}&limit=${limit}`;

  try {
    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from backend" },
        { status: response.status }
      );
    }
    console.log("response", response);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching data" },
      { status: 500 }
    );
  }
}
