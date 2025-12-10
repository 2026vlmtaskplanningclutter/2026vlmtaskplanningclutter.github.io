export function toHTML<T extends HTMLElement>(text: string): T {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = text;
  return wrapper.firstElementChild as T;
}

export function posMod(n: number, mod: number): number {
  return ((n % mod) + mod) % mod;
}

export function getBaseNameFromPath(path: string): string {
  const lastSlashIndex = path.lastIndexOf("/");
  const lastBackslashIndex = path.lastIndexOf("\\");
  const lastSeparatorIndex = Math.max(lastSlashIndex, lastBackslashIndex);

  if (lastSeparatorIndex === -1) {
    return path;
  } else {
    return path.substring(lastSeparatorIndex + 1);
  }
}

export function splitExt(string: string): [string, string | undefined] {
  const res = string.split(".");
  return [res[0], res[1]];
}

export function toCapitalCase(input: string): string {
  if (!input) return "";

  return input
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
