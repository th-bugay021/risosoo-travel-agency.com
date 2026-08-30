import type { IconType } from 'react-icons';
import { FaGlobe, FaGraduationCap, FaHome, FaPassport, FaPlane, FaUmbrellaBeach } from 'react-icons/fa';

const iconMap: Record<string, IconType> = { 'graduation-cap': FaGraduationCap, passport: FaPassport, plane: FaPlane, home: FaHome, 'palm-tree': FaUmbrellaBeach, globe: FaGlobe };

export function ServiceIcon({ icon, className = 'h-8 w-8' }: { icon?: string; className?: string }) {
  const Icon = iconMap[icon?.toLowerCase().trim() || ''] ?? FaGlobe;
  return <Icon className={`text-gold ${className}`} aria-hidden="true" />;
}
