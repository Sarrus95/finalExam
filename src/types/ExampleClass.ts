export type ExampleClassRow = {
    objectId: string;
    createdAt: string;
    updatedAt: string;
    Name?: string;
    Price?: number;
    Quantity?: number;
};

export type ExampleClassFilters = {
    Name?: string;
    minPrice?: number;
    maxPrice?: number;
    minQuantity?: number;
    maxQuantity?: number;
    limit?: number;
    skip?: number;
    orderBy?: "createdAt" | "updatedAt" | "Name" | "Price" | "Quantity";
    orderDir?: "asc" | "desc";
};