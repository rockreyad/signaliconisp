import api from "@/lib/axios";

export async function getUserByPhoneNumber({
  phoneNumber,
}: {
  phoneNumber: string;
}) {
  try {
    const response = await api.get(`/api/users/${phoneNumber}`);

    if (!response.data?.data) {
      throw new Error("User not found");
    }

    const userData = response.data.data;

    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      phoneNumber: userData.phone,
      avatar: "",
      subscriptions: userData.subscriptions,
      addresses: userData.addresses,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}
