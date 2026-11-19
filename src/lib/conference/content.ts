import { z } from 'zod';
const text = z.string().trim().max(3000);
const url = z.union([z.literal(''), z.string().url().refine(v => v.startsWith('https://'), 'Utilisez une adresse HTTPS.')]);
export const partnerCategories = ['Sponsors officiels', 'Partenaires techniques', 'Partenaires écosystème', 'Partenaires institutionnels', 'Partenaires médias', 'Partenaires universitaires'] as const;
export const contentSchema = z.object({
  venue: text, registrationUrl: url,
  speakers: z.array(z.object({ name: text.min(1), role: text, organization: text, bio: text, expertise: text, photo: url })).max(100),
  partners: z.array(z.object({ name: text.min(1), category: z.enum(partnerCategories), logo: url, website: url })).max(100),
  program: z.array(z.object({ date: z.enum(['2027-05-13', '2027-05-14', '2027-05-15']), title: text.min(1), detail: text, time: text })).max(100),
  gallery: z.array(z.object({ image: url, caption: text, credit: text })).max(50),
  testimonials: z.array(z.object({ quote: text.min(1), author: text.min(1) })).max(30),
  videos: z.array(z.object({ title: text.min(1), url })).max(20),
  challengeDetails: text,
  socials: z.array(z.object({ name: text.min(1), url })).max(10),
  faq: z.array(z.object({ question: text.min(1), answer: text.min(1) })).max(40),
});
export type ConferenceContent = z.infer<typeof contentSchema>;
export const event = {
  name: 'Synca Conf 2027 – Édition Lomé', startDate: '2027-05-14', endDate: '2027-05-15', sideDate: '2027-05-13',
  city: 'Lomé', country: 'Togo', theme: 'Made in Africa, Powered by Tech',
  targets: { participants: 500, universities: 10, partners: 10 },
  partnerForm: 'https://tally.so/r/rDO9pv', speakerForm: 'https://tally.so/r/EqlVMX',
};
export const defaultContent: ConferenceContent = {
  venue: '', registrationUrl: '', speakers: [], partners: [], program: [], gallery: [], testimonials: [], videos: [], socials: [], challengeDetails: '',
  faq: [
    { question: 'Qui peut participer au Synca Conf ?', answer: 'Développeurs, ingénieurs, entrepreneurs, étudiants, professionnels du numérique, entreprises et organisations : le Synca Conf rassemble celles et ceux qui souhaitent construire et faire avancer la Tech africaine.' },
    { question: 'Comment s’inscrire ?', answer: 'Le lien officiel d’inscription sera communiqué ici. En attendant, contactez l’équipe à contact@sync-africa.com pour manifester votre intérêt.' },
    { question: 'Comment devenir speaker ?', answer: 'Remplissez le formulaire de candidature intégré dans la section « Devenir speaker ». L’équipe Synca étudiera votre proposition et reviendra vers vous.' },
    { question: 'Comment devenir partenaire ?', answer: 'Présentez votre organisation et vos possibilités de collaboration dans le formulaire de partenariat intégré à cette page.' },
    { question: 'Les ateliers sont-ils accessibles à tous ?', answer: 'Les prérequis et les conditions d’accès seront précisés avec le programme détaillé de chaque atelier.' },
    { question: 'Comment participer aux hackathons ?', answer: 'Les modalités d’inscription, la composition des équipes, les critères de sélection et les récompenses seront annoncés après confirmation.' },
    { question: 'Peut-on venir d’un autre pays ?', answer: 'Oui, le rendez-vous est panafricain et accueille les communautés de plusieurs pays. Les informations de déplacement et d’accueil seront complétées lorsque disponibles.' },
  ],
};
