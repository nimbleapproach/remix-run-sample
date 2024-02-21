import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { IBlogs } from "~/types/blog.types";
import BlogCard from "~/components/BlogCard";

export const meta: MetaFunction = () => {
  return [
    { title: "Blogs - My Sample App" },
    { name: "description", content: "Login page" },
  ];
};

export async function loader() {
  const res = await fetch("https://dummyjson.com/posts");
  const blogs: IBlogs = await res.json();

  return json({ blogs });
}

export default function BlogsPage() {
  const { blogs } = useLoaderData<typeof loader>();

  return (
    <main className="p-4 flex flex-1 justify-center items-stretch flex-wrap">
      {blogs.posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </main>
  );
}
