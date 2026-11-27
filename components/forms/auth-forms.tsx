"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Icon } from "@/components/icons";
import { Field, TextInput } from "@/components/ui/field";
import { buttonClass } from "@/components/ui/button-link";
import { authClient } from "@/lib/auth-client";

function useAuthSubmit() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  function finish(next: string) {
    const target = next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
    router.push(target);
    router.refresh();
  }

  return { pending, setPending, finish };
}

export function SignInForm({ next = "/dashboard" }: { next?: string }) {
  const { pending, setPending, finish } = useAuthSubmit();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setPending(true);
    const { error: authError } = await authClient.signIn.email({
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
    });
    if (authError) {
      toast.error(authError.message ?? "Those details did not match an account.");
      setPending(false);
      return;
    }
    toast.success("Signed in. Welcome back.");
    finish(next);
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Field label="Email" required>
        <TextInput autoComplete="email" name="email" placeholder="you@business.com" required type="email" />
      </Field>
      <Field label="Password" required>
        <TextInput autoComplete="current-password" name="password" placeholder="Your password" required type="password" />
      </Field>

      <button className={buttonClass("dark", "lg", "w-full")} disabled={pending} type="submit">
        {pending ? "Signing in…" : "Sign in"}
        <Icon name="arrow-right" size={16} />
      </button>

      <p className="text-center text-xs text-ink/45">
        New here?{" "}
        <Link className="font-semibold text-brand hover:underline" href={"/sign-up?next=" + encodeURIComponent(next)}>
          Create a free account
        </Link>
      </p>
    </form>
  );
}

export function SignUpForm({ next = "/dashboard" }: { next?: string }) {
  const { pending, setPending, finish } = useAuthSubmit();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirmPassword") ?? "");

    if (password.length < 8) {
      toast.error("Use at least 8 characters for your password.");
      return;
    }
    if (password !== confirm) {
      toast.error("The two passwords do not match.");
      return;
    }

    setPending(true);
    const { error: authError } = await authClient.signUp.email({
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      password,
    });
    if (authError) {
      toast.error(authError.message ?? "We could not create your account.");
      setPending(false);
      return;
    }
    toast.success("Account created. Welcome to Erstian.");
    finish(next);
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Field label="Your name" required>
        <TextInput autoComplete="name" name="name" placeholder="Full name" required />
      </Field>
      <Field label="Work email" required>
        <TextInput autoComplete="email" name="email" placeholder="you@business.com" required type="email" />
      </Field>
      <Field label="Password" hint="At least 8 characters." required>
        <TextInput autoComplete="new-password" name="password" placeholder="Create a password" required type="password" />
      </Field>
      <Field label="Confirm password" required>
        <TextInput autoComplete="new-password" name="confirmPassword" placeholder="Repeat password" required type="password" />
      </Field>

      <button className={buttonClass("primary", "lg", "w-full")} disabled={pending} type="submit">
        {pending ? "Creating account…" : "Create free account"}
        <Icon name="arrow-right" size={16} />
      </button>

      <p className="text-center text-[0.68rem] leading-5 text-ink/40">
        By continuing you agree to be contacted about your requests. We never sell your data.
      </p>
      <p className="text-center text-xs text-ink/45">
        Already have an account?{" "}
        <Link className="font-semibold text-brand hover:underline" href={"/sign-in?next=" + encodeURIComponent(next)}>
          Sign in
        </Link>
      </p>
    </form>
  );
}
