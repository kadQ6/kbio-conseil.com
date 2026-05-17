import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center bg-[color:var(--color-soft)]">
      <Container className="py-32 text-center">
        <p className="eyebrow">Erreur 404</p>
        <h1 className="display mt-4 text-4xl md:text-6xl">Cette page est introuvable.</h1>
        <p className="mx-auto mt-6 max-w-xl text-[color:var(--color-muted-strong)]">
          La ressource que vous recherchez a peut-être été déplacée ou n'existe plus. Revenez à
          l'accueil ou consultez nos expertises.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" variant="primary" size="lg">
            Retour à l'accueil
          </ButtonLink>
          <ButtonLink href="/expertises" variant="ghost" size="lg">
            Nos expertises
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
