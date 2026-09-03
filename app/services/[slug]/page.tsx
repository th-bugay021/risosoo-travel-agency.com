import { notFound } from 'next/navigation';
import { ServiceIcon } from '@/components/service-icon';
import { getServiceBySlug } from '@/lib/sanity/services';
import { Reveal } from '@/components/motion';

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const service = await getServiceBySlug(slug); if (!service) notFound(); return <main className="bg-cream pt-20"><Reveal className="page-wrap section max-w-4xl"><ServiceIcon icon={service.icon} className="h-12 w-12"/><p className="eyebrow mt-8">Our Service</p><h1 className="font-display text-6xl text-navy">{service.title}</h1><p className="mt-7 max-w-2xl text-xl leading-9 text-ink/70">{service.shortDescription || 'Personal travel guidance, thoughtfully tailored around your plans.'}</p></Reveal></main>; }
