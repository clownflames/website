"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icons";
import { Field, Select, TextArea, TextInput } from "@/components/ui/field";
import { buttonClass } from "@/components/ui/button-link";
import { slugify } from "@/lib/format";

async function send(endpoint: string, method: string, payload?: unknown) {
  const response = await fetch(endpoint, {
    method,
    headers: payload ? { "Content-Type": "application/json" } : undefined,
    body: payload ? JSON.stringify(payload) : undefined,
  });
  const data = (await response.json().catch(() => ({}))) as { error?: string };
  if (!response.ok) throw new Error(data.error ?? "That action did not go through.");
  return data;
}

export function StatusSelect({
  endpoint,
  id,
  value,
  options,
}: {
  endpoint: string;
  id: string;
  value: string;
  options: { value: string; label: string }[];
}) {
  const router = useRouter();
  const [current, setCurrent] = useState(value);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  return (
    <span className="inline-flex flex-col gap-1">
      <select
        className={
          "h-8 rounded-lg border border-line bg-white px-2 text-[0.72rem] font-medium text-ink/70 outline-none focus:border-ink/40 disabled:opacity-50"
        }
        disabled={pending}
        onChange={async (event) => {
          const next = event.target.value;
          const previous = current;
          setCurrent(next);
          setPending(true);
          setError("");
          try {
            await send(endpoint + "/" + id, "PATCH", { status: next });
            router.refresh();
          } catch (updateError) {
            setCurrent(previous);
            setError(updateError instanceof Error ? updateError.message : "Update failed.");
          } finally {
            setPending(false);
          }
        }}
        value={current}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <span className="text-[0.62rem] text-destructive">{error}</span> : null}
    </span>
  );
}

export function PublishToggle({
  endpoint,
  id,
  published,
  labelOn = "Published",
  labelOff = "Draft",
}: {
  endpoint: string;
  id: string;
  published: boolean;
  labelOn?: string;
  labelOff?: string;
}) {
  const router = useRouter();
  const [current, setCurrent] = useState(published);
  const [pending, setPending] = useState(false);

  return (
    <button
      className={
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold transition-colors " +
        (current
          ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          : "border-line bg-cream text-ink/50 hover:text-ink")
      }
      disabled={pending}
      onClick={async () => {
        setPending(true);
        try {
          await send(endpoint + "/" + id, "PATCH", { published: !current });
          setCurrent(!current);
          router.refresh();
        } catch {
          // keep the old state if the request failed
        } finally {
          setPending(false);
        }
      }}
      type="button"
    >
      <Icon name={current ? "eye" : "eye"} size={11} />
      {pending ? "Saving…" : current ? labelOn : labelOff}
    </button>
  );
}

export function DeleteButton({ endpoint, id, label = "Delete" }: { endpoint: string; id: string; label?: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  return (
    <span className="inline-flex flex-col items-end gap-1">
      <button
        className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[0.68rem] font-medium text-ink/35 transition-colors hover:bg-destructive/5 hover:text-destructive disabled:opacity-50"
        disabled={pending}
        onClick={async () => {
          if (!window.confirm(label + "? This cannot be undone.")) return;
          setPending(true);
          setError("");
          try {
            await send(endpoint + "/" + id, "DELETE");
            router.refresh();
          } catch (deleteError) {
            setError(deleteError instanceof Error ? deleteError.message : "Delete failed.");
            setPending(false);
          }
        }}
        type="button"
      >
        <Icon name="trash" size={12} />
        {pending ? "Deleting…" : label}
      </button>
      {error ? <span className="text-[0.62rem] text-destructive">{error}</span> : null}
    </span>
  );
}

function useCreate(endpoint: string, method = "POST") {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>, transform?: (data: Record<string, FormDataEntryValue>) => Record<string, unknown>) {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const payload = transform ? transform(raw) : raw;
    setStatus("sending");
    setError("");
    try {
      await send(endpoint, method, payload);
      form.reset();
      setStatus("done");
      router.refresh();
      window.setTimeout(() => setStatus("idle"), 2500);
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "Could not save.");
      setStatus("error");
    }
  }

  return { status, error, submit };
}

