import { useUnit } from "effector-react";
import { $activeWord } from "./model";
import { Button, Input, FocusOnCtrlKey } from "shared/ui";
import { addSentenceFormSubmittedFx, addDefinitionFormSubmittedFx, deleteSentenceFormSubmittedFx, deleteDefinitionFormSubmittedFx } from "features/edit-word/model";
import { deleteWordFormSubmitted } from "features/delete-word/model";
import { Sentence } from "./sentence";
import styles from "./styles.module.css";
function ViewWordModal() {
    const [activeWord, addSentence, addDefinition, deleteDefinition, deleteSentence, deleteWord] = useUnit([
        $activeWord,
        addSentenceFormSubmittedFx,
        addDefinitionFormSubmittedFx,
        deleteDefinitionFormSubmittedFx,
        deleteSentenceFormSubmittedFx,
        deleteWordFormSubmitted,
    ]);

    if (!activeWord) {
        return null;
    }

    return (
        <>
            <div className={`left flex flex-col h-full gap-2 p-4 border-2 border-gray-300`}>
                <h2 className="font-bold heading-2 text-lg text-center">{activeWord.word}</h2>
                <span className="text-sm text-gray-500">What does it mean?</span>
                <form className="flex gap-2 justify-between" onSubmit={addDefinition}>
                    <Input type="hidden" name="wordId" value={activeWord.id} />
                    <FocusOnCtrlKey keyCode="ArrowRight">
                        <Input className="border flex-1 border-gray-300 px-4 py-1" required placeholder="Add new meaning" name="definition" />
                    </FocusOnCtrlKey>
                    <Button className="border flex-0 border-gray-300 px-4 py-1" type="submit">Add</Button>
                </form>
                {activeWord.definitions.map((definition) => (
                    <div className="flex justify-between items-center" key={definition.id}>
                        <span>{definition.definition}</span>
                        <form onSubmit={deleteDefinition}>
                            <Input type="hidden" name="definitionId" value={definition.id} />
                            <Input type="hidden" name="wordId" value={activeWord.id} />
                            <Button className="px-2 py-1 border border-gray-300" type="submit">Delete</Button>
                        </form>
                    </div>
                ))}
            </div>
            <div className={`right flex flex-col gap-2 p-4 border-2 border-gray-300`}>
                <span className="text-sm text-gray-500">Usage in sentences</span>
                <form className="flex gap-2 items-start justify-between" onSubmit={addSentence}>
                    <Input type="hidden" name="wordId" value={activeWord.id} />
                    <textarea rows={4} className="border flex-1 border-gray-300 px-4 py-1" required placeholder="Add new sentence" name="sentence" />
                    <Button className="border border-gray-300 flex-0 px-4 py-1" type="submit">Add</Button>
                </form> 
                {activeWord.sentences?.map(sentence => <div>
                    <form className="flex gap-2 justify-between" onSubmit={deleteSentence}>
                        <Sentence key={sentence.id} word={activeWord.word} sentence={sentence.sentence} />
                        <Input type="hidden" name="sentenceId" value={sentence.id} />
                        <Input type="hidden" name="wordId" value={activeWord.id} />
                        <Button className="px-2 py-1 h-min border border-gray-300" type="submit">Delete</Button>
                    </form>
                </div>)}
                <form onSubmit={deleteWord}>
                    <Input type="hidden" name="wordId" value={activeWord.id} />
                    <Button className="px-2 py-1 border border-gray-300" type="submit">Delete word</Button>
                </form>
            </div>
        </>
    );
}

export { ViewWordModal };