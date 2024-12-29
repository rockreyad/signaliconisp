"use server";

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
