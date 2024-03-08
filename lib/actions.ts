"use server";

import { signIn } from "./auth";

export const authAction = async () => {
  try {
    await signIn("github");
  } catch (error) {
    console.log("error in loginAction: ", error);
  }
};
