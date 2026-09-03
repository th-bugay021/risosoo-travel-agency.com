'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { SanityDestination } from '@/lib/sanity/destinations';
import { urlForImage } from '@/lib/sanity/image';
import { Arrow } from './icons';

export function DestinationCarousel({ items }: { items: SanityDestination[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const scroll = (distance: number) => rail.current?.scrollBy({ left: distance, behavior: 'smooth' });

  if (!items.length) {
    return <div className="rounded-2xl border border-dashed border-navy/20 bg-white px-6 py-12 text-center"><p className="font-display text-3xl text-navy">Destinations are coming soon.</p><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink/65">Our team is preparing destination information. Please check back soon or contact us to discuss your travel plans.</p></div>;
  }

  return <motion.div initial={reduceMotion ? false : 'hidden'} whileInView={reduceMotion ? undefined : 'visible'} viewport={{ once: true, amount: 0.2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.17 } } }}><div className="mb-7 flex justify-end gap-3"><button onClick={() => scroll(-360)} className="grid h-11 w-11 place-items-center rounded-full border border-navy/20 text-navy transition-colors duration-200 hover:border-gold hover:text-gold" aria-label="Previous destinations"><Arrow className="h-5 w-5 rotate-180"/></button><button onClick={() => scroll(360)} className="grid h-11 w-11 place-items-center rounded-full bg-navy text-white transition-colors duration-200 hover:bg-gold hover:text-navy" aria-label="Next destinations"><Arrow className="h-5 w-5"/></button></div><div ref={rail} className="-mr-5 flex snap-x gap-5 overflow-x-auto pb-4 pr-5 sm:-mr-8 sm:pr-8 lg:-mr-12 lg:pr-12" style={{ scrollbarWidth: 'none' }}>{items.map((item, index) => {
    const imageUrl = item.image ? urlForImage(item.image)?.width(900).height(1200).fit('crop').url() : null;
    return <motion.div key={item._id} variants={reduceMotion ? undefined : { hidden: { opacity: 0, y: 48, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }} whileHover={reduceMotion ? undefined : { scale: 1.05, y: -6, boxShadow: '0 20px 38px rgba(10, 27, 61, 0.25)' }} transition={{ duration: 0.25 }} className="min-w-[278px] snap-start sm:min-w-[320px]"><Link href={`/destinations/${item.slug}`} className="group relative block h-[390px] overflow-hidden rounded-[1.6rem] bg-navy p-6 text-white">{imageUrl ? <img src={imageUrl} alt={item.image?.alt || item.name} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"/> : <div className="placeholder-media absolute inset-0"/>}<div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/15 to-navy/10"/>{item.tag && <span className="relative rounded-full border border-gold/60 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-gold">{item.tag}</span>}<div className="absolute bottom-6 left-6 right-6"><span className="mb-3 block font-display text-2xl">{item.name}</span><span className="flex items-center gap-2 text-sm font-extrabold text-gold">Explore destination <Arrow className="h-4 w-4 transition duration-200 group-hover:translate-x-1"/></span></div><span className="absolute right-6 top-6 text-xs text-white/65">{String(index + 1).padStart(2, '0')}</span></Link></motion.div>;
  })}</div></motion.div>;
}

export function DestinationCarouselLoading() {
  return <div className="flex gap-5 overflow-hidden">{[1, 2, 3].map((item) => <div key={item} className="h-[390px] min-w-[278px] animate-pulse rounded-[1.6rem] bg-navy/10 sm:min-w-[320px]"/>)}</div>;
}
