"use client";

import React, { FormEvent, useState, useTransition } from "react";

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


import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react/suspense";
import useOwner from "@/lib/useOwner";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";


function ManageUsers() {

    const {user}=useUser();

    const room=useRoom();

    const isOwner=useOwner();

    const [isOpen,setIsOpen] =useState(false);

    

    const [isPending,startTransition]=useTransition();

    const [usersInRoom]=useCollection(
        user && query(collectionGroup(db,"rooms"),where("roomId","==",room.id))
    );
    

    

    const handleDelete=(userId:string)=>{
        
    }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant="outline">

      <DialogTrigger>Users</DialogTrigger>
        </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Users with Access</DialogTitle>
          <DialogDescription>
            Below is a list of users who have access to this document.
          </DialogDescription>
        </DialogHeader>

        <hr className="my-2"/>

        <div>
            {/* UsersInRoom */}
        </div>

      </DialogContent>
    </Dialog>
  );
}

export default ManageUsers;