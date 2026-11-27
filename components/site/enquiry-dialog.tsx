"use client";

import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { toast } from "sonner";
import { Icon } from "@/components/icons";
import { Field, TextArea, TextInput } from "@/components/ui/field";
import { ButtonLink, buttonClass, type ButtonSize, type ButtonVariant } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

const timelines = ["ASAP", "In 2–4 weeks", "Just exploring"] as const;
type Timeline = (typeof timelines)[number];
type Step = "focus" | "contact" | "done";

export type EnquiryDialogProps = {
  serviceTitle: string;
  items?: string[];
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  defaultName?: string;
  defaultEmail?: string;
  intro?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Two-step "start a project" dialog. Turns the old service → contact page →
 * long form path into a few taps on the page the visitor is already reading.
 */
export function ServiceEnquiryDialog({
  serviceTitle,
  items = [],
  label = "Get started",
  variant = "primary",
  size = "md",
  className,
  defaultName = "",
  defaultEmail = "",
  intro,
}: EnquiryDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("focus");
  const [focuses, setFocuses] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<Timeline>("ASAP");
  const [pending, setPending] = useState(false);
  const [sentName, setSentName] = useState("");

  const shortlist = items.slice(0, 8);
  const progress = step === "focus" ? 1 : 2;

  function reset() {
    setStep("focus");
    setFocuses([]);
    setTimeline("ASAP");
    setPending(false);
    setSentName("");
  }

  function toggleFocus(item: string) {
    setFocuses((current) => {
      if (current.includes(item)) return current.filter((value) => value !== item);
      if (current.length >= 4) return current;
      return [...current, item];
    });
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const note = String(data.get("note") ?? "").trim();

    if (!name) {
      toast.error("Please add your name so we know who to reply to.");
      return;
    }
    if (!isEmail(email)) {
      toast.error("That email does not look right. Double-check it?");
      return;
    }

    const message = [
      `Service: ${serviceTitle}`,
      focuses.length ? `Interested in: ${focuses.join(", ")}` : "Interested in: not decided yet",
      `Timeline: ${timeline}`,
      note ? `Note: ${note}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    setPending(true);
    const toastId = toast.loading("Sending your request…");

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject: `${serviceTitle} — new enquiry`, message }),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "We could not send your request.");

      setSentName(name);
      setStep("done");
      form.reset();
      toast.success("Request received. We reply within one working day.", { id: toastId });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.", {
        id: toastId,
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog.Root
      onOpenChange={(next) => {
        setOpen(next);
        if (next) reset();
      }}
      open={open}
    >
      <Dialog.Trigger className={cn(buttonClass(variant, size, className), "cursor-pointer")}>
        {label}
        <Icon name="arrow-up-right" size={size === "lg" ? 17 : 15} />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[70] bg-ink/50 backdrop-blur-[2px] transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 z-[71] max-h-[92vh] w-[calc(100vw-1.5rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-line bg-white p-5 shadow-[0_40px_90px_-40px_rgba(10,12,18,0.6)] transition-[opacity,scale] duration-200 outline-none data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="eyebrow flex items-center gap-2 text-brand">
                <span className="inline-block size-1.5 rounded-full bg-brand" />
                {step === "done" ? "Sent" : "Start a project"}
              </p>
              <Dialog.Title className="mt-2.5 text-balance text-[1.22rem] font-semibold leading-snug tracking-[-0.025em] text-ink">
                {step === "done" ? "Request received." : step === "contact" ? "Where should we reply?" : `Let’s scope ${serviceTitle}.`}
              </Dialog.Title>
              <Dialog.Description className="mt-1.5 text-[0.83rem] leading-6 text-ink/55">
                {step === "done"
                  ? "You will hear from a strategist within one working day with scope, timeline and pricing."
                  : step === "contact"
                    ? "Two lines are enough — no long form, no account needed."
                    : intro ?? "Tap what matters most. We will shape the scope around it."}
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Close"
              className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full border border-line text-ink/45 transition-colors hover:border-ink/30 hover:text-ink"
            >
              <Icon name="close" size={15} />
            </Dialog.Close>
          </div>

          {step !== "done" ? (
            <div className="mt-5 flex items-center gap-1.5" aria-hidden="true">
              {[0, 1].map((index) => (
                <span
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors duration-200",
                    index < progress ? "bg-ink" : "bg-line",
                  )}
                  key={index}
                />
              ))}
            </div>
          ) : null}

          {step === "focus" ? (
            <div className="mt-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink/40">
                  What matters most
                </p>
                <span className="text-[0.66rem] font-medium text-ink/35">{focuses.length} of 4</span>
              </div>

              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {shortlist.map((item) => {
                  const selected = focuses.includes(item);
                  const blocked = !selected && focuses.length >= 4;
                  return (
                    <button
                      aria-pressed={selected}
                      className={cn(
                        "inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.76rem] font-medium transition-colors duration-150",
                        selected
                          ? "border-ink bg-ink text-paper"
                          : "border-line bg-white text-ink/65 hover:border-ink/35 hover:text-ink",
                        blocked && "cursor-not-allowed opacity-40 hover:border-line hover:text-ink/65",
                      )}
                      disabled={blocked}
                      key={item}
                      onClick={() => toggleFocus(item)}
                      type="button"
                    >
                      {selected ? <Icon name="check" size={12} strokeWidth={2.6} /> : null}
                      {item}
                    </button>
                  );
                })}
              </div>

              <p className="mt-5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink/40">
                When do you want to start
              </p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {timelines.map((option) => {
                  const selected = timeline === option;
                  return (
                    <button
                      aria-pressed={selected}
                      className={cn(
                        "cursor-pointer rounded-full border px-3 py-1.5 text-[0.76rem] font-medium transition-colors duration-150",
                        selected
                          ? "border-brand/25 bg-brand-soft text-brand"
                          : "border-line bg-white text-ink/65 hover:border-ink/35 hover:text-ink",
                      )}
                      key={option}
                      onClick={() => setTimeline(option)}
                      type="button"
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4">
                <p className="flex items-center gap-1.5 text-[0.67rem] leading-4 text-ink/40">
                  <Icon name="lock" size={12} />
                  Free · no obligation
                </p>
                <button
                  className={buttonClass("primary", "md")}
                  onClick={() => setStep("contact")}
                  type="button"
                >
                  Continue
                  <Icon name="arrow-right" size={15} />
                </button>
              </div>
            </div>
          ) : null}

          {step === "contact" ? (
            <form className="mt-5" onSubmit={submit}>
              <div className="grid gap-3.5 sm:grid-cols-2">
                <Field label="Your name" required>
                  <TextInput autoComplete="name" defaultValue={defaultName} name="name" placeholder="Full name" required />
                </Field>
                <Field label="Email" required>
                  <TextInput
                    autoComplete="email"
                    defaultValue={defaultEmail}
                    name="email"
                    placeholder="you@company.com"
                    required
                    type="email"
                  />
                </Field>
                <Field hint="Optional — for quick follow-ups." label="Phone / WhatsApp">
                  <TextInput autoComplete="tel" name="phone" placeholder="+91" type="tel" />
                </Field>
                <Field label="Business name">
                  <TextInput name="company" placeholder="e.g. Aarogya Clinic" />
                </Field>
                <Field className="sm:col-span-2" label="Anything we should know?">
                  <TextArea
                    name="note"
                    placeholder="Current website, the problem, or the outcome you want."
                    rows={3}
                  />
                </Field>
              </div>

              {focuses.length ? (
                <p className="mt-4 rounded-lg bg-paper px-3 py-2 text-[0.7rem] leading-5 text-ink/50">
                  We will focus on <span className="font-semibold text-ink/75">{focuses.join(", ")}</span>
                  {timeline === "Just exploring" ? " — and keep it advisory." : `, starting ${timeline.toLowerCase()}.`}
                </p>
              ) : null}

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                <button
                  className="inline-flex cursor-pointer items-center gap-1.5 text-[0.75rem] font-semibold text-ink/45 transition-colors hover:text-ink"
                  onClick={() => setStep("focus")}
                  type="button"
                >
                  <Icon className="rotate-180" name="arrow-right" size={13} />
                  Back
                </button>
                <button className={buttonClass("primary", "md")} disabled={pending} type="submit">
                  {pending ? "Sending…" : "Send request"}
                  <Icon name="arrow-up-right" size={15} />
                </button>
              </div>
            </form>
          ) : null}

          {step === "done" ? (
            <div className="mt-5">
              <span className="grid size-12 place-items-center rounded-full bg-lime text-ink">
                <Icon name="check" size={24} strokeWidth={2.3} />
              </span>
              <p className="mt-4 text-[0.9rem] leading-7 text-ink/65">
                Thanks{sentName ? `, ${sentName.split(" ")[0]}` : ""} — we have your details
                {focuses.length ? ` and the ${focuses.length === 1 ? "topic" : "topics"} you picked` : ""}. A
                strategist will reply within one working day.
              </p>

              {focuses.length ? (
                <div className="mt-4 rounded-xl border border-line bg-paper p-3.5">
                  <p className="text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-ink/40">You asked about</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {focuses.map((item) => (
                      <span
                        className="rounded-full border border-line bg-white px-2.5 py-1 text-[0.72rem] font-medium text-ink/65"
                        key={item}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <ButtonLink className="w-full sm:w-auto" href="/book" variant="dark">
                  Book a 20-min call
                  <Icon name="arrow-right" size={15} />
                </ButtonLink>
                <Dialog.Close className={cn(buttonClass("outline", "md"), "w-full cursor-pointer sm:w-auto")}>
                  Close
                </Dialog.Close>
              </div>
            </div>
          ) : null}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
