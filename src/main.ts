import initComponents from "./components/components";
import {
  promptMakeDg,
  promptPickObject,
  promptPickObjectDgDesc,
} from "./prompts";

initComponents();

document.getElementById("vlm-prompt")!.innerText = promptPickObject;
document.getElementById("vlm-dg-prompt")!.innerText = promptMakeDg;
document.getElementById("dg-vlm-prompt")!.innerText = promptPickObjectDgDesc;

function parsePath() {
  const pathArray = window.location.pathname.split("/");
  const path = pathArray[pathArray.length - 1];
  switch (path) {
    case "scenes":
      document.getElementById("scenes")?.scrollIntoView({
        behavior: "smooth",
      });
      break;
    case "methods":
    case "prompts":
      document.getElementById("methods")?.scrollIntoView({
        behavior: "smooth",
      });
      break;
    case "bibtex":
      document.getElementById("bibtex")?.scrollIntoView({
        behavior: "smooth",
      });
      break;
  }
}
parsePath();
