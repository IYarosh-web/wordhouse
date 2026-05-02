import { $wordList, wordListGate } from "./model";
import { useGate, useUnit } from "effector-react";
import { Link, useLocation } from "react-router";

export function WordList() {
    const location = useLocation();
    
    const [words] = useUnit([$wordList]);

    useGate(wordListGate);

    const activeWord = location.pathname.split('/').pop();

    return (
        <div className="flex flex-col gap-2">
            <h1>
                Word List
                <Link to="/dashboard/add-word">+</Link>
            </h1>
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