import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="fixed-top">
      <ul>
        <li>
          <NavLink to="/">About me</NavLink> |
          <NavLink to="/tabula">Table</NavLink>
        </li>
      </ul>
    </nav>
  );
}
