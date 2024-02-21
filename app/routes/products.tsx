import { NavLink, Outlet, json, useLoaderData } from "@remix-run/react";

import { IProducts } from "~/types/product.types";

export async function loader() {
  const res = await fetch(`https://dummyjson.com/products`);

  const products: IProducts = await res.json();

  return json({ products });
}

export default function ProductPage() {
  const {
    products: { products },
  } = useLoaderData<typeof loader>();

  return (
    <main className="flex">
      <aside className="min-h-screen bg-gray-200 w-[400px] p-4">
        <nav>
          {products.length > 0 ? (
            <ul>
              {products.map((product) => (
                <li key={product.id} className="mb-4">
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "font-extrabold bg-blue-400 text-white"
                        : isPending
                        ? "bg-green-200 "
                        : ""
                    }
                    to={`/products/${product.id}`}
                  >
                    {product.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>No products</p>
          )}
        </nav>
      </aside>
      <section className="p-4">
        <Outlet />
      </section>
    </main>
  );
}
