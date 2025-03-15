import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Retrieve the Bearer token from cookies
  const token = request.cookies.get("auth_token")?.value;

  // Extract the userId from the URL params
  const { id } = await params;

  // Construct the URL of the external endpoint (e.g., the backend you are calling)
  const externalUrl = `http://localhost:3000/user/${id}`;

  try {
    // Make the fetch request to the external API
    const apiResponse = await fetch(externalUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if the response was successful
    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      return NextResponse.json(
        {
          message: `Error deleting user: ${
            errorData.message || "Unknown error"
          }`,
        },
        { status: apiResponse.status }
      );
    }

    // Return a success message
    const deletedUser = await apiResponse.text();

    return NextResponse.json({
      message: `${deletedUser}`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred while deleting the user",
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
