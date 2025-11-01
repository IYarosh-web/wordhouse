import { useUnit } from "effector-react";
import { $activeWord } from "./model";
import { Button, Input, FocusOnCtrlKey } from "shared/ui";
import { addSentenceFormSubmittedFx, addDefinitionFormSubmittedFx, deleteSentenceFormSubmittedFx, deleteDefinitionFormSubmittedFx } from "features/edit-word/model";
import { deleteWordFormSubmitted } from "features/delete-word/model";
import { Sentence } from "./sentence";

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
        <div className="flex flex-col gap-2 p-4 max-w-150">
            <h2 className="font-bold heading-2 text-lg">The word {activeWord.word}</h2>
            <span className="text-sm text-gray-500">What does it mean?</span>
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
            <form className="flex gap-2 justify-between" onSubmit={addDefinition}>
                <Input type="hidden" name="wordId" value={activeWord.id} />
                <FocusOnCtrlKey keyCode="ArrowRight">
                    <Input className="border border-gray-300 w-100 px-4 py-1" required placeholder="Add new meaning" name="definition" />
                </FocusOnCtrlKey>
                <Button className="border border-gray-300 px-4 py-1" type="submit">Add</Button>
            </form>
            <span className="text-sm text-gray-500">Usage in sentences</span>
            {activeWord.sentences?.map(sentence => <div>
                <form className="flex gap-2 justify-between" onSubmit={deleteSentence}>
                    <Sentence key={sentence.id} word={activeWord.word} sentence={sentence.sentence} />
                    <Input type="hidden" name="sentenceId" value={sentence.id} />
                    <Input type="hidden" name="wordId" value={activeWord.id} />
                    <Button className="px-2 py-1 border border-gray-300" type="submit">Delete</Button>
                </form>
            </div>)}
            <form className="flex gap-2 items-start justify-between" onSubmit={addSentence}>
                <Input type="hidden" name="wordId" value={activeWord.id} />
                <textarea rows={4} className="border border-gray-300 w-100 px-4 py-1" required placeholder="Add new sentence" name="sentence" />
                <Button className="border border-gray-300 px-4 py-1" type="submit">Add</Button>
            </form> 
            <form onSubmit={deleteWord}>
                <Input type="hidden" name="wordId" value={activeWord.id} />
                <Button className="px-2 py-1 border border-gray-300" type="submit">Delete word</Button>
            </form>
        </div>
    );
}

export { ViewWordModal };