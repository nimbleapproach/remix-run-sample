import { Link } from "@remix-run/react";
import * as React from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { IProduct } from "~/types/product.types";

interface IProps {
  product: IProduct;
}

const ProductCard: React.FC<IProps> = ({ product }) => {
  return (
    <Card className="max-w-[400px]">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="rounded-md object-cover w-full h-auto"
      />
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{product.description}</p>
      </CardContent>
      <CardFooter>
        <Link to={`/products/${product.id}/edit`} className="mr-2">
          <Button>Edit</Button>
        </Link>
        <Link to={`/products/${product.id}/destory`}>
          <Button variant="destructive">Delete</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

ProductCard.displayName = "Components:ProductCard";

export default ProductCard;
