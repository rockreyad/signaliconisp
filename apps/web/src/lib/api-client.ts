import type { ApiResponse } from "@repo/validation/api";

import { env } from "@/lib/env";

interface FetchOptions extends RequestInit {
  body?: any;
}

interface ApiRequestOptions extends Omit<FetchOptions, "body" | "headers"> {
  params?: Record<string, any>;
  query?: Record<string, any>;
  body?: any;
  headers?: Record<string, string>;
}

const API_BASE_URL = env.NEXT_PUBLIC_EXTERNAL_SERVER_URL;

const createBaseConfig = (options?: ApiRequestOptions) => {
  return {
    ...options,
    ...(options?.body ? { body: JSON.stringify(options.body) } : {}),
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    credentials: "include" as RequestCredentials,
  };
};

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || "An error occurred please try later.");
  }

  return data as ApiResponse<T>;
}

const fetcher = async <T>(url: string, options?: ApiRequestOptions) => {
  return await fetch(url, createBaseConfig(options));
};

export const apiClient = {
  get: async <T>(
    endpoint: string,
    options?: ApiRequestOptions,
  ): Promise<ApiResponse<T>> => {
    // Handle path parameters if they exist
    let finalEndpoint = endpoint;
    if (options?.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        finalEndpoint = finalEndpoint.replace(`:${key}`, String(value));
      });
    }

    let url = `${API_BASE_URL}${finalEndpoint}`;

    // Add query parameters if they exist
    if (options?.query) {
      const queryParams = new URLSearchParams();
      Object.entries(options.query).forEach(([key, value]) => {
        queryParams.append(key, String(value));
      });
      url = `${url}?${queryParams.toString()}`;
    }

    const response = await fetch(
      url,
      createBaseConfig({
        ...options,
        method: "GET",
      }),
    );

    return handleResponse<T>(response);
  },
  post: async <T>(
    endpoint: string,
    options?: ApiRequestOptions,
  ): Promise<ApiResponse<T>> => {
    const response = await fetcher(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: "POST",
    });

    return handleResponse<T>(response);
  },
  put: async <T>(
    endpoint: string,
    options?: ApiRequestOptions,
  ): Promise<ApiResponse<T>> => {
    const response = await fetcher(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: "PUT",
    });

    return handleResponse<T>(response);
  },
  patch: async <T>(
    endpoint: string,
    options?: ApiRequestOptions,
  ): Promise<ApiResponse<T>> => {
    const response = await fetcher(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: "PATCH",
    });

    return handleResponse<T>(response);
  },
  delete: async <T>(
    endpoint: string,
    options?: ApiRequestOptions,
  ): Promise<ApiResponse<T>> => {
    const response = await fetcher(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: "DELETE",
    });

    return handleResponse<T>(response);
  },
};
