"use client";

import * as React from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ContactFormProps {
  recipientEmail: string;
}

type FieldName = "name" | "email" | "subject" | "message";

type InvalidMap = Record<FieldName, boolean>;

const INITIAL_INVALID: InvalidMap = {
  name: false,
  email: false,
  subject: false,
  message: false,
};

export function ContactForm({ recipientEmail }: ContactFormProps) {
  const t = useTranslations("Contact");
  const formRef = React.useRef<HTMLFormElement>(null);
  const [invalidFields, setInvalidFields] =
    React.useState<InvalidMap>(INITIAL_INVALID);
  const [liveMessage, setLiveMessage] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const errorTextByField: Record<FieldName, string> = {
    name: t("nameError"),
    email: t("emailError"),
    subject: t("subjectError"),
    message: t("messageError"),
  };

  function checkFieldInvalid(
    element: HTMLInputElement | HTMLTextAreaElement
  ): boolean {
    try {
      if (element.matches(":user-invalid")) {
        return true;
      }
    } catch {
      // Fallback for older browsers without :user-invalid support
    }
    return !element.validity.valid;
  }

  function handleFieldBlur(
    field: FieldName,
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const el = event.currentTarget;
    if (el.value.length === 0 && !invalidFields[field]) {
      return;
    }
    const isInvalid = checkFieldInvalid(el);
    setInvalidFields((prev) => ({ ...prev, [field]: isInvalid }));
    if (isInvalid) {
      setLiveMessage(errorTextByField[field]);
    }
  }

  function handleFieldInput(
    field: FieldName,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (!invalidFields[field]) return;
    const isInvalid = !event.currentTarget.validity.valid;
    setInvalidFields((prev) => ({ ...prev, [field]: isInvalid }));
    if (!isInvalid) {
      setLiveMessage("");
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const controls: Array<{
      name: FieldName;
      el: HTMLInputElement | HTMLTextAreaElement | null;
    }> = [
      { name: "name", el: form.elements.namedItem("name") as HTMLInputElement },
      {
        name: "email",
        el: form.elements.namedItem("email") as HTMLInputElement,
      },
      {
        name: "subject",
        el: form.elements.namedItem("subject") as HTMLInputElement,
      },
      {
        name: "message",
        el: form.elements.namedItem("message") as HTMLTextAreaElement,
      },
    ];

    const nextInvalid: InvalidMap = { ...INITIAL_INVALID };
    let firstInvalidEl: HTMLInputElement | HTMLTextAreaElement | null = null;

    for (const control of controls) {
      if (!control.el) continue;
      const isFieldInvalid = !control.el.validity.valid;
      nextInvalid[control.name] = isFieldInvalid;
      if (isFieldInvalid && !firstInvalidEl) {
        firstInvalidEl = control.el;
      }
    }

    setInvalidFields(nextInvalid);

    if (firstInvalidEl) {
      setSubmitted(false);
      const firstKey = firstInvalidEl.name as FieldName;
      setLiveMessage(errorTextByField[firstKey]);
      firstInvalidEl.focus();
      return;
    }

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const bodyLines = [`${name} (${email})`, "", message].join("\n");
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines)}`;

    window.location.href = mailtoUrl;
    setSubmitted(true);
    setLiveMessage(t("submitSuccess"));
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-name"
            className="text-sm font-medium text-foreground"
          >
            {t("nameLabel")}
          </label>
          <Input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            placeholder={t("namePlaceholder")}
            aria-invalid={invalidFields.name ? "true" : "false"}
            aria-describedby={
              invalidFields.name ? "contact-name-error" : undefined
            }
            onBlur={(e) => handleFieldBlur("name", e)}
            onChange={(e) => handleFieldInput("name", e)}
          />
          <p
            id="contact-name-error"
            className="field-error items-center gap-1.5 text-xs text-destructive"
          >
            <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
            <span>{t("nameError")}</span>
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-email"
            className="text-sm font-medium text-foreground"
          >
            {t("emailFieldLabel")}
          </label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            required
            placeholder={t("emailPlaceholder")}
            aria-invalid={invalidFields.email ? "true" : "false"}
            aria-describedby={
              invalidFields.email ? "contact-email-error" : undefined
            }
            onBlur={(e) => handleFieldBlur("email", e)}
            onChange={(e) => handleFieldInput("email", e)}
          />
          <p
            id="contact-email-error"
            className="field-error items-center gap-1.5 text-xs text-destructive"
          >
            <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
            <span>{t("emailError")}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-subject"
          className="text-sm font-medium text-foreground"
        >
          {t("subjectLabel")}
        </label>
        <Input
          id="contact-subject"
          name="subject"
          type="text"
          autoComplete="off"
          required
          minLength={3}
          placeholder={t("subjectPlaceholder")}
          aria-invalid={invalidFields.subject ? "true" : "false"}
          aria-describedby={
            invalidFields.subject ? "contact-subject-error" : undefined
          }
          onBlur={(e) => handleFieldBlur("subject", e)}
          onChange={(e) => handleFieldInput("subject", e)}
        />
        <p
          id="contact-subject-error"
          className="field-error items-center gap-1.5 text-xs text-destructive"
        >
          <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
          <span>{t("subjectError")}</span>
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-message"
          className="text-sm font-medium text-foreground"
        >
          {t("messageLabel")}
        </label>
        <Textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          rows={5}
          placeholder={t("messagePlaceholder")}
          aria-invalid={invalidFields.message ? "true" : "false"}
          aria-describedby={
            invalidFields.message ? "contact-message-error" : undefined
          }
          onBlur={(e) => handleFieldBlur("message", e)}
          onChange={(e) => handleFieldInput("message", e)}
        />
        <p
          id="contact-message-error"
          className="field-error items-center gap-1.5 text-xs text-destructive"
        >
          <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
          <span>{t("messageError")}</span>
        </p>
      </div>

      {submitted ? (
        <div
          role="status"
          className="flex items-start gap-2.5 rounded-lg border border-status-success/40 bg-status-success-bg p-3.5 text-xs leading-relaxed text-status-success"
        >
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>{t("submitSuccess")}</span>
        </div>
      ) : null}

      <div className="flex flex-col justify-between gap-3 pt-1 sm:flex-row sm:items-center">
        <p className="text-xs leading-relaxed text-subtle-foreground">
          {t("formHint")}
        </p>
        <Button type="submit" variant="default" size="lg" className="w-full shrink-0 sm:w-auto">
          <span>{t("submitButton")}</span>
          <Send className="size-4" aria-hidden="true" />
        </Button>
      </div>

      <div aria-live="polite" className="sr-only">
        {liveMessage}
      </div>
    </form>
  );
}
