import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Eyebrow, SectionTitle, Lead, CTALink } from "@/components/site/ui";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Synca Products — A product builder for the African ecosystem" },
      {
        name: "description",
        content:
          "SyncaXP, Synca Lab Studio, Connect, Discovery, Insight, Verify, EventOS and Product Spotlight: products built for Africa's digital economy.",
      },
      { property: "og:title", content: "Synca Products" },
      {
        property: "og:description",
        content: "Products that turn ecosystem problems into working infrastructure.",
      },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: Products,
});

const products: { name: string; problem: string; solution: string; category: string; status: string }[] = [
  {
    name: "SyncaXP",
    problem: "Les parcours d'apprentissage et de contribution restent invisibles.",
    solution: "Expérience unifiée de progression pour les talents de l'écosystème.",
    category: "Talent Experience",
    status: "Concept",
  },
  {
    name: "Synca Lab Studio",
    problem: "Les idées utiles manquent d'un cadre pour devenir des produits.",
    solution: "Studio de prototypage et de construction de produits avec les Builders.",
    category: "Product Studio",
    status: "Building",
  },
  {
    name: "Synca Connect",
    problem: "Talents, entreprises et communautés ne se rencontrent pas assez.",
    solution: "Mise en relation structurée entre profils, besoins et opportunités.",
    category: "Networking",
    status: "Concept",
  },
  {
    name: "Synca Discovery",
    problem: "L'écosystème Tech africain est difficile à cartographier.",
    solution: "Découverte des communautés, projets, produits et acteurs.",
    category: "Directory",
    status: "Concept",
  },
  {
    name: "Synca Insight",
    problem: "Peu de données fiables sur les compétences et l'emploi Tech.",
    solution: "Collecte, analyse et publication de données d'écosystème.",
    category: "Data & Research",
    status: "Concept",
  },
  {
    name: "Synca Verify",
    problem: "Les compétences et certifications sont difficiles à vérifier.",
    solution: "Vérification de certifications, contributions et statuts.",
    category: "Trust",
    status: "Concept",
  },
  {
    name: "Synca EventOS",
    problem: "Organiser un événement Tech reste artisanal et coûteux.",
    solution: "Outillage complet pour événements, hackathons et meetups.",
    category: "Events",
    status: "Building",
  },
  {
    name: "Synca Product Spotlight",
    problem: "Les produits africains manquent de visibilité.",
    solution: "Vitrine éditoriale des produits construits sur le continent.",
    category: "Media",
    status: "Concept",
  },
];

const statusOrder = ["Concept", "Building", "Beta", "Live"];

function Products() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title={<>Synca est aussi un product builder.</>}
        lead="Chaque produit part d'un problème identifié dans l'écosystème et se construit avec les Builders et les communautés."
      >
        <CTALink to="/builders">Contribuer à un produit</CTALink>
      </PageHero>

      <Section>
        <Eyebrow>Portfolio</Eyebrow>
        <SectionTitle>Huit produits, un même objectif.</SectionTitle>
        <Lead>
          Statuts : {statusOrder.join(" / ")}. Les démos, documentations et repositories sont
          publiés au fur et à mesure.
        </Lead>
        <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <article key={p.name} className="flex flex-col bg-card p-7">
              <div className="flex items-center justify-between">
                <span className="eyebrow">{p.category}</span>
                <span
                  className={`border px-2 py-1 font-mono text-[10px] uppercase tracking-widest ${
                    p.status === "Building" ? "border-primary text-primary" : "border-border text-muted-foreground"
                  }`}
                >
                  {p.status}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{p.name}</h3>
              <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">Problème</p>
              <p className="mt-1 text-sm text-muted-foreground">{p.problem}</p>
              <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">Solution</p>
              <p className="mt-1 text-sm">{p.solution}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
