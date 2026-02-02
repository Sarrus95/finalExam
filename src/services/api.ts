import type { Album } from "@/types/Album";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function fetchAlbums(): Promise<Album[]> {
  const res = await fetch(`${BASE_URL}/Albums`);

  if (!res.ok) {
    throw new Error("Failed to fetch albums");
  }

  return res.json();
}
