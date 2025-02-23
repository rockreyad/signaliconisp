import { z } from "zod";
import { commonValidations } from "./common";
import { packageSchema } from "./package";
import { PaymentSchema } from "./payment";
import { subscriptionSchema } from "./subscription";

export const changeUserPasswordSchema = z.object({
  currentPassword: z
    .string({
      required_error: "Password is required",
    })
    .min(1),
  newPassword: commonValidations.password,
});

export type ChangeUserPassword = z.infer<typeof changeUserPasswordSchema>;

export const changeUserPasswordFormSchema = changeUserPasswordSchema
  .extend({
    confirmNewPassword: z.string().min(1),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type ChangeUserPasswordForm = z.infer<
  typeof changeUserPasswordFormSchema
>;

export const userRoleSchema = z.enum(["ADMIN", "RECHARGE_AGENT", "CUSTOMER"]);

export type UserRole = z.infer<typeof userRoleSchema>;

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  phone: z.string(),
  name: z.string(),
  username: z.string(),
  fathersName: z.string(),
  role: userRoleSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type User = z.infer<typeof userSchema>;

const userAddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
});

const userConnectionSchema = z.object({
  poppeUserName: z.string().optional(),
  poppeUserPassword: z.string().optional(),
});

export const UserProfileSchema = userSchema
  .pick({
    name: true,
    email: true,
    phone: true,
  })
  .extend({
    connection: userConnectionSchema.optional(),
    address: userAddressSchema.optional(),
    subscriptions: z.array(
      subscriptionSchema
        .pick({
          id: true,
          status: true,
          endDate: true,
        })
        .extend({
          package: packageSchema.pick({
            name: true,
            speed: true,
            price: true,
          }),
          payments: PaymentSchema.pick({
            amount: true,
          }),
        })
        .optional(),
    ),
  });

export type UserProfile = z.infer<typeof UserProfileSchema>;
