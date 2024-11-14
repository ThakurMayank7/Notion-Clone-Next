// globals.d.ts

import { User } from "./types";

// Add custom properties to CustomJwtSessionClaims
declare global {
  interface CustomJwtSessionClaims extends User {
    // Custom properties specific to session claims
    customClaim: string;
  }
}