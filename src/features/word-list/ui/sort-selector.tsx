import { $sort, sortChanged } from "../model";
import { useUnit } from "effector-react";
import { ListBox, Select, Typography } from "shared/ui";
import { SORT_OPTIONS, SortOption } from "../lib";
import { Label } from "shared/ui";

export function SortSelector() {
    const [sort, changeSort] = useUnit([$sort, sortChanged]);

    return (
        <Select className="ml-auto" value={sort} onChange={(key) => changeSort(key as SortOption)}>
            <Select.Trigger className="flex items-center gap-2">
                <Label>Sort by:</Label>
                <Select.Value />
            </Select.Trigger>
            <Select.Popover>
                <ListBox>
                    {SORT_OPTIONS.map((option) => (
                        <ListBox.Item id={option.value} key={option.value}>
                            <Typography slot="description" type="body">{option.label}</Typography>
                        </ListBox.Item>
                    ))}
                </ListBox>
            </Select.Popover>
        </Select>
    )
}