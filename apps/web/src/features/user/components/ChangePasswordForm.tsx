"use client";

import { useChangeUserPassword } from "@/features/user/hooks/useChangeUserPassword";

const ChangeUserPasswordForm = () => {
  const { form, onSubmit, isPending, error } = useChangeUserPassword();

  return <div>ChangeUserPasswordForm</div>;
};

export default ChangeUserPasswordForm;
