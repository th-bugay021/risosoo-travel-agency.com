import { FaWhatsapp } from 'react-icons/fa6';
import { FiArrowRight } from 'react-icons/fi';

export function Arrow({ className = '' }: { className?: string }) { return <FiArrowRight className={className} aria-hidden="true" />; }
export function WhatsApp({ className = '' }: { className?: string }) { return <FaWhatsapp className={className} aria-hidden="true" />; }
export function Mark() { return <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full border border-gold text-sm font-black tracking-tighter text-gold">RT</span>; }
