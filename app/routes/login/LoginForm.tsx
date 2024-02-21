import * as React from "react";
import { Form, useActionData } from "@remix-run/react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { action } from "~/routes/login/route";

const LoginForm: React.FC = () => {
  const actionData = useActionData<typeof action>();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Sign in with an existing account</CardDescription>
      </CardHeader>
      <CardContent>
        {actionData?.errorMessage ? (
          <span className="text-red-500 mb-2">{actionData.errorMessage}</span>
        ) : null}
        <Form
          id="login-form"
          className="grid w-[400px] items-center gap-1.5"
          method="post"
        >
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            defaultValue="kminchelle"
          />

          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            defaultValue="0lelplR"
          />

          <Button type="submit">Login</Button>
        </Form>
      </CardContent>
    </Card>
  );
};

LoginForm.displayName = "Components:LoginForm";

export default LoginForm;
