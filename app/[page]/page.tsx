import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDestinations } from '@/lib/sanity/destinations';
import { urlForImage } from '@/lib/sanity/image';
import { PageHero } from '@/components/page-hero';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';

const pages: Record<string, { eyebrow: string; title: string; copy: string }> = {
  'study-abroad': { eyebrow: 'Study abroad', title: 'Study anywhere. Start with clarity.', copy: 'Bring your academic plans into focus with personal support from course exploration through visa preparation.' },
};

export default async function StandardPage({ params }: { params: Promise<{ page: string }> }) {
  const { page: slug } = await params;
  const page = pages[slug];
  if (!page) notFound();
  const isStudy = slug === 'study-abroad';
  const destinations = isStudy ? await getDestinations() : [];

  return <main className="pt-20"><PageHero eyebrow={page.eyebrow} title={page.title} copy={page.copy}/><section className="page-wrap section">{isStudy ? destinations.length ? <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{destinations.map((destination) => { const imageUrl = destination.image ? urlForImage(destination.image)?.width(900).height(650).fit('crop').url() : null; return <StaggerItem key={destination._id}><Link href={`/destinations/${destination.slug}`} className="group block overflow-hidden rounded-2xl bg-white shadow-soft transition duration-300 hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-[0_20px_36px_rgba(10,27,61,0.16)] motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100">{imageUrl && <img src={imageUrl} alt={destination.image?.alt || destination.name} className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"/>}<div className="p-7"><span className="text-xs font-extrabold uppercase tracking-widest text-gold">{destination.tag || 'Study Abroad'}</span><h2 className="mt-8 font-display text-3xl text-navy">{destination.name}</h2></div></Link></StaggerItem>; })}</Stagger> : <Reveal><div className="rounded-3xl bg-white p-8 text-center shadow-soft md:p-14"><h2 className="font-display text-4xl text-navy">Destinations are coming soon.</h2><p className="mx-auto mt-5 max-w-2xl leading-8 text-ink/70">We are preparing our study destination information. Contact our team for tailored guidance today.</p><Link className="button-primary mt-8" href="/contact">Speak with our team</Link></div></Reveal> : null}</section></main>;
}
