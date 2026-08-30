'use client';

import { useEffect, useRef } from 'react';

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
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
  return <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="auto" aria-hidden="true"><source src="https://media.blacktomato.com/2025%2F02%2Fblack-tomato-homepage.mp4" type="video/mp4"/></video>;
}
