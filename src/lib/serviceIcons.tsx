import { Flame, Sun, Home, Droplets, Zap, Hammer, LucideIcon } from "lucide-react";

// Map icon names from database to Lucide icon components
export const iconMap: Record<string, LucideIcon> = {
  '🔥': Flame,
  '☀️': Sun,
  '🏠': Home,
  '🚰': Droplets,
  '⚡': Zap,
  '🔨': Hammer,
};

export function getIconComponent(iconName: string): LucideIcon {
  return iconMap[iconName] || Hammer; // Default to Hammer if icon not found
}
