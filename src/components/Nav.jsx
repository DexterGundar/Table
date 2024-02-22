import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="fixed-top">
      <ul>
        <li>
          <NavLink to="/">Par mani</NavLink> |
          <NavLink to="/tabula">Tabula</NavLink>
        </li>
      </ul>
    </nav>
  );
}
