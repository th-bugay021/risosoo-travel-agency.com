import { notFound } from 'next/navigation';
import { TravelInquiryForm } from '@/components/travel-inquiry-form';
import { getDestinationBySlug } from '@/lib/sanity/destinations';
import { urlForImage } from '@/lib/sanity/image';

export default async function DestinationDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) notFound();
  const imageUrl = destination.image ? urlForImage(destination.image)?.width(1800).height(900).fit('crop').url() : null;
  return <main className="bg-cream pt-20"><section className="page-wrap section max-w-5xl">{imageUrl && <img src={imageUrl} alt={destination.image?.alt || destination.name} className="mb-12 h-[360px] w-full rounded-3xl object-cover"/>}<p className="eyebrow">{destination.tag || 'Destination'}</p><h1 className="font-display text-6xl text-navy">{destination.name}</h1><p className="mt-7 max-w-2xl text-xl leading-9 text-ink/70">Explore opportunities, local insight and travel guidance tailored to your plans for {destination.name}.</p><div className="mt-14"><TravelInquiryForm enquiryType="Destination" enquiryName={destination.name} question={`What are you hoping to do in ${destination.name}?`}/></div></section></main>;
}
