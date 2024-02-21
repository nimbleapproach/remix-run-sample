import { Link } from "@remix-run/react";
import * as React from "react";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { IBlogPost } from "~/types/blog.types";

interface IProps {
  post: IBlogPost;
}

const BlogCard: React.FC<IProps> = ({ post }) => {
  return (
    <Card className="m-2 w-1/4">
      <AspectRatio ratio={16 / 9}>
        <img
          src="/blog.png"
          alt={post.title}
          className="rounded-md object-cover"
        />
      </AspectRatio>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{post.body.substring(0, 20)}</p>
      </CardContent>
      <CardFooter>
        <Link to={`/blogs/${post.id}`}>
          <Button size="sm">Read more</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

BlogCard.displayName = "Components:BlogCard";

export default BlogCard;
