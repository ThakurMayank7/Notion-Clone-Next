"use client";

import React, { useState, useTransition } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { deleteDocument } from "@/actions/actions";

function DeleteDocument() {

    const [isOpen,setIsOpen] =useState(false);

    const [isPending,startTransition]=useTransition();

    const pathname=usePathname();

    const router=useRouter();

    const handleDelete=async ()=>{
        const roomId=pathname.split("/").pop();
        if(!roomId)
        {
            return;
        }
        startTransition(async ()=>{
            const {success}= await deleteDocument(roomId);

            if(success){
                setIsOpen(false);
                router.replace("/");
                // toast.success("Room Deleted successfully!");
            }
            else{
                // toast.error("Failed to delete room!");
            }
        })
    }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant="destructive">

      <DialogTrigger>Delete</DialogTrigger>
        </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure you want to Delete this document?</DialogTitle>
          <DialogDescription>
            This will delete the document and all its contents, removing all users from the document.
          </DialogDescription>
        </DialogHeader>

    <DialogFooter className="sm:justify-end gap-2">

        <Button
        className="mx-auto"
        type="button"
        variant="destructive"
        onClick={handleDelete}
        disabled={isPending}
        >
            {isPending?"Deleting...":"Delete"}
        </Button>

    </DialogFooter>
    <DialogClose asChild>
        <Button type="button" variant="secondary">
            Close
        </Button>
    </DialogClose>

      </DialogContent>
    </Dialog>
  );
}

export default DeleteDocument;
