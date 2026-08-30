import { Suspense } from 'react';
import { BlogGrid, BlogGridLoading } from '@/components/blog-grid';
import { getPosts } from '@/lib/sanity/posts';
async function PostsList() { return <BlogGrid posts={await getPosts()} />; }
export default function BlogPage() { return <main className="pt-20"><section className="bg-navy py-20 text-white md:py-28"><div className="page-wrap max-w-4xl"><p className="eyebrow">Travel insights</p><h1 className="font-display text-6xl leading-tight">Helpful knowledge for the road ahead.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">Practical guidance for students, travellers and families planning their next international move.</p></div></section><section className="page-wrap section"><Suspense fallback={<BlogGridLoading/>}><PostsList/></Suspense></section></main>; }
