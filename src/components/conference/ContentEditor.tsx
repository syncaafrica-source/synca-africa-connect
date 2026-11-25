import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { Plus, Trash2, Save, ArrowUpRight, LogOut } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { getConferenceAdmin, saveConferenceContent } from '@/lib/conference/content.functions';
import { contentSchema, partnerCategories, type ConferenceContent } from '@/lib/conference/content';

type Field = { key: string; label: string; multiline?: boolean; options?: readonly string[] };
type Group = { key: 'speakers' | 'partners' | 'program' | 'gallery' | 'testimonials' | 'videos' | 'socials' | 'faq'; label: string; fields: Field[] };
const groups: Group[] = [
  { key: 'speakers', label: 'Intervenants', fields: [{ key: 'name', label: 'Nom et prénom' }, { key: 'role', label: 'Fonction' }, { key: 'organization', label: 'Organisation' }, { key: 'bio', label: 'Biographie', multiline: true }, { key: 'expertise', label: 'Expertise' }, { key: 'photo', label: 'Adresse HTTPS de la photo' }] },
  { key: 'partners', label: 'Partenaires', fields: [{ key: 'name', label: 'Organisation' }, { key: 'category', label: 'Catégorie', options: partnerCategories }, { key: 'logo', label: 'Adresse HTTPS du logo' }, { key: 'website', label: 'Site officiel HTTPS' }] },
  { key: 'program', label: 'Programme', fields: [{ key: 'date', label: 'Date', options: ['2027-05-13', '2027-05-14', '2027-05-15'] }, { key: 'time', label: 'Horaire confirmé' }, { key: 'title', label: 'Titre' }, { key: 'detail', label: 'Description', multiline: true }] },
  { key: 'gallery', label: 'Photos', fields: [{ key: 'image', label: 'Adresse HTTPS de la photo' }, { key: 'caption', label: 'Légende' }, { key: 'credit', label: 'Crédit photographique' }] },
  { key: 'testimonials', label: 'Témoignages', fields: [{ key: 'quote', label: 'Témoignage', multiline: true }, { key: 'author', label: 'Auteur' }] },
  { key: 'videos', label: 'Vidéos', fields: [{ key: 'title', label: 'Titre' }, { key: 'url', label: 'Adresse HTTPS de la vidéo' }] },
  { key: 'socials', label: 'Réseaux sociaux', fields: [{ key: 'name', label: 'Réseau' }, { key: 'url', label: 'Adresse HTTPS du profil officiel' }] },
  { key: 'faq', label: 'FAQ', fields: [{ key: 'question', label: 'Question' }, { key: 'answer', label: 'Réponse', multiline: true }] },
];

export function ContentEditor() {
  const getAdmin = useServerFn(getConferenceAdmin);
  const { data, error, isPending } = useQuery({ queryKey: ['conference-admin'], queryFn: () => getAdmin(), retry: false });
  const queryClient = useQueryClient();
  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
  }
  return <>
    <div className="mb-10 flex flex-wrap justify-between gap-4 border-b border-border pb-6">
      <Button asChild variant="outline"><Link to="/conf/lome-2027">Voir la page <ArrowUpRight /></Link></Button>
      <Button variant="ghost" onClick={() => void signOut()}><LogOut /> Se déconnecter</Button>
    </div>
    {isPending && <p role="status">Chargement des contenus…</p>}
    {error && <div role="alert"><h2 className="text-xl font-semibold">Accès réservé à l’équipe autorisée</h2><p className="mt-3 text-muted-foreground">Votre compte ne dispose pas des droits de modification. Contactez l’organisation pour obtenir un accès.</p><a href="mailto:contact@sync-africa.com" className="mt-4 block underline">contact@sync-africa.com</a></div>}
    {data && <EditorForm initial={data} />}
  </>;
}

