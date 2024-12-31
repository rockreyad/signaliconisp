"use server";

import api from "@/lib/axios";

export async function createSubscription({
  userId,
  packageId,
}: {
  userId: string;
  packageId: string;
}) {
  const response = await fetch(`${process.env.API_URL}/api/subscriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, packageId }),
  });

  if (!response.ok) {
    throw new Error("Failed to create subscription");
  }

  const data = await response.json();

  if (data.status && data.data.redirectURL) {
    return {
      success: true,
      redirectURL: data.data.redirectURL,
      paymentID: data.data.paymentID,
    };
  }

  throw new Error(data.message || "Failed to initiate payment");
}

export async function getUserActiveSubscription(userId: string) {
  try {
    const response = await api.get(`/api/subscriptions/active/${userId}`);
    return response.data.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching active subscription:", error.message);
    } else {
      console.error("Error fetching active subscription:", error);
    }
    return null;
  }
}

// export async function getUserSubscriptionHistory(userId: string) {
//   const response = await fetch(
//     `${process.env.API_URL}/api/subscriptions/history/${userId}`,
//   );

//   if (!response.ok) {
//     throw new Error("Failed to fetch subscription history");
//   }

//   const data = await response.json();
//   return data.data;
// }
