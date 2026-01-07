import { useUnit } from "effector-react";
import { $maxGuesses, $userGuesses } from "../model";
import UserGuess from "./user-guess";
import { range } from "shared/lib";

export function UserGuesses() {
  const [userGuesses, maxGuesses] = useUnit([$userGuesses, $maxGuesses]);
  console.log(maxGuesses, range(5));
  return (
    <div className="flex flex-col gap-2">
      {range(maxGuesses).map((index) => (
        <UserGuess key={index} guess={userGuesses[index] || ""} />
      ))}
    </div>
  );
}

export default UserGuesses;
