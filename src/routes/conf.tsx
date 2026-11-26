import { createFileRoute } from '@tanstack/react-router';
import { ArrowDown, CalendarDays, MapPin, Mic2, Code2, Presentation, Cpu, ShieldCheck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section, Eyebrow, SectionTitle, Lead } from '@/components/site/ui';
import { TallyEmbed } from '@/components/conference/TallyEmbed';
import { event, defaultContent, partnerCategories } from '@/lib/conference/content';
import monument from '@/assets/lome-monument.webp.asset.json';

export const Route = createFileRoute('/conf')({
  head: () => ({
    meta: [
      { title: 'Synca Conf 2027 — Lomé, Togo · 14–15 mai 2027' },
      { name: 'description', content: 'Synca Conf 2027 – Édition Lomé. Made in Africa, Powered by Tech. Rendez-vous les 14 et 15 mai 2027, avec un side event le 13 mai : innovation, IA, logiciel, cybersécurité et JobTech.' },
      { property: 'og:title', content: event.name },
      { property: 'og:description', content: 'Made in Africa, Powered by Tech. Lomé, Togo · 14–15 mai 2027 · Side event le 13 mai.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    scripts: [{ type: 'application/ld+json', children: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Event', name: event.name,
      startDate: event.startDate, endDate: event.endDate, description: event.theme,
      eventStatus: 'https://schema.org/EventScheduled',
      location: { '@type': 'Place', name: 'Lomé, Togo', address: { '@type': 'PostalAddress', addressLocality: event.city, addressCountry: 'TG' } },
      organizer: { '@type': 'Organization', name: 'Synca' },
    }) }],
  }),
  component: Conf,
});

const activities = [
  { title: 'Keynotes', description: 'Expertises, retours d’expérience et perspectives sur la Tech africaine.', icon: Mic2 },
  { title: 'Workshops', description: 'Ateliers pratiques et démonstrations techniques pour développer vos compétences.', icon: Code2 },
  { title: 'Project Demos', description: 'Des projets et solutions numériques conçus pour répondre aux besoins du continent.', icon: Presentation },
  { title: 'SaaS & AI Hackathon', description: 'Concevoir des solutions SaaS et des outils intelligents autour de problèmes concrets.', icon: Cpu },
  { title: 'Cybersecurity CTF', description: 'Mettre vos compétences en cybersécurité à l’épreuve dans une compétition technique.', icon: ShieldCheck },
  { title: 'Networking', description: 'Connecter les talents, communautés, entreprises et institutions africaines.', icon: Users },
];
const benefits = [
  'Rencontrer des experts et professionnels du secteur.',
  'Découvrir des innovations et projets africains.',
  'Participer à des ateliers pratiques.',
  'Développer votre réseau professionnel.',
  'Explorer des opportunités de collaboration.',
  'Découvrir les perspectives de carrière dans la Tech.',
];

