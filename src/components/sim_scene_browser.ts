import {
  allSimImages,
  convertObjMJCFNameToEnglish,
  getSceneImageInfos,
  type ImagesDataset,
} from "../images";

export function initSimSceneBrowser(
  prefix: string = "",
  scenePrefix: string = "Scene",
  imagesDataset: ImagesDataset
) {
  const infos = getSceneImageInfos(imagesDataset);
  const frontImg = document.getElementById(
    `${prefix}front_img`
  ) as HTMLImageElement;
  const backImg = document.getElementById(
    `${prefix}back_img`
  ) as HTMLImageElement;
  const imgSlider = document.getElementById(
    `${prefix}img_slider`
  ) as HTMLInputElement;
  const imgName = document.getElementById(`${prefix}img_name`) as HTMLElement;

  let imgIndex = 0;
  const updateImg = (index: number) => {
    if (index < 0 || index >= infos.length) return;
    imgIndex = index;
    let info = infos[imgIndex];
    frontImg.src = info.front;
    backImg.src = info.back;
    const objEnglishName = convertObjMJCFNameToEnglish(info.object);
    imgName.innerHTML = `<span class="font-semibold">${scenePrefix} ${
      index + 1
    }</span>, pick <span class="font-semibold text-red-600">"${objEnglishName}"</span>`;
  };
  imgSlider.min = "0";
  imgSlider.max = (infos.length - 1).toString();
  updateImg(parseInt(imgSlider.value));

  imgSlider.addEventListener("input", () => {
    updateImg(parseInt(imgSlider.value));
  });
}

export default function init() {
  initSimSceneBrowser("sim_", "Simulated Scene", allSimImages);
}
