import Image from 'next/image';
import type { SanityTestimonial } from '@/lib/sanity/testimonials';
import { urlForImage } from '@/lib/sanity/image';

function initials(name: string) { return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase(); }

export function TestimonialGrid({ testimonials }: { testimonials: SanityTestimonial[] }) {
  if (!testimonials.length) return <p className="text-ink/65">Client stories are coming soon.</p>;
  return <div className="grid gap-5 md:grid-cols-3">{testimonials.map((testimonial) => { const photoUrl = testimonial.photo ? urlForImage(testimonial.photo)?.width(160).height(160).fit('crop').url() : null; return <figure className="rounded-2xl bg-cream p-7" key={testimonial._id}><blockquote className="font-display text-2xl leading-snug text-navy">“{testimonial.quote}”</blockquote><figcaption className="mt-8 flex items-center gap-3 text-sm">{photoUrl ? <Image src={photoUrl} alt={testimonial.photo?.alt || testimonial.name} width={48} height={48} className="h-12 w-12 rounded-full object-cover"/> : <span aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy text-sm font-extrabold text-gold">{initials(testimonial.name)}</span>}<span><strong className="block text-navy">{testimonial.name}</strong>{testimonial.role && <span className="text-ink/55">{testimonial.role}</span>}</span></figcaption></figure>; })}</div>;
}
export function TestimonialGridLoading() { return <div className="grid gap-5 md:grid-cols-3">{[1,2,3].map((item) => <div key={item} className="h-64 animate-pulse rounded-2xl bg-navy/10"/>)}</div>; }
