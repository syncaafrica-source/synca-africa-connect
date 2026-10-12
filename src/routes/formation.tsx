import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Eyebrow, SectionTitle, Lead } from "@/components/site/ui";
import p1 from "@/assets/formation-atd-12.jpg.asset.json";
import p2 from "@/assets/formation-atd-13.jpg.asset.json";
import p3 from "@/assets/formation-atd-14.jpg.asset.json";

export const Route = createFileRoute("/formation")({
  head: () => ({
    meta: [
      { title: "Formation Assistant Technique en Transformation Digitale — Synca" },
      {
        name: "description",
        content:
          "40 heures, 8 modules, 3 formateurs : devenez Assistant Technique en Transformation Digitale avec Synca. Nextcloud, Odoo, n8n, Lovable. 35 000 FCFA.",
      },
      { property: "og:title", content: "Devenir Assistant Technique en Transformation Digitale" },
      {
        property: "og:description",
        content: "Formation Synca : des compétences concrètes pour accompagner la digitalisation des organisations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Formation,
});

const MAILTO =
  "mailto:contact@sync-africa.com?subject=" +
  encodeURIComponent("Inscription — Formation Assistant Technique en Transformation Digitale");

const keyFacts = [
  { k: "Tarif", v: "35 000 FCFA", s: "par participant" },
  { k: "Date limite d'inscription", v: "29 octobre 2026", s: "" },
  { k: "Début de la formation", v: "1er novembre 2027", s: "" },
  { k: "Cohorte", v: "50 places", s: "limitée à 50 personnes" },
];

const format = [
  ["40 heures", "8 modules de 5 h chacun"],
  ["3 formateurs experts", "Des compétences complémentaires"],
  ["2 séances / semaine", "2 h 30 par séance"],
  ["3 mois d'accès", "Aux outils et environnements pour continuer à pratiquer"],
];

const tools = [
  ["Nextcloud", "Collaboration & stockage sécurisé"],
  ["Odoo", "Gestion d'entreprise et CRM"],
  ["n8n", "Automatisation des processus"],
  ["Lovable", "Vibe coding & IA"],
  ["Et bien d'autres", "Outils techniques"],
];

const modules = [
  "Diagnostic et évaluation de la maturité digitale",
  "Choix des solutions numériques, budgétisation et stratégie de digitalisation",
  "Digital Workplace : déploiement et administration",
  "Digitalisation des processus métier",
  "Automatisation des processus et intégration des applications",
  "Vibe coding et développement d'applications avec l'IA",
  "Déploiement technique et intégration des solutions",
  "Projet final de digitalisation, accompagnement et soutenance",
];

const benefits = [
  ["40 heures de formation pratique", "Réparties sur 8 modules pour un apprentissage concret."],
  ["3 formateurs spécialisés", "Pour bénéficier de compétences complémentaires."],
  ["Accès à des outils professionnels", "Nextcloud, Odoo, n8n, Lovable et bien d'autres."],
  ["Projets pratiques et portfolio", "Réalisez des projets concrets et valorisez vos compétences."],
  ["3 mois d'accès aux environnements", "Pour continuer à pratiquer et développer vos projets."],
  ["Diagnostic et automatisation", "Analyser les besoins et automatiser des processus avec n8n et les API."],
  ["Attestation de formation Synca", "Délivrée selon les conditions de validation prévues."],
  ["Une communauté technologique", "Échangez, partagez et créez des opportunités ensemble."],
];

function Register({ outline = false }: { outline?: boolean }) {
  return (
    <a
      href={MAILTO}
      className={
        outline
          ? "inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-semibold hover:border-primary"
          : "inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
      }
    >
      Inscrivez-vous maintenant →
    </a>
  );
}

function Formation() {
  return (
    <>
      <PageHero
        eyebrow="Formation · Synca"
        title={<>Devenir Assistant Technique en <span className="text-primary">Transformation Digitale</span>.</>}
        lead="Des compétences concrètes pour accompagner la digitalisation des organisations. Apprenez. Pratiquez. Digitalisez."
      >
        <Register />
      </PageHero>

      <Section>
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {keyFacts.map((f) => (
            <div key={f.k} className="bg-card p-6">
              <p className="eyebrow">{f.k}</p>
              <p className="mt-3 font-display text-3xl font-bold">{f.v}</p>
              {f.s && <p className="mt-1 text-sm text-muted-foreground">{f.s}</p>}
            </div>
          ))}
        </div>
        <div className="mt-px grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {format.map(([t, d]) => (
            <div key={t} className="bg-card p-6">
              <p className="font-display text-lg font-bold">{t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>Programme</Eyebrow>
        <SectionTitle>Les 8 modules de la formation.</SectionTitle>
        <ol className="mt-12 grid gap-px bg-border md:grid-cols-2">
          {modules.map((m, i) => (
            <li key={m} className="flex gap-5 bg-card p-6">
              <span className="font-display text-sm font-bold text-primary">MODULE {i + 1}</span>
              <span className="font-medium">{m}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <Eyebrow>Outils</Eyebrow>
        <SectionTitle>Des outils concrets, une vraie expérience.</SectionTitle>
        <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-5">
          {tools.map(([n, d]) => (
            <div key={n} className="bg-card p-6">
              <p className="font-display text-xl font-bold">{n}</p>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>Avantages</Eyebrow>
        <SectionTitle>Plus qu'une formation, un tremplin pour votre avenir.</SectionTitle>
        <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(([t, d]) => (
            <div key={t} className="bg-card p-6">
              <p className="font-semibold">{t}</p>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>Affiches</Eyebrow>
        <SectionTitle>Partagez la formation.</SectionTitle>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[p1, p2, p3].map((p, i) => (
            <a key={p.url} href={p.url} target="_blank" rel="noreferrer" className="block border border-border">
              <img src={p.url} alt={`Affiche de la formation ${i + 1}`} loading="lazy" className="h-auto w-full" />
            </a>
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle>Votre avenir tech commence ici.</SectionTitle>
        <Lead>
          Inscriptions ouvertes jusqu'au 29 octobre 2026. Cohorte limitée à 50 personnes. Écrivez-nous à
          contact@sync-africa.com.
        </Lead>
        <div className="mt-8">
          <Register />
        </div>
      </Section>
    </>
  );
}
