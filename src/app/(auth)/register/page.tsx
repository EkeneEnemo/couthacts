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
    <div className="flex min-h-screen items-center justify-center bg-[#F5F5F7] px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <h1 className="mt-4 text-2xl font-display font-bold tracking-tight text-[#1D1D1F]">
            Create your account
          </h1>
          <p className="mt-1 text-[14px] text-[#6E6E73]">
            Join the global transportation platform
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 rounded-3xl bg-white/80 backdrop-blur-xl p-8 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60"
        >
          {/* Role selector */}
          <div className="flex gap-3">
            {(["CUSTOMER", "PROVIDER"] as const).map((role) => (
              <label
                key={role}
                className={`flex-1 cursor-pointer rounded-xl border-2 p-3 text-center text-[13px] font-medium transition-all ${
                  selectedRole === role
                    ? "border-[#007AFF] bg-[#007AFF]/5 text-[#007AFF]"
                    : "border-[#E8E8ED] text-[#6E6E73] hover:border-[#86868B]"
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

          <label className="flex items-start gap-2 text-[12px] text-[#6E6E73]">
            <input type="checkbox" required className="accent-[#007AFF] mt-0.5" />
            <span>
              I agree to the{" "}
              <Link href="/terms" target="_blank" className="text-[#007AFF] underline hover:text-[#0055D4]">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" target="_blank" className="text-[#007AFF] underline hover:text-[#0055D4]">
                Privacy Policy
              </Link>
            </span>
          </label>

          {serverError && (
            <p className="text-[12px] text-[#FF3B30] text-center">{serverError}</p>
          )}

          <Button type="submit" loading={isSubmitting} className="w-full" size="lg">
            Create account
          </Button>

          <p className="text-center text-[14px] text-[#6E6E73]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-[#007AFF] hover:text-[#0055D4]"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
