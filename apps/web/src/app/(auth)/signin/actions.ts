"use server";

import { signIn, signOut } from "@/auth";
import { FormState, LoginFormSchema } from "./definitions";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function signin(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  const validationResult = LoginFormSchema.safeParse({
    usernameOrPhone: formData.get("usernameOrPhone"),
  });

  if (!validationResult.success) {
    return { errors: validationResult.error.flatten().fieldErrors };
  }

  try {
    const result = await signIn("credentials", {
      usernameOrPhone: validationResult.data.usernameOrPhone,
      redirect: false,
    });

    if (result?.error) {
      return { message: "Invalid credentials" };
    }

    // Ensure cookies are set before redirect
    cookies().getAll(); // This forces cookies to be sent to the client

    // Add a small delay to allow session to be established
    await new Promise((resolve) => setTimeout(resolve, 100));

    redirect("/dashboard");
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }

    console.error("Signin error:", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid credentials" };
        default:
          return { message: "Authentication error" };
      }
    }
    return { message: "Something went wrong!" };
  }
}

export async function logout() {
  await signOut();
}
