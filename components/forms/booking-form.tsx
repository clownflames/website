"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Icon } from "@/components/icons";
import { Field, Select, TextArea, TextInput } from "@/components/ui/field";
import { buttonClass } from "@/components/ui/button-link";
import { services } from "@/lib/content";

const slots = ["10:00 – 11:00", "11:30 – 12:30", "14:00 – 15:00", "16:00 – 17:00", "17:30 – 18:30"];

export function BookingForm({ defaultName = "", defaultEmail = "" }: { defaultName?: string; defaultEmail?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error ?? "We could not book that slot.");
      setStatus("done");
      form.reset();
      toast.success("Slot requested. Confirmation lands within one working day.");
    } catch (submitError) {
      setStatus("idle");
      toast.error(submitError instanceof Error ? submitError.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-line bg-white p-8 sm:p-10">
        <span className="grid size-12 place-items-center rounded-full bg-lime text-ink">
          <Icon name="calendar" size={24} />
        </span>
        <h2 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-ink">Slot requested.</h2>
        <p className="mt-2 max-w-sm text-sm leading-7 text-ink/55">
          We have your preferred time. You will get a confirmation (with a meeting link) within one
          working day. Slots are held for 24 hours.
        </p>
        <button className={buttonClass("outline", "md", "mt-6")} onClick={() => setStatus("idle")} type="button">
          Book another slot
        </button>
      </div>
    );
  }

  return (
    <form className="rounded-2xl border border-line bg-white p-6 sm:p-8" onSubmit={onSubmit}>
      <h2 className="text-lg font-semibold tracking-[-0.02em] text-ink">Book a 20-minute intro call</h2>
      <p className="mt-1 text-xs text-ink/45">No pitch deck. We will ask what you need and tell you if we can help.</p>

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
        <Field label="Interested in">
          <Select defaultValue="" name="service">
            <option value="">General consultation</option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Preferred date" required>
          <TextInput min={new Date().toISOString().slice(0, 10)} name="preferredDate" required type="date" />
        </Field>
        <Field label="Preferred time" required>
          <Select defaultValue={slots[0]} name="preferredTime" required>
            {slots.map((slot) => (
              <option key={slot} value={slot}>
                {slot} IST
              </option>
            ))}
          </Select>
        </Field>
        <Field className="sm:col-span-2" label="What should we prepare for?">
          <TextArea name="message" placeholder="A quick line about your business and what you want to fix." rows={3} />
        </Field>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button className={buttonClass("primary", "lg")} disabled={status === "sending"} type="submit">
          {status === "sending" ? "Requesting…" : "Request this slot"}
          <Icon name="arrow-up-right" size={17} />
        </button>
        <p className="flex items-center gap-1.5 text-[0.68rem] text-ink/40">
          <Icon name="phone" size={12} />
          Calls on Google Meet or phone
        </p>
      </div>
    </form>
  );
}