function FormFeedback({ status, error }: { status: string; error: string }) {
  if (status === "error") {
    return (
      <p className="mt-3 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-[0.72rem] leading-5 text-destructive">
        {error}
      </p>
    );
  }
  if (status === "done") {
    return (
      <p className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-[0.72rem] font-medium text-emerald-700">
        <Icon name="check" size={12} /> Saved.
      </p>
    );
  }
  return null;
}

export function TestimonialForm() {
  const { status, error, submit } = useCreate("/api/testimonials");
  const [quote, setQuote] = useState("");

  return (
    <form className="rounded-2xl border border-line bg-white p-5" onSubmit={(event) => submit(event)}>
      <h2 className="text-[0.95rem] font-semibold text-ink">Add a testimonial</h2>
      <p className="mt-0.5 text-[0.7rem] text-ink/40">Published testimonials appear on the homepage and reviews page.</p>
      <div className="mt-4 space-y-3">
        <Field label="Client name" required>
          <TextInput name="authorName" placeholder="e.g. Priya Menon" required />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Role">
            <TextInput name="role" placeholder="Founder" />
          </Field>
          <Field label="Company">
            <TextInput name="company" placeholder="Business name" />
          </Field>
        </div>
        <Field label="Quote" required>
          <TextArea
            name="quote"
            onChange={(event) => setQuote(event.target.value)}
            placeholder="What changed for the business?"
            required
            rows={4}
            value={quote}
          />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Rating">
            <Select defaultValue="5" name="rating">
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} stars
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Status">
            <Select defaultValue="true" name="published">
              <option value="true">Published</option>
              <option value="false">Draft</option>
            </Select>
          </Field>
        </div>
      </div>
      <FormFeedback error={error} status={status} />
      <button className={buttonClass("dark", "sm", "mt-4 w-full")} disabled={status === "sending"} type="submit">
        {status === "sending" ? "Saving…" : "Add testimonial"}
      </button>
    </form>
  );
}

