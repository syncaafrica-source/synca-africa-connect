import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Eyebrow, SectionTitle, Lead, CTALink, EmptyState } from "@/components/site/ui";

export const Route = createFileRoute("/builders/projects")({
  head: () => ({
    meta: [
      { title: "Builders Projects — Built by the community, open to the ecosystem" },
      {
        name: "description",
        content:
          "Projects built by Synca Builders: problem, solution, team, technologies, status, repository and demo.",
      },
      { property: "og:title", content: "Builders Projects — Synca" },
      { property: "og:description", content: "Built by the community. Open to the ecosystem." },
      { property: "og:url", content: "/builders/projects" },
    ],
    links: [{ rel: "canonical", href: "/builders/projects" }],
  }),
  component: Projects,
});

type Project = { name: string; problem: string; status: string };
const projects: Project[] = [];

function Projects() {
  return (
    <>
      <PageHero
        eyebrow="Builders Projects"
        title={<>Built by the community. Open to the ecosystem.</>}
        lead="Chaque projet documente un problème réel, une solution, une équipe et un statut."
      >
        <CTALink to="/contact">Proposer un projet</CTALink>
      </PageHero>

      <Section>
        <Eyebrow>Portfolio</Eyebrow>
        <SectionTitle>Les projets des Builders.</SectionTitle>
        <Lead>
          Aucun projet fictif n'est affiché. Les projets apparaissent ici dès qu'ils sont lancés par
          les Builders.
        </Lead>
        <div className="mt-12">
          {projects.length === 0 ? (
            <EmptyState
              title="Les premiers projets arrivent."
              description="Le portfolio Builders s'ouvre avec la première cohorte. Proposez un projet ou rejoignez une équipe existante."
            />
          ) : (
            <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <article key={p.name} className="bg-card p-7">
                  <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{p.problem}</p>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="mt-14">
          <Eyebrow>Structure d'un projet</Eyebrow>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Problème",
              "Solution",
              "Équipe",
              "Technologies",
              "Statut",
              "GitHub",
              "Documentation",
              "Démo",
              "Contributeurs",
            ].map((f) => (
              <span key={f} className="border border-border px-4 py-2 text-sm">
                {f}
              </span>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
