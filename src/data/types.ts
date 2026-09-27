export type Availability = "in_stock" | "expected" | "on_order";

export type CategoryId =
  | "turning"
  | "mill-turn"
  | "milling"
  | "vmc"
  | "gantry";

export type DocumentAvailability = "available" | "on_request";

export type DataStatus = "draft" | "verified";

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
  type: string;
  url?: string;
  availability: DocumentAvailability;
}

export interface MachineMedia {
  hero?: string;
  gallery?: string[];
  video?: string;
  videoPoster?: string;
}

export interface MachineCompare {
  maxPartDiameter?: string;
  machiningLength?: string;
  barDiameter?: string;
  travelX?: string;
  travelY?: string;
  travelZ?: string;
  spindlePower?: string;
  spindleSpeed?: string;
  accuracy?: string;
  axes?: string;
  weight?: string;
}

export interface Machine {
  slug: string;
  model: string;
  brand: "SZGH";
  categoryId: CategoryId;
  /** Display title / machine type */
  name: string;
  shortDescription?: string;
  application?: string;
  availability?: Availability;
  availabilityUpdatedAt?: string;
  media?: MachineMedia;
  heroMetrics: MachineMetric[];
  specs: SpecRow[];
  compare: MachineCompare;
  capabilities: string[];
  standardEquipment: string[];
  options: string[];
  documents: MachineDocument[];
  dataStatus: DataStatus;
  source?: string;
  updatedAt?: string;
  seo?: {
    title?: string;
    description?: string;
  };
}

export interface Category {
  id: CategoryId;
  slug: string;
  title: string;
  description: string;
  /** Normalized comparison keys for this category (labels for UI) */
  comparisonFields: { key: keyof MachineCompare; label: string }[];
}
