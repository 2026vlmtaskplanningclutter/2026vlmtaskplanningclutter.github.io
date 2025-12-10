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

switch (window.location.pathname) {
  case "/scenes":
    document.getElementById("scenes")?.scrollIntoView({
      behavior: "smooth",
    });
    break;
  case "/methods":
  case "/prompts":
    document.getElementById("methods")?.scrollIntoView({
      behavior: "smooth",
    });
    break;
  case "/bibtex":
    document.getElementById("bibtex")?.scrollIntoView({
      behavior: "smooth",
    });
    break;
}
