"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginForm } from "../types/types";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dummyEmail = "test@gmail.com";
    const dummyPass = "123456";

    if (form.email === dummyEmail && form.password === dummyPass) {
      login();
      localStorage.setItem("auth", "true");
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-4">
      <Card className="w-full max-w-sm shadow-xl rounded-xl bg-white">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-semibold text-gray-800">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="grid gap-3">
              <Label htmlFor="email" className="text-lg font-medium text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
                className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="password" className="text-lg font-medium text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
                className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {error && (
              <Alert variant="destructive" className="border-red-600 bg-red-100 text-red-800">
                <AlertTitle className="font-semibold">Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow-lg transition duration-200"
              type="submit"
            >
              Login
            </Button>

            <div className="text-center mt-4 text-sm text-gray-600">
              {" "}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
