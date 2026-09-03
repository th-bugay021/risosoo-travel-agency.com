'use client';

import { HeroIntro, HeroItem } from './motion';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  copy: string;
};

export function PageHero({ eyebrow, title, copy }: PageHeroProps) {
  return <section className="bg-navy py-20 text-white md:py-28"><HeroIntro className="page-wrap max-w-4xl"><HeroItem><p className="eyebrow">{eyebrow}</p></HeroItem><HeroItem><h1 className="font-display text-5xl leading-tight sm:text-6xl">{title}</h1></HeroItem><HeroItem><p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">{copy}</p></HeroItem></HeroIntro></section>;
}
