import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Section, Eyebrow, SectionTitle, Lead, CTALink, EmptyState } from "@/components/site/ui";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Newsroom — News, insights and research | Synca" },
      {
        name: "description",
        content:
          "News, insights, interviews, community stories, research and announcements from the Synca ecosystem.",
      },
      { property: "og:title", content: "Newsroom — Synca" },
      { property: "og:description", content: "Insights and stories from Africa's digital economy." },
      { property: "og:url", content: "/news" },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: News,
});

const categories = [
  "News",
  "Insights",
  "Interviews",
  "Events",
  "Community Stories",
  "Research",
  "Announcements",
];

type Article = { title: string; category: string; date: string; author: string };
const articles: Article[] = [];

function News() {
  const [category, setCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const results = articles.filter(
    (a) =>
      (!category || a.category === category) && a.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title={<>Ce que l'écosystème apprend, publie et annonce.</>}
        lead="Analyses, interviews, recherches et annonces autour de l'économie numérique africaine."
      >
        <CTALink to="/contact">Contact presse</CTALink>
      </PageHero>

      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Publications</Eyebrow>
            <SectionTitle className="text-3xl sm:text-4xl">Tous les articles.</SectionTitle>
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
              title="La newsroom ouvre bientôt."
              description="Les premiers articles, interviews et recherches seront publiés ici. Abonnez-vous à la newsletter pour rester synchronisé."
            />
          ) : (
            <div className="divide-y divide-border border-y border-border">
              {results.map((a) => (
                <article key={a.title} className="py-6">
                  <span className="eyebrow">{a.category}</span>
                  <h3 className="mt-2 font-display text-xl font-semibold">{a.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {a.author} · {a.date}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
        <Lead>Stay synchronized — la newsletter Synca est en bas de page.</Lead>
      </Section>
    </>
  );
}
