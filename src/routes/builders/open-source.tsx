import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Eyebrow, SectionTitle, Lead, CTALink, EmptyState } from "@/components/site/ui";

export const Route = createFileRoute("/builders/open-source")({
  head: () => ({
    meta: [
      { title: "Synca Open Source — Build once. Share with everyone." },
      {
        name: "description",
        content:
          "Open source tools built by Synca: developer tools, APIs, starter kits, education, community, security, event and verification tools.",
      },
      { property: "og:title", content: "Synca Open Source" },
      { property: "og:description", content: "Build once. Share with everyone." },
      { property: "og:url", content: "/builders/open-source" },
    ],
    links: [{ rel: "canonical", href: "/builders/open-source" }],
  }),
  component: OpenSource,
});

const categories = [
  "Developer Tools",
  "APIs",
  "Starter Kits",
  "Education Tools",
  "Community Tools",
  "Security Tools",
  "Event Tools",
  "Verification Tools",
];

function OpenSource() {
  return (
    <>
      <PageHero
        eyebrow="Open Source"
        title={<>Build once. Share with everyone.</>}
        lead="Les outils Open Source de Synca sont conçus pour être réutilisés par les communautés, les écoles, les startups et les institutions."
      >
        <CTALink to="/contact">Contribuer</CTALink>
      </PageHero>

      <Section>
        <Eyebrow>Catégories</Eyebrow>
        <SectionTitle>Huit familles d'outils.</SectionTitle>
        <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <div key={c} className="bg-card p-7">
              <h3 className="font-display text-lg font-semibold">{c}</h3>
              <div className="mt-6 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>GitHub</span>
                <span>Docs</span>
                <span>Demo</span>
                <span>Contribute</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <EmptyState
            title="Les premiers dépôts publics arrivent."
            description="Aucun repository n'est encore publié. Les projets Open Source seront listés ici avec leur documentation, leur démo et leur guide de contribution."
          />
        </div>
        <Lead>
          Vous voulez ouvrir un outil utile à l'écosystème ? Proposez-le et construisons-le
          ensemble.
        </Lead>
      </Section>
    </>
  );
}
