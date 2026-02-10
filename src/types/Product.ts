export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "OneSize";

export type Product = {
  id: string;
  code: string;
  name: string;
  description: string;
  images: string[];
  brand: string;
  category: string;
  sizes: Partial<Record<Size, number>>;
  createdAt: string;
};