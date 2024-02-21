import { LoaderFunctionArgs, json } from "@remix-run/node";

import { userAuthed } from "~/middleware.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await userAuthed(request);

  return json({});
}

export default function ProtectedPage() {
  return (
    <main className="flex flex-1 justify-center items-center">
      <h1>This is a protected page!</h1>
    </main>
  );
}
