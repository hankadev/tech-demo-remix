import { NavLink } from "@remix-run/react";

export default function MainNavigation() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/reminders" end>
            Reminders
          </NavLink>
        </li>
        <li>
          <NavLink to="/reminders/create">New reminder</NavLink>
        </li>
      </ul>
    </nav>
  );
}
