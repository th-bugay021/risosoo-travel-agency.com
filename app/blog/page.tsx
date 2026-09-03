import { Suspense } from 'react';
import { BlogGrid, BlogGridLoading } from '@/components/blog-grid';
import { getPosts } from '@/lib/sanity/posts';
import { PageHero } from '@/components/page-hero';
async function PostsList() { return <BlogGrid posts={await getPosts()} />; }
export default function BlogPage() { return <main className="pt-20"><PageHero eyebrow="Travel Insights" title="Helpful knowledge for the road ahead." copy="Practical guidance for students, travellers and families planning their next international move."/><section className="page-wrap section"><Suspense fallback={<BlogGridLoading/>}><PostsList/></Suspense></section></main>; }
