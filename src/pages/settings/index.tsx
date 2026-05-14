import { useUnit } from "effector-react";
import { wordsImportExportModel } from "features/words-import-export";

export function Settings() {
  const [exportWordsClicked, importWordsClicked] = useUnit([wordsImportExportModel.exportWordsClicked, wordsImportExportModel.importWordsClicked]);
  
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-2xl font-bold">Settings</h3>
      <button className="text-left" onClick={exportWordsClicked}>Export words</button>
      <button className="text-left" onClick={importWordsClicked}>Import words</button>
    </div>
  );
}
