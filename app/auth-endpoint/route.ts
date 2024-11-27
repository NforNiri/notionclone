import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Obtain the authentication session
  const { sessionClaims } = await auth.protect();

  if (!sessionClaims?.email) {
    return NextResponse.json(
      { message: "Unauthorized access - No valid email found" },
      { status: 401 }
    );
  }

  const { room } = await req.json();

  // Prepare the Liveblocks session with user information
  const session = liveblocks.prepareSession(sessionClaims.email, {
    userInfo: {
      name: sessionClaims.fullName,
      email: sessionClaims.email,
      avatar: sessionClaims.image,
    },
  });

  // Check if the user is in the specified room
  try {
    const usersInRoom = await adminDb
      .collectionGroup("rooms")
      .where("userId", "==", sessionClaims?.email)
      .get();

    const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

    if (userInRoom?.exists) {
      // Allow full access if the user is in the room
      session.allow(room, session.FULL_ACCESS);
      const { body, status } = await session.authorize();

      console.log("Authorization successful");

      return new Response(body, { status });
    } else {
      // User is not part of the specified room
      return NextResponse.json(
        { message: "You are not in this room" },
        { status: 403 }
      );
    }
  } catch (error) {
    console.error("Error checking room authorization:", error);
    return NextResponse.json(
      { message: "Internal Server Error!!!!" },
      { status: 500 }
    );
  }
}
