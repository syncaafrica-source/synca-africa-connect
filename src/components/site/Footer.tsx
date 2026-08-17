import { Link } from "@tanstack/react-router";
import { useState } from "react";

const groups: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "About", to: "/about" },
      { label: "Programs", to: "/programs" },
      { label: "Communities", to: "/communities" },
      { label: "Builders", to: "/builders" },
      { label: "Products", to: "/products" },
      { label: "Opportunities", to: "/opportunities" },
    ],
  },
  {
    title: "Events",
    links: [
      { label: "Synca Conf", to: "/conf" },
      { label: "Hackathons", to: "/opportunities" },
      { label: "Workshops", to: "/programs" },
    ],
  },
  {
    title: "Ecosystem",
    links: [
      { label: "Community Certified", to: "/communities/certified" },
      { label: "Builder Network", to: "/builders" },
      { label: "Open Source", to: "/builders/open-source" },
      { label: "Partners", to: "/partners" },
    ],
  },
  {
    title: "Media",
    links: [
      { label: "News", to: "/news" },
      { label: "Insights", to: "/news" },
      { label: "Success Stories", to: "/stories" },
      { label: "Team", to: "/team" },
    ],
  },
];

const socials = ["LinkedIn", "X", "Instagram", "YouTube", "GitHub"];

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer className="bg-ink px-5 py-16 text-ink-foreground sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="font-display text-3xl font-bold">SYNCA</p>
            <p className="mt-1 text-sm text-ink-muted">Synchronize Africa.</p>
            <p className="mt-8 text-sm font-medium">Stay synchronized.</p>
            <form
              className="mt-3 flex max-w-sm gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.includes("@")) setDone(true);
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-sm border border-ink-border bg-transparent px-3 py-2 text-sm placeholder:text-ink-muted focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                Subscribe
              </button>
            </form>
            {done && <p className="mt-2 text-xs text-primary">Thanks — you're on the list.</p>}
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {groups.map((g) => (
              <div key={g.title}>
                <p className="eyebrow text-ink-muted">{g.title}</p>
                <ul className="mt-4 space-y-2">
                  {g.links.map((l) => (
                    <li key={l.label + l.to}>
                      <Link
                        to={l.to as never}
                        className="text-sm text-ink-muted transition-colors hover:text-primary"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-muted">© Synca — Synchronize Africa</p>
          <div className="flex flex-wrap gap-5">
            {socials.map((s) => (
              <span key={s} className="text-xs text-ink-muted">
                {s}
              </span>
            ))}
          </div>
          <p className="font-mono text-xs text-primary">Build. Connect. Grow.</p>
        </div>
      </div>
    </footer>
  );
}
