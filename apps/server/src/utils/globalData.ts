let idToken: string | null = null;

export const setGlobalIdToken = (info: string): void => {
  idToken = info;
};

export const getGlobalIdToken = (): string | null => idToken;
