import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Section, Eyebrow, SectionTitle } from "@/components/site/ui";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Synca — Join, partner or build with us" },
      {
        name: "description",
        content:
          "Join Synca, certify your community, become a Builder or partner with us. Tell us what you want to build.",
      },
      { property: "og:title", content: "Contact Synca" },
      { property: "og:description", content: "Join, build or partner with the Synca ecosystem." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const topics = [
  "Join Synca",
  "Partnership",
  "Community",
  "Builder",
  "Program",
  "Product",
  "Media",
  "General inquiry",
];

function Contact() {
  const [topic, setTopic] = useState(topics[0]!);
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Dites-nous ce que vous voulez construire.</>}
        lead="Chaque message entre dans un parcours : rejoindre, certifier, contribuer ou collaborer."
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow>Objet</Eyebrow>
            <SectionTitle className="text-3xl sm:text-4xl">Choisissez un parcours.</SectionTitle>
            <div className="mt-8 flex flex-wrap gap-2">
              {topics.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTopic(t)}
                  className={`border px-4 py-2 text-sm transition-colors ${
                    topic === t
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {sent ? (
            <div className="border border-primary bg-card p-10">
              <h3 className="font-display text-2xl font-bold">Message prêt à être envoyé.</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Le formulaire fonctionne côté interface. Pour recevoir réellement les messages
                (base de données + email), il faut activer le backend du site.
              </p>
            </div>
          ) : (
            <form
              className="grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nom complet" name="name" />
                <Field label="Email" name="email" type="email" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Organisation / Communauté" name="org" required={false} />
                <Field label="Pays" name="country" />
              </div>
              <label className="grid gap-2">
                <span className="text-sm font-medium">Message · {topic}</span>
                <textarea
                  required
                  rows={6}
                  className="rounded-sm border border-input bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none"
                />
              </label>
              <button
                type="submit"
                className="justify-self-start rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Envoyer
              </button>
            </form>
          )}
        </div>
      </Section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="rounded-sm border border-input bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none"
      />
    </label>
  );
}
