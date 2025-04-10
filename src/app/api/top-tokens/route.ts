import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Fetch top tokens data from the external API
    const apiResponse = await fetch("http://localhost:3000/top-tokens", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      return NextResponse.json(
        { message: `Error fetching top tokens: ${errorData.message}` },
        { status: apiResponse.status }
      );
    }

    const topTokens = await apiResponse.json();
    console.log("topTokens", topTokens);
    return NextResponse.json(topTokens);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
