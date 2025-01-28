import { setSessionTokenCookie } from "@/lib/auth";
import { getClientSessionToken, getSessionToken } from "@/lib/auth";
import { env } from "@/lib/env";
import type { ApiResponse } from "@repo/validation/api";

export interface FetchOptions extends RequestInit {
  body: any;
}

interface ApiRequestOptions extends Omit<FetchOptions, "body" | "headers"> {
  params?: Record<string, any>;
  query?: Record<string, any>;
  body?: any;
  headers?: Record<string, string>;
}

const handleApiResponse = async <T>(
  response: Response,
): Promise<ApiResponse<T>> => {
  try {
    const setCookieHeader = response.headers.get("Set-Cookie");

    if (setCookieHeader) {
      const cookieValue = setCookieHeader
        .split(";")[0]
        .split("=")
        .slice(1)
        .join("=");
      setSessionTokenCookie(cookieValue);
    }

    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: "Server error",
      statusCode: 500,
    } as ApiResponse<T>;
  }
};

const createBaseConfig = (options?: ApiRequestOptions) => {
  const config: RequestInit = {
    headers: new Headers({
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    }),
    credentials: "include" as RequestCredentials,
  };

  if (
    options?.body &&
    options?.method &&
    !["GET", "HEAD"].includes(options.method)
  ) {
    config.body = JSON.stringify(options.body);
  }

  return config;
};

export const authFetch = async (
  endpoint: string,
  baseOptions: ApiRequestOptions,
) => {
  const isServer = typeof window === "undefined";

  // Handle path parameters if they exist
  let finalEndpoint = endpoint;
  if (baseOptions.params) {
    Object.entries(baseOptions.params).forEach(([key, value]) => {
      finalEndpoint = finalEndpoint.replace(`:${key}`, String(value));
    });
  }

  const url = new URL(
    finalEndpoint,
    isServer ? env.EXTERNAL_SERVER_URL : `${env.NEXT_PUBLIC_BASE_URL}`,
  );

  // Add query parameters if they exist
  if (baseOptions.query) {
    Object.entries(baseOptions.query).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  // Ensure method is explicitly set in the config
  const options: RequestInit = {
    ...createBaseConfig(baseOptions),
    method: baseOptions.method || "GET", // Provide default method if none specified
  };

  const headers = options.headers as Headers;

  const sessionCookie = isServer
    ? await getSessionToken()
    : getClientSessionToken();

  if (sessionCookie) {
    headers.set("Cookie", `${env.SESSION_COOKIE_NAME}=${sessionCookie}`);
  }

  console.log("[REQUEST]", url, options.method);

  const response = await fetch(url.toString(), options);

  return response;
};

export const api = {
  get: async <T>(
    endpoint: string,
    options?: ApiRequestOptions,
  ): Promise<ApiResponse<T>> => {
    const response = await authFetch(endpoint, {
      ...options,
      method: "GET",
    });
    return handleApiResponse<T>(response);
  },
  post: async <T>(
    endpoint: string,
    options?: ApiRequestOptions,
  ): Promise<ApiResponse<T>> => {
    const response = await authFetch(endpoint, {
      ...options,
      method: "POST",
    });
    return handleApiResponse<T>(response);
  },
  put: async <T>(
    endpoint: string,
    options?: ApiRequestOptions,
  ): Promise<ApiResponse<T>> => {
    const response = await authFetch(endpoint, {
      ...options,
      method: "PUT",
    });
    return handleApiResponse<T>(response);
  },
  patch: async <T>(
    endpoint: string,
    options?: ApiRequestOptions,
  ): Promise<ApiResponse<T>> => {
    const response = await authFetch(endpoint, {
      ...options,
      method: "PATCH",
    });
    return handleApiResponse(response);
  },
  delete: async <T>(
    endpoint: string,
    options?: ApiRequestOptions,
  ): Promise<ApiResponse<T>> => {
    const response = await authFetch(endpoint, {
      ...options,
      method: "DELETE",
    });
    return handleApiResponse(response);
  },
};
