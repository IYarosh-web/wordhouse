import { NavLink } from "react-router";
import { FocusOnCtrlKey } from "shared/ui";

export function WidgetsList() {
  return (
    <div className="">
      <ul>
        <li className="text-left flex flex-col gap-2 items-start">
          <FocusOnCtrlKey shortcutPosition="right-middle" dx={20} keyCode="ArrowRight">
            <NavLink className="cursor-pointer" to="/widgets/wordle">
              Wordle
            </NavLink>
          </FocusOnCtrlKey>
          <NavLink className="cursor-pointer" to="/widgets/sentence-fill">
            Sentence Fill
          </NavLink>
          <NavLink className="cursor-pointer" to="/widgets/sentence-create">
            Sentence Create
          </NavLink>
          <NavLink className="cursor-pointer" to="/widgets/word-by-definition">
            Guess word by definition
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
