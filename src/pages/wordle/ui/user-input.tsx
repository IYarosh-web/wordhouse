import { useUnit } from "effector-react";
import { $userInput, userInputChanged, userInputSubmitted } from "../model";
import { useEffect, useRef } from "react";
import { FocusTrap } from "@headlessui/react";
import { getPressedLetter } from "../model/helpers";

export function UserInput() {
  const formRef = useRef<HTMLFormElement>(null);

  const [userInput, setUserInput, submitInput] = useUnit([
    $userInput,
    userInputChanged,
    userInputSubmitted,
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e);
      if (!formRef.current) return;

      if (e.code === "Enter" || e.code === "NumpadEnter") {
        formRef.current.requestSubmit();
        return;
      }

      if (e.key === "Backspace") {
        setUserInput(userInput.slice(0, -1));
        return;
      }

      const letter = getPressedLetter(e);
      if (letter) {
        setUserInput(userInput + letter);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [userInput]);

  return (
    <div>
      <form
        className="flex flex-col items-center gap-2"
        action="#"
        onSubmit={submitInput}
        ref={formRef}
      >
        <label htmlFor="userInput">Your guess</label>
        <input
          name="userInput"
          className="invisible hidden"
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value.toUpperCase())}
        />
        <div className="flex h-10 gap-2">
          {userInput.split("").map((letter, index) => (
            <span key={index} className="text-2xl font-bold">
              {letter}
            </span>
          ))}
        </div>
        <button type="submit" autoFocus>
          Submit
        </button>
      </form>
    </div>
  );
}
