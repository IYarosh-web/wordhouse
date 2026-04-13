import { useUnit } from "effector-react";
import { wordsImportExportModel } from "features/words-import-export";
import { Button } from "shared/ui";

export function SettingsPage() {
  const [exportWordsClicked, importWordsClicked] = useUnit([wordsImportExportModel.exportWordsClicked, wordsImportExportModel.importWordsClicked]);
  
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex flex-col gap-2 p-6 items-center w-[500px]">
        <h3 className="text-2xl font-bold">Settings</h3>
        <Button onClick={exportWordsClicked}>Export words</Button>
        <Button onClick={importWordsClicked}>Import words</Button>
      </div>
    </div>
  );
}
