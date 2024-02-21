import { redirect } from "@remix-run/node";

export async function loader() {
  return redirect("/", {
    headers: {
      "Clear-Site-Data": '"cache", "cookies", "storage"',
    },
  });
}
