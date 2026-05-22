import {
  Code2,
  Smartphone,
  LayoutDashboard,
  CalendarClock,
  Users,
  Boxes,
  BrainCircuit,
  Wrench,
  Plane,
  Clapperboard,
  Building2,
  HardHat,
  Film,
  Sparkles,
  Camera,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIconKey } from "@/content/services";

const map: Record<ServiceIconKey, LucideIcon> = {
  websites: Code2,
  mobile: Smartphone,
  dashboards: LayoutDashboard,
  booking: CalendarClock,
  hr: Users,
  erp: Boxes,
  ai: BrainCircuit,
  maintenance: Wrench,
  drone: Plane,
  corporate: Clapperboard,
  "real-estate": Building2,
  construction: HardHat,
  reels: Film,
  "ai-edit": Sparkles,
  studio: Camera,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: ServiceIconKey;
  className?: string;
}) {
  const Icon = map[name];
  return <Icon className={className} aria-hidden="true" />;
}
