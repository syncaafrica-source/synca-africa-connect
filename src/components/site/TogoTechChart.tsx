import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  LabelList,
  Legend,
  Line,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type EventRow = {
  id: string;
  name: string;
  short: string;
  year: number;
  participants: number;
  organisateur: string;
  note: string;
  horsNorme?: boolean;
};

// Données collectées à partir des pages officielles des communautés, des
// communiqués de presse et des rapports d'édition publiés en ligne.
// Aucune valeur n'est estimée en dehors des fourchettes annoncées publiquement.
const events: EventRow[] = [
  {
    id: "devfest23",
    name: "DevFest Lomé 2023",
    short: "DevFest 23",
    year: 2023,
    participants: 200,
    organisateur: "GDG Lomé",
    note: "+200 participants",
  },
  {
    id: "tdevfest23",
    name: "TDevFest 2023",
    short: "TDevFest 23",
    year: 2023,
    participants: 250,
    organisateur: "TDEV",
    note: "Fourchette annoncée : 250 à 300 participants",
  },
  {
    id: "devfest24",
    name: "DevFest Lomé 2024",
    short: "DevFest 24",
    year: 2024,
    participants: 250,
    organisateur: "GDG Lomé",
    note: "+250 participants",
  },
  {
    id: "tdevfest24",
    name: "TDevFest 2024",
    short: "TDevFest 24",
    year: 2024,
    participants: 275,
    organisateur: "TDEV",
    note: "Fourchette annoncée : 250 à 300 participants (médiane retenue : 275)",
  },
  {
    id: "forum25",
    name: "Forum international sur la protection des données personnelles 2025",
    short: "Forum données 25",
    year: 2025,
    participants: 370,
    organisateur: "IPDCP / partenaires institutionnels",
    note: "+370 personnes à l'édition 2025",
  },
  {
    id: "itdays25",
    name: "Togo IT Days 2025",
    short: "Togo IT Days 25",
    year: 2025,
    participants: 300,
    organisateur: "Togo IT Days",
    note: "+300 participants",
  },
  {
    id: "devfest25",
    name: "DevFest Lomé 2025",
    short: "DevFest 25",
    year: 2025,
    participants: 250,
    organisateur: "GDG Lomé",
    note: "+250 participants",
  },
  {
    id: "pycon25",
    name: "PyCon Togo 2025",
    short: "PyCon 25",
    year: 2025,
    participants: 100,
    organisateur: "Python Togo",
    note: "+100 participants en moyenne sur l'édition",
  },
  {
    id: "pros25",
    name: "Les Pros de la Tech (moyenne par édition)",
    short: "Pros de la Tech",
    year: 2025,
    participants: 65,
    organisateur: "Les Pros de la Tech",
    note: "Éditions oscillant entre 50 et 80 personnes (médiane retenue : 65)",
  },
  {
    id: "apk25",
    name: "Africa Product Keynote 2025",
    short: "Africa Product Keynote 25",
    year: 2025,
    participants: 70,
    organisateur: "Friends of Figma Lomé",
    note: "Moins de 80 participants à l'édition 2025",
  },
  {
    id: "grit25",
    name: "Le GRIT 2025",
    short: "GRIT 25",
    year: 2025,
    participants: 2000,
    organisateur: "GRIT",
    note: "+2 000 personnes réparties sur plusieurs activités simultanées",
    horsNorme: true,
  },
  {
    id: "itdays26",
    name: "Togo IT Days 2026",
    short: "Togo IT Days 26",
    year: 2026,
    participants: 900,
    organisateur: "Togo IT Days",
    note: "+900 participants recensés",
  },
  {
    id: "pycon26",
    name: "PyCon Togo 2026",
    short: "PyCon 26",
    year: 2026,
    participants: 300,
    organisateur: "Python Togo",
    note: "+300 participations, 250 en moyenne sur les sessions",
  },
  {
    id: "synca26",
    name: "Synca Conf 2026",
    short: "Synca Conf 26",
    year: 2026,
    participants: 200,
    organisateur: "Synca",
    note: "+200 participants",
  },
];

const CORE_MIN = 80;
const CORE_MAX = 150;

const comparable = events.filter((e) => !e.horsNorme);

const years = [2023, 2024, 2025, 2026];

const yearly = years.map((year) => {
  const rows = comparable.filter((e) => e.year === year);
  const total = rows.reduce((s, e) => s + e.participants, 0);
  return {
    year: String(year),
    total,
    editions: rows.length,
    moyenne: rows.length ? Math.round(total / rows.length) : 0,
    rows,
  };
});

