import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SignInForm } from "@/components/forms/auth-forms";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = { title: "Sign in" };

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const user = await getCurrentUser();
  const { next } = await searchParams;
  if (user) redirect(next && next.startsWith("/") ? next : "/dashboard");

  return (
    <div>
      <p className="eyebrow flex items-center gap-2 text-brand">
        <span className="inline-block size-1.5 rounded-full bg-brand" />
        Welcome back
      </p>
      <h1 className="mt-4 text-[2rem] font-semibold leading-tight tracking-[-0.035em] text-ink">Sign in to your workspace.</h1>
      <p className="mt-2 mb-7 text-sm leading-6 text-ink/50">
        See your businesses, audit requests, bookings and enquiries.
      </p>
      <SignInForm next={next} />
    </div>
  );
}
