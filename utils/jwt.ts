import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  sub: string;
  role: string;
  is_kyc: boolean;
  name?: string;
  iat: number;
  exp: number;
}

export const getUserFromToken = (token: string): TokenPayload | null => {
  try {
    return jwtDecode<TokenPayload>(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
