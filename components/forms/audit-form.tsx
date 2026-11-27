"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Icon } from "@/components/icons";
import { Field, Select, TextArea, TextInput } from "@/components/ui/field";
import { buttonClass } from "@/components/ui/button-link";
import { services } from "@/lib/content";

type Status = "idle" | "sending" | "done";

export function AuditForm({
  defaultName = "",
  defaultEmail = "",
  signedIn = false,
}: {
  defaultName?: string;
  defaultEmail?: string;
  signedIn?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const response = await fetch("/api/audits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { id?: string; error?: string };
      if (!response.ok) throw new Error(data.error ?? "We could not submit your request.");
      setSubmittedEmail(String(payload.email ?? ""));
      setReference(data.id ? data.id.slice(0, 8).toUpperCase() : "");
      setStatus("done");
      form.reset();
      toast.success("Website received. Your audit lands within 48 hours.");
    } catch (submitError) {
      setStatus("idle");
      toast.error(submitError instanceof Error ? submitError.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <div className="flex h-full flex-col items-start justify-center rounded-2xl border border-line bg-white p-8 sm:p-10">
        <span className="grid size-14 place-items-center rounded-full bg-lime text-ink">
          <Icon name="check" size={28} strokeWidth={2.2} />
        </span>
        <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-ink">Request received.</h2>
        <p className="mt-3 max-w-md text-sm leading-7 text-ink/55">
          Our team will review your website manually and reply to{" "}
          <span className="font-medium text-ink">{submittedEmail}</span> within 48 hours with a scored
          snapshot and prioritised growth ideas.
        </p>
        {reference ? (
          <p className="mt-4 rounded-lg bg-paper px-3 py-2 text-xs text-ink/50">
            Reference: <span className="font-mono font-semibold text-ink">{reference}</span>
          </p>
        ) : null}
        <div className="mt-7 flex flex-wrap gap-3">
          <Link className={buttonClass("dark", "md")} href={signedIn ? "/dashboard/audits" : "/sign-up"}>
            {signedIn ? "Track my request" : "Create an account to track it"}
            <Icon name="arrow-up-right" size={16} />
          </Link>
          <Link className={buttonClass("outline", "md")} href="/">
            Back to home
          </Link>
        </div>
        <p className="mt-6 text-xs leading-5 text-ink/40">
          Need to add a detail? Write to{" "}
          <a className="underline hover:text-brand" href="mailto:hello@erstiantech.com">
            hello@erstiantech.com
          </a>{" "}
          with your reference.
        </p>
      </div>
    );
  }

  return (
    <form className="rounded-2xl border border-line bg-white p-6 sm:p-8" id="audit-form" onSubmit={onSubmit}>
      <div className="flex items-start justify-between gap-4 border-b border-line pb-5">
        <div>
          <h2 className="text-lg font-semibold tracking-[-0.02em] text-ink">Request your free audit</h2>
          <p className="mt-1 text-xs text-ink/45">Takes about two minutes. No payment details needed.</p>
        </div>
        <span className="rounded-full bg-lime px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-ink">
          Free
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Business name" required>
          <TextInput name="businessName" placeholder="e.g. Aarogya Clinic" required />
        </Field>
        <Field label="Website or social link" required>
          <TextInput name="website" placeholder="https://yourbusiness.com" required type="text" />
        </Field>
        <Field label="What do you need help with?">
          <Select defaultValue="" name="category">
            <option value="">Not sure yet — advise me</option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="City you serve">
          <TextInput name="city" placeholder="e.g. Bengaluru" />
        </Field>
        <Field label="Your name" required>
          <TextInput defaultValue={defaultName} name="contactName" placeholder="Full name" required />
        </Field>
        <Field label="Email" required>
          <TextInput defaultValue={defaultEmail} name="email" placeholder="you@business.com" required type="email" />
        </Field>
        <Field label="WhatsApp number" hint="Optional, but faster for follow-ups.">
          <TextInput name="phone" placeholder="+91" type="tel" />
        </Field>
        <Field label="What does success look like?" className="sm:col-span-1">
          <TextInput name="goals" placeholder="More bookings, more orders, better leads…" />
        </Field>
        <Field className="sm:col-span-2" label="Anything we should know?">
          <TextArea
            name="challenges"
            placeholder="Current website, what is not working, campaigns you have tried, competitors you admire…"
            rows={4}
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button className={buttonClass("primary", "lg")} disabled={status === "sending"} type="submit">
          {status === "sending" ? "Sending…" : "Send my website for review"}
          <Icon name="arrow-up-right" size={17} />
        </button>
        <p className="flex items-center gap-1.5 text-[0.68rem] leading-4 text-ink/40">
          <Icon name="lock" size={12} />
          Your details stay private. No spam, ever.
        </p>
      </div>
    </form>
  );
}
