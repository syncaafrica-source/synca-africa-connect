import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Eyebrow, SectionTitle, Lead, CTALink, EmptyState } from "@/components/site/ui";

export const Route = createFileRoute("/conf")({
  head: () => ({
    meta: [
      { title: "Synca Conf 2027 — Dakar, 16–18 March 2027" },
      {
        name: "description",
        content:
          "Synca Conf 2027 in Dakar, Senegal: training for the real economy — closing the gap between education, skills and tech jobs in Africa.",
      },
      { property: "og:title", content: "Synca Conf 2027 — Dakar, Sénégal" },
      {
        property: "og:description",
        content: "16–18 March 2027 · Education & Skills, AI, Cybersecurity, FinTech, Open Source.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/conf" },
    ],
    links: [{ rel: "canonical", href: "/conf" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          name: "Synca Conf 2027",
          startDate: "2027-03-16",
          endDate: "2027-03-18",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: "Dakar, Sénégal",
            address: { "@type": "PostalAddress", addressLocality: "Dakar", addressCountry: "SN" },
          },
          organizer: { "@type": "Organization", name: "Synca" },
        }),
      },
    ],
  }),
  component: Conf,
});

const axes = [
  "Education & Skills",
  "AI",
  "Cybersecurity",
  "FinTech",
  "Open Source",
  "Entrepreneurship",
  "Digital Economy",
  "Policy & Regulation",
];

const formats: [string, string][] = [
  ["Conférences", "Keynotes et panels sur l'économie numérique africaine."],
  ["Masterclasses", "Sessions pratiques animées par des experts."],
  ["Exposition", "Espace startups, communautés, écoles et entreprises."],
  ["Networking", "Rencontres structurées entre talents, recruteurs et institutions."],
  ["Hackathon", "48h pour transformer un problème réel en prototype."],
  ["Career Zone", "Recrutement, mentorat et revue de portfolios."],
];

function Conf() {
  return (
    <>
      <PageHero
        eyebrow="Synca Conf 2027"
        title={
          <>
            Dakar — Sénégal
            <br />
            <span className="text-primary">16–18 mars 2027</span>
          </>
        }
        lead="«Former pour l'économie réelle : combler le fossé entre éducation, compétences et emploi dans la Tech en Afrique.»"
      >
        <CTALink to="/contact">Participer</CTALink>
        <CTALink to="/partners" variant="ghost">
          Devenir partenaire
        </CTALink>
      </PageHero>

      <Section>
        <Eyebrow>Axes</Eyebrow>
        <SectionTitle>Huit axes de travail.</SectionTitle>
        <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {axes.map((a) => (
            <div key={a} className="bg-card px-6 py-8 font-display text-lg font-semibold">
              {a}
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>Programme</Eyebrow>
        <SectionTitle>Trois jours, six formats.</SectionTitle>
        <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {formats.map(([t, d]) => (
            <div key={t} className="bg-card p-7">
              <h3 className="font-display text-xl font-semibold">{t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section ink>
        <Eyebrow ink>Speakers & partenaires</Eyebrow>
        <SectionTitle>L'appel à intervenants ouvre bientôt.</SectionTitle>
        <Lead ink>
          Aucun speaker ni partenaire n'est annoncé avant confirmation officielle. Le programme
          détaillé sera publié progressivement.
        </Lead>
        <div className="mt-10">
          <CTALink to="/contact" variant="ghost">
            Proposer une intervention
          </CTALink>
        </div>
      </Section>

      <Section>
        <EmptyState
          title="Billetterie à venir."
          description="Inscrivez-vous à la newsletter pour être informé de l'ouverture des inscriptions et de l'annonce des speakers."
        />
      </Section>
    </>
  );
}
