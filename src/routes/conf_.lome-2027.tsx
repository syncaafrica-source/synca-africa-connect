import { createFileRoute, Link } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { ArrowUpRight, ArrowDown, MapPin, CalendarDays, Mic2, Code2, ShieldCheck, Cpu, BriefcaseBusiness, Mail, Sparkles, Presentation, Network } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { TallyEmbed } from '@/components/conference/TallyEmbed';
import { getConferenceContent } from '@/lib/conference/content.functions';
import { event, partnerCategories } from '@/lib/conference/content';
import monument from '@/assets/lome-monument.webp.asset.json';
const contentQuery = queryOptions({ queryKey: ['conference', 'lome-2027'], queryFn: () => getConferenceContent(), staleTime: 30_000 });
export const Route = createFileRoute('/conf_/lome-2027')({
  loader: ({ context }) => context.queryClient.ensureQueryData(contentQuery),
  head: () => ({ meta: [
    { title: 'Synca Conf 2027 – Lomé, 14–15 mai | Made in Africa, Powered by Tech' },
    { name: 'description', content: 'Le rendez-vous Tech panafricain à Lomé les 14 et 15 mai 2027. Innovation, IA, logiciel, produits, cybersécurité et JobTech. Side event le 13 mai.' },
    { property: 'og:title', content: 'Synca Conf 2027 – Édition Lomé' },
    { property: 'og:description', content: 'Made in Africa, Powered by Tech. Rendez-vous à Lomé, Togo, les 14 et 15 mai 2027.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
    { property: 'og:url', content: 'https://synca-africa-connect.lovable.app/conf/lome-2027' },
  ], links: [{ rel: 'canonical', href: 'https://synca-africa-connect.lovable.app/conf/lome-2027' }], scripts: [{ type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Event', name: event.name, startDate: event.startDate, endDate: event.endDate, eventStatus: 'https://schema.org/EventScheduled', eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode', description: event.theme, location: { '@type': 'Place', name: 'Lomé, Togo', address: { '@type': 'PostalAddress', addressLocality: 'Lomé', addressCountry: 'TG' } }, organizer: { '@type': 'Organization', name: 'Synca', url: 'https://synca-africa-connect.lovable.app' } }) }] }),
  component: LomeConference,
});
function Band({ id, number, label, title, children, dark = false }: { id: string; number: string; label: string; title: string; children: ReactNode; dark?: boolean }) {
  return <section id={id} className={`conf-band ${dark ? 'conf-dark' : ''}`}><div className="mx-auto max-w-7xl"><p className="conf-label"><span>{number}</span> / {label}</p><h2 className="mt-5 max-w-4xl text-3xl font-bold leading-tight sm:text-5xl">{title}</h2>{children}</div></section>;
}
function Action({ href, children, outline = false }: { href: string; children: ReactNode; outline?: boolean }) {
  return <Button asChild size="lg" variant={outline ? 'outline' : 'default'} className="conf-action"><a href={href}>{children}<ArrowUpRight /></a></Button>;
}
const activities = [
  [Mic2, 'Keynotes', 'Les idées qui ouvrent de nouvelles perspectives. Expertise, parcours et retours d’expérience.'],
  [Code2, 'Workshops', 'La pratique au cœur de l’apprentissage. Ateliers techniques et démonstrations.'],
  [Presentation, 'Project Demos', 'Des solutions pensées en Afrique. Projets, produits et échanges avec leurs créateurs.'],
  [Cpu, 'SaaS & AI Hackathon', 'Concevoir des outils intelligents et des solutions SaaS face à des problèmes concrets.'],
  [ShieldCheck, 'Cybersecurity CTF', 'Mettre ses compétences à l’épreuve dans une compétition de cybersécurité.'],
  [Network, 'Networking', 'Faire naître les rencontres, les collaborations et les prochaines opportunités.'],
] as const;
function LomeConference() {
  const { data: content } = useSuspenseQuery(contentQuery);
  const participation = content.registrationUrl || 'mailto:contact@sync-africa.com?subject=Participation%20Synca%20Conf%202027%20Lom%C3%A9';
  return <div className="conference-page">
    <section className="conf-hero">
      <img src={monument.url} alt="Le monument de l’Indépendance de Lomé, Togo" fetchPriority="high" className="conf-hero-photo" />
      <div className="conf-hero-shade" />
      <div className="conf-hero-content mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink-border pb-5"><p className="flex items-center gap-2 font-mono text-xs uppercase"><MapPin size={16} /> Lomé, Togo</p><p className="font-mono text-xs uppercase">Édition 2027 · Rendez-vous panafricain</p></div>
        <p className="mt-12 font-mono text-sm uppercase text-primary">Build. Connect. Grow.</p>
        <h1 className="conf-event-title mt-4 font-bold">Synca Conf<span className="block text-primary">2027<span className="conf-year-mark" aria-hidden="true">↗</span></span></h1>
        <p className="mt-6 max-w-2xl font-display text-2xl font-bold uppercase leading-tight sm:text-4xl">Made in Africa,<br />Powered by Tech.</p>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-foreground">Deux jours pour connecter les talents, partager les savoirs et construire les solutions technologiques de demain, en Afrique.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Action href={participation}>Participer à l’événement</Action><Action href="#partenariat" outline>Devenir partenaire</Action></div>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink-border pt-6"><p className="flex items-center gap-3 font-display text-lg font-semibold"><CalendarDays className="text-primary" />14–15 MAI 2027</p><p className="text-sm text-ink-muted">Side event · 13 mai 2027</p><a href="#vision" className="ml-auto inline-flex items-center gap-2 text-sm">Découvrir <ArrowDown size={16} /></a></div>
      </div>
    </section>
    <nav aria-label="Navigation de la conférence" className="conf-subnav"><div className="mx-auto flex max-w-7xl gap-7 overflow-x-auto px-5 sm:px-8">{[['vision','L’événement'],['programme','Programme'],['intervenants','Speakers'],['challenges','Challenges'],['partenaires','Partenaires'],['informations','Infos pratiques']].map(([id,label]) => <a key={id} href={`#${id}`} className="shrink-0 py-5 text-sm font-medium">{label}</a>)}</div></nav>
    <Band id="vision" number="01" label="Notre vision" title="L’Afrique ne fait pas que suivre. Elle construit.">
      <div className="mt-8 grid gap-8 md:grid-cols-2"><p className="text-lg leading-relaxed">Synca Conf est le rendez-vous des personnes qui font avancer la technologie africaine. Développeurs, ingénieurs, entrepreneurs, étudiants, entreprises et organisations se retrouvent à Lomé pour apprendre, expérimenter et créer ensemble.</p><p className="text-base leading-relaxed text-muted-foreground">Porté par Synca — Synchronize Africa, cet événement valorise les compétences locales et les solutions conçues en Afrique. Notre ambition : rendre la technologie accessible, inclusive et attractive, et relier les talents aux opportunités.</p></div>
      <div className="mt-12 grid grid-cols-2 gap-6 border-y border-border py-8 lg:grid-cols-4">{[['500+','participants attendus'],['10','universités ciblées'],['10','partenaires visés'],['Panafricain','mobilisation internationale']].map(([value,label]) => <div key={label}><p className="font-display text-3xl font-bold text-primary sm:text-4xl">{value}</p><p className="mt-2 text-sm">{label}</p></div>)}</div><p className="mt-3 text-xs text-muted-foreground">Objectifs de mobilisation de l’édition 2027, et non chiffres de participation confirmés.</p>
      <div className="mt-10 flex flex-wrap gap-x-7 gap-y-4">{[[Sparkles,'Innovation & IA'],[Code2,'Ingénierie logicielle'],[Presentation,'Produits numériques'],[ShieldCheck,'Cybersécurité'],[BriefcaseBusiness,'JobTech & avenir des métiers']].map(([Icon,label]) => { const I = Icon as typeof Sparkles; return <p key={String(label)} className="flex items-center gap-2 text-sm"><I size={18} className="text-primary" />{String(label)}</p>; })}</div>
    </Band>
    <Band id="participer" number="02" label="Pourquoi venir" title="Des idées. Des rencontres. Un nouvel élan.">
      <div className="mt-10 grid gap-0 md:grid-cols-2 lg:grid-cols-3">{['Rencontrer des experts et des professionnels du secteur','Découvrir les innovations et les projets africains','Apprendre au contact d’ateliers pratiques','Développer son réseau professionnel','Explorer de nouvelles collaborations','Ouvrir de nouvelles perspectives de carrière dans la Tech'].map((item,i) => <div key={item} className="flex gap-4 border-t border-border py-7 pr-6"><span className="font-mono text-sm text-primary">0{i+1}</span><h3 className="text-lg font-medium">{item}</h3></div>)}</div>
    </Band>
    <Band id="programme" number="03" label="Programme & activités" title="Du partage à la pratique." dark>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{activities.map(([Icon,title,detail]) => <article key={title} className="conf-activity"><Icon className="text-primary" size={28} /><h3 className="mt-8 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-ink-muted">{detail}</p></article>)}</div>
      <div className="mt-10 border-t border-ink-border pt-8"><h3 className="text-2xl font-semibold">Programme détaillé</h3>{content.program.length ? <div className="mt-6 divide-y divide-ink-border">{content.program.map((p,i) => <div key={i} className="grid gap-3 py-5 md:grid-cols-[180px_1fr]"><p className="font-mono text-sm text-primary">{p.date.split('-').reverse().join('/')} {p.time}</p><div><h4 className="font-semibold">{p.title}</h4><p className="mt-2 text-sm text-ink-muted">{p.detail}</p></div></div>)}</div> : <p className="mt-3 max-w-2xl text-ink-muted">Le programme sera dévoilé progressivement. Les horaires, les intervenants et les modalités seront publiés après confirmation.</p>}</div>
    </Band>
    <Band id="intervenants" number="04" label="Intervenants" title="Les voix qui font avancer la Tech africaine.">
      {content.speakers.length ? <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{content.speakers.map((s,i) => <article key={i}>{s.photo && <img src={s.photo} alt={s.name} loading="lazy" className="aspect-[4/5] w-full object-cover" />}<h3 className="mt-4 text-xl font-semibold">{s.name}</h3><p className="mt-2 text-sm">{s.role} · {s.organization}</p><p className="mt-3 text-sm text-muted-foreground">{s.bio}</p><p className="mt-3 text-sm text-primary">{s.expertise}</p></article>)}</div> : <p className="mt-7 max-w-2xl text-muted-foreground">Les premiers intervenants seront annoncés après confirmation. Vous avez une expérience, une expertise ou une innovation à partager ? Faites entendre votre voix.</p>}
      <div className="mt-8"><Action href="#speaker">Devenir speaker</Action></div>
    </Band>
    <Band id="challenges" number="05" label="Hackathons & challenges" title="Votre terrain d’expérimentation.">
      <div className="mt-10 grid gap-8 md:grid-cols-2">{[[Cpu,'SaaS & AI Hackathon','Concevez des solutions SaaS et des outils intelligents qui répondent à des problématiques concrètes. Du problème au prototype, place à l’ingéniosité collective.'],[ShieldCheck,'Cybersecurity CTF','Mettez à l’épreuve vos compétences en cybersécurité. Une compétition technique pour apprendre, relever des défis et partager les bonnes pratiques.']].map(([Icon,title,description]) => { const I=Icon as typeof Cpu; return <article key={String(title)} className="border-t-2 border-primary pt-7"><I size={32} className="text-primary" /><h3 className="mt-5 text-2xl font-bold">{String(title)}</h3><p className="mt-4 leading-relaxed text-muted-foreground">{String(description)}</p></article>; })}</div>
      <p className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">{content.challengeDetails || 'Partenaires techniques, mentors, jury, récompenses et modalités de participation : annonces à venir après confirmation.'}</p><div className="mt-6"><Action href="mailto:contact@sync-africa.com?subject=Challenges%20Synca%20Conf%202027" outline>Contacter l’équipe challenges</Action></div>
    </Band>
    <Band id="retrospective" number="06" label="Éditions précédentes" title="Une dynamique qui se construit ensemble.">
      <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">Des talents, des projets et des connexions : retrouvez les moments forts des précédentes éditions.</p>
      {content.gallery.length ? <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{content.gallery.map((g,i) => <figure key={i}><img src={g.image} alt={g.caption} loading="lazy" className="aspect-[4/3] w-full object-cover" /><figcaption className="mt-3 text-sm">{g.caption}<span className="block text-xs text-muted-foreground">{g.credit}</span></figcaption></figure>)}</div> : <p className="mt-8 border-y border-border py-7 text-sm text-muted-foreground">La rétrospective photographique, les témoignages et les vidéos seront publiés après validation par l’équipe Synca.</p>}
      {content.testimonials.map((t,i) => <blockquote key={i} className="mt-6 border-l-2 border-primary pl-6"><p className="text-xl">« {t.quote} »</p><cite className="mt-3 block text-sm">{t.author}</cite></blockquote>)}{content.videos.map((v,i) => <p key={i} className="mt-4"><a href={v.url} target="_blank" rel="noopener noreferrer" className="text-primary underline">{v.title} ↗</a></p>)}
      <Button asChild variant="link" className="mt-5 px-0"><Link to="/news">Explorer les analyses de l’écosystème <ArrowUpRight /></Link></Button>
    </Band>
    <Band id="partenaires" number="07" label="Partenaires & sponsors" title="Un rendez-vous porté par l’écosystème.">
      <p className="mt-6 max-w-2xl text-muted-foreground">Entreprises, institutions, universités et communautés : construisons des collaborations qui donnent aux talents africains les moyens de créer.</p>
      <div className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">{partnerCategories.map(category => <div key={category} className="border-t border-border py-6"><h3 className="text-base font-semibold">{category}</h3>{content.partners.filter(p => p.category===category).map((p,i) => <a key={i} href={p.website || '#partenaires'} target={p.website ? '_blank' : undefined} rel="noopener noreferrer" className="mt-5 block">{p.logo ? <img src={p.logo} alt={p.name} loading="lazy" className="h-16 max-w-full object-contain" /> : p.name}</a>)}{!content.partners.some(p=>p.category===category) && <p className="mt-3 text-sm text-muted-foreground">Annonces à venir</p>}</div>)}</div><div className="mt-6"><Action href="#partenariat">Devenir partenaire</Action></div>
    </Band>
    <Band id="partenariat" number="08" label="Devenir partenaire" title="Construisons ensemble le futur de la Tech africaine.">
      <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">Vous souhaitez soutenir le Synca Conf 2027, contribuer à son rayonnement ou développer votre visibilité auprès de l’écosystème technologique africain ? Présentez-nous votre organisation et vos possibilités de collaboration. Notre équipe reviendra vers vous.</p><div className="mt-10 max-w-4xl"><TallyEmbed form={event.partnerForm} title="Devenir Sponsors/Partenaires Synca Conf 2027 Lomé" /></div>
    </Band>
    <Band id="speaker" number="09" label="Devenir speaker" title="Partagez votre expertise avec l’écosystème Tech africain.">
      <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">Vous avez une expertise, une expérience ou une innovation à partager ? Rejoignez les intervenants du Synca Conf 2027 et contribuez à transmettre des connaissances, inspirer les talents et connecter les acteurs de la Tech africaine.</p><div className="mt-10 max-w-4xl"><TallyEmbed form={event.speakerForm} title="Speakers Synca Conf 2027 Lomé" speaker /></div>
    </Band>
    <Band id="informations" number="10" label="Informations pratiques" title="Rendez-vous à Lomé." dark>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{[[CalendarDays,'Conférence','14 et 15 mai 2027'],[Sparkles,'Side event','13 mai 2027'],[MapPin,'Lieu',content.venue || 'Lomé, Togo · lieu précis à confirmer'],[Mail,'Organisation','Synca · contact@sync-africa.com']].map(([Icon,title,value]) => { const I=Icon as typeof MapPin; return <div key={String(title)}><I className="text-primary" size={24} /><h3 className="mt-5 font-semibold">{String(title)}</h3><p className="mt-2 break-words text-sm text-ink-muted">{String(value)}</p></div>; })}</div>
      <div className="mt-10 flex flex-wrap gap-5"><Action href={participation}>Participer à l’événement</Action><a href="mailto:contact@sync-africa.com" className="inline-flex items-center text-sm underline">Écrire à l’organisation</a></div>{content.socials.length > 0 && <div className="mt-8 flex flex-wrap gap-5">{content.socials.map(s=><a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="text-primary">{s.name} ↗</a>)}</div>}
    </Band>
    <Band id="faq" number="11" label="Questions fréquentes" title="Avant de nous retrouver."><Accordion type="single" collapsible className="mt-10 max-w-4xl">{content.faq.map((f,i) => <AccordionItem key={i} value={String(i)}><AccordionTrigger className="py-6 text-base">{f.question}</AccordionTrigger><AccordionContent className="leading-relaxed text-muted-foreground">{f.answer}</AccordionContent></AccordionItem>)}</Accordion></Band>
    <div className="conf-event-end"><div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-6"><div><p className="font-display text-2xl font-bold">SYNCA <span className="text-primary">/ CONF 2027</span></p><p className="mt-2 max-w-lg text-sm text-muted-foreground">Synchronize Africa — pour une technologie accessible, inclusive et attractive.</p></div><div className="space-y-2 text-sm"><a href="mailto:contact@sync-africa.com" className="block">contact@sync-africa.com</a><Link to="/mentions-legales" className="block underline">Mentions légales</Link><p className="text-muted-foreground">© Synca 2027 · Build. Connect. Grow.</p></div></div><p className="mx-auto mt-8 max-w-7xl text-xs text-muted-foreground">Photo de Lomé : Frappipi 01, <a href="https://commons.wikimedia.org/wiki/File:Togo_independance_01.jpg" target="_blank" rel="noopener noreferrer" className="underline">Wikimedia Commons</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" className="underline">CC BY-SA 4.0</a> · image redimensionnée.</p></div>
  </div>;
}
