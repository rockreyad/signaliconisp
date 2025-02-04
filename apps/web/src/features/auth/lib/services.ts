"use server";

import type { SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { signInSchema } from "@repo/validation/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

import { signIn, signOut } from "@/auth";
import { afterLoginUrl } from "@/config";
import { env } from "@/lib/env";

export async function signin(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: signInSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  try {
    const result = await signIn("credentials", {
      usernameOrPhone: submission.value.usernameOrPhone,
      redirect: false,
      callbackUrl: afterLoginUrl,
    });

    // Handle specific error cases
    if (result?.error === "user_not_found") {
      return {
        status: "error",
        error: {
          usernameOrPhone: ["No user found with this phone number"],
        },
      } satisfies SubmissionResult;
    }

    // If we get here, the sign in was successful
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(env.SESSION_COOKIE_NAME);
    if (!sessionCookie) {
      // Wait for cookie to be set
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    redirect(afterLoginUrl);
  } catch (error) {
    // Handle redirect error separately
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }

    // Handle specific error codes
    if (error instanceof AuthError) {
      const errorCode = (error as any).code;
      if (errorCode === "user_not_found") {
        return {
          status: "error",
          error: {
            usernameOrPhone: ["No user found with this phone number"],
          },
        } satisfies SubmissionResult;
      }
    }

    // Default error message
    return {
      status: "error",
      error: {
        usernameOrPhone: ["Unable to sign in. Please try again."],
      },
    } satisfies SubmissionResult;
  }
}

export async function signout() {
  await signOut();
}
