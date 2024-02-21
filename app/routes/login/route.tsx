import * as React from "react";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

import LoginForm from "~/routes/login/LoginForm";

import { getAuthToken, getUser, userCookie, authToken } from "~/cookies.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Login - My Sample App" },
    { name: "description", content: "Login page" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);
  const token = await getAuthToken(request);

  if (user && token) {
    return redirect("/");
  }

  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  const errorResponse = json(
    {
      errorMessage: "Invalid username and/or password",
    },
    { status: 400 }
  );

  /**
   * Here you would peform form validation
   * such as checking if the email is valid, etc
   *
   * To keep the app simple we are just doing
   * basic checks
   */
  if (!username || !password) {
    return errorResponse;
  }

  const res = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const user = await res.json();

  if (!user.token) {
    return errorResponse;
  }

  let userForCookie = await getUser(request);
  let tokenForCookie = await getAuthToken(request);

  const userCopy = Object.assign({}, user);
  delete userCopy.token;

  userForCookie = { ...userCookie, ...userCopy };
  tokenForCookie = user.token;

  const headers = new Headers();
  headers.append("Set-Cookie", await userCookie.serialize(userForCookie));
  headers.append("Set-Cookie", await authToken.serialize(tokenForCookie));

  const searchParams = new URL(request.url).searchParams;
  const returnUrl = searchParams.get("returnUrl");

  return redirect(returnUrl ?? "/", {
    headers,
  });
}

const LoginPage: React.FC = () => {
  return (
    <main id="login-page" className="flex flex-1 justify-center items-center">
      <div id="form-wrap border rounded-sm p-4">
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
