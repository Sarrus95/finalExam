import type { Product } from "@/types/Product";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/Products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/Products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}
