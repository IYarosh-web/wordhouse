import { NavLink } from "react-router";

export function WidgetsList() {
  return (
    <div className="flex flex-col gap-2">
      <ul>
        <li>
          <NavLink className="w-[150px] h-[150px] border-2 cursor-pointer br-m flex items-center justify-center shadow" to="/widgets/wordle">Wordle</NavLink>
        </li>
      </ul>
    </div>
  )
}