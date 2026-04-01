import { NavLink } from "react-router";

export function WidgetsList() {
  return (
    <div className="flex flex-col gap-2">
      <h3>Widgets list</h3>
      <ul>
        <li>
          <NavLink to="/widgets/wordle">Wordle</NavLink>
        </li>
      </ul>
    </div>
  )
}