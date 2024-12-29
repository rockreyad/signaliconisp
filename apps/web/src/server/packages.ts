import api from "@/lib/axios";

//api response is - {"status":true,"data":[{"id":"62db9eba-6ac3-401d-b5b7-8eef49755636","name":"Basic 5","price":500,"speed":5,"description":"Perfect for basic browsing and email","duration":30,"isActive":true,"createdAt":"2024-12-28T18:23:51.710Z","updatedAt":"2024-12-28T18:23:51.710Z"},{"id":"b1237699-3fb0-4fdd-9568-395d0030df5c","name":"Standard 8","price":525,"speed":8,"description":"Great for streaming and light gaming","duration":30,"isActive":true,"createdAt":"2024-12-28T18:23:51.710Z","updatedAt":"2024-12-28T18:23:51.710Z"},{"id":"b8efc83f-14ea-402a-9734-4b1183db10d0","name":"Plus 10","price":600,"speed":10,"description":"Ideal for HD streaming and gaming","duration":30,"isActive":true,"createdAt":"2024-12-28T18:23:51.710Z","updatedAt":"2024-12-28T18:23:51.710Z"},{"id":"322d0619-f751-4c24-b8a1-5fc475fe56ee","name":"Pro 15","price":800,"speed":15,"description":"Professional package for remote work and gaming","duration":30,"isActive":true,"createdAt":"2024-12-28T18:23:51.710Z","updatedAt":"2024-12-28T18:23:51.710Z"},{"id":"da055d34-2fa4-44d1-b038-b78a45479e47","name":"Ultra 20","price":1050,"speed":20,"description":"Ultimate speed for power users","duration":30,"isActive":true,"createdAt":"2024-12-28T18:23:51.710Z","updatedAt":"2024-12-28T18:23:51.710Z"}],"message":"Packages fetched successfully"}%
export async function getPackages() {
  const response = await api.get("/api/packages");

  return response.data.data;
}
