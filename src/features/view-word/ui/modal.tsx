import { useUnit } from "effector-react";
import {motion} from "motion/react";

import { $activeWord, closeWord } from "../model";
import {
  Button,
  Input,
  FocusOnCtrlKey,
  InlineButton,
  Textarea,
  Dialog,
  DialogPanel,
  DialogTitle,
  Icon,
} from "shared/ui";
import {
  addSentenceFormSubmittedFx,
  addDefinitionFormSubmittedFx,
  deleteSentenceFormSubmittedFx,
  deleteDefinitionFormSubmittedFx,
} from "features/edit-word/model";
import { deleteWordFormSubmitted } from "features/delete-word/model";
import { Sentence } from "./sentence";
import { EraseIcon } from "shared/ui";

import styles from './styles.module.css';

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

  const isOpen = !!activeWord;

  if (!activeWord) {
    return null;
  }

  return (
    <Dialog open={isOpen} onClose={closeWordModal} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel>
          <motion.div layout layoutId={activeWord.id} className={`border-4 w-[600px] p-8 rounded-4xl bg-white ${styles.modal}`}>
              <div className="grid gap-2 items-center">
                <DialogTitle as="h2" className="font-bold pt-2 heading-2 text-2xl text-center">
                  {activeWord.word}
                </DialogTitle>
                <span className="text-gray-500">What does it mean?</span>
                <form
                  className="flex gap-2 items-center justify-between"
                  onSubmit={addDefinition}
                >
                  <Input type="hidden" name="wordId" value={activeWord.id} />
                  <FocusOnCtrlKey keyCode="ArrowRight">
                    <Input
                      required
                      className="flex-1"
                      placeholder="Add new meaning"
                      name="definition"
                    />
                  </FocusOnCtrlKey>
                  <Button type="submit">
                    <Icon name="check" />
                  </Button>
                </form>
                <ul className="contents">
                  {activeWord.definitions.map((definition) => (
                    <li className="flex items-center gap-2" key={definition.id}>
                      <form className="contents" onSubmit={deleteDefinition}>
                        <Input type="hidden" name="wordId" value={activeWord.id} />
                        <Button variant="blank" size="small" type="submit">
                          <Icon name="close" />
                        </Button>
                        <Input
                          type="hidden"
                          name="definitionId"
                          value={definition.id}
                          />
                      </form>
                      <span>{definition.definition}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-gray-500">Usage in sentences</span>
                <form
                  className="flex gap-2 items-start"
                  onSubmit={addSentence}
                >
                  <Input type="hidden" name="wordId" value={activeWord.id} />
                  <Textarea
                    rows={4}
                    required
                    className="flex-1"
                    placeholder="Add new sentence"
                    name="sentence"
                  />
                  <Button
                    type="submit"
                  >
                    <Icon name="check" />
                  </Button>
                </form>
                <ul>
                  {activeWord.sentences?.map((sentence) => (
                    <li>
                      <form
                        className="flex gap-2 items-start"
                        onSubmit={deleteSentence}
                      >
                        <Button
                          size="small"
                          variant="blank"
                          type="submit"
                        >
                          <Icon name="close" />
                        </Button>
                        <Sentence
                          key={sentence.id}
                          word={activeWord.word}
                          sentence={sentence.sentence}
                        />
                        <Input type="hidden" name="sentenceId" value={sentence.id} />
                        <Input type="hidden" name="wordId" value={activeWord.id} />
                      </form>
                    </li>
                  ))}
                </ul>
                <form className="mt-auto ml-auto" onSubmit={deleteWord}>
                  <Input type="hidden" name="wordId" value={activeWord.id} />
                  <Button className="px-2 py-1 border border-gray-300" type="submit">
                    Delete word
                  </Button>
                </form>
              </div>
          </motion.div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export { ViewWordModal };
