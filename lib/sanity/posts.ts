import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityClient } from './client';

export type SanityPost = { _id: string; title: string; slug: string; coverImage?: Exclude<SanityImageSource, string> & { alt?: string }; author?: string; publishedAt?: string; excerpt?: string; body?: unknown[] };
const postFields = `_id, title, "slug": slug.current, coverImage, author, publishedAt, excerpt, body`;
const postsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) { ${postFields} }`;
const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] { ${postFields} }`;
export async function getPosts(): Promise<SanityPost[]> { if (!sanityClient) return []; try { return await sanityClient.fetch<SanityPost[]>(postsQuery, {}, { next: { revalidate: 60 } }); } catch (error) { console.error('Unable to load blog posts from Sanity.', error); return []; } }
export async function getPostBySlug(slug: string) { if (!sanityClient) return null; try { return await sanityClient.fetch<SanityPost | null>(postBySlugQuery, { slug }, { next: { revalidate: 60 } }); } catch (error) { console.error('Unable to load blog post from Sanity.', error); return null; } }
