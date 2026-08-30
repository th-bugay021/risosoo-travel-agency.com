import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityClient } from './client';

export type SanityTestimonial = { _id: string; name: string; quote: string; role?: string; photo?: Exclude<SanityImageSource, string> & { alt?: string } };
const testimonialFields = `_id, name, quote, role, photo`;
const testimonialsQuery = `*[_type == "testimonial"] | order(_createdAt desc) { ${testimonialFields} }`;

export async function getTestimonials(): Promise<SanityTestimonial[]> {
  if (!sanityClient) return [];
  try { return await sanityClient.fetch<SanityTestimonial[]>(testimonialsQuery, {}, { next: { revalidate: 60 } }); }
  catch (error) { console.error('Unable to load testimonials from Sanity.', error); return []; }
}
