import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Eyebrow, SectionTitle, Lead, CTALink } from "@/components/site/ui";

export const Route = createFileRoute("/communities/certified")({
  head: () => ({
    meta: [
      { title: "Synca Community Certified — Recognize. Strengthen. Connect." },
      {
        name: "description",
        content:
          "A recognition and development framework for African tech communities: apply, assess, certify, support, connect, grow.",
      },
      { property: "og:title", content: "Synca Community Certified" },
      { property: "og:description", content: "Recognize. Strengthen. Connect." },
      { property: "og:url", content: "/communities/certified" },
    ],
    links: [{ rel: "canonical", href: "/communities/certified" }],
  }),
  component: Certified,
});

const steps: [string, string][] = [
  ["Apply", "La communauté dépose son dossier et présente son activité."],
  ["Assess", "Évaluation sur des critères d'activité, de gouvernance et d'impact."],
  ["Certify", "Reconnaissance officielle du statut Synca Community Certified."],
  ["Support", "Accompagnement : structuration, outils, mentorat, ressources."],
  ["Connect", "Connexion aux entreprises, institutions et autres communautés."],
  ["Grow", "Suivi de croissance et renouvellement du statut."],
];

const criteria = [
  "Activité",
  "Régularité",
  "Gouvernance",
  "Impact",
  "Événements",
  "Projets",
  "Nombre de membres",
  "Diversité",
  "Contribution à l'écosystème",
  "Capacité à créer de la valeur",
];

function Certified() {
  return (
    <>
      <PageHero
        eyebrow="Synca Community Certified"
        title={<>Recognize. Strengthen. Connect.</>}
        lead="Ce n'est pas un badge. C'est un framework de reconnaissance et de développement des communautés Tech africaines."
      >
        <CTALink to="/contact">Certifier ma communauté</CTALink>
        <CTALink to="/communities" variant="ghost">
          Voir l'annuaire
        </CTALink>
      </PageHero>

      <Section>
        <Eyebrow>Parcours</Eyebrow>
        <SectionTitle>Six étapes, un accompagnement continu.</SectionTitle>
        <ol className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {steps.map(([t, d], i) => (
            <li key={t} className="bg-card p-7">
              <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 font-display text-xl font-semibold">{t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section ink>
        <Eyebrow ink>Critères d'évaluation</Eyebrow>
        <SectionTitle>Ce que nous regardons.</SectionTitle>
        <Lead ink>
          L'évaluation valorise la constance et l'impact réel, pas la taille seule d'une
          communauté.
        </Lead>
        <div className="mt-12 grid gap-px bg-ink-border sm:grid-cols-2 lg:grid-cols-5">
          {criteria.map((c) => (
            <div key={c} className="bg-ink px-5 py-7 text-sm">
              {c}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
