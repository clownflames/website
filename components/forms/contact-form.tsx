"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { Field, Select, TextArea, TextInput } from "@/components/ui/field";
import { buttonClass } from "@/components/ui/button-link";
import { services } from "@/lib/content";

export function ContactForm({ defaultName = "", defaultEmail = "" }: { defaultName?: string; defaultEmail?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error ?? "We could not send your message.");
      setStatus("done");
      form.reset();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-line bg-white p-8 sm:p-10">
        <span className="grid size-12 place-items-center rounded-full bg-lime text-ink">
          <Icon name="check" size={24} strokeWidth={2.2} />
        </span>
        <h2 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-ink">Message sent.</h2>
        <p className="mt-2 max-w-sm text-sm leading-7 text-ink/55">
          Thanks for reaching out. A strategist will reply within one working day — usually much
          sooner. If it is urgent, email us directly at{" "}
          <a className="font-medium text-brand" href="mailto:hello@erstiantech.com">
            hello@erstiantech.com
          </a>
          .
        </p>
        <button className={buttonClass("outline", "md", "mt-6")} onClick={() => setStatus("idle")} type="button">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="rounded-2xl border border-line bg-white p-6 sm:p-8" onSubmit={onSubmit}>
      <h2 className="text-lg font-semibold tracking-[-0.02em] text-ink">Tell us about the project</h2>
      <p className="mt-1 text-xs text-ink/45">A few lines are enough. We will ask the rest on the call.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Your name" required>
          <TextInput defaultValue={defaultName} name="name" placeholder="Full name" required />
        </Field>
        <Field label="Email" required>
          <TextInput defaultValue={defaultEmail} name="email" placeholder="you@company.com" required type="email" />
        </Field>
        <Field label="Phone / WhatsApp">
          <TextInput name="phone" placeholder="+91" type="tel" />
        </Field>
        <Field label="Company">
          <TextInput name="company" placeholder="Business name" />
        </Field>
        <Field className="sm:col-span-2" label="What do you need help with?">
          <Select defaultValue="" name="subject">
            <option value="">Not sure yet</option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="Something else">Something else</option>
          </Select>
        </Field>
        <Field className="sm:col-span-2" label="Your message" required>
          <TextArea name="message" placeholder="What are you trying to achieve? What is not working today?" required rows={5} />
        </Field>
      </div>

      {status === "error" ? (
        <p className="mt-4 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-xs text-destructive">
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button className={buttonClass("dark", "lg")} disabled={status === "sending"} type="submit">
          {status === "sending" ? "Sending…" : "Send message"}
          <Icon name="arrow-up-right" size={17} />
        </button>
        <p className="flex items-center gap-1.5 text-[0.68rem] text-ink/40">
          <Icon name="clock" size={12} />
          Reply within one working day
        </p>
      </div>
    </form>
  );
}
