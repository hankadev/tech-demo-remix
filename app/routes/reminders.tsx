import type { V2_MetaFunction } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getAllReminders } from "~/data/reminder.server";
import styles from "~/styles/reminders.css";

export async function loader() {
  const reminders = await getAllReminders();
  return { reminders };
}

export const meta: V2_MetaFunction = () => {
  return [{ title: "Reminders | all" }];
};

export default function Reminders() {
  const { reminders } = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Remember it &#128161;</h1>

      <Outlet />
      <section className="reminders">
        {reminders.length === 0 ? (
          <p>No reminders yet</p>
        ) : (
          reminders.map((reminder) => (
            <Link
              to={`/reminder/${reminder.id}`}
              key={reminder.id}
              className="reminder-card"
            >
              <h3>{reminder.name}</h3>
              <p>{reminder.description}</p>
            </Link>
          ))
        )}
      </section>
    </main>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
