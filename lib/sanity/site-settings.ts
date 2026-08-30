import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityClient } from './client';

export type SiteSettings = {
  heroVideoUrl?: string;
  heroPoster?: Exclude<SanityImageSource, string> & { alt?: string };
};

const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  "heroVideoUrl": heroVideo.asset->url,
  heroPoster
}`;

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!sanityClient) return null;

  try {
    return await sanityClient.fetch<SiteSettings | null>(siteSettingsQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Unable to load site settings from Sanity.', error);
    return null;
  }
}
