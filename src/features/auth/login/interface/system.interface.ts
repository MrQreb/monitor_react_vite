import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";

export interface ISystem {
     name: string;
     urlImage?: string;
     id: number;
     icon?: ComponentType<LucideProps>;
     hasAccess?: (usuario: any) => boolean;
} 