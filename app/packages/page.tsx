import { Suspense } from 'react';
import { PackageGrid, PackageGridLoading } from '@/components/package-grid';
import { getPackages } from '@/lib/sanity/packages';

async function PackagesList() { return <PackageGrid packages={await getPackages()} />; }

export default function PackagesPage() {
  return <main className="pt-20"><section className="bg-navy py-20 text-white md:py-28"><div className="page-wrap max-w-4xl"><p className="eyebrow">Holiday packages</p><h1 className="font-display text-6xl leading-tight">Make room for wonder.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">Thoughtfully planned escapes, ready to be tailored around the way you want to travel.</p></div></section><section className="page-wrap section"><Suspense fallback={<PackageGridLoading/>}><PackagesList/></Suspense></section></main>;
}
