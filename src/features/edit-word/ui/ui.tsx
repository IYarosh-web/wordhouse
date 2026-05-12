import { useUnit } from "effector-react";

import {
  $activeWord,
  addSentenceFormSubmittedFx,
  addDefinitionFormSubmittedFx,
  deleteSentenceFormSubmittedFx,
  deleteDefinitionFormSubmittedFx,
  addTranslationFormSubmittedFx,
  deleteTranslationFormSubmittedFx,
} from "../model";
import { deleteWordFormSubmitted } from "features/delete-word/model";
import { Button, Input } from "shared/ui";

export function EditWord() {
  const [
    activeWord,
    addSentence,
    addDefinition,
    addTranslation,
    deleteDefinition,
    deleteSentence,
    deleteWord,
    deleteTranslation,
  ] = useUnit([
    $activeWord,
    addSentenceFormSubmittedFx,
    addDefinitionFormSubmittedFx,
    addTranslationFormSubmittedFx,
    deleteDefinitionFormSubmittedFx,
    deleteSentenceFormSubmittedFx,
    deleteWordFormSubmitted,
    deleteTranslationFormSubmittedFx,
  ]);

  if (!activeWord) {
    return null;
  }

  return (
    <>
      <div className="h-full flex flex-col gap-1">
        <div className="flex gap-2 items-center justify-center">
          <h3 className="text-2xl font-bold text-center">
            {activeWord.word}
          </h3>
          <form onSubmit={deleteWord}>  
            <Input type="hidden" name="wordId" value={activeWord.id} />
            <Button type="submit">X</Button>
          </form>
        </div>
        <div className="flex">
          <form onSubmit={addDefinition} className="flex gap-1">
            <Input type="text" placeholder="Definition" name="definition" className="w-full" />
            <Input type="hidden" name="wordId" value={activeWord.id} />
            <Button type="submit">+</Button>
          </form>
        </div>
        {activeWord.definitions.map((definition) => (
          <form className="flex gap-1 items-center" key={definition.id} onSubmit={deleteDefinition}>
            <Input type="hidden" name="definitionId" value={definition.id} />
            <Input type="hidden" name="wordId" value={activeWord.id} />
            <Button type="submit">X</Button>
            {definition.definition}
          </form>
        ))}
        <div className="flex">
          <form onSubmit={addTranslation} className="flex gap-1">
            <Input type="text" placeholder="Translation" name="translation" className="w-full" />
            <Input type="hidden" name="wordId" value={activeWord.id} />
            <Button type="submit">+</Button>
          </form>
        </div>
        {activeWord.translations?.map((translation) => (
          <form className="flex gap-1 items-center" key={translation.id} onSubmit={deleteTranslation}>
            <Input type="hidden" name="translationId" value={translation.id} />
            <Input type="hidden" name="wordId" value={activeWord.id} />
            <Button type="submit">X</Button>
            {translation.translation}
          </form>
        ))}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-center">&nbsp;</h3>
      </div>
      <div className="flex pb-1">
        <form onSubmit={addSentence} className="flex gap-1">
          <Input type="text" placeholder="Sentence" name="sentence" className="w-full" />
          <Input type="hidden" name="wordId" value={activeWord.id} />
          <Button type="submit">+</Button>
        </form>
      </div>
      {activeWord.sentences?.map((sentence) => (
        <form className="flex gap-1 items-baseline pb-1" key={sentence.id} onSubmit={deleteSentence}>
          <Input type="hidden" name="sentenceId" value={sentence.id} />
          <Input type="hidden" name="wordId" value={activeWord.id} />
          <Button type="submit">X</Button>
          {sentence.sentence}
        </form>
      ))}
    </>
  );
}