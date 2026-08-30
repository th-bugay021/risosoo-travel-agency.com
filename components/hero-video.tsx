'use client';

import { useEffect, useRef } from 'react';

type HeroVideoProps = {
  heroVideoUrl?: string;
  heroPosterUrl?: string;
};

export function HeroVideo({ heroVideoUrl, heroPosterUrl }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const source = heroVideoUrl || 'https://media.blacktomato.com/2025%2F02%2Fblack-tomato-homepage.mp4';
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    const attemptPlayback = () => { video.play().catch(() => { /* iOS policies may defer playback. */ }); };
    attemptPlayback();
    video.addEventListener('canplay', attemptPlayback);
    return () => video.removeEventListener('canplay', attemptPlayback);
  }, []);
  return <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover" autoPlay muted playsInline loop poster={heroPosterUrl} preload="auto" aria-hidden="true"><source src={source} type="video/mp4"/></video>;
}
