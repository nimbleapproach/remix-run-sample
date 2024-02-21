import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { MetaFunction, json, type LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

import { IBlogPost } from "~/types/blog.types";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `${data?.post.title} - My Sample App` },
    { name: "description", content: data?.post?.body?.substring(0, 15) || "" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  invariant(params.blogId, "Expected params.blogId");

  const res = await fetch(`https://dummyjson.com/posts/${params.blogId}`);

  if (!res.ok) {
    throw new Response(res.statusText, { status: res.status });
  }

  const post: IBlogPost = await res.json();

  return json({ post });
}

export default function BlogPage() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <main className="flex flex-1 justify-center items-start pt-4">
      <section className="w-[768px]">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <p>{post.body}</p>
        </div>

        {post.tags.map((tag) => (
          <span
            key={tag}
            className="border border-gray-500 rounded-sm p-2 mr-2 text-xs"
          >
            {tag}
          </span>
        ))}
      </section>
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <h1>Blog Post Not Found!</h1>;
    }
  }

  return <h1>Something went wrong!</h1>;
}
