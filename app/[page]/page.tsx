import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Arrow } from '@/components/icons';
import { getDestinations } from '@/lib/sanity/destinations';
import { urlForImage } from '@/lib/sanity/image';
import { services } from '@/lib/content';

const pages: Record<string, { eyebrow: string; title: string; copy: string }> = {
  about: { eyebrow: 'Our story', title: 'We make ambitious journeys feel possible.', copy: 'Risosoo Travels Int’l Ltd is a Nigeria-based travel and visa consultancy built around thoughtful, dependable guidance.' },
  'study-abroad': { eyebrow: 'Study abroad', title: 'Study anywhere. Start with clarity.', copy: 'Bring your academic plans into focus with personal support from course exploration through visa preparation.' },
  services: { eyebrow: 'Our expertise', title: 'The details make the difference.', copy: 'Every service is delivered with care, clarity and a commitment to the journey behind the paperwork.' },
  packages: { eyebrow: 'Holiday packages', title: 'Make room for wonder.', copy: 'Thoughtfully planned escapes, ready to be tailored around the way you want to travel.' },
  blog: { eyebrow: 'Travel insights', title: 'Helpful knowledge for the road ahead.', copy: 'Practical guidance for students, travellers and families planning their next international move.' },
};

export default async function StandardPage({ params }: { params: Promise<{ page: string }> }) {
  const { page: slug } = await params;
  const page = pages[slug];
  if (!page) notFound();
  const isServices = slug === 'services';
  const isStudy = slug === 'study-abroad';
  const destinations = isStudy ? await getDestinations() : [];

  return <main className="pt-20"><section className="bg-navy py-20 text-white md:py-28"><div className="page-wrap max-w-4xl"><p className="eyebrow">{page.eyebrow}</p><h1 className="font-display text-6xl leading-tight">{page.title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">{page.copy}</p></div></section><section className="page-wrap section">{isServices ? <div className="grid gap-4 md:grid-cols-2">{services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`} className="group rounded-2xl border border-navy/15 p-7"><span className="text-xs font-extrabold text-gold">{service.number}</span><h2 className="mt-8 text-2xl font-extrabold text-navy">{service.title}</h2><p className="mt-3 leading-7 text-ink/65">{service.summary}</p><Arrow className="mt-7 h-5 text-gold transition group-hover:translate-x-1"/></Link>)}</div> : isStudy ? destinations.length ? <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{destinations.map((destination) => { const imageUrl = destination.image ? urlForImage(destination.image)?.width(900).height(650).fit('crop').url() : null; return <Link key={destination._id} href={`/destinations/${destination.slug}`} className="group overflow-hidden rounded-2xl bg-white shadow-soft">{imageUrl && <img src={imageUrl} alt={destination.image?.alt || destination.name} className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"/>}<div className="p-7"><span className="text-xs font-extrabold uppercase tracking-widest text-gold">{destination.tag || 'Study abroad'}</span><h2 className="mt-8 font-display text-3xl text-navy">{destination.name}</h2><span className="mt-5 flex items-center gap-2 text-sm font-extrabold text-navy">View destination <Arrow className="h-4 w-4 text-gold"/></span></div></Link>; })}</div> : <div className="rounded-3xl bg-white p-8 text-center shadow-soft md:p-14"><h2 className="font-display text-4xl text-navy">Destinations are coming soon.</h2><p className="mx-auto mt-5 max-w-2xl leading-8 text-ink/70">We are preparing our study destination information. Contact our team for tailored guidance today.</p><Link className="button-primary mt-8" href="/contact">Speak with our team</Link></div> : <div className="rounded-3xl bg-white p-8 shadow-soft md:p-14"><h2 className="font-display text-4xl text-navy">Content ready for Sanity</h2><p className="mt-5 max-w-2xl leading-8 text-ink/70">This page is wired for the content model and can be populated through Sanity Studio after project credentials are added.</p><Link className="button-primary mt-8" href="/contact">Speak with our team</Link></div>}</section></main>;
}
