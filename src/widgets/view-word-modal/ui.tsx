import { useUnit } from "effector-react";
import {motion} from "motion/react";

import { $activeWord, closeWord } from "./model";
import {
  Button,
  Input,
  FocusOnCtrlKey,
  InlineButton,
  Textarea,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "shared/ui";
import {
  addSentenceFormSubmittedFx,
  addDefinitionFormSubmittedFx,
  deleteSentenceFormSubmittedFx,
  deleteDefinitionFormSubmittedFx,
} from "features/edit-word/model";
import { deleteWordFormSubmitted } from "features/delete-word/model";
import { Sentence } from "./sentence";
import { NotebookLayout } from "widgets/notebook-layout/ui";
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
          <motion.div layout layoutId={activeWord.id} className={`border-4 p-8 rounded-4xl bg-white ${styles.modal}`}>
              <div className="grid grid-cols-8 gap-2 items-center">
                <DialogTitle as="h2" className="font-bold pt-2 col-span-8 heading-2 text-2xl text-center">
                  {activeWord.word}
                </DialogTitle>
                <span className="text-gray-500 col-span-8">What does it mean?</span>
                <form
                  className="contents items-center justify-between"
                  onSubmit={addDefinition}
                >
                  <Input type="hidden" name="wordId" value={activeWord.id} />
                  <FocusOnCtrlKey keyCode="ArrowRight">
                    <Input
                      className="col-span-6"
                      required
                      placeholder="Add new meaning"
                      name="definition"
                    />
                  </FocusOnCtrlKey>
                  <Button className="col-span-2 w-full" type="submit">
                    Add
                  </Button>
                </form>
                <ul className="contents">
                  {activeWord.definitions.map((definition) => (
                    <li className="contents" key={definition.id}>
                      <span className="col-span-6">{definition.definition}</span>
                      <form className="contents" onSubmit={deleteDefinition}>
                        <Input
                          type="hidden"
                          name="definitionId"
                          value={definition.id}
                        />
                        <Input type="hidden" name="wordId" value={activeWord.id} />
                        <Button className="col-span-2 w-full" type="submit">
                          <EraseIcon />
                        </Button>
                      </form>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-gray-500">Usage in sentences</span>
                <form
                  className="flex gap-2 items-start justify-between"
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
                    className="border border-gray-300 flex-0 px-4 py-1"
                    type="submit"
                  >
                    Add
                  </Button>
                </form>
                <ul>
                  {activeWord.sentences?.map((sentence) => (
                    <li>
                      <form
                        className="flex gap-2 justify-between"
                        onSubmit={deleteSentence}
                      >
                        <Sentence
                          key={sentence.id}
                          word={activeWord.word}
                          sentence={sentence.sentence}
                        />
                        <Input type="hidden" name="sentenceId" value={sentence.id} />
                        <Input type="hidden" name="wordId" value={activeWord.id} />
                        <Button
                          className="px-2 py-1 h-min border border-gray-300"
                          type="submit"
                        >
                          Delete
                        </Button>
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
