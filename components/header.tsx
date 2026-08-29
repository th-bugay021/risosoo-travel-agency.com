'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const nav = [['Home', '/'], ['About us', '/about'], ['Study abroad', '/study-abroad'], ['Services', '/services'], ['Holiday packages', '/packages'], ['Insights', '/blog']];

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="absolute z-20 w-full border-b border-navy/10 bg-cream text-navy"><div className="page-wrap flex h-20 items-center justify-between gap-5"><Link href="/" className="flex shrink-0 items-center" aria-label="Risosoo Travels home"><Image src="/assets/brand/risosoo-logo.png" alt="Risosoo Travels Int'l Ltd" width={1254} height={1254} priority className="h-14 w-14 object-contain"/></Link><nav className="hidden min-[1180px]:flex min-[1180px]:items-center min-[1180px]:gap-4 min-[1440px]:gap-6" aria-label="Primary navigation">{nav.map(([label, href]) => <Link key={href} href={href} className="whitespace-nowrap text-sm font-extrabold transition hover:text-gold">{label}</Link>)}<Link href="/contact" className="button-primary shrink-0 whitespace-nowrap !px-5 !py-2.5">Start your journey</Link></nav><button className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-navy/20 transition hover:border-gold hover:text-gold min-[1180px]:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <FiX size={22}/> : <FiMenu size={22}/>}</button></div>{open && <nav className="border-t border-navy/10 bg-cream px-5 py-6 sm:px-8 min-[1180px]:hidden" aria-label="Mobile navigation"><div className="mx-auto grid max-w-[1280px] gap-1">{nav.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-extrabold transition hover:bg-gold/15">{label}</Link>)}<Link href="/contact" onClick={() => setOpen(false)} className="button-primary mt-3">Start your journey</Link></div></nav>}</header>;
}
