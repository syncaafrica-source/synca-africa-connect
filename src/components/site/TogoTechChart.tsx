import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Row = {
  year: string;
  presentiel: number;
  online: number;
  rendezVous: number;
  structures: number;
  faits: string[];
};

// Toutes les valeurs ci-dessous proviennent de sources publiques (voir la liste
// des sources sous le graphe). Les années sans chiffre publié restent à 0 :
// aucune donnée n'est estimée ni inventée.
const data: Row[] = [
  { year: "2020", presentiel: 0, online: 0, rendezVous: 1, structures: 1, faits: ["Création de TDEV (Lomé)"] },
  { year: "2021", presentiel: 0, online: 0, rendezVous: 0, structures: 1, faits: ["Pas de donnée publique"] },
  { year: "2022", presentiel: 0, online: 0, rendezVous: 1, structures: 2, faits: ["Création de Friends of Figma Lomé"] },
  { year: "2023", presentiel: 0, online: 0, rendezVous: 0, structures: 2, faits: ["Pas de donnée publique"] },
  { year: "2024", presentiel: 0, online: 0, rendezVous: 1, structures: 2, faits: ["1re édition African Product Keynote (FoF Lomé)"] },
  {
    year: "2025",
    presentiel: 250,
    online: 200,
    rendezVous: 4,
    structures: 4,
    faits: [
      "PyCon Togo, 1re édition — 23 août, UniPod, Université de Lomé",
      "250 participants sur place, 200+ en ligne, 5 000+ vues YouTube",
      "2e édition African Product Keynote",
      "Lancement de TogoTech (13 → 15 startups) et des Synergy Days",
    ],
  },
  { year: "2026", presentiel: 0, online: 0, rendezVous: 1, structures: 4, faits: ["3e édition African Product Keynote — mars, Lomé"] },
  { year: "2027", presentiel: 0, online: 0, rendezVous: 1, structures: 5, faits: ["Synca Conf — Dakar (annoncée)"] },
];

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const row = data.find((d) => d.year === label);
  if (!row) return null;
  return (
    <div className="max-w-xs border border-border bg-card p-4 text-left shadow-lg">
      <p className="font-display text-sm font-semibold">{row.year}</p>
      <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
        {row.faits.map((f) => (
          <li key={f}>• {f}</li>
        ))}
      </ul>
      <p className="mt-3 text-xs">
        Participants documentés :{" "}
        <span className="font-semibold">
          {row.presentiel + row.online > 0 ? row.presentiel + row.online : "non publié"}
        </span>
      </p>
    </div>
  );
}

export function TogoTechChart() {
  return (
    <div>
      <div className="mt-10 h-[420px] w-full border border-border bg-card p-4 sm:p-6">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 8, bottom: 0, left: -18 }}>
            <CartesianGrid stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
              width={28}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--muted)" }} />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
            <Bar
              yAxisId="left"
              dataKey="presentiel"
              name="Participants sur place"
              stackId="p"
              fill="var(--primary)"
            />
            <Bar
              yAxisId="left"
              dataKey="online"
              name="Participants en ligne"
              stackId="p"
              fill="var(--foreground)"
              fillOpacity={0.28}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="rendezVous"
              name="Rendez-vous tech documentés"
              stroke="var(--foreground)"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="structures"
              name="Communautés / collectifs actifs (cumul)"
              stroke="var(--primary)"
              strokeWidth={2}
              strokeDasharray="5 4"
              dot={{ r: 3 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <h3 className="font-display text-xl font-semibold">Comment lire ce graphe</h3>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <li>
              <span className="font-semibold text-foreground">Les barres orange et grises</span> (axe
              de gauche) comptent les participants réellement publiés par les organisateurs :
              présentiel en orange, audience en ligne en gris. Une seule année dispose aujourd'hui
              d'un chiffre officiel — 2025, avec PyCon Togo.
            </li>
            <li>
              <span className="font-semibold text-foreground">La ligne noire</span> (axe de droite)
              suit le nombre de rendez-vous tech documentés dans l'année : elle passe de 1 en 2020 à
              4 en 2025.
            </li>
            <li>
              <span className="font-semibold text-foreground">La ligne orange en pointillés</span>
              {" "}cumule les communautés et collectifs structurés encore actifs : TDEV (2020),
              Friends of Figma Lomé (2022), Python Togo et TogoTech (2025), puis Synca.
            </li>
            <li>Survolez une année pour voir le détail des faits qui la composent.</li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-xl font-semibold">Ce que le graphe raconte</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            L'écosystème togolais ne grandit pas linéairement : il change de palier. Entre 2020 et
            2024, l'activité repose sur quelques communautés qui construisent patiemment leur base
            (TDEV, puis Friends of Figma Lomé et la première African Product Keynote). 2025 est
            l'année de bascule : la première PyCon Togo réunit 250 personnes sur place et plus de
            200 en ligne, l'African Product Keynote s'installe, et 15 startups s'organisent en
            collectif national avec TogoTech. En quelques mois, l'écosystème passe de communautés
            isolées à un réseau qui parle d'une seule voix. 2026 confirme la régularité (3e édition
            de l'APK) et 2027 ouvre l'échelle régionale avec la Synca Conf à Dakar.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            La leçon est aussi méthodologique : la plupart des années sont vides de chiffres non
            parce qu'il ne s'y passe rien, mais parce que peu d'organisateurs publient leurs
            données. Mesurer l'écosystème fait partie du travail de Synca — ce graphe s'enrichira à
            mesure que les communautés partageront leurs rapports.
          </p>
        </div>
      </div>

      <div className="mt-10 border-t border-border pt-6">
        <p className="eyebrow">Sources</p>
        <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
          <li>Rapport officiel PyCon Togo 2025 — report.pytogo.org</li>
          <li>Friends of Figma Lomé (fof.tg et publications LinkedIn de la communauté)</li>
          <li>Page LinkedIn TDEV (organisation fondée en 2020 à Lomé)</li>
          <li>Togo First et CIO Mag — lancement de TogoTech, 24 octobre 2025</li>
          <li>Synca — annonce de la Synca Conf 2027 (Dakar)</li>
        </ul>
      </div>
    </div>
  );
}
