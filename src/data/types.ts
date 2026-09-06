export type Availability = "in_stock" | "expected" | "on_order";

export type CategoryId =
  | "turning"
  | "mill-turn"
  | "milling"
  | "vmc"
  | "gantry";

export type DocumentAvailability = "available" | "on_request";

export interface MachineMetric {
  label: string;
  value: string;
  unit?: string;
}

export interface SpecRow {
  label: string;
  value: string;
}

export interface MachineDocument {
  title: string;
  availability: DocumentAvailability;
}

export interface Machine {
  slug: string;
  model: string;
  brand: "SZGH";
  categoryId: CategoryId;
  name: string;
  shortDescription: string;
  application: string;
  availability: Availability;
  heroMetrics: MachineMetric[];
  capabilities: string[];
  specs: SpecRow[];
  standardEquipment: string[];
  options: string[];
  documents: MachineDocument[];
  videoPlaceholder?: string;
  compare: {
    maxPartDiameter?: string;
    machiningLength?: string;
    barDiameter?: string;
    travelX?: string;
    travelY?: string;
    travelZ?: string;
    spindlePower?: string;
    spindleSpeed?: string;
  };
}

export interface Category {
  id: CategoryId;
  slug: string;
  title: string;
  description: string;
}
