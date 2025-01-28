import { bkashConfig } from "./config";

export interface TokenHeaders extends Record<string, string> {
  "Content-Type": string;
  Accept: string;
  username: string;
  password: string;
}

export const tokenHeaders = (): TokenHeaders => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    username: bkashConfig.username,
    password: bkashConfig.password,
  };
};