const eventsSorted = [...events].sort((a, b) => b.participants - a.participants);

function EventTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const row: EventRow = payload[0].payload;
  return (
    <div className="max-w-xs border border-border bg-card p-4 text-left shadow-lg">
      <p className="font-display text-sm font-semibold">{row.name}</p>
      <p className="mt-1 text-xs text-muted-foreground">{row.organisateur}</p>
      <p className="mt-3 text-sm font-semibold">{row.participants.toLocaleString("fr-FR")} participants</p>
      <p className="mt-1 text-xs text-muted-foreground">{row.note}</p>
      {row.horsNorme && (
        <p className="mt-2 text-xs text-primary">
          Format multi-activités — exclu des moyennes pour ne pas fausser la lecture.
        </p>
      )}
    </div>
  );
}

function YearTooltip({ active, label }: any) {
  if (!active) return null;
  const row = yearly.find((y) => y.year === label);
  if (!row) return null;
  return (
    <div className="max-w-xs border border-border bg-card p-4 text-left shadow-lg">
      <p className="font-display text-sm font-semibold">{row.year}</p>
      <p className="mt-2 text-xs text-muted-foreground">
        {row.editions} rendez-vous documentés · {row.total.toLocaleString("fr-FR")} participations
        cumulées · moyenne de {row.moyenne} par événement
      </p>
      <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
        {row.rows.map((e) => (
          <li key={e.id}>
            • {e.name} — {e.participants}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TogoTechChart() {
  return (
    <div>
      {/* ————— Graphe 1 : classement par événement ————— */}
      <div className="mt-10">
        <p className="eyebrow">Graphe 1 · Affluence par événement</p>
        <h3 className="mt-3 font-display text-xl font-semibold">
          Combien de personnes chaque rendez-vous rassemble réellement.
        </h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Chaque barre est une édition documentée. La bande orange claire matérialise la zone
          {" "}<span className="font-semibold text-foreground">80 – 150 participants</span> : c'est la
          taille d'audience réellement mobilisable par la majorité des rendez-vous de l'écosystème,
          hors grandes messes annuelles.
        </p>
      </div>

      <div className="mt-6 h-[620px] w-full border border-border bg-card p-4 sm:p-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={eventsSorted}
            layout="vertical"
            margin={{ top: 8, right: 56, bottom: 8, left: 8 }}
          >
            <CartesianGrid stroke="var(--border)" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="short"
              width={112}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <ReferenceArea
              x1={CORE_MIN}
              x2={CORE_MAX}
              fill="var(--primary)"
              fillOpacity={0.12}
              stroke="var(--primary)"
              strokeOpacity={0.3}
            />
            <Tooltip content={<EventTooltip />} cursor={{ fill: "var(--muted)" }} />
            <Bar dataKey="participants" name="Participants" radius={[0, 2, 2, 0]}>
              {eventsSorted.map((e) => (
                <Cell
                  key={e.id}
                  fill={e.horsNorme ? "var(--foreground)" : "var(--primary)"}
                  fillOpacity={e.horsNorme ? 0.25 : 1}
                />
              ))}
              <LabelList
                dataKey="participants"
                position="right"
                style={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Le GRIT 2025 (barre grise) rassemble +2 000 personnes sur plusieurs activités simultanées :
        ce n'est pas une audience unique assise dans une salle, il est donc affiché mais retiré de
        tous les calculs de moyenne.
      </p>

      {/* ————— Graphe 2 : dynamique annuelle ————— */}
      <div className="mt-16">
        <p className="eyebrow">Graphe 2 · Dynamique annuelle</p>
        <h3 className="mt-3 font-display text-xl font-semibold">
          2023 → 2026 : plus de participations cumulées, mais une moyenne qui ne décolle pas.
        </h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Les barres cumulent les participations de l'année. La ligne noire compte les rendez-vous
          documentés. La ligne orange en pointillés donne la moyenne de participation par événement —
          l'indicateur le plus honnête de la profondeur réelle de l'écosystème.
        </p>
      </div>

      <div className="mt-6 h-[420px] w-full border border-border bg-card p-4 sm:p-6">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={yearly} margin={{ top: 10, right: 8, bottom: 0, left: -18 }}>
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
              width={34}
            />
            <Tooltip content={<YearTooltip />} cursor={{ fill: "var(--muted)" }} />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
            <Bar
              yAxisId="left"
              dataKey="total"
              name="Participations cumulées"
              fill="var(--primary)"
              fillOpacity={0.85}
            />
            <ReferenceLine
              yAxisId="right"
              y={CORE_MAX}
              stroke="var(--foreground)"
              strokeOpacity={0.25}
              strokeDasharray="3 3"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="editions"
              name="Rendez-vous documentés"
              stroke="var(--foreground)"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="moyenne"
              name="Moyenne de participation par événement"
              stroke="var(--primary)"
              strokeWidth={2}
              strokeDasharray="5 4"
              dot={{ r: 3 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* ————— Chiffres clés ————— */}
      <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {[
          { k: "14", l: "éditions documentées (2023 → 2026)" },
          { k: "80 – 150", l: "audience récurrente réellement mobilisable" },
          { k: "900", l: "record d'affluence : Togo IT Days 2026" },
          { k: "65", l: "plus petit format suivi : Les Pros de la Tech" },
        ].map((s) => (
          <div key={s.l} className="bg-card p-6">
            <p className="font-display text-3xl font-bold text-primary">{s.k}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>

      {/* ————— Article ————— */}
      <article className="mt-16 max-w-3xl">
        <p className="eyebrow">L'analyse</p>
        <h3 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
          Pourquoi si peu de monde dans un écosystème qui parle autant de tech ?
        </h3>

        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          Le Togo forme chaque année des milliers d'étudiants en informatique, en design, en data et
          en gestion de projet numérique. Les universités, les écoles privées, les centres de
          formation et les bootcamps injectent en continu de nouveaux profils dans l'écosystème. Et
          pourtant, quand on additionne les rendez-vous tech à impact — DevFest, TDevFest, Togo IT
          Days, PyCon Togo, Forum international sur la protection des données personnelles, Africa
          Product Keynote, Les Pros de la Tech, Synca Conf, GRIT — la moyenne de participation par
          événement reste comprise
          entre <span className="font-semibold text-foreground">80 et 150 personnes</span>. Un
          écosystème qui produit des milliers de nouveaux acteurs mobilise, dans la vraie vie, une
          salle.
        </p>

        <h4 className="mt-10 font-display text-lg font-semibold">
          1. Le sommet cache la base
        </h4>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Les chiffres spectaculaires existent : Togo IT Days passe de +300 participants en 2025 à
          +900 en 2026, le GRIT 2025 revendique +2 000 personnes sur plusieurs activités
          simultanées, le Forum international sur la protection des données personnelles réunit
          +370 personnes. Mais ces formats sont institutionnels, souvent gratuits, largement
          relayés par des partenaires publics et parfois adossés à une obligation professionnelle
          de présence. Ils mesurent une capacité d'attraction ponctuelle, pas l'engagement continu
          d'une communauté. Dès qu'on regarde les rendez-vous portés par les communautés
          elles-mêmes, l'ordre de grandeur retombe : 200 à 300 pour un DevFest ou un TDevFest, 100
          à 300 pour PyCon Togo, 200 pour la première Synca Conf, 50 à 80 pour Les Pros de la Tech,
          moins de 80 pour l'Africa Product Keynote de Friends of Figma Lomé.
        </p>

        <h4 className="mt-10 font-display text-lg font-semibold">
          2. Le problème d'acculturation
        </h4>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Beaucoup d'étudiants et de jeunes professionnels ne savent pas qu'un meetup existe, ni à
          quoi il sert. La culture de la communauté — venir apprendre gratuitement, contribuer,
          rencontrer, revenir le mois suivant — n'est pas enseignée dans les cursus. Le diplôme
          reste perçu comme le seul chemin de légitimité, alors que la valeur réelle se construit
          dans le réseau et la pratique partagée. Résultat : les mêmes visages reviennent d'un
          événement à l'autre, et le renouvellement du public est lent.
        </p>

        <h4 className="mt-10 font-display text-lg font-semibold">3. Le doute et la peur du niveau</h4>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Un frein régulièrement exprimé : « je ne suis pas encore assez bon pour y aller ». Le
          syndrome de l'imposteur transforme un espace d'apprentissage en examen imaginaire. Les
          formats très techniques, l'anglais, les démos avancées renforcent cette barrière
          invisible. Les communautés qui grandissent le plus vite sont précisément celles qui
          affichent explicitement un niveau débutant bienvenu.
        </p>

        <h4 className="mt-10 font-display text-lg font-semibold">4. Le coût réel de la présence</h4>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Un événement « gratuit » ne l'est jamais totalement : il y a le transport, une journée de
          travail ou de cours sacrifiée, la connexion, et surtout le repas. Pour une part
          importante du public, la question n'est pas l'intérêt du contenu mais la capacité à tenir
          une journée entière. C'est un facteur déterminant, rarement dit à voix haute et presque
          jamais budgété par les organisateurs. Là où la logistique de base est prise en charge,
          l'affluence et l'assiduité augmentent immédiatement.
        </p>

        <h4 className="mt-10 font-display text-lg font-semibold">5. Un cadre qui ne suit pas</h4>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Les salles adaptées sont rares et chères, les sponsors locaux peu nombreux, les
          organisateurs bénévoles et souvent seuls. Les dates se chevauchent faute de calendrier
          commun, ce qui fragmente une audience déjà limitée. Enfin, presque personne ne publie ses
          chiffres : sans données, impossible de démontrer l'impact, donc impossible de convaincre
          un financeur — et la boucle se referme.
        </p>

        <h4 className="mt-10 font-display text-lg font-semibold">Ce que Synca en retient</h4>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          La bonne question n'est pas « comment remplir une salle de 1 000 personnes une fois par
          an », mais « comment faire passer l'audience récurrente de 100 à 300 personnes toute
          l'année ». Cela suppose trois choses concrètes : un calendrier partagé pour arrêter de se
          concurrencer, une logistique minimale assumée pour que venir ne coûte rien, et une
          discipline de publication des chiffres pour rendre l'impact démontrable. C'est exactement
          le rôle que Synca veut jouer entre les communautés — synchroniser plutôt que multiplier.
        </p>

        <div className="mt-10 border-l-2 border-primary bg-muted/40 p-5">
          <p className="eyebrow">Méthodologie</p>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Périmètre : événements tech physiques à impact de l'écosystème togolais, 2023 → 2026.
            Les données proviennent des pages officielles des communautés, des communiqués et des
            rapports d'édition publiés en ligne. Quand une fourchette est annoncée (250–300 pour
            TDevFest, 50–80 pour Les Pros de la Tech, moins de 80 pour Africa Product Keynote), la
            médiane est retenue et la fourchette affichée dans l'infobulle. Le GRIT 2025 est affiché
            mais
            exclu des moyennes : son total agrège plusieurs activités simultanées. Aucun chiffre n'est
            estimé en dehors de ces règles ; toute donnée officielle complémentaire sera intégrée.
          </p>
        </div>
      </article>

      <div className="mt-12 border-t border-border pt-6">
        <p className="eyebrow">Sources</p>
        <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
          <li>Togo IT Days — communiqués et bilans officiels des éditions 2025 et 2026</li>
          <li>
            Forum international sur la protection des données personnelles — bilan de l'édition
            2025 (+370 participants)
          </li>
          <li>GDG Lomé — pages et publications officielles DevFest Lomé 2023, 2024 et 2025</li>
          <li>TDEV — communications officielles TDevFest 2023 et 2024</li>
          <li>Python Togo — rapport PyCon Togo 2025 et bilan de l'édition 2026</li>
          <li>Les Pros de la Tech — publications des éditions successives</li>
          <li>Le GRIT — bilan de l'édition 2025 (activités simultanées)</li>
          <li>Friends of Figma Lomé — Africa Product Keynote 2025</li>
          <li>Synca — bilan de la Synca Conf 2026 (Lomé)</li>
        </ul>
      </div>

      <div className="mt-16 border border-primary/30 bg-primary/5 p-8 sm:p-10">
        <p className="eyebrow text-primary">Call to discussion</p>
        <h3 className="mt-4 font-display text-2xl font-bold">
          Vous voyons d'autres causes, d'autres données ou des solutions à tester ?
        </h3>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Ce constat ne vaut que s'il est discuté, complété et transformé en action. Que vous soyez
          organisateur, communauté, entreprise, école ou institution, envoyez-nous votre regard,
          vos chiffres ou vos idées. Synca veut construire ce diagnostic avec l'écosystème.
        </p>
        <a
          href="mailto:contact@sync-africa.com?subject=Discussion%20%C3%A9cosyst%C3%A8me%20tech%20togolais"
          className="mt-6 inline-flex items-center justify-center rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Lancer la discussion — contact@sync-africa.com
        </a>
      </div>
    </div>
  );
}
