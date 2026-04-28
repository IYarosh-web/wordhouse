import { useUnit } from "effector-react";

import { $activeWord, closeWord } from "../model";
import {
  addSentenceFormSubmittedFx,
  addDefinitionFormSubmittedFx,
  deleteSentenceFormSubmittedFx,
  deleteDefinitionFormSubmittedFx,
} from "features/edit-word/model";
import { deleteWordFormSubmitted } from "features/delete-word/model";

function ViewWordModal() {
  const [
    activeWord,
    addSentence,
    addDefinition,
    deleteDefinition,
    deleteSentence,
    deleteWord,
    closeWordModal,
  ] = useUnit([
    $activeWord,
    addSentenceFormSubmittedFx,
    addDefinitionFormSubmittedFx,
    deleteDefinitionFormSubmittedFx,
    deleteSentenceFormSubmittedFx,
    deleteWordFormSubmitted,
    closeWord,
  ]);

  if (!activeWord) {
    return null;
  }

  return (
    <>
      <div className="h-full">
        <div className="flex gap-2 items-center justify-center">
          <h3 className="text-2xl font-bold text-center">
            {activeWord.word}
          </h3>
          <form onSubmit={deleteWord}>
            <input type="hidden" name="wordId" value={activeWord.id} />
            <button className="border-1">X</button>
          </form>
        </div>
        <div className="flex gap-2">
          <form onSubmit={addDefinition} className="flex gap-2">
            <input type="text" placeholder="Definition" name="definition" className="w-full border-1" />
            <input type="hidden" name="wordId" value={activeWord.id} />
            <button type="submit" className="border-1">+</button>
          </form>
        </div>
        {activeWord.definitions.map((definition) => (
          <form key={definition.id} onSubmit={deleteDefinition}>
            <input type="hidden" name="definitionId" value={definition.id} />
            <input type="hidden" name="wordId" value={activeWord.id} />
            <button className="border-1">X</button>
            {definition.definition}
          </form>
        ))}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-center">&nbsp;</h3>
      </div>
      <div className="flex gap-2">
        <form onSubmit={addSentence} className="flex gap-2">
          <input type="text" placeholder="Sentence" name="sentence" className="w-full border-1" />
          <input type="hidden" name="wordId" value={activeWord.id} />
          <button type="submit" className="border-1">+</button>
        </form>
      </div>
      {activeWord.sentences.map((sentence) => (
        <form key={sentence.id} onSubmit={deleteSentence}>
          <input type="hidden" name="sentenceId" value={sentence.id} />
          <input type="hidden" name="wordId" value={activeWord.id} />
          <button className="border-1">X</button>
          {sentence.sentence}
        </form>
      ))}
    </>
  );
}

export { ViewWordModal };
