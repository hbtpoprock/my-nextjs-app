import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Retrieve the Bearer token from cookies
  const token = request.cookies.get("auth_token")?.value;

  const { id } = await params; // Extract the userId from the URL params
  const body = await request.json(); // Get the request body (updated user data)

  // Construct the URL of the external endpoint (e.g., the backend you are calling)
  const externalUrl = `http://localhost:3000/user/${id}`;

  try {
    // Make the fetch request to the external API
    const apiResponse = await fetch(externalUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body), // Send the updated user data in the request body
    });

    // Check if the response was successful
    if (!apiResponse.ok) {
      const errorData = await apiResponse.json(); // Extract error details
      return NextResponse.json(
        {
          message: `Error updating user: ${
            errorData.message || "Unknown error"
          }`,
        },
        { status: apiResponse.status }
      );
    }

    // Parse the response from the external API
    const updatedUser = await apiResponse.json();

    // Return the updated user data to the client
    return NextResponse.json({
      message: `User with ID ${id} updated successfully`,
      data: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred while updating the user",
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
