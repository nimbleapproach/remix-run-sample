import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  useLoaderData,
  useNavigate,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
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

export async function action({ params, request }: ActionFunctionArgs) {
  invariant(params.productId, "Expected params.productId");

  const formData = await request.formData();

  // do your validation here

  const updates = Object.fromEntries(formData);

  const res = await fetch(
    `https://dummyjson.com/products/${params.productId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    }
  );

  if (!res.ok) {
    throw new Response(res.statusText, { status: res.status });
  }

  return redirect(`/products/${params.productId}`);
}

export default function EditProduct() {
  const { product } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <Form key={product.id} id="edit-product-form" method="post">
      <p>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          defaultValue={product.title}
        />
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="description"
          defaultValue={product.description}
          rows={10}
        />
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          id="price"
          name="price"
          placeholder="0"
          defaultValue={product.price}
        />
      </p>
      <p className="mt-4">
        <Button type="submit" className="mr-2">
          Save
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          Cancel
        </Button>
      </p>
    </Form>
  );
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
