import Link from 'next/link';
import { Arrow } from './icons';
import type { SanityPackage } from '@/lib/sanity/packages';
import { urlForImage } from '@/lib/sanity/image';

export function PackageGrid({ packages }: { packages: SanityPackage[] }) {
  if (!packages.length) return <div className="rounded-3xl bg-white p-8 text-center shadow-soft md:p-14"><h2 className="font-display text-4xl text-navy">Packages are coming soon.</h2><p className="mx-auto mt-5 max-w-2xl leading-8 text-ink/70">We are preparing our holiday packages. Contact our team to create a journey tailored to you.</p><Link href="/contact" className="button-primary mt-8">Plan a holiday</Link></div>;
  return <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{packages.map((item) => { const imageUrl = item.image ? urlForImage(item.image)?.width(900).height(700).fit('crop').url() : null; return <Link key={item._id} href={`/packages/${item.slug}`} className="group overflow-hidden rounded-2xl bg-white shadow-soft">{imageUrl ? <img src={imageUrl} alt={item.image?.alt || item.title} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"/> : <div className="placeholder-media h-56"/>}<div className="p-7">{item.priceSummary && <p className="text-xs font-extrabold uppercase tracking-widest text-gold">{item.priceSummary}</p>}<h2 className="mt-4 font-display text-3xl text-navy">{item.title}</h2><span className="mt-6 flex items-center gap-2 text-sm font-extrabold text-navy">View package <Arrow className="h-4 w-4 text-gold"/></span></div></Link>; })}</div>;
}
export function PackageGridLoading() { return <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{[1, 2, 3].map((item) => <div key={item} className="h-[390px] animate-pulse rounded-2xl bg-navy/10"/>)}</div>; }
