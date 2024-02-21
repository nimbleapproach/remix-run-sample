import { LoaderFunctionArgs, json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import ProductCard from "~/components/ProductCard";
import { IProduct } from "~/types/product.types";

export async function loader({ params }: LoaderFunctionArgs) {
  invariant(params.productId, "Expected params.productId");

  const res = await fetch(`https://dummyjson.com/products/${params.productId}`);

  if (!res.ok) {
    throw new Response(res.statusText, { status: res.status });
  }

  const product: IProduct = await res.json();

  return json({ product });
}

export default function Product() {
  const { product } = useLoaderData<typeof loader>();

  return <ProductCard product={product} />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <h1>Product not found</h1>;
    }
  }

  return <h1>Something went wrong</h1>;
}
