'use client';
import { useState } from 'react';
export default function Contact() {
  const [status, setStatus] = useState('');
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const r = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))), headers: { 'Content-Type': 'application/json' } });
    setStatus(r.ok ? 'Thank you. Our team will be in touch shortly.' : 'Sorry, something went wrong. Please try again.');
  }
  return <main className="bg-cream pt-20 sm:pt-28"><div className="page-wrap grid gap-14 py-16 sm:section lg:grid-cols-[.75fr_1.25fr]"><div><p className="eyebrow">Let&apos;s talk</p><h1 className="font-display text-5xl leading-[.98] text-navy sm:text-6xl">Your journey deserves a good beginning.</h1><p className="mt-7 max-w-sm leading-8 text-ink/70">Tell us a little about your plans. One of our travel specialists will get back to you.</p><div className="mt-10 grid gap-3 text-sm leading-7"><a href="tel:+2348032395746">+234 803 239 5746</a><a href="mailto:info@risosoo.com">info@risosoo.com</a><span>Lagos, Nigeria</span></div></div><form onSubmit={submit} className="rounded-3xl bg-white p-7 shadow-soft sm:p-10"><label className="hidden">Leave blank<input name="website" tabIndex={-1}/></label>{[['name','Your name'],['email','Email address'],['phone','Phone number']].map(([name,label])=><label key={name} className="mb-6 block text-sm font-bold text-navy">{label}<input required={name!=='phone'} name={name} type={name==='email'?'email':'text'} className="mt-2 w-full border-b border-navy/20 bg-transparent px-0 py-3 outline-none focus:border-gold"/></label>)}<label className="block text-sm font-bold text-navy">How can we help?<textarea required name="message" rows={4} className="mt-2 w-full border-b border-navy/20 bg-transparent px-0 py-3 outline-none focus:border-gold"/></label><button className="button-primary mt-8" type="submit">Send enquiry</button>{status&&<p className="mt-4 text-sm text-navy">{status}</p>}</form></div></main>;
}
