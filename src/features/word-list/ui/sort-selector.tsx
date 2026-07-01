import { Button, Icon, Menu, MenuButton, MenuItem, MenuItems } from "shared/ui";
import { SORT_OPTIONS, SortOption } from "../lib";
import { $sort, sortChanged } from "../model";
import { useUnit } from "effector-react";

export function SortSelector() {
    const [sort, changeSort] = useUnit([$sort, sortChanged]);

    return (
        <Menu>
            <MenuButton>
                <Button square>
                    <Icon name="sort" />
                </Button>
            </MenuButton>
            <MenuItems anchor="bottom start" className="w-52 mt-2 origin-top-right py-2 flex flex-col gap-2 bg-amber-600">
                {SORT_OPTIONS.map(option => (
                    <MenuItem key={option.value}>
                        <button className="flex items-center gap-2 text-left data-focus:bg-amber-700 px-2" onClick={() => changeSort(option.value)}>
                            <div className="w-3">{sort === option.value && "X"}</div>
                            <span>{option.label}</span>
                        </button>
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    )
}