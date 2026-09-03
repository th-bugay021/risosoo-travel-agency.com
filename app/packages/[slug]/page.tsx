import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';
import { TravelInquiryForm } from '@/components/travel-inquiry-form';
import { getPackageBySlug } from '@/lib/sanity/packages';
import { urlForImage } from '@/lib/sanity/image';
import { Reveal } from '@/components/motion';

export default async function PackageDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const packageData = await getPackageBySlug(slug);
  if (!packageData) notFound();
  const imageUrl = packageData.image ? urlForImage(packageData.image)?.width(1800).height(900).fit('crop').url() : null;
  return <main className="bg-cream pt-20"><section className="page-wrap section max-w-5xl"><Reveal>{imageUrl && <img src={imageUrl} alt={packageData.image?.alt || packageData.title} className="mb-12 h-[360px] w-full rounded-3xl object-cover"/>}{packageData.priceSummary && <p className="eyebrow">{packageData.priceSummary}</p>}<h1 className="font-display text-6xl text-navy">{packageData.title}</h1>{packageData.body?.length ? <div className="prose mt-8 max-w-2xl leading-8 text-ink/70"><PortableText value={packageData.body as never}/></div> : <p className="mt-7 max-w-2xl text-xl leading-9 text-ink/70">Discover an exceptional journey, thoughtfully planned around the way you want to travel.</p>}</Reveal><Reveal className="mt-14"><TravelInquiryForm enquiryType="Package" enquiryName={packageData.title} question={`What are you hoping to do with ${packageData.title}?`}/></Reveal></section></main>;
}
