import { redirect } from "@remix-run/node";
import { getAuthToken, getUser } from "~/cookies.server";

export const userAuthed = async (request: Request) => {
  const user = await getUser(request);
  const token = await getAuthToken(request);

  const currentRoute = new URL(request.url).pathname;

  if (!user || !token) {
    throw redirect(`/login?returnUrl=${currentRoute}`);
  }

  return user;
};
