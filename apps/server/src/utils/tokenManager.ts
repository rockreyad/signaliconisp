import fetch from 'node-fetch';
import bkashConfig from '../config/bkashConfig.json';

interface TokenResponse {
  id_token: string;
  token_type: string;
  expires_in: number;
}

let tokenData: {
  token: string;
  expires: number;
} | null = null;

export const getToken = async (): Promise<string> => {
  try {
    // Check if we have a valid token
    if (tokenData && tokenData.expires > Date.now()) {
      return tokenData.token;
    }

    // If no token or expired, get a new one
    const response = await fetch(bkashConfig.grant_token_url, {
      method: 'POST',
      headers: {
        username: bkashConfig.username,
        password: bkashConfig.password,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app_key: bkashConfig.app_key,
        app_secret: bkashConfig.app_secret,
      }),
    });

    const data = (await response.json()) as TokenResponse;

    if (!data.id_token) {
      throw new Error('Failed to get token');
    }

    // Store token with expiry
    tokenData = {
      token: data.id_token,
      expires: Date.now() + (data.expires_in - 60) * 1000, // Subtract 60 seconds for safety
    };

    return data.id_token;
  } catch (error) {
    console.error('Error getting token:', error);
    throw new Error('Failed to get token');
  }
};
