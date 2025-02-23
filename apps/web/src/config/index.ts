export const cookie = {
  accessToken: {
    name: "x-access-token",
    maxAge: 60 * 60,
  },
  refreshToken: {
    name: "x-refresh-token",
    maxAge: 60 * 60 * 24 * 7,
  },
  session: {
    name: "user",
    maxAge: 60 * 60 * 24,
  },
};

export const afterLoginUrl = "/dashboard";

export const authRoutes = {
  signIn: "/sign-in",
  signUp: "/sign-up",
  forgotPassword: "/forgot-password",
  verifyEmail: "/verify-email",
  resetPassword: "/reset-password",
};

export const protectedRoutes = [
  "/dashboard",
  "/dashboard/transactions",
  "/dashboard/recharge",
  "/dashboard/settings",
];

export const apiRoutes = {
  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    signOut: "/auth/sign-out",
    forgotPassword: "/auth/forgot-password",
    verifyEmail: "/auth/verify-email",
    resetPassword: "/auth/reset-password",
    sendVerificationEmail: "/auth/send-verification-email",
    refreshToken: "/auth/refresh-token",
    session: "/auth/session",
  },
  user: {
    getUser: "/user/:id",
    updateUser: "/user",
    changePassword: "/user/change-password",
    getUserProfile: "/user/profile/:id",
  },
  subscription: {
    getSubscriptions: "/subscription",
    postSubscription: "/subscription",
  },
  package: {
    getAllPackages: "/package",
  },
  payment: {
    getPayments: "/payment",
  },
};
