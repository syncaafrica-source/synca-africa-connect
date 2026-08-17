import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  PageHero,
  Section,
  Eyebrow,
  SectionTitle,
  Lead,
  CTALink,
  EmptyState,
} from "@/components/site/ui";

export const Route = createFileRoute("/communities/")({
  head: () => ({
    meta: [
      { title: "Community Directory — Synca" },
      {
        name: "description",
        content:
          "The Synca directory of African tech communities: filter by country, city, domain and certification status.",
      },
      { property: "og:title", content: "Community Directory — Synca" },
      {
        property: "og:description",
        content: "Communities are the invisible infrastructure of the African tech ecosystem.",
      },
      { property: "og:url", content: "/communities" },
    ],
    links: [{ rel: "canonical", href: "/communities" }],
  }),
  component: Communities,
});

type Community = {
  name: string;
  country: string;
  city: string;
  domains: string[];
  type: string;
  certified: boolean;
};

// No communities are listed until real ones are registered and verified.
const communities: Community[] = [];

const countries = ["Togo", "Sénégal", "Bénin", "Burkina Faso", "Niger", "Côte d'Ivoire", "Guinée", "Maroc"];
const domains = [
  "AI",
  "Cybersecurity",
  "Cloud",
  "Open Source",
  "Data",
  "Web",
  "Mobile",
  "FinTech",
  "DevOps",
  "Product",
  "Design",
  "Entrepreneurship",
  "Hardware",
  "Blockchain",
];
const types = ["Meetup", "User Group", "Campus Club", "Online", "Association"];

function Communities() {
  const [country, setCountry] = useState<string | null>(null);
  const [domain, setDomain] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const results = useMemo(
    () =>
      communities.filter(
        (c) =>
          (!country || c.country === country) &&
          (!domain || c.domains.includes(domain)) &&
          (!type || c.type === type) &&
          c.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [country, domain, type, query],
  );

  return (
    <>
      <PageHero
        eyebrow="Communities"
        title={<>Communities are the invisible infrastructure of the Tech ecosystem.</>}
        lead="Synca veut rendre ces communautés plus fortes, plus visibles, plus structurées et mieux connectées à l'économie réelle."
      >
        <CTALink to="/communities/certified">Community Certified</CTALink>
        <CTALink to="/contact" variant="ghost">
          Référencer ma communauté
        </CTALink>
      </PageHero>

      <Section>
        <Eyebrow>Directory</Eyebrow>
        <SectionTitle>Trouver une communauté.</SectionTitle>
        <Lead>
          L'annuaire n'affiche que des communautés réelles, vérifiées et déclarées. Aucune donnée
          n'est inventée.
        </Lead>

        <div className="mt-12 grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-8">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher…"
              className="w-full rounded-sm border border-input bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <FilterGroup label="Pays" options={countries} value={country} onChange={setCountry} />
            <FilterGroup label="Domaine" options={domains} value={domain} onChange={setDomain} />
            <FilterGroup label="Type" options={types} value={type} onChange={setType} />
          </aside>

          <div>
            <div className="mb-6 flex items-center justify-between">
              <p className="font-mono text-xs text-muted-foreground">
                {results.length} communauté(s)
              </p>
            </div>
            {results.length === 0 ? (
              <EmptyState
                title="L'annuaire ouvre bientôt."
                description="Aucune communauté n'est encore publiée. Les communautés Tech africaines peuvent se déclarer dès maintenant pour figurer dans le premier annuaire Synca."
              />
            ) : (
              <div className="grid gap-px bg-border sm:grid-cols-2">
                {results.map((c) => (
                  <article key={c.name} className="bg-card p-6">
                    <h3 className="font-display text-lg font-semibold">{c.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {c.city}, {c.country}
                    </p>
                  </article>
                ))}
              </div>
            )}

            <div className="mt-10 border border-border bg-card p-8">
              <Eyebrow>Africa map</Eyebrow>
              <p className="mt-4 text-sm text-muted-foreground">
                La carte interactive des communautés s'activera dès la publication des premières
                communautés certifiées.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
                {countries.map((c) => (
                  <div key={c} className="bg-background px-4 py-6 text-sm">
                    <p className="font-medium">{c}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      À venir
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(value === o ? null : o)}
            className={`border px-3 py-1 text-xs transition-colors ${
              value === o
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:border-primary"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
