import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";
import React, { ReactNode } from "react";

async function DocLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>; // Adjusted to reflect that `params` is a Promise
}) {
  try {
    // Protect the route
    await auth.protect();

    // Await the `params` Promise
    const { id } = await params;

    console.log("Auth successful, rendering RoomProvider with ID:", id);

    // Render RoomProvider
    return <RoomProvider roomId={id}>{children}</RoomProvider>;
  } catch (err) {
    console.error("Error during auth or rendering:", err);

    // You can handle fallback UI or redirection here if needed
    throw new Error("Authentication failed or RoomProvider rendering error.");
  }
}

export default DocLayout;
