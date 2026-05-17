"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "./Button";

const subjects = [
  "Demande d'audit technique",
  "Proposition de contrat de maintenance",
  "Maintenance curative urgente",
  "Mise en place d'une GMAO",
  "Accompagnement à l'achat / réception",
  "Autre demande",
];

const establishments = [
  "Hôpital public",
  "Clinique privée",
  "Centre de santé",
  "Plateau technique",
  "Centre spécialisé (dialyse, imagerie…)",
  "Bailleur / institution",
  "Autre",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-3xl border border-[color:var(--color-line)] bg-white p-8 text-center">
        <span className="grid h-14 w-14 mx-auto place-items-center rounded-full bg-[color:var(--color-teal-100)] text-[color:var(--color-teal-700)]">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-2xl font-semibold text-[color:var(--color-ink)]">
          Merci, votre message est bien reçu.
        </h3>
        <p className="mt-3 text-[15px] text-[color:var(--color-muted-strong)]">
          L'équipe K'BIO Conseil revient vers vous sous 48 heures ouvrées.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="rounded-3xl border border-[color:var(--color-line)] bg-white p-7 md:p-9 shadow-[var(--shadow-soft)]"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label="Nom et prénom" required>
          <input
            type="text"
            required
            autoComplete="name"
            className={inputCls}
            placeholder="Aïsha Mahamoud"
          />
        </Field>
        <Field label="Fonction" required>
          <input
            type="text"
            required
            className={inputCls}
            placeholder="Direction technique"
          />
        </Field>
        <Field label="Établissement" required>
          <input type="text" required className={inputCls} placeholder="Nom de la structure" />
        </Field>
        <Field label="Type d'établissement" required>
          <select required className={inputCls} defaultValue="">
            <option value="" disabled>
              Sélectionner
            </option>
            {establishments.map((e) => (
              <option key={e}>{e}</option>
            ))}
          </select>
        </Field>
        <Field label="Email professionnel" required>
          <input
            type="email"
            required
            autoComplete="email"
            className={inputCls}
            placeholder="prenom.nom@etablissement.dj"
          />
        </Field>
        <Field label="Téléphone">
          <input type="tel" className={inputCls} placeholder="+253 …" autoComplete="tel" />
        </Field>
        <Field label="Objet de la demande" required>
          <select required className={inputCls} defaultValue="">
            <option value="" disabled>
              Sélectionner un objet
            </option>
            {subjects.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="Nombre approximatif d'équipements">
          <select className={inputCls} defaultValue="">
            <option value="" disabled>
              Sélectionner
            </option>
            <option>Moins de 50</option>
            <option>50 à 200</option>
            <option>200 à 500</option>
            <option>500 à 1 000</option>
            <option>Plus de 1 000</option>
          </select>
        </Field>
        <Field label="Votre message" required className="md:col-span-2">
          <textarea
            required
            rows={5}
            className={`${inputCls} resize-y`}
            placeholder="Présentez brièvement le contexte, les contraintes et le calendrier souhaité."
          />
        </Field>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12px] text-[color:var(--color-muted)]">
          Les informations transmises sont strictement confidentielles et ne sont utilisées
          que pour répondre à votre demande.
        </p>
        <Button type="submit" variant="primary" size="lg">
          Envoyer la demande
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-xl border border-[color:var(--color-line)] bg-white px-4 py-3 text-[15px] text-[color:var(--color-ink)] placeholder:text-[color:var(--color-muted)] outline-none transition-all focus:border-[color:var(--color-teal)] focus:ring-2 focus:ring-[color:var(--color-teal)]/25";

function Field({
  label,
  required,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-[12px] font-medium text-[color:var(--color-muted-strong)]">
        {label}
        {required && <span className="ml-1 text-[color:var(--color-danger)]">*</span>}
      </span>
      {children}
    </label>
  );
}
