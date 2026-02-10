type Sizes = "S" | "M" | "L" | "XL" | "XXL";

export type Product = {
  id: string;
  code: string;
  name: string;
  description: string;
  images: string[];
  brand: string;
  category: string;
  sizes: Record<Sizes, number>;
  createdAt: string;
};