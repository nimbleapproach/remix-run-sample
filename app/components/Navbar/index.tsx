import { Link } from "@remix-run/react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { IUser } from "~/types/user.types";

interface IProps {
  user: IUser | null;
}

export default function Navbar({ user }: IProps) {
  return (
    <nav className="w-screen h-14 border-b px-4 flex justify-between items-center">
      <ul className="flex justify-start items-center">
        <li className="mr-5">
          <Link className="font-bold" to="/">
            My Sample App
          </Link>
        </li>
        <li className="mr-3">
          <Link to="/blogs" className="text-gray-500">
            Blogs
          </Link>
        </li>
        <li className="mr-3">
          <Link to="/products" className="text-gray-500">
            Products
          </Link>
        </li>
        <li className="mr-3">
          <Link to="/protected" className="text-gray-500">
            Protected
          </Link>
        </li>
      </ul>
      <ul className="flex justify-start items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={user?.image ?? "/user.png"} />
              <AvatarFallback>{user?.firstName ?? ""}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {user?.id ? (
              <Link to="/logout">
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </Link>
            ) : (
              <Link to="/login">
                <DropdownMenuItem>Login</DropdownMenuItem>
              </Link>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </ul>
    </nav>
  );
}

Navbar.displayName = "Components:Navbar";
