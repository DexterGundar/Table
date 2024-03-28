import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="fixed-top">
      <ul>
        <li>
          <NavLink to="/graphql">GraphQL</NavLink> |
          <NavLink to="/tabula">Table</NavLink>
        </li>
      </ul>
    </nav>
  );
}
