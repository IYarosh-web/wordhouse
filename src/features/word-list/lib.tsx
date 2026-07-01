import { Option } from "shared/ui";

export type SortOption = "alphabetical" | "createdAt" | "updatedAt";

export const SORT_OPTIONS: Option<SortOption>[] = [
    { label: "Alphabetical", value: "alphabetical" },
    { label: "Created At", value: "createdAt" },
    { label: "Updated At", value: "updatedAt" },
];