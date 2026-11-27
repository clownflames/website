"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Icon } from "@/components/icons";
import { Field, Select, TextArea, TextInput } from "@/components/ui/field";
import { buttonClass } from "@/components/ui/button-link";

export function ReviewForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error ?? "We could not submit your review.");
      setStatus("done");
      form.reset();
      toast.success("Review submitted. It appears once the team verifies it.");
    } catch (submitError) {
      setStatus("idle");
      toast.error(submitError instanceof Error ? submitError.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-line bg-white p-8">
        <span className="grid size-12 place-items-center rounded-full bg-lime text-ink">
          <Icon name="star" size={22} />
        </span>
        <h2 className="mt-5 text-xl font-semibold text-ink">Thank you.</h2>
        <p className="mt-2 text-sm leading-7 text-ink/55">
          Your review has been submitted and will appear here once the team verifies it — usually
          within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form className="rounded-2xl border border-line bg-white p-6 sm:p-8" onSubmit={onSubmit}>
      <h2 className="text-lg font-semibold tracking-[-0.02em] text-ink">Worked with us? Share your experience.</h2>
      <p className="mt-1 text-xs text-ink/45">Reviews are verified by our team before they are published.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Your name" required>
          <TextInput name="authorName" placeholder="Full name" required />
        </Field>
        <Field label="Company">
          <TextInput name="company" placeholder="Business name" />
        </Field>
        <Field label="Email" hint="Not published — only used to verify the review.">
          <TextInput name="email" placeholder="you@company.com" type="email" />
        </Field>
        <Field label="Rating">
          <Select defaultValue="5" name="rating">
            <option value="5">5 — Excellent</option>
            <option value="4">4 — Very good</option>
            <option value="3">3 — Good</option>
            <option value="2">2 — Needs work</option>
            <option value="1">1 — Poor</option>
          </Select>
        </Field>
        <Field className="sm:col-span-2" label="Your review" required>
          <TextArea name="message" placeholder="What did we build, and what changed for your business?" required rows={4} />
        </Field>
      </div>
      <button className={buttonClass("dark", "lg", "mt-6")} disabled={status === "sending"} type="submit">
        {status === "sending" ? "Submitting…" : "Submit review"}
        <Icon name="arrow-up-right" size={16} />
      </button>
    </form>
  );
}
