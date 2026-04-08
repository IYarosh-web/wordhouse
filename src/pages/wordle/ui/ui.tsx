import { useGate, useUnit } from "effector-react"
import { useRef } from "react";
import { $answer, $error, $gameStatus, $guesses, $userInput, guessSubmitted, wordleGate } from "../model"
import { Results } from "./results";
import { Keyboard } from "./keyboard";
import { Button } from "shared/ui";
import { useEffect } from "react";

export function WidgetWordlePage() {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [
    answer,
    input,
    guesses,
    handleSubmit,
    error,
    gameStatus,
  ] = useUnit([
    $answer,
    $userInput,
    $guesses,
    guessSubmitted,
    $error,
    $gameStatus,
  ]);

  useGate(wordleGate);

  useEffect(() => {
    const handleSubmit = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        submitButtonRef.current?.click();
      }
    }
    document.addEventListener('keydown', handleSubmit);
    return () => document.removeEventListener('keydown', handleSubmit);
  }, []);


  return (
    <div className="flex flex-col gap-2 m-auto">
      <div className="flex flex-col gap-2 items-center">
        <h3 className="m-auto text-2xl font-bold">Wordle</h3>
        <form action="#" className="min-h-20 flex flex-col gap-2" onSubmit={handleSubmit}>
          <span className="text-center">Your guess:</span>
          <input type="text" name="guess" value={input} className="hidden" />
          <div className="flex gap-2">
            {answer.split('').map((_, index) => (
              <span key={index} className="p-2 w-10 h-10 border-2 flex items-center justify-center">{input[index]}</span>
            ))}
          </div>
          <Button type="submit" ref={submitButtonRef}>Submit</Button>
        </form>
        <p className="min-h-10">
          {error && <span className="text-red-500">{error}</span>}
          {gameStatus === 'won' && <span className="text-green-500">You won!</span>}
          {gameStatus === 'lost' && <span className="text-red-500">You lost!</span>}
        </p>
        <Results guesses={guesses} answer={answer} />
      </div>
      <Keyboard />  
    </div>
  )
}