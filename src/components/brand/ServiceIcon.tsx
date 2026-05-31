import {
  Code2,
  Smartphone,
  LayoutDashboard,
  CalendarClock,
  Users,
  Boxes,
  BrainCircuit,
  Wrench,
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
