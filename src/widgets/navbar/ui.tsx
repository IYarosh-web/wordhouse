import { Link } from "react-router";

function Navbar() {
    return (
        <div className="flex gap-2">
            <h2><Link to="/add-word">Words</Link></h2>
            <h2><Link to="/widgets">Widgets</Link></h2>
        </div>
    )
}

export default Navbar;