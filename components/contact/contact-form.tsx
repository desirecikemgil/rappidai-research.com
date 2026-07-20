"use client";

import { ArrowUpRight } from "lucide-react";
import { useId, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { contactPageContent } from "@/content/pages";

type ContactField = "name" | "email" | "subject" | "message";
type ContactValues = Record<ContactField, string>;
type ContactErrors = Partial<Record<ContactField, string>>;
type SubmissionStatus =
  | { kind: "opening" | "unavailable"; message: string }
  | null;

type ContactFormProps = {
  businessEmail: string | null;
};

const initialValues: ContactValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: ContactValues): ContactErrors {
  const { fields } = contactPageContent.form;
  const errors: ContactErrors = {};

  if (!values.name.trim()) {
    errors.name = fields.name.requiredMessage;
  }

  if (!values.email.trim()) {
    errors.email = fields.email.requiredMessage;
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = fields.email.invalidMessage;
  }

  if (!values.subject.trim()) {
    errors.subject = fields.subject.requiredMessage;
  }

  if (!values.message.trim()) {
    errors.message = fields.message.requiredMessage;
  }

  return errors;
}

function ErrorMessage({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} role="alert" className="mt-2 text-sm leading-6 text-ink">
      <span className="mr-1 font-semibold text-accent">Error:</span>
      {message}
    </p>
  );
}

export function ContactForm({ businessEmail }: ContactFormProps) {
  const { form } = contactPageContent;
  const formRef = useRef<HTMLFormElement>(null);
  const idPrefix = useId();
  const [values, setValues] = useState<ContactValues>(initialValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>(
    businessEmail
      ? null
      : { kind: "unavailable", message: form.unavailableMessage },
  );

  if (!businessEmail) {
    return (
      <div className="liquid-surface border border-white/70 p-6 sm:p-9 lg:p-10">
        <p className="eyebrow">ENQUIRY</p>
        <h2 className="mt-5 max-w-[16ch] text-[clamp(1.9rem,3.3vw,3.25rem)] font-[520] tracking-[-0.045em] text-ink">
          {form.unavailableHeading}
        </h2>
        <p className="body-copy mt-5 max-w-[35rem]">
          {form.unavailableDescription}
        </p>
        <p className="mt-8 border-l-2 border-accent pl-5 text-sm leading-6 text-muted">
          No message is transmitted or stored by this website.
        </p>
      </div>
    );
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = event.target.name as ContactField;
    const value = event.target.value;

    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstInvalidField = (Object.keys(nextErrors) as ContactField[])[0];
    if (firstInvalidField) {
      requestAnimationFrame(() => {
        formRef.current
          ?.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)
          ?.focus();
      });
      return;
    }

    const recipient = businessEmail?.trim();
    if (!recipient) {
      setStatus({ kind: "unavailable", message: form.unavailableMessage });
      return;
    }

    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      "",
      values.message.trim(),
    ].join("\n");
    const mailto = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(values.subject.trim())}&body=${encodeURIComponent(body)}`;

    setStatus({ kind: "opening", message: form.openingEmailLabel });
    window.location.href = mailto;
  };

  const fieldClassName =
    "liquid-field mt-2 w-full border border-line bg-transparent px-0 py-3.5 text-base text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent aria-[invalid=true]:border-accent";

  return (
    <div className="liquid-surface border border-white/70 p-5 pt-7 sm:p-9 lg:p-10">
      <p className="eyebrow">ENQUIRY</p>
      <h2 className="mt-5 text-[clamp(1.9rem,3.3vw,3.25rem)] font-[520] tracking-[-0.045em] text-ink">
        {form.heading}
      </h2>
      <p id={`${idPrefix}-description`} className="body-copy mt-5 max-w-[35rem]">
        {form.description}
      </p>

      <form
        ref={formRef}
        className="mt-10"
        noValidate
        aria-describedby={`${idPrefix}-description ${idPrefix}-status`}
        onSubmit={handleSubmit}
      >
        <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
          <div>
            <label
              htmlFor={`${idPrefix}-name`}
              className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-muted"
            >
              {form.fields.name.label}
              <span aria-hidden="true" className="ml-1 text-accent">
                *
              </span>
            </label>
            <input
              id={`${idPrefix}-name`}
              name="name"
              type="text"
              autoComplete="name"
              required
              value={values.name}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${idPrefix}-name-error` : undefined}
              className={fieldClassName}
              onChange={handleChange}
            />
            <ErrorMessage id={`${idPrefix}-name-error`} message={errors.name} />
          </div>

          <div>
            <label
              htmlFor={`${idPrefix}-email`}
              className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-muted"
            >
              {form.fields.email.label}
              <span aria-hidden="true" className="ml-1 text-accent">
                *
              </span>
            </label>
            <input
              id={`${idPrefix}-email`}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={values.email}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? `${idPrefix}-email-error` : undefined}
              className={fieldClassName}
              onChange={handleChange}
            />
            <ErrorMessage id={`${idPrefix}-email-error`} message={errors.email} />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor={`${idPrefix}-subject`}
              className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-muted"
            >
              {form.fields.subject.label}
              <span aria-hidden="true" className="ml-1 text-accent">
                *
              </span>
            </label>
            <input
              id={`${idPrefix}-subject`}
              name="subject"
              type="text"
              required
              value={values.subject}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? `${idPrefix}-subject-error` : undefined}
              className={fieldClassName}
              onChange={handleChange}
            />
            <ErrorMessage id={`${idPrefix}-subject-error`} message={errors.subject} />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor={`${idPrefix}-message`}
              className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-muted"
            >
              {form.fields.message.label}
              <span aria-hidden="true" className="ml-1 text-accent">
                *
              </span>
            </label>
            <textarea
              id={`${idPrefix}-message`}
              name="message"
              rows={6}
              required
              value={values.message}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? `${idPrefix}-message-error` : undefined}
              className={`${fieldClassName} min-h-40 resize-y`}
              onChange={handleChange}
            />
            <ErrorMessage id={`${idPrefix}-message-error`} message={errors.message} />
          </div>
        </div>

        <div className="mt-9 flex flex-col items-start gap-5">
          <button
            type="submit"
            className="link-arrow liquid-button inline-flex min-h-12 items-center justify-center gap-2.5 border border-ink bg-ink px-5 text-[0.88rem] font-medium tracking-[-0.01em] text-white transition-colors duration-200 hover:border-accent hover:bg-accent focus-visible:border-accent focus-visible:bg-accent"
          >
            {form.submitLabel}
            <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />
          </button>

          <p
            id={`${idPrefix}-status`}
            role="status"
            aria-live="polite"
            className={`max-w-[36rem] border-l-2 pl-4 text-sm leading-6 ${
              status?.kind === "opening"
                ? "border-accent text-ink"
                : "border-line-strong text-muted"
            }`}
          >
            {status?.message ?? "No message has been sent."}
          </p>
        </div>
      </form>
    </div>
  );
}
