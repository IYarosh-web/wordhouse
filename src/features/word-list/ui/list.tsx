import { $filter, $wordList, filterChanged, wordListGate } from "../model";
import { useGate, useUnit } from "effector-react";
import { Link, useLocation } from "react-router";
import { ButtonLink, Icon, Icons, Input, Label, ListBox } from "shared/ui";
import { SortSelector } from "./sort-selector";
import { redirectTo } from "shared/contracts";
import { Selection } from "@heroui/react";

export function WordList() {
    const location = useLocation();
    
    const [words, filter, changeFilter] = useUnit([$wordList, $filter, filterChanged]);

    useGate(wordListGate);

    const activeWord = location.pathname.split('/').pop();

    const handleSelectionChange = (keys: Selection) => {
        redirectTo(`/dashboard/${Array.from(keys as Set<string>)[0]}`); // TODO: parseSelection
    }

    return (
        <div className="flex flex-col gap-2">
            <h1 className="flex items-center gap-2">
                <span className="pr-1">Word List</span>
                <ButtonLink to="/dashboard/add-word">
                    <Icons.Plus className="size-5" />
                </ButtonLink>
                <SortSelector />
            </h1>
            <Input onChange={changeFilter} value={filter} placeholder="Search..." />
            <ListBox aria-label="Word list" selectionMode="single" onSelectionChange={handleSelectionChange}>
                {words.map(word => (
                    <ListBox.Item id={word.word} key={word.id} value={word.word} textValue={word.word}>
                        <Label className={activeWord === word.word ? 'text-blue-500' : ''}>
                            {word.word}
                        </Label>
                    </ListBox.Item>
                ))}
            </ListBox>
        </div>
    )
}