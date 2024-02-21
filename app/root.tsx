import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";

import tailwindStylesHref from "./tailwind.css?url";

import Navbar from "~/components/Navbar";

import { getUser } from "~/cookies.server";

export function links() {
  return [{ rel: "stylesheet", href: tailwindStylesHref }];
}

export async function loader({ request }: LoaderFunctionArgs) {
  return json({ user: await getUser(request) });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen flex flex-col bg-background font-sans antialiased">
        <Navbar user={user} />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export const shouldRevalidate = () => true;