function Conf() {
  return (
    <div className="conference-page">
      <section className="conf-hero">
        <img src={monument.url} alt="Le monument de l’Indépendance à Lomé, Togo" className="conf-hero-photo" fetchPriority="high" />
        <div className="conf-hero-shade" />
        <div className="conf-hero-content mx-auto max-w-7xl">
          <Eyebrow ink>Lomé, Togo · Édition 2027</Eyebrow>
          <h1 className="conf-event-title mt-8 font-bold">Synca Conf<br /><span className="text-primary">2027</span></h1>
          <p className="mt-6 text-xl font-medium sm:text-2xl">Made in Africa, Powered by Tech</p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-base">
            <p className="flex items-center gap-2"><CalendarDays className="size-5 text-primary" />14–15 mai 2027</p>
            <p className="flex items-center gap-2"><MapPin className="size-5 text-primary" />Lomé, Togo</p>
          </div>
          <p className="mt-3 text-sm text-ink-muted">Side event · 13 mai 2027</p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted">Le rendez-vous panafricain des talents, des communautés et des organisations qui construisent la Tech africaine.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="conf-action"><a href="#participer">Participer à l’événement<ArrowDown /></a></Button>
            <Button asChild variant="outline" className="conf-action conf-action-outline"><a href="#partenariat">Devenir partenaire</a></Button>
          </div>
          <p className="mt-8 text-xs text-ink-muted">Photo : Frappipi 01 / Wikimedia Commons · <a className="underline" href="https://commons.wikimedia.org/wiki/File:Togo_independance_01.jpg" target="_blank" rel="noreferrer">CC BY-SA 4.0</a></p>
        </div>
      </section>
      <nav aria-label="Rubriques de la conférence" className="conf-subnav px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-x-6 gap-y-3 text-sm">
          {[['À propos', 'a-propos'], ['Programme', 'programme'], ['Intervenants', 'intervenants'], ['Challenges', 'challenges'], ['Partenaires', 'partenaires'], ['Informations pratiques', 'participer'], ['FAQ', 'faq']].map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </div>
      </nav>
      <Section id="a-propos">
        <Eyebrow>La vision</Eyebrow>
        <SectionTitle>Construire en Afrique. Connecter le continent.</SectionTitle>
        <Lead>Synca — Synchronize Africa rend la technologie accessible, inclusive et attractive. Le Synca Conf réunit développeurs, ingénieurs, entrepreneurs, étudiants et organisations pour valoriser les compétences locales et construire des solutions conçues en Afrique.</Lead>
        <div className="mt-10 grid grid-cols-2 gap-8 border-y border-border py-8 lg:grid-cols-4">
          {[[`+${event.targets.participants}`, 'participants attendus'], [`+${event.targets.universities}`, 'universités ciblées'], [`+${event.targets.partners}`, 'partenaires visés'], ['Panafricain', 'plusieurs pays représentés']].map(([value, label]) => <div key={label}><p className="text-2xl font-bold text-primary sm:text-3xl">{value}</p><p className="mt-2 text-sm text-muted-foreground">{label}</p></div>)}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Ces chiffres sont des objectifs de mobilisation, et non des participations déjà confirmées.</p>
      </Section>
      <Section>
        <Eyebrow>Pourquoi participer ?</Eyebrow>
        <SectionTitle>Apprendre, partager et ouvrir de nouvelles perspectives.</SectionTitle>
        <ol className="mt-10 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">{benefits.map((benefit, index) => <li key={benefit} className="flex gap-4 border-t border-border py-6"><span className="font-mono text-sm text-primary">0{index + 1}</span><p className="text-base">{benefit}</p></li>)}</ol>
      </Section>
      <Section ink id="programme">
        <Eyebrow ink>Programme & activités</Eyebrow>
        <SectionTitle>Six formats pour faire avancer la Tech africaine.</SectionTitle>
        <Lead ink>Innovation et intelligence artificielle, ingénierie logicielle, produits numériques, cybersécurité, JobTech et avenir des métiers technologiques.</Lead>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{activities.map(({ title, description, icon: Icon }) => <article key={title} className="conf-activity"><Icon className="size-7 text-primary" /><h3 className="mt-6 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-ink-muted">{description}</p></article>)}</div>
        <p className="mt-8 text-sm text-ink-muted">Le programme détaillé, les horaires et les intervenants seront annoncés après confirmation.</p>
      </Section>
      <Section id="intervenants">
        <Eyebrow>Intervenants</Eyebrow>
        <SectionTitle>Les voix de la Tech africaine.</SectionTitle>
        <Lead>Les profils des intervenants seront présentés après confirmation officielle. Vous avez une expertise, une expérience ou une innovation à partager ?</Lead>
        <Button asChild className="conf-action mt-8"><a href="#speaker">Devenir speaker</a></Button>
      </Section>
      <Section id="challenges">
        <Eyebrow>Hackathons & challenges</Eyebrow>
        <SectionTitle>Des compétences à l’épreuve du concret.</SectionTitle>
        <div className="mt-10 grid gap-10 sm:grid-cols-2">{activities.slice(3, 5).map(({ title, description, icon: Icon }) => <article key={title} className="border-t border-border pt-6"><Icon className="size-7 text-primary" /><h3 className="mt-5 text-2xl font-semibold">{title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{description}</p></article>)}</div>
        <p className="mt-8 text-sm text-muted-foreground">Modalités de participation, partenaires techniques, mentors, jury et récompenses : à annoncer après confirmation.</p>
      </Section>
      <Section>
        <Eyebrow>Éditions précédentes</Eyebrow>
        <SectionTitle>Une communauté qui se construit dans la durée.</SectionTitle>
        <Lead>Les photographies, témoignages, projets et vidéos des éditions précédentes seront publiés après validation. Retrouvez dès maintenant l’analyse de l’écosystème Tech togolais dans nos Insights.</Lead>
        <Button asChild variant="outline" className="conf-action mt-8"><a href="/news">Lire les Insights</a></Button>
      </Section>
      <Section id="partenaires">
        <Eyebrow>Partenaires & sponsors</Eyebrow>
        <SectionTitle>Accompagner les talents. Soutenir l’innovation.</SectionTitle>
        <Lead>Aucune organisation n’est annoncée comme partenaire de cette édition avant confirmation officielle.</Lead>
        <ul className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">{partnerCategories.map(category => <li key={category} className="border-t border-border py-5 text-sm">{category}</li>)}</ul>
        <Button asChild className="conf-action mt-6"><a href="#partenariat">Devenir partenaire</a></Button>
      </Section>
      <Section id="partenariat">
        <Eyebrow>Devenir partenaire</Eyebrow>
        <SectionTitle>Construisons ensemble le futur de la Tech africaine.</SectionTitle>
        <Lead>Vous souhaitez soutenir le Synca Conf 2027, contribuer à son rayonnement ou développer votre visibilité auprès de l’écosystème technologique africain ? Présentez-nous votre organisation et vos possibilités de collaboration. Notre équipe reviendra vers vous.</Lead>
        <div className="mt-10 max-w-3xl"><TallyEmbed form={event.partnerForm} title="Devenir Sponsors/Partenaires Synca Conf 2027 Lomé" /></div>
      </Section>
      <Section id="speaker">
        <Eyebrow>Devenir speaker</Eyebrow>
        <SectionTitle>Partagez votre expertise avec l’écosystème Tech africain.</SectionTitle>
        <Lead>Vous avez une expertise, une expérience ou une innovation à partager ? Rejoignez les intervenants du Synca Conf 2027 et contribuez à transmettre des connaissances, inspirer les talents et connecter les acteurs de la Tech africaine.</Lead>
        <div className="mt-10 max-w-3xl"><TallyEmbed form={event.speakerForm} title="Speakers Synca Conf 2027 Lomé" speaker /></div>
      </Section>
      <Section ink id="participer">
        <Eyebrow ink>Informations pratiques</Eyebrow>
        <SectionTitle>Rendez-vous à Lomé.</SectionTitle>
        <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div><dt className="text-sm text-ink-muted">Conférence</dt><dd className="mt-2 text-lg">14 et 15 mai 2027</dd></div>
          <div><dt className="text-sm text-ink-muted">Side event</dt><dd className="mt-2 text-lg">13 mai 2027</dd></div>
          <div><dt className="text-sm text-ink-muted">Ville</dt><dd className="mt-2 text-lg">Lomé, Togo</dd></div>
          <div><dt className="text-sm text-ink-muted">Lieu précis</dt><dd className="mt-2 text-lg">À confirmer</dd></div>
        </dl>
        <p className="mt-10 max-w-2xl leading-relaxed text-ink-muted">Le lien officiel d’inscription sera communiqué prochainement. En attendant, contactez l’équipe pour manifester votre intérêt ou poser vos questions.</p>
        <Button asChild className="conf-action mt-6"><a href="mailto:contact@sync-africa.com?subject=Participation%20Synca%20Conf%202027%20Lom%C3%A9">contact@sync-africa.com</a></Button>
      </Section>
      <Section id="faq">
        <Eyebrow>FAQ</Eyebrow>
        <SectionTitle>Vos questions, nos réponses.</SectionTitle>
        <div className="mt-10 max-w-3xl divide-y divide-border border-y border-border">{defaultContent.faq.map(({ question, answer }) => <details key={question} className="group py-5"><summary className="cursor-pointer text-base font-medium">{question}</summary><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{answer}</p></details>)}</div>
      </Section>
    </div>
  );
}
