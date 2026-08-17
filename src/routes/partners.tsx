import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Eyebrow, SectionTitle, Lead, CTALink } from "@/components/site/ui";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners — Build the ecosystem with Synca" },
      {
        name: "description",
        content:
          "Partner with Synca: strategic, corporate, technology, education, institutional, media and community partnerships across Africa.",
      },
      { property: "og:title", content: "Partners — Synca" },
      { property: "og:description", content: "Build the ecosystem with us." },
      { property: "og:url", content: "/partners" },
    ],
    links: [{ rel: "canonical", href: "/partners" }],
  }),
  component: Partners,
});

const types: [string, string][] = [
  ["Strategic Partner", "Construire ensemble des initiatives structurantes à l'échelle du continent."],
  ["Corporate Partner", "Accéder aux talents, aux communautés et aux projets de l'écosystème."],
  ["Technology Partner", "Mettre des technologies et des outils au service des talents."],
  ["Education Partner", "Aligner formations et besoins réels du marché."],
  ["Institutional Partner", "Renforcer les politiques et écosystèmes numériques."],
  ["Media Partner", "Amplifier les récits de l'innovation africaine."],
  ["Community Partner", "Co-construire événements, programmes et projets."],
];

function Partners() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title={<>Build the ecosystem with us.</>}
        lead="Entreprises, institutions, écoles, médias et communautés : chaque partenariat sert un objectif concret et mesurable."
      >
        <CTALink to="/contact">Partner with Synca</CTALink>
      </PageHero>

      <Section>
        <Eyebrow>Types de partenariat</Eyebrow>
        <SectionTitle>Sept façons de collaborer.</SectionTitle>
        <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {types.map(([t, d]) => (
            <div key={t} className="bg-card p-7">
              <h3 className="font-display text-xl font-semibold">{t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section ink>
        <Eyebrow ink>Ce que nous construisons ensemble</Eyebrow>
        <SectionTitle>Talents, compétences, projets, marchés.</SectionTitle>
        <Lead ink>
          Recrutement, formation, hackathons, challenges, programmes communautaires, recherche,
          événements et produits.
        </Lead>
        <div className="mt-10">
          <CTALink to="/contact" variant="ghost">
            Discuter d'un partenariat
          </CTALink>
        </div>
      </Section>
    </>
  );
}
