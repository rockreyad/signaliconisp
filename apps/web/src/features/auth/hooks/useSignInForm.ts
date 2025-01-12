import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { signInSchema } from "@repo/validation/auth";
import { signin } from "../lib/services";
import { useActionState } from "react";

export const useSignInForm = () => {
  const [lastResult, action] = useActionState(signin, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: signInSchema,
      });
    },

    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return {
    form,
    action,
    fields,
    lastResult,
  };
};
