import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Eyebrow, SectionTitle, Lead, CTALink } from "@/components/site/ui";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Synca — Synchronize Africa" },
      {
        name: "description",
        content:
          "Synca builds the human and technological infrastructure that connects talent, communities, companies and institutions across Africa.",
      },
      { property: "og:title", content: "About Synca — Synchronize Africa" },
      {
        property: "og:description",
        content: "Vision, mission, values and manifesto of Synca — Synchronize Africa.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={<>Construire avec l'écosystème, pour l'écosystème.</>}
        lead="Synca agit à l'intersection de l'éducation, des compétences, du talent, des communautés, de la technologie, du business, de l'innovation et de l'opportunité."
      >
        <CTALink to="/programs">Découvrir les programmes</CTALink>
        <CTALink to="/team" variant="ghost">
          L'équipe
        </CTALink>
      </PageHero>

      <Section>
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <Eyebrow>Vision</Eyebrow>
            <p className="mt-5 text-2xl font-medium leading-snug sm:text-3xl">
              Une Afrique où chaque talent peut transformer ses compétences en opportunités et où
              chaque innovation peut trouver les connexions, les ressources et les marchés
              nécessaires pour grandir.
            </p>
          </div>
          <div>
            <Eyebrow>Mission</Eyebrow>
            <p className="mt-5 text-2xl font-medium leading-snug sm:text-3xl">
              Synchroniser les talents, les compétences, les communautés, les organisations et les
              opportunités pour accélérer l'économie numérique africaine.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <Eyebrow>Positionnement</Eyebrow>
        <SectionTitle>Synca n'est pas seulement une école, une communauté ou un événement.</SectionTitle>
        <Lead>
          Synca construit l'infrastructure humaine et technologique qui permet aux acteurs de
          l'écosystème de mieux travailler ensemble.
        </Lead>
        <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {["Education", "Skills", "Talent", "Community", "Technology", "Business", "Innovation", "Opportunity"].map(
            (x) => (
              <div key={x} className="bg-card px-6 py-8 font-display text-lg font-semibold">
                {x}
              </div>
            ),
          )}
        </div>
      </Section>

      <Section ink>
        <Eyebrow ink>Valeurs</Eyebrow>
        <SectionTitle>Build. Connect. Grow.</SectionTitle>
        <div className="mt-12 grid gap-px bg-ink-border sm:grid-cols-3">
          {[
            ["Build", "Nous construisons des choses utiles, avec ceux qui les utiliseront."],
            ["Connect", "Nous relions des mondes qui gagnent à travailler ensemble."],
            ["Grow", "Nous mesurons la réussite à la croissance des autres."],
          ].map(([t, d]) => (
            <div key={t} className="bg-ink p-8">
              <h3 className="font-display text-2xl font-bold">{t}</h3>
              <p className="mt-3 text-sm text-ink-muted">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>Présence</Eyebrow>
        <SectionTitle>From West Africa to Africa.</SectionTitle>
        <Lead>
          Le déploiement de Synca se fait pays par pays, avec les communautés locales. Les statuts
          affichés reflètent uniquement la réalité du terrain.
        </Lead>
        <div className="mt-10 flex flex-wrap gap-2">
          {["Togo", "Sénégal", "Bénin", "Burkina Faso", "Niger", "Côte d'Ivoire", "Guinée", "Maroc"].map(
            (p) => (
              <span key={p} className="border border-border px-4 py-2 text-sm">
                {p}
              </span>
            ),
          )}
          <span className="border border-dashed border-border px-4 py-2 text-sm text-muted-foreground">
            Autres pays à venir
          </span>
        </div>
      </Section>
    </>
  );
}
