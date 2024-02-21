import { Cookie, createCookie } from "@remix-run/node";
import { IUser } from "~/types/user.types";

const expiresIn = 60 * 60 * 24 * 7;

export const authToken = createCookie("authToken", {
  path: "/",
  sameSite: "lax",
  httpOnly: true,
  secure: process.env.NODE_ENV !== "production",
  maxAge: expiresIn,
  secrets: [process.env.COOKIE_SECRET!],
});

export const userCookie = createCookie("userCookie", {
  path: "/",
  sameSite: "lax",
  httpOnly: false,
  secure: false,
  maxAge: expiresIn,
});

export const getParsedCookieData = async <T>(
  request: Request,
  cookie: Cookie
): Promise<T | null> => {
  const cookieHeader = request.headers.get("Cookie");

  return await cookie.parse(cookieHeader);
};

export const getUser = async (request: Request): Promise<IUser | null> => {
  return await getParsedCookieData<IUser>(request, userCookie);
};

export const getAuthToken = async (
  request: Request
): Promise<string | null> => {
  return await getParsedCookieData<string>(request, authToken);
};
