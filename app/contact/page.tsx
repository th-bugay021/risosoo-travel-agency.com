'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiCheckCircle, FiSend } from 'react-icons/fi';

const reveal = {
  hidden: { opacity: 0, y: 48, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [error, setError] = useState('');
  const reduceMotion = useReducedMotion();

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setStatus('sending');
    const response = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))), headers: { 'Content-Type': 'application/json' } });
    if (response.ok) { setStatus('success'); return; }
    const data = await response.json().catch(() => null);
    setError(data?.error || 'Sorry, something went wrong. Please try again.');
    setStatus('idle');
  }

  return <main className="bg-cream pt-20 sm:pt-28"><motion.div className="page-wrap grid gap-14 py-16 sm:section lg:grid-cols-[.75fr_1.25fr]" initial={reduceMotion ? false : 'hidden'} animate={reduceMotion ? undefined : 'visible'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18, delayChildren: 0.12 } } }}><motion.div variants={reduceMotion ? undefined : reveal}><p className="eyebrow">Let&apos;s talk</p><h1 className="font-display text-5xl leading-[.98] text-navy sm:text-6xl">Your journey deserves a good beginning.</h1><p className="mt-7 max-w-sm leading-8 text-ink/70">Tell us a little about your plans. One of our travel specialists will get back to you.</p><div className="mt-10 grid gap-3 text-sm leading-7"><a href="tel:+2348032395746">+234 803 239 5746</a><a href="mailto:info@risosoo.com">info@risosoo.com</a><span>Lagos, Nigeria</span></div></motion.div>{status === 'success' ? <motion.div variants={reduceMotion ? undefined : reveal} className="rounded-3xl border border-gold/40 bg-white p-8 text-center shadow-soft sm:p-12" role="status"><FiCheckCircle className="mx-auto h-12 w-12 text-gold" aria-hidden="true"/><h2 className="mt-5 font-display text-4xl text-navy">Thank you!</h2><p className="mt-4 leading-8 text-ink/70">Keep an eye on your inbox — our team will reach out to you shortly via email or WhatsApp.</p></motion.div> : <motion.form variants={reduceMotion ? undefined : reveal} onSubmit={submit} className="rounded-3xl bg-white p-7 shadow-soft sm:p-10"><label className="hidden">Leave blank<input name="website" tabIndex={-1} autoComplete="off"/></label>{[['name','Your name',''],['email','Email address',''],['phone','WhatsApp Number','+234 800 000 0000']].map(([name,label,placeholder]) => <label key={name} className="mb-6 block text-sm font-bold text-navy">{label}<input required={name !== 'phone'} name={name} type={name === 'email' ? 'email' : name === 'phone' ? 'tel' : 'text'} placeholder={placeholder} className="mt-2 w-full border-b border-navy/20 bg-transparent px-0 py-3 outline-none placeholder:text-ink/35 focus:border-gold"/></label>)}<label className="block text-sm font-bold text-navy">How can we help?<textarea required name="message" rows={4} className="mt-2 w-full border-b border-navy/20 bg-transparent px-0 py-3 outline-none focus:border-gold"/></label>{error && <p className="mt-4 text-sm font-bold text-red-700" role="alert">{error}</p>}<button className="button-primary mt-8 disabled:cursor-not-allowed disabled:opacity-60" disabled={status === 'sending'} type="submit"><FiSend className="mr-2 h-4 w-4" aria-hidden="true"/>{status === 'sending' ? 'Sending enquiry…' : 'Send enquiry'}</button></motion.form>}</motion.div></main>;
}
