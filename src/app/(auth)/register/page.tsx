"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { registerSchema, RegisterInput } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "CUSTOMER" },
  });

  const selectedRole = watch("role");

  async function onSubmit(data: RegisterInput) {
    setServerError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "register", ...data }),
    });
    const json = await res.json();
    if (!res.ok) {
      setServerError(json.error || "Something went wrong");
      return;
    }
    if (data.role === "PROVIDER") {
      window.location.href = "/onboarding";
    } else {
      window.location.href = "/dashboard";
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-100 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <h1 className="mt-4 text-2xl font-display font-semibold text-ocean-900">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Join the global transportation marketplace
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 rounded-2xl bg-white p-8 shadow-sm border border-gray-100"
        >
          {/* Role selector */}
          <div className="flex gap-3">
            {(["CUSTOMER", "PROVIDER"] as const).map((role) => (
              <label
                key={role}
                className={`flex-1 cursor-pointer rounded-lg border-2 p-3 text-center text-sm font-medium transition-all ${
                  selectedRole === role
                    ? "border-ocean-600 bg-ocean-50 text-ocean-700"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  value={role}
                  {...register("role")}
                  className="sr-only"
                />
                {role === "CUSTOMER"
                  ? "I need transport"
                  : "I provide transport"}
              </label>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="First name"
              placeholder="Jane"
              error={errors.firstName?.message}
              {...register("firstName")}
            />
            <Input
              label="Last name"
              placeholder="Doe"
              error={errors.lastName?.message}
              {...register("lastName")}
            />
          </div>

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
            placeholder="Min 8 chars, 1 uppercase, 1 number"
            error={errors.password?.message}
            {...register("password")}
          />

          <Input
            label="Confirm password"
            type="password"
            placeholder="Re-enter your password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <label className="flex items-start gap-2 text-xs text-gray-500">
            <input type="checkbox" required className="accent-ocean-600 mt-0.5" />
            <span>
              I agree to the{" "}
              <Link href="/terms" target="_blank" className="text-ocean-600 underline hover:text-ocean-700">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" target="_blank" className="text-ocean-600 underline hover:text-ocean-700">
                Privacy Policy
              </Link>
            </span>
          </label>

          {serverError && (
            <p className="text-sm text-red-500 text-center">{serverError}</p>
          )}

          <Button type="submit" loading={isSubmitting} className="w-full" size="lg">
            Create account
          </Button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-ocean-600 hover:text-ocean-700"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
