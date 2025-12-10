export function toHTML<T extends HTMLElement>(text: string): T {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = text;
  return wrapper.firstElementChild as T;
}

export function posMod(n: number, mod: number): number {
  return ((n % mod) + mod) % mod;
}
