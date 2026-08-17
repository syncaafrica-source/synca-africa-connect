import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Section, Eyebrow, SectionTitle, Lead, CTALink, NumberedCard } from "@/components/site/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Synca — Synchronize Africa | Build. Connect. Grow." },
      {
        name: "description",
        content:
          "Synca connects talent, skills, communities and opportunities to build Africa's digital economy.",
      },
      { property: "og:title", content: "Synca — Synchronize Africa" },
      {
        property: "og:description",
        content:
          "The digital gateway of a pan-African ecosystem connecting talent, communities, builders and opportunity.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Synca",
          alternateName: "Synchronize Africa",
          slogan: "Build. Connect. Grow.",
          url: "/",
        }),
      },
    ],
  }),
  component: Home,
});

const loop = [
  "COMMUNITY",
  "TALENT",
  "SKILLS",
  "BUILDERS",
  "PROJECTS",
  "PRODUCTS",
  "OPPORTUNITIES",
  "ECONOMIC IMPACT",
];

const gaps: [string, string][] = [
  ["Education ↔ Industry", "Les formations ne sont pas toujours connectées aux besoins réels des entreprises."],
  ["Talent ↔ Opportunity", "Des compétences existent, mais la visibilité, les réseaux et les accès manquent."],
  ["Community ↔ Industry", "Les communautés Tech créent de la valeur, souvent sous-connectée à l'économie."],
  ["Startup ↔ Market", "Les startups cherchent talents, clients, partenaires et marchés."],
  ["Technology ↔ Economy", "Une technologie n'a d'impact que lorsqu'elle rencontre un besoin réel."],
];

const pillars: [string, string, string][] = [
  ["01", "Skills", "Développer des compétences adaptées aux besoins réels du marché."],
  ["02", "Talent", "Identifier, révéler et connecter les talents africains."],
  ["03", "Communities", "Renforcer les communautés qui font vivre l'écosystème Tech."],
  ["04", "Builders", "Donner aux contributeurs les moyens de construire des projets utiles."],
  ["05", "Innovation", "Transformer les problèmes africains en solutions concrètes."],
  ["06", "Opportunity", "Créer des connexions entre talents, entreprises, startups et institutions."],
];

const audiences: [string, string, string, string][] = [
  ["Talent", "Learn. Build. Connect. Grow.", "Rejoindre Synca", "/contact"],
  ["Community", "Strengthen your community. Connect it to opportunity.", "Community Certified", "/communities/certified"],
  ["Company", "Find talent. Build partnerships. Solve problems.", "Collaborer avec Synca", "/partners"],
  ["Institution", "Build stronger digital ecosystems.", "Devenir partenaire", "/partners"],
];

