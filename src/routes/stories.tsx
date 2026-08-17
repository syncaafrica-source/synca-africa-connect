import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Eyebrow, SectionTitle, Lead, CTALink, EmptyState } from "@/components/site/ui";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Success Stories — Talents, builders and communities | Synca" },
      {
        name: "description",
        content:
          "Real stories from the Synca ecosystem: challenge, action, result — talents, builders, communities, startups and partners.",
      },
      { property: "og:title", content: "Success Stories — Synca" },
      { property: "og:description", content: "Challenge → Action → Result." },
      { property: "og:url", content: "/stories" },
    ],
    links: [{ rel: "canonical", href: "/stories" }],
  }),
  component: Stories,
});

type Story = { title: string; kind: string };
const stories: Story[] = [];

function Stories() {
  return (
    <>
      <PageHero
        eyebrow="Success Stories"
        title={<>Challenge → Action → Result.</>}
        lead="Des parcours réels : talents, Builders, communautés, startups, partenaires et projets."
      >
        <CTALink to="/contact">Partager votre histoire</CTALink>
      </PageHero>

      <Section>
        <Eyebrow>Stories</Eyebrow>
        <SectionTitle>Ce que l'écosystème produit vraiment.</SectionTitle>
        <Lead>
          Chaque histoire est documentée et validée avec les personnes concernées. Aucun témoignage
          fictif.
        </Lead>
        <div className="mt-12">
          {stories.length === 0 ? (
            <EmptyState
              title="Les premières histoires arrivent."
              description="Talents, communautés et partenaires : racontez-nous un avant/après concret et nous le publierons ici."
            />
          ) : (
            <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
              {stories.map((s) => (
                <article key={s.title} className="bg-card p-7">
                  <span className="eyebrow">{s.kind}</span>
                  <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
                </article>
              ))}
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
