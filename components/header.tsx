'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const nav = [['Home', '/'], ['About us', '/about'], ['Study abroad', '/study-abroad'], ['Services', '/services'], ['Holiday packages', '/packages'], ['Insights', '/blog']];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  return <header className="absolute z-20 w-full border-b border-navy/10 bg-cream/95 text-navy shadow-[0_2px_16px_rgba(10,27,61,0.06)] backdrop-blur-sm"><div className="page-wrap flex h-[88px] items-center justify-between gap-8"><Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Risosoo Travels home"><Image src="/assets/brand/risosoo-logo.png" alt="" width={1254} height={1254} priority className="h-16 w-16 object-contain"/><span className="hidden font-display text-2xl leading-none tracking-tight text-navy sm:block">Risosoo <span className="text-gold">Travels</span></span></Link><nav className="hidden min-[1180px]:flex min-[1180px]:items-center min-[1180px]:gap-6 min-[1440px]:gap-8" aria-label="Primary navigation">{nav.map(([label, href]) => { const active = isActive(href); return <Link key={href} href={href} className={`group relative whitespace-nowrap py-2 text-sm font-extrabold transition-colors duration-200 hover:text-gold ${active ? 'text-gold' : 'text-navy'}`}>{label}<span className={`absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-200 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}/></Link>; })}<Link href="/contact" className="button-primary shrink-0 whitespace-nowrap !px-6 !py-3 shadow-[0_8px_18px_rgba(212,165,55,0.28)] hover:shadow-[0_10px_22px_rgba(212,165,55,0.38)]">Start your journey</Link></nav><button className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-navy/20 transition-colors duration-200 hover:border-gold hover:text-gold min-[1180px]:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <FiX size={22}/> : <FiMenu size={22}/>}</button></div>{open && <nav className="border-t border-navy/10 bg-cream px-5 py-6 shadow-[0_12px_24px_rgba(10,27,61,0.08)] sm:px-8 min-[1180px]:hidden" aria-label="Mobile navigation"><div className="mx-auto grid max-w-[1280px] gap-1">{nav.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className={`rounded-lg px-3 py-3 text-sm font-extrabold transition-colors duration-200 ${isActive(href) ? 'bg-gold text-navy' : 'text-navy hover:bg-gold/15'}`}>{label}</Link>)}<Link href="/contact" onClick={() => setOpen(false)} className="button-primary mt-3 shadow-[0_8px_18px_rgba(212,165,55,0.28)]">Start your journey</Link></div></nav>}</header>;
}
