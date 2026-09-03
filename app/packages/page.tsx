import { Suspense } from 'react';
import { PackageGrid, PackageGridLoading } from '@/components/package-grid';
import { getPackages } from '@/lib/sanity/packages';
import { PageHero } from '@/components/page-hero';

async function PackagesList() { return <PackageGrid packages={await getPackages()} />; }

export default function PackagesPage() {
  return <main className="pt-20"><PageHero eyebrow="Holiday Packages" title="Make room for wonder." copy="Thoughtfully planned escapes, ready to be tailored around the way you want to travel."/><section className="page-wrap section"><Suspense fallback={<PackageGridLoading/>}><PackagesList/></Suspense></section></main>;
}
