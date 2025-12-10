import { toHTML } from "../utils";

export function initScrollPres(query: string) {
  const els = document.querySelectorAll(query);
  for (const elRaw of els) {
    const el = elRaw as HTMLElement;
    if (!el.parentElement) return;
    const scrollClass = el.getAttribute("scroll")?.trim() ?? "h-128";
    const wrapper = toHTML(`
      <div class="${scrollClass} relative">
        <div
          class="absolute left-0 bottom-0 right-0 h-16 pointer-events-none bg-linear-to-t from-0% from-base-200 to-100% to-base-300/0"
        ></div>
      </div>`);
    const overflowScroll = toHTML(
      `<div class="overflow-y-scroll h-full"></div>`
    );
    wrapper.appendChild(overflowScroll);
    el.parentElement.replaceChild(wrapper, el);
    overflowScroll.appendChild(el);
    el.classList.remove("skeleton");
  }
}

export default function init() {
  initScrollPres("pre[scroll]");
}