function useCountdown(target: string) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (now === null) return null;
  const diff = Math.max(0, new Date(target).getTime() - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Home() {
  const c = useCountdown("2027-03-16T09:00:00Z");

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-ink-border bg-ink px-5 pb-24 pt-24 text-ink-foreground sm:px-8 sm:pb-32 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 opacity-[0.10] rule-grid" />
        <div className="pointer-events-none absolute -right-24 top-10 hidden h-[520px] w-[520px] lg:block">
          <ConnectionGraph />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <Eyebrow ink>Synca — Synchronize Africa</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[0.98] sm:text-8xl">
            Synchronize
            <br />
            Africa<span className="text-primary">.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted sm:text-xl">
            We connect talent, skills, communities and opportunities to build Africa's digital
            economy.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-ink-muted/80">
            Nous connectons les talents, les compétences, les communautés et les opportunités pour
            construire l'économie numérique africaine.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <CTALink to="/contact">Rejoindre Synca</CTALink>
            <CTALink to="/programs" variant="ghost">
              Découvrir l'écosystème
            </CTALink>
            <CTALink to="/partners" variant="ghost">
              Collaborer avec Synca
            </CTALink>
          </div>
          <p className="mt-12 font-mono text-xs tracking-[0.2em] text-primary">
            BUILD. CONNECT. GROW.
          </p>
        </div>
      </section>

      {/* MODEL LOOP */}
      <Section>
        <Eyebrow>The Synca model</Eyebrow>
        <SectionTitle>From community to opportunity.</SectionTitle>
        <Lead>
          Un écosystème ne se construit pas uniquement avec des technologies. Il se construit avec
          des personnes qui apprennent, partagent, construisent et se connectent.
        </Lead>
        <ol className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {loop.map((step, i) => (
            <li key={step} className="bg-card p-6">
              <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-4 font-display text-lg font-semibold tracking-tight">{step}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                → {(loop[(i + 1) % loop.length] ?? "").toLowerCase()}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-6 font-mono text-xs text-muted-foreground">
          … et l'impact renforce la communauté. La boucle recommence.
        </p>
      </Section>

      {/* PROBLEM */}
      <Section ink>
        <Eyebrow ink>The problem</Eyebrow>
        <SectionTitle>Africa has talent. The challenge is connecting it to opportunity.</SectionTitle>
        <Lead ink>L'Afrique ne manque pas de talents. Elle manque de connexions.</Lead>
        <div className="mt-14 divide-y divide-ink-border border-y border-ink-border">
          {gaps.map(([title, text]) => (
            <div key={title} className="grid gap-2 py-6 md:grid-cols-[280px_1fr] md:gap-10">
              <p className="font-display text-lg font-semibold">{title}</p>
              <p className="text-sm leading-relaxed text-ink-muted">{text}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-lg font-medium">Synca travaille à synchroniser ces mondes.</p>
      </Section>

      {/* PILLARS */}
      <Section>
        <Eyebrow>Pillars</Eyebrow>
        <SectionTitle>Six leviers, un seul écosystème.</SectionTitle>
        <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map(([i, t, d]) => (
            <NumberedCard key={i} index={i} title={t}>
              {d}
            </NumberedCard>
          ))}
        </div>
      </Section>

      {/* COMMUNITIES */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Communities</Eyebrow>
            <SectionTitle className="text-3xl sm:text-4xl">
              Communities are the invisible infrastructure of the Tech ecosystem.
            </SectionTitle>
            <div className="mt-8 space-y-2 text-sm text-muted-foreground">
              <p>Avant les startups, il y a des personnes qui apprennent ensemble.</p>
              <p>Avant les produits, il y a des personnes qui expérimentent.</p>
              <p>Avant les carrières, il y a des rencontres.</p>
              <p>Avant l'innovation, il y a souvent une communauté.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTALink to="/communities">Community Directory</CTALink>
              <CTALink to="/communities/certified" variant="outline">
                Community Certified
              </CTALink>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-px self-start bg-border">
            {[
              "Diffusion des connaissances",
              "Apprentissage collectif",
              "Émergence des talents",
              "Networking",
              "Mentoring",
              "Expérimentation",
              "Création de projets",
              "Circulation des opportunités",
              "Inclusion",
              "Connexion avec les entreprises",
            ].map((f) => (
              <li key={f} className="bg-background p-5 text-sm">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* BUILDERS */}
      <Section ink>
        <Eyebrow ink>Synca Builders</Eyebrow>
        <SectionTitle>Don't just consume the ecosystem. Build it.</SectionTitle>
        <Lead ink>
          Build with the ecosystem. For the ecosystem. Synca Builders est le réseau de contributeurs
          qui participent activement à la construction de l'écosystème.
        </Lead>
        <div className="mt-10 flex flex-wrap gap-2">
          {["Build", "Code", "Research", "Community", "Content", "Events", "Design", "Growth", "Mentor"].map(
            (t) => (
              <span
                key={t}
                className="border border-ink-border px-4 py-2 font-mono text-xs uppercase tracking-widest"
              >
                {t}
              </span>
            ),
          )}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <CTALink to="/builders">Become a Builder</CTALink>
          <CTALink to="/builders/projects" variant="ghost">
            Builders Projects
          </CTALink>
        </div>
      </Section>

      {/* CONF */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Eyebrow>Synca Conf 2027</Eyebrow>
            <SectionTitle>Dakar — Sénégal · 16–18 mars 2027</SectionTitle>
            <Lead>
              «Former pour l'économie réelle : combler le fossé entre éducation, compétences et
              emploi dans la Tech en Afrique.»
            </Lead>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTALink to="/conf">Participer</CTALink>
              <CTALink to="/partners" variant="outline">
                Devenir partenaire
              </CTALink>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-px bg-border">
            {[
              ["Days", c?.days],
              ["Hrs", c?.hours],
              ["Min", c?.minutes],
              ["Sec", c?.seconds],
            ].map(([label, value]) => (
              <div key={label as string} className="bg-card px-6 py-6 text-center">
                <p className="font-display text-3xl font-bold tabular-nums">
                  {value === undefined || value === null ? "—" : String(value).padStart(2, "0")}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {label as string}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* AUDIENCES */}
      <Section>
        <Eyebrow>Pour qui ?</Eyebrow>
        <SectionTitle>Quatre parcours dans un même écosystème.</SectionTitle>
        <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map(([who, line, cta, to]) => (
            <div key={who} className="flex flex-col justify-between bg-card p-7">
              <div>
                <h3 className="font-display text-xl font-semibold">{who}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{line}</p>
              </div>
              <Link
                to={to as never}
                className="mt-8 text-sm font-medium text-primary hover:underline"
              >
                {cta} →
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* MANIFESTO */}
      <Section ink>
        <h2 className="max-w-4xl text-4xl font-bold leading-tight sm:text-6xl">
          Africa doesn't need more spectators.
          <br />
          <span className="text-primary">It needs builders.</span>
        </h2>
        <div className="mt-10 max-w-2xl space-y-3 text-base text-ink-muted sm:text-lg">
          <p>We believe in the people who learn together.</p>
          <p>We believe in the communities that create opportunities.</p>
          <p>We believe in the builders who turn problems into products.</p>
          <p>We believe technology becomes powerful when it meets people, markets and purpose.</p>
          <p className="text-ink-foreground">We are not building for the ecosystem.</p>
          <p className="text-ink-foreground">We are building with it.</p>
        </div>
        <p className="mt-10 font-mono text-xs tracking-[0.2em] text-primary">
          BUILD. CONNECT. GROW.
        </p>
        <div className="mt-8">
          <CTALink to="/contact">Join the ecosystem</CTALink>
        </div>
      </Section>
    </>
  );
}

function ConnectionGraph() {
  const nodes: [number, number][] = [
    [50, 30],
    [160, 70],
    [90, 140],
    [230, 150],
    [140, 240],
    [260, 260],
    [60, 300],
    [200, 350],
    [330, 90],
    [340, 300],
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 4],
    [1, 3],
    [3, 5],
    [4, 5],
    [2, 6],
    [4, 7],
    [5, 7],
    [1, 8],
    [3, 8],
    [5, 9],
    [8, 9],
  ];
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a]![0]}
          y1={nodes[a]![1]}
          x2={nodes[b]![0]}
          y2={nodes[b]![1]}
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i % 3 === 0 ? 6 : 3.5}
          className={i % 3 === 0 ? "fill-primary" : "fill-current"}
          opacity={i % 3 === 0 ? 1 : 0.5}
        >
          <animate
            attributeName="r"
            values={i % 3 === 0 ? "6;8;6" : "3.5;5;3.5"}
            dur={`${3 + (i % 4)}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}
