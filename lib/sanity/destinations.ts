import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityClient } from './client';

export type SanityDestination = {
  _id: string;
  name: string;
  slug: string;
  tag?: string;
  image?: Exclude<SanityImageSource, string> & { alt?: string };
};

export const destinationsQuery = `
  *[_type == "destination" && defined(slug.current)] | order(name asc) {
    _id, name, "slug": slug.current, image, tag
  }
`;

export const destinationBySlugQuery = `
  *[_type == "destination" && slug.current == $slug][0] {
    _id, name, "slug": slug.current, image, tag, body
  }
`;

export async function getDestinations(): Promise<SanityDestination[]> {
  if (!sanityClient) return [];
  try {
    return await sanityClient.fetch<SanityDestination[]>(destinationsQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Unable to load destinations from Sanity.', error);
    return [];
  }
}

export async function getDestinationBySlug(slug: string) {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<SanityDestination | null>(destinationBySlugQuery, { slug }, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Unable to load destination from Sanity.', error);
    return null;
  }
}
