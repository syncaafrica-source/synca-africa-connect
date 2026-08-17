import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHero, Section, Eyebrow, SectionTitle, Lead, CTALink, EmptyState } from "@/components/site/ui";

export const Route = createFileRoute("/opportunities")({
  head: () => ({
    meta: [
      { title: "Opportunities — Jobs, scholarships, grants and hackathons | Synca" },
      {
        name: "description",
        content:
          "Find jobs, internships, scholarships, grants, hackathons, competitions, calls and events across the African tech ecosystem.",
      },
      { property: "og:title", content: "Opportunities — Synca" },
      { property: "og:description", content: "Connect talent to real opportunity across Africa." },
      { property: "og:url", content: "/opportunities" },
    ],
    links: [{ rel: "canonical", href: "/opportunities" }],
  }),
  component: Opportunities,
});

type Opportunity = {
  title: string;
  org: string;
  country: string;
  category: string;
  deadline: string;
  link: string;
};

// Only verified, real opportunities are published here.
const opportunities: Opportunity[] = [];

const categories = [
  "Jobs",
  "Internships",
  "Scholarships",
  "Grants",
  "Hackathons",
  "Competitions",
  "Calls",
  "Events",
];

function Opportunities() {
  const [category, setCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const results = useMemo(
    () =>
      opportunities.filter(
        (o) =>
          (!category || o.category === category) &&
          (o.title + o.org).toLowerCase().includes(query.toLowerCase()),
      ),
    [category, query],
  );

  return (
    <>
      <PageHero
        eyebrow="Opportunities"
        title={<>Là où les compétences rencontrent les opportunités.</>}
        lead="Emplois, stages, bourses, financements, hackathons, compétitions, appels et événements."
      >
        <CTALink to="/contact">Publier une opportunité</CTALink>
      </PageHero>

      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Board</Eyebrow>
            <SectionTitle className="text-3xl sm:text-4xl">Toutes les opportunités.</SectionTitle>
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher…"
            className="w-full max-w-xs rounded-sm border border-input bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(category === c ? null : c)}
              className={`border px-4 py-2 text-sm transition-colors ${
                category === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12">
          {results.length === 0 ? (
            <EmptyState
              title="Aucune opportunité publiée pour le moment."
              description="Seules des opportunités réelles et vérifiées sont diffusées. Entreprises, écoles et institutions peuvent nous transmettre les leurs."
            />
          ) : (
            <div className="divide-y divide-border border-y border-border">
              {results.map((o) => (
                <article key={o.title} className="grid gap-2 py-6 md:grid-cols-[1fr_auto]">
                  <div>
                    <h3 className="font-display text-lg font-semibold">{o.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {o.org} · {o.country} · {o.category}
                    </p>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground">Deadline {o.deadline}</p>
                </article>
              ))}
            </div>
          )}
        </div>

        <Lead>
          Les opportunités circulent d'abord dans les communautés. Rejoignez-en une pour ne rien
          manquer.
        </Lead>
      </Section>
    </>
  );
}
