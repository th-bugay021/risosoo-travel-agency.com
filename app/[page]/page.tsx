import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDestinations } from '@/lib/sanity/destinations';
import { urlForImage } from '@/lib/sanity/image';

const pages: Record<string, { eyebrow: string; title: string; copy: string }> = {
  about: { eyebrow: 'Our story', title: 'We make ambitious journeys feel possible.', copy: 'Risosoo Travels Int’l Ltd is a Nigeria-based travel and visa consultancy built around thoughtful, dependable guidance.' },
  'study-abroad': { eyebrow: 'Study abroad', title: 'Study anywhere. Start with clarity.', copy: 'Bring your academic plans into focus with personal support from course exploration through visa preparation.' },
  blog: { eyebrow: 'Travel insights', title: 'Helpful knowledge for the road ahead.', copy: 'Practical guidance for students, travellers and families planning their next international move.' },
};

export default async function StandardPage({ params }: { params: Promise<{ page: string }> }) {
  const { page: slug } = await params;
  const page = pages[slug];
  if (!page) notFound();
  const isStudy = slug === 'study-abroad';
  const destinations = isStudy ? await getDestinations() : [];

  return <main className="pt-20"><section className="bg-navy py-20 text-white md:py-28"><div className="page-wrap max-w-4xl"><p className="eyebrow">{page.eyebrow}</p><h1 className="font-display text-6xl leading-tight">{page.title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">{page.copy}</p></div></section><section className="page-wrap section">{isStudy ? destinations.length ? <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{destinations.map((destination) => { const imageUrl = destination.image ? urlForImage(destination.image)?.width(900).height(650).fit('crop').url() : null; return <Link key={destination._id} href={`/destinations/${destination.slug}`} className="group overflow-hidden rounded-2xl bg-white shadow-soft">{imageUrl && <img src={imageUrl} alt={destination.image?.alt || destination.name} className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"/>}<div className="p-7"><span className="text-xs font-extrabold uppercase tracking-widest text-gold">{destination.tag || 'Study abroad'}</span><h2 className="mt-8 font-display text-3xl text-navy">{destination.name}</h2></div></Link>; })}</div> : <div className="rounded-3xl bg-white p-8 text-center shadow-soft md:p-14"><h2 className="font-display text-4xl text-navy">Destinations are coming soon.</h2><p className="mx-auto mt-5 max-w-2xl leading-8 text-ink/70">We are preparing our study destination information. Contact our team for tailored guidance today.</p><Link className="button-primary mt-8" href="/contact">Speak with our team</Link></div> : null}</section></main>;
}
