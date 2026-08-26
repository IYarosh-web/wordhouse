import { NavLink } from "react-router";

export function WidgetsList() {
  return (
    <div className="">
      <ul>
        <li className="text-left flex flex-col gap-2">
          <NavLink className="cursor-pointer" to="/widgets/wordle">Wordle</NavLink>
          <NavLink className="cursor-pointer" to="/widgets/sentence-fill">Sentence Fill</NavLink>
          <NavLink className="cursor-pointer" to="/widgets/sentence-create">Sentence Create</NavLink>
        </li>
      </ul>
    </div>
  )
}