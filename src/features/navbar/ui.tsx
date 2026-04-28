import { Link } from "react-router-dom";

import { forwardRef } from "react";

function _Navbar(_, ref: React.RefObject<HTMLElement>) {
  return (
    <nav ref={ref} tabIndex={0}>
      <ul className="flex gap-2">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/widgets">Widgets</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  )
}

const Navbar = forwardRef(_Navbar);

export { Navbar };