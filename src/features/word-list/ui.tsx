import { $filter, $wordList, filterChanged, wordListGate } from "./model";
import { useGate, useUnit } from "effector-react";
import { Link, useLocation } from "react-router";
import { Button, Input } from "shared/ui";

export function WordList() {
    const location = useLocation();
    
    const [words, filter, changeFilter] = useUnit([$wordList, $filter, filterChanged]);

    useGate(wordListGate);

    const activeWord = location.pathname.split('/').pop();

    return (
        <div className="flex flex-col gap-2">
            <h1>
                <span className="pr-1">Word List</span>
                <Link to="/dashboard/add-word">
                    <Button tabIndex={-1}>+</Button>
                </Link>
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