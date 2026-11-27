"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icons";
import { Field, Select, TextArea, TextInput } from "@/components/ui/field";
import { buttonClass } from "@/components/ui/button-link";
import { services } from "@/lib/content";

export function BusinessForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/businesses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error ?? "Could not add that business.");
      form.reset();
      setStatus("done");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <form className="rounded-2xl border border-line bg-white p-5 sm:p-6" onSubmit={onSubmit}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[1rem] font-semibold text-ink">Add a business</h2>
          <p className="mt-0.5 text-[0.72rem] text-ink/40">It takes less than a minute.</p>
        </div>
        <span className="grid size-8 place-items-center rounded-lg bg-brand-soft text-brand">
          <Icon name="plus" size={16} />
        </span>
      </div>

      <div className="mt-4 space-y-3.5">
        <Field label="Business name" required>
          <TextInput name="name" placeholder="e.g. Aarogya Clinic" required />
        </Field>
        <Field label="Website">
          <TextInput name="website" placeholder="yourbusiness.com" />
        </Field>
        <div className="grid gap-3.5 sm:grid-cols-2">
          <Field label="Category">
            <Select defaultValue="" name="category">
              <option value="">Select a category</option>
              {services.map((service) => (
                <option key={service.slug} value={service.title}>
                  {service.title}
                </option>
              ))}
              <option value="Other">Other</option>
            </Select>
          </Field>
          <Field label="City">
            <TextInput name="city" placeholder="e.g. Bengaluru" />
          </Field>
        </div>
        <Field label="What does it do?">
          <TextArea name="description" placeholder="A line or two about the business and its customers." rows={2} />
        </Field>
        <Field label="Primary goal">
          <TextInput name="goals" placeholder="e.g. 30 more bookings a month" />
        </Field>
      </div>

      {status === "done" ? (
        <p className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-[0.72rem] font-medium text-emerald-700">
          <Icon name="check" size={12} />
          Business added.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mt-4 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-[0.72rem] text-destructive">
          {error}
        </p>
      ) : null}

      <button className={buttonClass("dark", "md", "mt-5 w-full")} disabled={status === "sending"} type="submit">
        {status === "sending" ? "Adding…" : "Add business"}
        <Icon name="arrow-right" size={15} />
      </button>
    </form>
  );
}

export function DeleteBusinessButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function onDelete() {
    if (!window.confirm("Delete this business from your workspace?")) return;
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/businesses/" + id, { method: "DELETE" });
      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Could not delete the business.");
      }
      router.refresh();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Something went wrong.");
      setPending(false);
    }
  }

  return (
    <span className="inline-flex flex-col items-end">
      <button
        className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[0.7rem] font-medium text-ink/35 transition-colors hover:bg-destructive/5 hover:text-destructive disabled:opacity-50"
        disabled={pending}
        onClick={onDelete}
        type="button"
      >
        <Icon name="trash" size={12} />
        {pending ? "Removing…" : "Remove"}
      </button>
      {error ? <span className="text-[0.62rem] text-destructive">{error}</span> : null}
    </span>
  );
}
