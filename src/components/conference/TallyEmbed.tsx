import { useEffect } from 'react';
export function TallyEmbed({ form, title, speaker = false }: { form: string; title: string; speaker?: boolean }) {
  const src = `${form.replace('/r/', '/embed/')}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1${speaker ? '&formEventsForwarding=1' : ''}`;
  useEffect(() => {
    const existing = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
    if (!existing) {
      const script = document.createElement('script');
      script.src = 'https://tally.so/widgets/embed.js'; script.async = true;
      document.body.appendChild(script);
    }
  }, []);
  return <iframe src={src} data-tally-src={src} loading="lazy" width="100%" height={speaker ? 1400 : 1550} frameBorder="0" marginHeight={0} marginWidth={0} title={title} className="tally-frame" />;
}
