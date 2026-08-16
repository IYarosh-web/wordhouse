import { $filter, $wordList, filterChanged, wordListGate } from "../model";
import { useGate, useUnit } from "effector-react";
import { Link, useLocation } from "react-router";
import { ButtonLink, Icon, Icons, Input } from "shared/ui";
import { SortSelector } from "./sort-selector";

export function WordList() {
    const location = useLocation();
    
    const [words, filter, changeFilter] = useUnit([$wordList, $filter, filterChanged]);

    useGate(wordListGate);

    const activeWord = location.pathname.split('/').pop();

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
            {words.map(word => (
                <Link to={`/dashboard/${word.word}`} className="text-left" key={word.id}>
                    <span className={activeWord === word.word ? 'text-blue-500' : ''}>
                        {word.word}
                    </span>
                </Link>
            ))}
        </div>
    )
}