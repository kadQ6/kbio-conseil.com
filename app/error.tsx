"use client";

import { Container } from "@/components/Container";
import { Button, ButtonLink } from "@/components/Button";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="flex flex-1 items-center bg-[color:var(--color-soft)]">
      <Container className="py-32 text-center">
        <p className="eyebrow">Erreur</p>
        <h1 className="display mt-4 text-4xl md:text-6xl">Une erreur inattendue est survenue.</h1>
        <p className="mx-auto mt-6 max-w-xl text-[color:var(--color-muted-strong)]">
          Vous pouvez réessayer le chargement de la page, revenir à l'accueil ou nous écrire si le
          problème persiste.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button onClick={reset} variant="primary" size="lg">
            Réessayer
          </Button>
          <ButtonLink href="/" variant="ghost" size="lg">
            Retour à l'accueil
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
