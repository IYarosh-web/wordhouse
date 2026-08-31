import { useUnit } from "effector-react";
import { wordsImportExportModel } from "features/words-import-export";
import { FocusOnCtrlKey, KeyboardShortcut } from "shared/ui";

export function Settings() {
  const [exportWordsClicked, importWordsClicked] = useUnit([
    wordsImportExportModel.exportWordsClicked,
    wordsImportExportModel.importWordsClicked,
  ]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <h3 className="text-2xl font-bold">Settings</h3>
        <KeyboardShortcut keys={["ArrowRight"]} />
      </div>
      <FocusOnCtrlKey keyCode="ArrowRight">
        <button className="text-left" onClick={exportWordsClicked}>
          Export words
        </button>
      </FocusOnCtrlKey>
      <button className="text-left" onClick={importWordsClicked}>
        Import words
      </button>
    </div>
  );
}
