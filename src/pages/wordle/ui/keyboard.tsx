import { useUnit } from "effector-react";
import { letterClicked } from "../model";

const pattern = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

export function Keyboard() {
  const [handleClick] = useUnit([letterClicked]);
  return (
    <div className="flex flex-col gap-2 items-center">
      {pattern.map((row, index) => (
        <div key={index} className="flex gap-2">
          {row.map((letter) => (
            <button key={letter} data-letter={letter} className="w-10 h-10 border-2" onClick={handleClick}>{letter}</button>
          ))}
        </div>
      ))}
    </div>
  )
}