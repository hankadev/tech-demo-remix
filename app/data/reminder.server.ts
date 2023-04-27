import fs from "fs/promises";
import type { Reminder } from "~/types";
import { isNameValid } from "~/utils";

const FILE_NAME = "data.json";

export async function getAllReminders() {
  const fileContent = await fs.readFile(FILE_NAME, { encoding: "utf-8" });
  const data = JSON.parse(fileContent);
  const reminders: Reminder[] = data.reminders ?? [];
  return reminders;
}

export function storeReminders(reminders: Reminder[]) {
  if (reminders.length === 0) {
    throw new Error("no reminders");
  }
  if (!isNameValid(reminders[reminders.length - 1].name)) {
    throw new Error("name too short");
  }
  return fs.writeFile(FILE_NAME, JSON.stringify({ reminders: reminders }));
}
