export function getReminderId() {
  return Math.floor(Math.random() * 100).toString();
}

export function isNameValid(name: string) {
  return name.length >= 5;
}
