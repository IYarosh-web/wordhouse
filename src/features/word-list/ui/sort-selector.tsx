import { $sort, sortChanged } from "../model";
import { useUnit } from "effector-react";
import { Select } from "shared/ui";
import { SORT_OPTIONS, SortOption } from "../lib";

export function SortSelector() {
  const [sort, changeSort] = useUnit([$sort, sortChanged]);

  return (
    <Select
      className="ml-auto"
      value={sort}
      onChange={(key) => changeSort(key.target.value as SortOption)}
    >
      {SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}
