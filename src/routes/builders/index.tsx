import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Eyebrow, SectionTitle, Lead, CTALink } from "@/components/site/ui";

export const Route = createFileRoute("/builders/")({
  head: () => ({
    meta: [
      { title: "Synca Builders — Build with the ecosystem. For the ecosystem." },
      {
        name: "description",
        content:
          "The Synca Builders network: contribution tracks, builder profiles and projects that grow Africa's digital ecosystem.",
      },
      { property: "og:title", content: "Synca Builders" },
      { property: "og:description", content: "Don't just consume the ecosystem. Build it." },
      { property: "og:url", content: "/builders" },
    ],
    links: [{ rel: "canonical", href: "/builders" }],
  }),
  component: Builders,
});

const tracks: [string, string][] = [
  ["Build", "Créer des produits."],
  ["Code", "Développer et contribuer à l'Open Source."],
  ["Research", "Produire de la recherche et de la donnée."],
  ["Community", "Développer les communautés."],
  ["Content", "Créer du contenu pédagogique et éditorial."],
  ["Events", "Construire les événements Synca."],
  ["Design", "Concevoir les expériences et interfaces."],
  ["Growth", "Développer les partenariats et la visibilité."],
  ["Mentor", "Accompagner d'autres talents."],
];

const profileFields = [
  "Profil",
  "Pays",
  "Compétences",
  "Domaines",
  "GitHub",
  "LinkedIn",
  "Projets",
  "Contributions",
  "Badges",
  "Certifications",
  "Historique",
  "Communautés",
  "Niveau Builder",
];

function Builders() {
  return (
    <>
      <PageHero
        eyebrow="Synca Builders"
        title={
          <>
            Don't just consume the ecosystem. <span className="text-primary">Build it.</span>
          </>
        }
        lead="Build with the ecosystem. For the ecosystem. Les Builders contribuent aux produits, à l'Open Source, aux événements, à la recherche, au contenu, au design, à la documentation, aux communautés et au mentoring."
      >
        <CTALink to="/contact">Become a Builder</CTALink>
        <CTALink to="/builders/projects" variant="ghost">
          Projects
        </CTALink>
        <CTALink to="/builders/open-source" variant="ghost">
          Open Source
        </CTALink>
      </PageHero>

      <Section>
        <Eyebrow>Tracks</Eyebrow>
        <SectionTitle>Neuf façons de contribuer.</SectionTitle>
        <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map(([t, d]) => (
            <div key={t} className="bg-card p-7 transition-colors hover:bg-accent">
              <h3 className="font-display text-xl font-semibold">{t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section ink>
        <Eyebrow ink>Builder profile</Eyebrow>
        <SectionTitle>Contribution → Recognition → Opportunity</SectionTitle>
        <Lead ink>
          Le profil Builder documente ce que vous construisez réellement. La reconnaissance suit la
          contribution — jamais un simple compteur de points.
        </Lead>
        <div className="mt-12 flex flex-wrap gap-2">
          {profileFields.map((f) => (
            <span key={f} className="border border-ink-border px-4 py-2 text-sm">
              {f}
            </span>
          ))}
        </div>
      </Section>
    </>
  );
}
