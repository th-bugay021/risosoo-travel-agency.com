import { sanityClient } from './client';

export type SanityService = { _id: string; title: string; slug: string; icon?: string; shortDescription?: string };
const serviceFields = `_id, title, "slug": slug.current, icon, shortDescription`;
export const servicesQuery = `*[_type == "service" && defined(slug.current)] | order(title asc) { ${serviceFields} }`;
export const serviceBySlugQuery = `*[_type == "service" && slug.current == $slug][0] { ${serviceFields}, body }`;

export async function getServices(): Promise<SanityService[]> {
  if (!sanityClient) return [];
  try { return await sanityClient.fetch<SanityService[]>(servicesQuery, {}, { next: { revalidate: 60 } }); }
  catch (error) { console.error('Unable to load services from Sanity.', error); return []; }
}
export async function getServiceBySlug(slug: string) {
  if (!sanityClient) return null;
  try { return await sanityClient.fetch<SanityService | null>(serviceBySlugQuery, { slug }, { next: { revalidate: 60 } }); }
  catch (error) { console.error('Unable to load service from Sanity.', error); return null; }
}
