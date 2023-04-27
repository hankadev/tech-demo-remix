import type { LoaderArgs } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getAllReminders } from "~/data/reminder.server";
import styles from "~/styles/reminders.css";

export const loader = async ({ params }: LoaderArgs) => {
  if (!params.id) {
    throw new Error("Missing reminder id");
  }

  const reminders = await getAllReminders();
  const reminder = reminders.find((f) => f.id === params.id);

  if (!reminder) {
    throw new Error("Reminder not found");
  }

  return reminder;
};

export const meta: V2_MetaFunction = () => {
  return [{ title: "Reminder | detail" }];
};

export default function Reminder() {
  const reminder = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Remember it &#128161;</h1>

      <Outlet />
      <section>
        <div key={reminder.id} className="reminder-card">
          <h3>{reminder.name}</h3>
          <p>{reminder.description}</p>
        </div>
      </section>
    </main>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
