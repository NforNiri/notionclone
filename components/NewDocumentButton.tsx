"use client";

import { startTransition, useTransition } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createNewDocument } from "@/actions/actions";

const NewDocumentButton = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateNewDocument = () => {
    startTransition(async () => {
      const { docId } = await createNewDocument();
      router.push(`/doc/${docId}`);
    });
  };
  return (
    <Button className="" onClick={handleCreateNewDocument} disabled={isPending} >
      {isPending ? "Creating..." : "New Document"}
    </Button>
  );
};

export default NewDocumentButton;