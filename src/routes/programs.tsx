import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Eyebrow, SectionTitle, Lead, CTALink } from "@/components/site/ui";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs — Synca Tech Academy, Builders, Community Certified" },
      {
        name: "description",
        content:
          "Synca programs: Tech Academy, Builders, Community Certified, Synca Community, Cyber Sisters and Synca Fund.",
      },
      { property: "og:title", content: "Synca Programs" },
      {
        property: "og:description",
        content: "Six programs to grow skills, talent, communities and projects across Africa.",
      },
      { property: "og:url", content: "/programs" },
    ],
    links: [{ rel: "canonical", href: "/programs" }],
  }),
  component: Programs,
});

const programs: { name: string; desc: string; target: string; goals: string[]; to: string; cta: string }[] = [
  {
    name: "Synca Tech Academy",
    desc: "Formation technologique orientée compétences professionnelles.",
    target: "Étudiants, jeunes professionnels, personnes en reconversion.",
    goals: ["Compétences alignées au marché", "Projets réels", "Mentorat", "Employabilité"],
    to: "/contact",
    cta: "Candidater",
  },
  {
    name: "Synca Builders",
    desc: "Réseau de contributeurs qui construisent l'écosystème.",
    target: "Développeurs, designers, chercheurs, créateurs de contenu, organisateurs.",
    goals: ["Contribution", "Reconnaissance", "Opportunité"],
    to: "/builders",
    cta: "Become a Builder",
  },
  {
    name: "Synca Community Certified",
    desc: "Framework de reconnaissance et de développement des communautés Tech.",
    target: "Communautés Tech africaines.",
    goals: ["Structurer", "Accompagner", "Connecter", "Valoriser"],
    to: "/communities/certified",
    cta: "Certifier ma communauté",
  },
  {
    name: "Synca Community",
    desc: "Réseau panafricain de talents et de professionnels.",
    target: "Talents Tech du continent et de la diaspora.",
    goals: ["Networking", "Partage", "Opportunités", "Entraide"],
    to: "/contact",
    cta: "Rejoindre",
  },
  {
    name: "Cyber Sisters",
    desc: "Initiative de développement des talents féminins en cybersécurité.",
    target: "Femmes et jeunes filles intéressées par la cybersécurité.",
    goals: ["Formation", "Mentorat", "Visibilité", "Insertion professionnelle"],
    to: "/contact",
    cta: "S'informer",
  },
  {
    name: "Synca Fund",
    desc: "Initiative destinée à soutenir des talents et projets à potentiel.",
    target: "Builders, projets et jeunes structures.",
    goals: ["Soutien", "Accompagnement", "Mise en relation"],
    to: "/contact",
    cta: "Nous contacter",
  },
];

function Programs() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title={<>Des programmes qui relient apprentissage, contribution et opportunité.</>}
        lead="Chaque programme est une porte d'entrée différente vers le même écosystème."
      >
        <CTALink to="/contact">Rejoindre Synca</CTALink>
      </PageHero>

      <Section>
        <Eyebrow>Six programmes</Eyebrow>
        <SectionTitle>Apprendre, contribuer, structurer, financer.</SectionTitle>
        <Lead>
          Les prochaines échéances de chaque programme sont publiées au fur et à mesure de leur
          ouverture.
        </Lead>
        <div className="mt-14 grid gap-px bg-border lg:grid-cols-2">
          {programs.map((p) => (
            <article key={p.name} className="flex flex-col bg-card p-8">
              <h3 className="font-display text-2xl font-bold">{p.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
              <p className="mt-6 eyebrow">Cible</p>
              <p className="mt-2 text-sm">{p.target}</p>
              <p className="mt-6 eyebrow">Objectifs</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {p.goals.map((g) => (
                  <li key={g} className="border border-border px-3 py-1 text-xs">
                    {g}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-muted-foreground">
                Prochaines échéances : à annoncer.
              </p>
              <div className="mt-8">
                <CTALink to={p.to} variant="outline">
                  {p.cta}
                </CTALink>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