export function ProjectForm() {
  const { status, error, submit } = useCreate("/api/projects");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  return (
    <form
      className="rounded-2xl border border-line bg-white p-5"
      onSubmit={(event) =>
        submit(event, (raw) => ({
          ...raw,
          featured: raw.featured === "true",
          published: raw.published === "true",
          slug: raw.slug || slugify(String(raw.title ?? "")),
        }))
      }
    >
      <h2 className="text-[0.95rem] font-semibold text-ink">Add a project</h2>
      <p className="mt-0.5 text-[0.7rem] text-ink/40">Published projects appear on the portfolio page.</p>
      <div className="mt-4 space-y-3">
        <Field label="Project title" required>
          <TextInput
            name="title"
            onChange={(event) => {
              setTitle(event.target.value);
              setSlug(slugify(event.target.value));
            }}
            placeholder="e.g. Clinic booking platform"
            required
            value={title}
          />
        </Field>
        <Field label="Slug" hint="Used in the URL. Auto-filled from the title.">
          <TextInput name="slug" onChange={(event) => setSlug(event.target.value)} placeholder="clinic-booking-platform" value={slug} />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Category">
            <TextInput name="category" placeholder="Website + Automation" />
          </Field>
          <Field label="Year">
            <TextInput name="year" placeholder="2025" />
          </Field>
        </div>
        <Field label="Summary" required>
          <TextArea name="summary" placeholder="What was built and what changed?" required rows={3} />
        </Field>
        <Field label="Tags" hint="Comma separated, e.g. Next.js, Booking, WhatsApp API">
          <TextInput name="tags" placeholder="Next.js, Booking, WhatsApp API" />
        </Field>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Accent">
            <Select defaultValue="violet" name="accent">
              {["violet", "lime", "sky", "amber", "rose", "mint"].map((accent) => (
                <option key={accent} value={accent}>
                  {accent}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Featured">
            <Select defaultValue="false" name="featured">
              <option value="false">No</option>
              <option value="true">Yes</option>
            </Select>
          </Field>
          <Field label="Status">
            <Select defaultValue="true" name="published">
              <option value="true">Published</option>
              <option value="false">Draft</option>
            </Select>
          </Field>
        </div>
      </div>
      <FormFeedback error={error} status={status} />
      <button className={buttonClass("dark", "sm", "mt-4 w-full")} disabled={status === "sending"} type="submit">
        {status === "sending" ? "Saving…" : "Add project"}
      </button>
    </form>
  );
}

export function PostForm() {
  const { status, error, submit } = useCreate("/api/posts");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  return (
    <form
      className="rounded-2xl border border-line bg-white p-5"
      onSubmit={(event) =>
        submit(event, (raw) => ({
          ...raw,
          published: raw.published === "true",
          slug: raw.slug || slugify(String(raw.title ?? "")),
        }))
      }
    >
      <h2 className="text-[0.95rem] font-semibold text-ink">Write an article</h2>
      <p className="mt-0.5 text-[0.7rem] text-ink/40">Use ## for section headings and blank lines between paragraphs.</p>
      <div className="mt-4 space-y-3">
        <Field label="Title" required>
          <TextInput
            name="title"
            onChange={(event) => {
              setTitle(event.target.value);
              setSlug(slugify(event.target.value));
            }}
            placeholder="e.g. The 4 changes that make a website convert"
            required
            value={title}
          />
        </Field>
        <Field label="Slug" hint="Auto-filled from the title.">
          <TextInput name="slug" onChange={(event) => setSlug(event.target.value)} placeholder="make-a-website-convert" value={slug} />
        </Field>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Category">
            <TextInput name="category" placeholder="Website" />
          </Field>
          <Field label="Author">
            <TextInput defaultValue="Erstian Team" name="author" />
          </Field>
          <Field label="Read time">
            <TextInput defaultValue="5" min="1" name="readMinutes" type="number" />
          </Field>
        </div>
        <Field label="Excerpt" required>
          <TextArea name="excerpt" placeholder="One or two lines shown on the blog index." required rows={2} />
        </Field>
        <Field label="Article body" required>
          <TextArea
            className="min-h-48"
            name="content"
            placeholder={"Opening paragraph.\n\n## A section heading\n\nThe explanation..."}
            required
            rows={10}
          />
        </Field>
        <Field label="Status">
          <Select defaultValue="true" name="published">
            <option value="true">Published</option>
            <option value="false">Draft</option>
          </Select>
        </Field>
      </div>
      <FormFeedback error={error} status={status} />
      <button className={buttonClass("dark", "sm", "mt-4 w-full")} disabled={status === "sending"} type="submit">
        {status === "sending" ? "Publishing…" : "Publish article"}
      </button>
    </form>
  );
}

export function AuditReportForm({
  id,
  score,
  summary,
  growthIdeas,
  status,
}: {
  id: string;
  score: number | null;
  summary: string | null;
  growthIdeas: string | null;
  status: string;
}) {
  const { status: formStatus, error, submit } = useCreate("/api/audits/" + id, "PATCH");

  return (
    <form
      className="rounded-xl border border-line bg-paper p-4"
      onSubmit={(event) =>
        submit(event, (raw) => ({
          ...raw,
          score: raw.score ? Number(raw.score) : null,
          status: raw.status,
        }))
      }
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-ink/40">Audit report</p>
        <Select className="h-8 w-32 text-[0.72rem]" defaultValue={status} name="status">
          <option value="pending">Pending</option>
          <option value="in_review">In review</option>
          <option value="completed">Completed</option>
        </Select>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-[100px_1fr]">
        <Field label="Score">
          <TextInput defaultValue={score ?? ""} max="100" min="0" name="score" placeholder="82" type="number" />
        </Field>
        <Field label="Summary">
          <TextArea defaultValue={summary ?? ""} name="summary" placeholder="The overall read on the business and its biggest gaps." rows={2} />
        </Field>
      </div>
      <Field className="mt-3" label="Growth ideas">
        <TextArea
          defaultValue={growthIdeas ?? ""}
          name="growthIdeas"
          placeholder={"1. Fix the mobile hero…\n2. Add WhatsApp follow-up…"}
          rows={3}
        />
      </Field>
      <FormFeedback error={error} status={formStatus} />
      <button className={buttonClass("dark", "sm", "mt-3")} disabled={formStatus === "sending"} type="submit">
        {formStatus === "sending" ? "Saving…" : "Save report"}
        <Icon name="check" size={13} />
      </button>
    </form>
  );
}
