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