function EditorForm({ initial }: { initial: ConferenceContent }) {
  const [draft, setDraft] = useState(initial);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const save = useServerFn(saveConferenceContent);
  const queryClient = useQueryClient();
  function updateRow(group: Group, index: number, key: string, value: string) {
    setDraft(previous => ({ ...previous, [group.key]: previous[group.key].map((row, i) => i === index ? { ...row, [key]: value } : row) }));
    setMessage('');
  }
  function addRow(group: Group) {
    const row = Object.fromEntries(group.fields.map(field => [field.key, field.options?.[0] ?? '']));
    setDraft(previous => ({ ...previous, [group.key]: [...previous[group.key], row] }) as ConferenceContent);
    setMessage('');
  }
  async function submit() {
    const parsed = contentSchema.safeParse(draft);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      setMessage(`Vérifiez les champs obligatoires et les adresses HTTPS (${issue?.path.join(' · ') ?? 'contenu'}).`);
      return;
    }
    setSaving(true); setMessage('');
    try {
      await save({ data: parsed.data });
      await queryClient.invalidateQueries({ queryKey: ['conference-admin'] });
      setMessage('Modifications enregistrées dans l’administration. La page publique statique reste inchangée.');
    } catch { setMessage('Enregistrement impossible. Vos modifications sont conservées ici ; réessayez.'); }
    finally { setSaving(false); }
  }
  return <form onSubmit={e => { e.preventDefault(); void submit(); }}>
    <Tabs defaultValue="general">
      <TabsList className="mb-8 flex h-auto flex-wrap justify-start gap-1 bg-transparent p-0"><TabsTrigger value="general">Informations</TabsTrigger>{groups.map(group => <TabsTrigger key={group.key} value={group.key}>{group.label}</TabsTrigger>)}</TabsList>
      <TabsContent value="general" className="grid max-w-3xl gap-6">
        <label className="grid gap-2 text-sm font-medium">Lieu confirmé<Input value={draft.venue} onChange={e => { setDraft({ ...draft, venue: e.target.value }); setMessage(''); }} /></label>
        <label className="grid gap-2 text-sm font-medium">Lien officiel d’inscription HTTPS<Input type="url" value={draft.registrationUrl} onChange={e => { setDraft({ ...draft, registrationUrl: e.target.value }); setMessage(''); }} /></label>
        <label className="grid gap-2 text-sm font-medium">Challenges : mentors, jury, récompenses et modalités<Textarea rows={6} value={draft.challengeDetails} onChange={e => { setDraft({ ...draft, challengeDetails: e.target.value }); setMessage(''); }} /></label>
      </TabsContent>
      {groups.map(group => <TabsContent key={group.key} value={group.key}>
        <div className="space-y-8">{draft[group.key].map((row, index) => <fieldset key={index} className="border-t border-border pt-6">
          <legend className="font-semibold">{group.label} · {index + 1}</legend>
          <div className="grid gap-5 sm:grid-cols-2">{group.fields.map(field => {
            const value = (row as Record<string, string>)[field.key] ?? '';
            return <label key={field.key} className={`grid gap-2 text-sm font-medium ${field.multiline ? 'sm:col-span-2' : ''}`}>{field.label}
              {field.options ? <Select value={value} onValueChange={v => updateRow(group, index, field.key, v)}><SelectTrigger aria-label={field.label}><SelectValue /></SelectTrigger><SelectContent>{field.options.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select> : field.multiline ? <Textarea rows={4} value={value} onChange={e => updateRow(group, index, field.key, e.target.value)} /> : <Input value={value} onChange={e => updateRow(group, index, field.key, e.target.value)} />}
            </label>;
          })}</div>
          <Button type="button" variant="ghost" className="mt-4 text-destructive" onClick={() => { setDraft(previous => ({ ...previous, [group.key]: previous[group.key].filter((_, i) => i !== index) })); setMessage(''); }}><Trash2 /> Retirer cet élément</Button>
        </fieldset>)}</div>
        <Button type="button" variant="outline" className="mt-6" onClick={() => addRow(group)}><Plus /> Ajouter</Button>
      </TabsContent>)}
    </Tabs>
    <div className="sticky bottom-0 mt-12 flex flex-wrap items-center gap-4 border-t border-border bg-background py-5"><Button type="submit" disabled={saving}><Save />{saving ? 'Enregistrement…' : 'Enregistrer'}</Button><p role="status" className="max-w-xl text-sm">{message}</p></div>
  </form>;
}