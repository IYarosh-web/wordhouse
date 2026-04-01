import { useGate, useUnit } from "effector-react"
import { $answer, $guesses, $userInput, guessSubmittedFx, inputChanged, wordleGate } from "../model"
import { Input } from "shared/ui";
import { Results } from "./results";
import { Keyboard } from "./keyboard";

export function WidgetWordlePage() {
  const [
    answer,
    input,
    onChangeInput,
    guesses,
    handleSubmit,
  ] = useUnit([
    $answer,
    $userInput,
    inputChanged,
    $guesses,
    guessSubmittedFx,
  ]);

  useGate(wordleGate);

  return (
    <div className="flex flex-col gap-2 m-auto">
      <h3>Wordle</h3>
      <span>{answer}</span>
      <form action="#" onSubmit={handleSubmit}>
        <Input className="w-full" name="guess" value={input} onChange={onChangeInput} />
      </form>
      <Results guesses={guesses} answer={answer} />
      <Keyboard />  
    </div>
  )
}