import { createFileRoute } from '@tanstack/react-router';
import { PageHero, Section } from '@/components/site/ui';

export const Route = createFileRoute('/mentions-legales')({
  head: () => ({ meta: [
    { title: 'Mentions légales et contact | Synca' },
    { name: 'description', content: 'Informations sur Synca, contact de l’organisation et formulaires de la conférence Lomé 2027.' },
    { property: 'og:title', content: 'Mentions légales | Synca — Synchronize Africa' },
    { property: 'og:description', content: 'Édition du site, contact et informations sur les formulaires Tally.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' },
  ] }), component: Legal,
});
function Legal() {
  return <><PageHero eyebrow="Synca — Synchronize Africa" title="Mentions légales" /><Section><div className="max-w-3xl space-y-8 leading-relaxed">
    <div><h2 className="text-xl font-semibold">Organisation et contact</h2><p className="mt-3">Ce site présente Synca — Synchronize Africa et ses activités. Pour toute question concernant le site ou la conférence, contactez <a className="underline" href="mailto:contact@sync-africa.com">contact@sync-africa.com</a>.</p></div>
    <div><h2 className="text-xl font-semibold">Formulaires de la conférence</h2><p className="mt-3">Les candidatures des intervenants et les demandes de partenariat sont recueillies à travers les formulaires Tally officiels intégrés à la page. Consultez la <a className="underline" href="https://tally.so/help/privacy-policy" target="_blank" rel="noopener noreferrer">politique de confidentialité de Tally</a>. Pour une question sur les données transmises à Synca, écrivez à l’organisation.</p></div>
    <div><h2 className="text-xl font-semibold">Contenus et photographies</h2><p className="mt-3">Les contenus du site et les marques restent la propriété de leurs titulaires respectifs. Les crédits et licences des photographies sont indiqués sur les pages concernées.</p></div>
    <div><h2 className="text-xl font-semibold">Informations complémentaires</h2><p className="mt-3 text-muted-foreground">Les informations juridiques détaillées de l’entité éditrice seront complétées après validation par l’organisation.</p></div>
  </div></Section></>;
}