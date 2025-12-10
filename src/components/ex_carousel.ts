/*
Extended carousel capable of autoadvancing and looping seamlessly.

Ex:
<div
  class="ex-carousel w-full h-128 mb-4 skeleton visible-items-1 md:visible-items-3"
  img-class="object-cover p-1 rounded-2xl"
  dataset="structured"
  advance="3"
  dots
  buttons
></div>
*/

import {
  allSimImages,
  realImages,
  structuredImages,
  unstructuredImages,
} from "../images";
import { posMod, toHTML } from "../utils";

export function initDatasetExCarousels(query: string) {
  const els = document.querySelectorAll(query);
  for (const el of els) {
    let i = 0;
    const dataset = el.getAttribute("dataset");
    const itemClass = el.getAttribute("item-class") ?? "object-cover";
    let imageModules;
    switch (dataset) {
      case "image":
        imageModules = allSimImages;
        break;
      case "structured":
        imageModules = structuredImages;
        break;
      case "unstructured":
        imageModules = unstructuredImages;
        break;
      case "real":
        imageModules = realImages;
        break;
    }
    for (const image in imageModules) {
      const url = imageModules[image].default;
      const child = toHTML(`
        <img src="${url}" class="ex-carousel-item h-full w-full ${itemClass}"/>
        `);
      el.appendChild(child);
      i += 1;
    }
  }
}

export function initExCarousels(query: string) {
  const els = document.querySelectorAll(query);
  for (const el_raw of els) {
    const el = el_raw as HTMLElement;
    let items = el.querySelectorAll(".ex-carousel-item");
    if (items.length === 0) {
      console.warn("No ex-carousel-item elements found.");
      continue;
    }
    el.classList.remove("skeleton");

    const advanceInteractCooldown =
      parseInt(el.getAttribute("advance-interact-cooldown") ?? "10") * 1000;
    const visibleItems = parseInt(el.getAttribute("visible-items") ?? "0");
    const cloneCount = 4;
    el.style.setProperty("--clone-items", cloneCount.toString());
    if (visibleItems > 1) {
      el.style.setProperty("--visible-items", visibleItems.toString());
    }
    el.style.setProperty("--active-item", "0");

    const carouselMask = toHTML(`<div class="ex-carousel-mask"></div>`);
    el.appendChild(carouselMask);
    const carouselContent = toHTML(`<div class="ex-carousel-content"></div>`);
    carouselMask.appendChild(carouselContent);
    for (const item of items) {
      carouselContent.appendChild(item);
    }

    for (let i = 0; i < items.length && i < cloneCount; i++) {
      const cloneEl = items[items.length - i - 1].cloneNode(
        true
      ) as HTMLElement;
      carouselContent.insertBefore(cloneEl, carouselContent.children[0]);
    }
    for (let i = 0; i < items.length && i < cloneCount; i++) {
      const cloneEl = items[i].cloneNode(true) as HTMLElement;
      cloneEl.classList.add("post-clone");
      carouselContent.appendChild(cloneEl);
    }

    let currItemIndex = 0;

    const teleportToItem = (index: number) => {
      // Disable animation temporarily to "teleport" to item
      const transition = carouselContent.style.transition;
      carouselContent.style.transition = "none";

      currItemIndex = index;
      el.style.setProperty("--active-item", currItemIndex.toString());

      // Reading offsetHeight forces the browser to apply the 'none' transition immeidately.
      carouselContent.offsetHeight;
      carouselContent.style.transition = transition;
    };
    let isTransitioning = false;
    carouselContent.addEventListener("transitionend", () => {
      isTransitioning = false;
      if (currItemIndex >= items.length) {
        currItemIndex -= items.length;
        teleportToItem(currItemIndex);
      } else if (currItemIndex <= -cloneCount) {
        currItemIndex += items.length;
        teleportToItem(currItemIndex);
      }
    });
    let activeCarouselDot: HTMLElement | null = null;
    const updateActive = () => {
      if (carouselDots) {
        let trueItemIndex = posMod(currItemIndex, items.length);
        if (activeCarouselDot) {
          activeCarouselDot.classList.remove("active");
        }
        activeCarouselDot = carouselDots.children[trueItemIndex] as HTMLElement;
        activeCarouselDot.classList.add("active");
      }
    };
    let advanceCooldownId = -1;
    const resetAdvanceCooldown = () => {
      if (el.hasAttribute("advance")) {
        clearTimeout(advanceCooldownId);
        clearInterval(advanceIntervalId);
        advanceCooldownId = setTimeout(
          () => restartAdvanceInterval(),
          advanceInteractCooldown
        );
      }
    };
    const changeItem = (delta: number, userInput: boolean = true) => {
      if (isTransitioning || Math.abs(delta) > 1) return;
      isTransitioning = true;
      currItemIndex += delta;
      console.log("change item: el: ", el, " currItemIndex: ", currItemIndex);
      el.style.setProperty("--active-item", currItemIndex.toString());
      if (userInput) {
        resetAdvanceCooldown();
      }
      updateActive();
    };
    const jumpItem = (item: number, userInput: boolean = true) => {
      if (isTransitioning) return;
      isTransitioning = true;
      currItemIndex = posMod(item, items.length);
      el.style.setProperty("--active-item", currItemIndex.toString());
      if (userInput) {
        resetAdvanceCooldown();
      }
      updateActive();
    };

    let advanceIntervalId: number = -1;
    const restartAdvanceInterval = () => {
      clearInterval(advanceIntervalId);
      const advanceDuration = parseInt(el.getAttribute("advance") ?? "1");
      advanceIntervalId = setInterval(() => {
        changeItem(Math.sign(advanceDuration), false);
      }, Math.abs(advanceDuration) * 1000);
    };
    if (el.hasAttribute("advance")) {
      restartAdvanceInterval();
    }

    if (el.hasAttribute("buttons")) {
      const leftBtn = toHTML<HTMLButtonElement>(`
        <button
          class="btn absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <i class="fa-solid fa-chevron-left"></i>
        </button>`);
      const rightBtn = toHTML<HTMLButtonElement>(`
        <button
          class="btn absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2"
        >
          <i class="fa-solid fa-chevron-right"></i>
        </button>`) as HTMLButtonElement;

      leftBtn.addEventListener("click", () => changeItem(-1));
      rightBtn.addEventListener("click", () => changeItem(1));

      el.append(leftBtn);
      el.appendChild(rightBtn);
    }

    let carouselDots: HTMLElement | null = null;
    if (el.hasAttribute("dots")) {
      carouselDots = toHTML<HTMLElement>(
        `<div class="ex-carousel-dots"></div>`
      );
      el.appendChild(carouselDots);
      for (let i = 0; i < items.length; i++) {
        const btn = toHTML(`<button class="btn btn-sm ex-carousel-dot"/>`);
        btn.addEventListener("click", () => {
          jumpItem(i);
        });
        carouselDots.appendChild(btn);
        if (i == 0) {
          activeCarouselDot = btn;
          btn.classList.add("active");
        }
      }
    }
  }
}

export default function init() {
  initDatasetExCarousels(".ex-carousel[dataset]");
  initExCarousels(".ex-carousel");
}
