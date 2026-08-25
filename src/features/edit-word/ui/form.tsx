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
import { Button, Icons, Input } from "shared/ui";

export function EditWordForm() {
  const [
    activeWord,
    addSentence,
    addDefinition,
    addTranslation,
    deleteDefinition,
    deleteSentence,
    deleteTranslation,
  ] = useUnit([
    $activeWord,
    addSentenceFormSubmittedFx,
    addDefinitionFormSubmittedFx,
    addTranslationFormSubmittedFx,
    deleteDefinitionFormSubmittedFx,
    deleteSentenceFormSubmittedFx,
    deleteTranslationFormSubmittedFx,
  ]);

  useGate(ViewWordGate);

  if (!activeWord) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col gap-1 p-6">
        <form onSubmit={addDefinition} className="flex gap-1 items-center">
          <Input type="text" placeholder="Definition" name="definition" className="flex-1" />
          <Input type="hidden" name="wordId" value={activeWord.id} />
          <Button className="p-2" type="submit">
            <Icons.Plus />
          </Button>
        </form>
        {activeWord.definitions.map((definition) => (
          <form className="flex gap-1 items-center" key={definition.id} onSubmit={deleteDefinition}>
            <Input type="hidden" name="definitionId" value={definition.id} />
            <Input type="hidden" name="wordId" value={activeWord.id} />
            <Button className="self-baseline" type="submit">
              <Icons.Xmark />
            </Button>
            <span>{definition.definition}</span>
          </form>
        ))}
        <form onSubmit={addTranslation} className="flex gap-1 items-center">
          <Input type="text" placeholder="Translation" name="translation" className="flex-1" />
          <Input type="hidden" name="wordId" value={activeWord.id} />
          <Button className="p-2" type="submit">
            <Icons.Plus />
          </Button>
        </form>
        {activeWord.translations?.map((translation) => (
          <form className="flex gap-1 items-center" key={translation.id} onSubmit={deleteTranslation}>
            <Input type="hidden" name="translationId" value={translation.id} />
            <Input type="hidden" name="wordId" value={activeWord.id} />
            <Button className="self-baseline" type="submit">
              <Icons.Xmark />
            </Button>
            {translation.translation}
          </form>
        ))}
        <form onSubmit={addSentence} className="flex gap-1 items-center">
          <Input type="text" placeholder="Sentence" name="sentence" className="flex-1" />
          <Input type="hidden" name="wordId" value={activeWord.id} />
          <Button className="p-2" type="submit">
            <Icons.Plus />
          </Button>
        </form>
        {activeWord.sentences?.map((sentence) => (
          <form className="flex gap-1 items-center pb-1" key={sentence.id} onSubmit={deleteSentence}>
            <Input type="hidden" name="sentenceId" value={sentence.id} />
            <Input type="hidden" name="wordId" value={activeWord.id} />
            <Button className="self-baseline" type="submit">
              <Icons.Xmark />
            </Button>
            <span>{sentence.sentence}</span>
          </form>
        ))}
      </div>
    </>
  );
}