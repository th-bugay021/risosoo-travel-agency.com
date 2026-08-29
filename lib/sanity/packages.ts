import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityClient } from './client';

export type SanityPackage = {
  _id: string;
  title: string;
  slug: string;
  image?: Exclude<SanityImageSource, string> & { alt?: string };
  priceSummary?: string;
  body?: unknown[];
};

const packageFields = `_id, title, "slug": slug.current, image, priceSummary, body`;
export const packagesQuery = `*[_type == "package" && defined(slug.current)] | order(title asc) { ${packageFields} }`;
export const packageBySlugQuery = `*[_type == "package" && slug.current == $slug][0] { ${packageFields} }`;

export async function getPackages(): Promise<SanityPackage[]> {
  if (!sanityClient) return [];
  try { return await sanityClient.fetch<SanityPackage[]>(packagesQuery, {}, { next: { revalidate: 60 } }); }
  catch (error) { console.error('Unable to load holiday packages from Sanity.', error); return []; }
}

export async function getPackageBySlug(slug: string) {
  if (!sanityClient) return null;
  try { return await sanityClient.fetch<SanityPackage | null>(packageBySlugQuery, { slug }, { next: { revalidate: 60 } }); }
  catch (error) { console.error('Unable to load holiday package from Sanity.', error); return null; }
}
