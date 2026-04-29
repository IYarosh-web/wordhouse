import { NavLink } from "react-router";

export function WidgetsList() {
  return (
    <div className="flex flex-col gap-2">
      <ul>
        <li className="text-left">
          <NavLink className="cursor-pointer" to="/widgets/wordle">Wordle</NavLink>
        </li>
      </ul>
    </div>
  )
}