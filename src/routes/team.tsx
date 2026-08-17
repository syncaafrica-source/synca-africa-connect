import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Eyebrow, SectionTitle, Lead, CTALink, EmptyState } from "@/components/site/ui";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — The people behind Synca" },
      {
        name: "description",
        content:
          "Meet the team building Synca: contributors, community leaders and operators across Africa.",
      },
      { property: "og:title", content: "Team — Synca" },
      { property: "og:description", content: "The people synchronizing Africa's digital economy." },
      { property: "og:url", content: "/team" },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
  component: Team,
});

type Member = { name: string; role: string; country: string; bio: string };
const members: Member[] = [];

function Team() {
  return (
    <>
      <PageHero
        eyebrow="Team"
        title={<>Une équipe distribuée, ancrée dans les communautés.</>}
        lead="Synca est porté par des opérateurs, des community leaders et des Builders répartis à travers le continent."
      >
        <CTALink to="/contact">Rejoindre l'équipe</CTALink>
      </PageHero>

      <Section>
        <Eyebrow>People</Eyebrow>
        <SectionTitle>Les visages de Synca.</SectionTitle>
        <Lead>
          Les profils sont publiés avec l'accord de chaque membre : photo, nom, rôle, pays, bio et
          LinkedIn.
        </Lead>
        <div className="mt-12">
          {members.length === 0 ? (
            <EmptyState
              title="Les profils arrivent."
              description="La page équipe sera publiée avec les photos, rôles et pays de chaque membre."
            />
          ) : (
            <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
              {members.map((m) => (
                <article key={m.name} className="bg-card p-7">
                  <h3 className="font-display text-lg font-semibold">{m.name}</h3>
                  <p className="text-sm text-primary">{m.role}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{m.country}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
