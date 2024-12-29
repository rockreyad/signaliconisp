import { getToken } from './tokenManager';

export const authHeaders = async () => {
  try {
    const token = await getToken();

    return {
      'Content-Type': 'application/json',
      authorization: token,
      'x-app-key': process.env.BKASH_APP_KEY!,
    };
  } catch (error) {
    console.error('Error getting auth headers:', error);
    throw new Error('No token found');
  }
};
