import { replaceExt, toCapitalCase } from "./utils";

export type VideosDataset = Record<string, { default: string }>;

export const allVideoThumbnails: VideosDataset = import.meta.glob(
  "/src/videos/**/*.jpg",
  { eager: true, query: "?url" }
);
export const allVideos: VideosDataset = import.meta.glob(
  "/src/videos/**/*.mp4",
  {
    eager: true,
    query: "?url",
  }
);
export const realExpVideos: VideosDataset = import.meta.glob(
  "/src/videos/real_exp/**/*.webm",
  {
    eager: true,
    query: "?url",
  }
);

const nameRegex = /(\w*)__(\w*)__(\w*)__/;
const methodToTitle: { [key: string]: string } = {
  dg_only: "DG-SELECT",
  vlm_only: "VLM-SELECT",
  vlm_dg: "VLM-FIXES-DG",
  dg_vlm: "VLM-GRASPS",
  human: "HUMAN",
};

export function getExperimentVideoInfos(dataset: VideosDataset) {
  let res: {
    url: string;
    posterUrl: string;
    method: string;
    scene: string;
    experiment: number;
    methodTitle: string;
    sceneTitle: string;
  }[] = [];
  for (let path in dataset) {
    let matches = path.match(nameRegex);
    let method = "";
    let scene = "";
    let experiment = "";
    let ogPosterUrl = replaceExt(path, "jpg");
    if (matches) {
      method = matches[1];
      scene = matches[2];
      experiment = matches[3];
    }
    console.log("ALL VIDEO THUMBNAILS: ", allVideoThumbnails);
    res.push({
      url: dataset[path].default,
      posterUrl: allVideoThumbnails[ogPosterUrl].default,
      method,
      scene,
      experiment: parseInt(experiment.replace("exp_", "")),
      methodTitle: methodToTitle[method] ?? "UNKNOWN",
      sceneTitle: toCapitalCase(scene),
    });
  }
  return res;
}
