'use server';

import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {

    const {sessionClaims}=await auth();

    if (!sessionClaims || !sessionClaims.email) {
        throw new Error("User email is missing from session claims.");
      }
      

    const docCollectionRef=adminDb.collection("documents");

    const docRef=await docCollectionRef.add({title:"New Doc"});

    await adminDb.collection("users").doc(sessionClaims.email).collection('rooms').doc(docRef.id).set({
        userId:sessionClaims.email,
        role:"owner",
        createdAt:new Date(),
        roomId:docRef.id
    });

    return {docId:docRef.id};
}