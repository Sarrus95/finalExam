import type { ParseResults, ParseWhere } from "@appTypes/Parse";
import type { ExampleClassFilters, ExampleClassRow } from "@appTypes/ExampleClass";

const HOST_URL = import.meta.env.VITE_PARSE_HOST_URL;
const APP_ID = import.meta.env.VITE_PARSE_APPLICATION_ID;
const REST_KEY = import.meta.env.VITE_PARSE_REST_API_KEY;

if (!HOST_URL || !APP_ID || !REST_KEY) {
    throw new Error("Missing Vite env vars for Back4App REST");
}

const buildWhere = (filters?: ExampleClassFilters): ParseWhere | undefined => {
    if (!filters) return undefined;

    const where: ParseWhere = {};

    if (filters.Name) where.Name = filters.Name;

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
        where.Price = {
            ...(filters.minPrice !== undefined && { $gte: filters.minPrice }),
            ...(filters.maxPrice !== undefined && { $lte: filters.maxPrice }),
        };
    }

    if (filters.minQuantity !== undefined || filters.maxQuantity !== undefined) {
        where.Quantity = {
            ...(filters.minQuantity !== undefined && { $gte: filters.minQuantity }),
            ...(filters.maxQuantity !== undefined && { $lte: filters.maxQuantity }),
        };
    }

    return Object.keys(where).length ? where : undefined;
}

const parseHeaders = (): HeadersInit => {
    return {
        "X-Parse-Application-Id": APP_ID,
        "X-Parse-REST-API-Key": REST_KEY,
    };
}

export const fetchExampleClass = async (filters?: ExampleClassFilters): Promise<ExampleClassRow[]> => {
    const url = new URL(`${HOST_URL}/classes/ExampleClass`);

    const where = buildWhere(filters);
    if (where) url.searchParams.set("where", JSON.stringify(where));

    if (filters?.limit !== undefined) url.searchParams.set("limit", String(filters.limit));
    if (filters?.skip !== undefined) url.searchParams.set("skip", String(filters.skip));

    if (filters?.orderBy) {
        const prefix = filters.orderDir === "desc" ? "-" : "";
        url.searchParams.set("order", `${prefix}${filters.orderBy}`);
    }

    const res = await fetch(url.toString(), { headers: parseHeaders() });

    const text = await res.text();
    const data: unknown = text ? JSON.parse(text) : null;

    if (!res.ok) {
        const err = data as { error?: string; code?: number } | null;
        throw new Error(err?.error ?? `HTTP ${res.status}`);
    }

    return (data as ParseResults<ExampleClassRow>).results;
}
