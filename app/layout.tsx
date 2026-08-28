import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = { title: { default: 'Risosoo Travels | Go further with confidence', template: '%s | Risosoo Travels' }, description: 'Nigeria-based specialists in study abroad, visa support and seamless international travel.', metadataBase: new URL('https://risosootravels.com') };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className="font-sans antialiased"><Header />{children}<Footer /></body></html>; }
