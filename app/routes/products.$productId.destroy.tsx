import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

export async function loader({ params }: LoaderFunctionArgs) {
  console.log("Test");
  invariant(params.productId, "Expecting params.productId");

  const res = await fetch(
    `https://dummyjson.com/products/${params.productId}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Response(res.statusText, { status: res.status });
  }

  return redirect("/products");
}
