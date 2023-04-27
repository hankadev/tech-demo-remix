import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import { useNavigation } from "@remix-run/react";
import { useActionData } from "@remix-run/react";
import { Form } from "@remix-run/react";
import { getAllReminders, storeReminders } from "~/data/reminder.server";
import { getReminderId, isNameValid } from "~/utils";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Reminders | new" }];
};

export default function Create() {
  const errors = useActionData();
  const transition = useNavigation();

  return (
    <Form method="POST" autoComplete="off">
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" />
      {errors?.name && <p className="error-text">{errors.name}</p>}
      <label htmlFor="description">Description</label>
      <textarea name="description" id="description" rows={5} />
      <button type="submit" className="create-button">
        {transition.state === "submitting" ? "Creating..." : "Create"}
      </button>
    </Form>
  );
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const name = data.name.toString().trim();
  const description = data.description.toString().trim();

  if (!isNameValid(name)) {
    return { name: "Name needs to be at least 5 characters long." };
  }

  const reminders = await getAllReminders();
  reminders.push({
    id: getReminderId(),
    name,
    description,
  });
  await storeReminders(reminders);
  return redirect("/reminders");
}
