"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { loginSchema, LoginInput } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginInput) {
    setServerError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "login", ...data }),
    });
    const json = await res.json();
    if (!res.ok) {
      setServerError(json.error || "Invalid credentials");
      return;
    }
    window.location.href = "/dashboard";
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F5F7] px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <h1 className="mt-4 text-2xl font-display font-bold tracking-tight text-[#1D1D1F]">
            Welcome back
          </h1>
          <p className="mt-1 text-[14px] text-[#6E6E73]">
            Sign in to your account
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 rounded-3xl bg-white/80 backdrop-blur-xl p-8 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60"
        >
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password")}
          />

          {serverError && (
            <p className="text-[12px] text-[#FF3B30] text-center">{serverError}</p>
          )}

          <Button type="submit" loading={isSubmitting} className="w-full" size="lg">
            Sign in
          </Button>

          <p className="text-center text-[14px] text-[#6E6E73]">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-[#007AFF] hover:text-[#0055D4]"
            >
              Create one
            </Link>
          </p>
        </form>

        <p className="text-center text-[11px] text-[#86868B]">
          <Link href="/terms" className="hover:text-[#007AFF]">Terms</Link>
          {" "}&middot;{" "}
          <Link href="/privacy" className="hover:text-[#007AFF]">Privacy</Link>
        </p>
      </div>
    </div>
  );
}
