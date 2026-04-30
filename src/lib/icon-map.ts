import {
  Wind,
  Activity,
  Package,
  Stethoscope,
  Bone,
  ShieldCheck,
  Accessibility,
  Scissors,
  Bandage,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  Wind,
  Activity,
  Package,
  Stethoscope,
  Bone,
  ShieldCheck,
  Accessibility,
  Scissors,
  Bandage,
  Sparkles,
};

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Package;
}
