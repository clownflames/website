import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SignUpForm } from "@/components/forms/auth-forms";
import { Icon } from "@/components/icons";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = { title: "Create an account" };

export default async function SignUpPage({
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
        Free account
      </p>
      <h1 className="mt-4 text-[2rem] font-semibold leading-tight tracking-[-0.035em] text-ink">Create your workspace.</h1>
      <p className="mt-2 mb-6 text-sm leading-6 text-ink/50">
        Add your businesses, request audits and keep every conversation in one place.
      </p>
      <div className="mb-6 flex flex-wrap gap-3 rounded-xl border border-line bg-cream/50 px-4 py-3 text-[0.7rem] text-ink/50">
        <span className="inline-flex items-center gap-1.5">
          <Icon className="text-brand" name="check" size={11} strokeWidth={2.4} /> Free forever
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Icon className="text-brand" name="check" size={11} strokeWidth={2.4} /> No card needed
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Icon className="text-brand" name="check" size={11} strokeWidth={2.4} /> 48-hour audit reply
        </span>
      </div>
      <SignUpForm next={next} />
    </div>
  );
}
