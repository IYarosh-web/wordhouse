import { useUnit } from "effector-react";
import { $letterStatuses, $userInput, userInputChanged } from "../model";
import './keyboard.css';


const PATTERN = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

export const Keyboard = () => {
    const [statuses, userInput, changeInput] = useUnit([$letterStatuses, $userInput, userInputChanged]);

    const handleClick = (letter: string) => {
        changeInput(userInput + letter);
    }

    return (
        <div className="flex flex-col gap-2">
            {PATTERN.map((row, index) => (
                <div key={index} className="flex gap-2">
                    {row.map((letter) => (
                        <button key={letter} className={`w-10 h-10 bg-gray-200 rounded-md ${statuses[letter]}`} onKeyDown={(e) => e.preventDefault()} onClick={() => handleClick(letter)}>{letter}</button>
                    ))}
                </div>
            ))}
        </div>
    );
};