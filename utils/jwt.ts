import Cookies from "js-cookie";

export interface DecodedToken {
  name?: string;
  email?: string;
  exp?: number;
  [key: string]: any;
}

export function decodeJWT(token: string): DecodedToken | null {
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return decoded;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}
