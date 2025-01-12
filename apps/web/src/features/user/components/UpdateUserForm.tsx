"use client";

import { useUpdateUserForm } from "@/features/user/hooks/useUpdateUserForm";

const UpdateUserForm = () => {
  const { form, onSubmit, isPending, error, user } = useUpdateUserForm();

  return null;
};

export default UpdateUserForm;
