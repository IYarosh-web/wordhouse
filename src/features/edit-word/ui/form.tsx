import { useGate, useUnit } from "effector-react";

import {
  $activeWord,
  addSentenceFormSubmittedFx,
  addDefinitionFormSubmittedFx,
  deleteSentenceFormSubmittedFx,
  deleteDefinitionFormSubmittedFx,
  addTranslationFormSubmittedFx,
  deleteTranslationFormSubmittedFx,
  ViewWordGate,
} from "../model";
import { deleteWordFormSubmitted } from "features/delete-word/model";
import { Button, Icons, Input } from "shared/ui";

export function EditWordForm() {
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

  useGate(ViewWordGate);

  if (!activeWord) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 items-center justify-center">
          <h3 className="text-2xl font-bold text-center">
            {activeWord.word}
          </h3>
          <form onSubmit={deleteWord}>  
            <Input type="hidden" name="wordId" value={activeWord.id} />
            <Button isIconOnly size="sm" variant="danger" type="submit">
              <Icons.TrashBin />
            </Button>
          </form>
        </div>
        <form onSubmit={addDefinition} className="flex gap-1 items-center">
          <Input variant="secondary" type="text" placeholder="Definition" name="definition" className="flex-1" />
          <Input type="hidden" name="wordId" value={activeWord.id} />
          <Button isIconOnly size="sm" type="submit">
            <Icons.Plus />
          </Button>
        </form>
        {activeWord.definitions.map((definition) => (
          <form className="flex gap-1 items-center" key={definition.id} onSubmit={deleteDefinition}>
            <Input variant="secondary" type="hidden" name="definitionId" value={definition.id} />
            <Input type="hidden" name="wordId" value={activeWord.id} />
            <Button isIconOnly size="sm" variant="danger-soft" type="submit">
              <Icons.Xmark />
            </Button>
            {definition.definition}
          </form>
        ))}
        <form onSubmit={addTranslation} className="flex gap-1 items-center">
          <Input variant="secondary" type="text" placeholder="Translation" name="translation" className="flex-1" />
          <Input type="hidden" name="wordId" value={activeWord.id} />
          <Button isIconOnly size="sm" type="submit">
            <Icons.Plus />
          </Button>
        </form>
        {activeWord.translations?.map((translation) => (
          <form className="flex gap-1 items-center" key={translation.id} onSubmit={deleteTranslation}>
            <Input variant="secondary" type="hidden" name="translationId" value={translation.id} />
            <Input type="hidden" name="wordId" value={activeWord.id} />
            <Button isIconOnly size="sm" variant="danger-soft" type="submit">
              <Icons.Xmark />
            </Button>
            {translation.translation}
          </form>
        ))}
        <form onSubmit={addSentence} className="flex gap-1 items-center">
          <Input variant="secondary" type="text" placeholder="Sentence" name="sentence" className="flex-1" />
          <Input type="hidden" name="wordId" value={activeWord.id} />
          <Button isIconOnly size="sm" type="submit">
            <Icons.Plus />
          </Button>
        </form>
        {activeWord.sentences?.map((sentence) => (
          <form className="flex gap-1 items-baseline pb-1" key={sentence.id} onSubmit={deleteSentence}>
            <Input type="hidden" name="sentenceId" value={sentence.id} />
            <Input type="hidden" name="wordId" value={activeWord.id} />
            <Button isIconOnly size="sm" variant="danger-soft" type="submit">
              <Icons.Xmark />
            </Button>
            {sentence.sentence}
          </form>
        ))}
      </div>
    </>
  );
}