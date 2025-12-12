export type ImagesDataset = Record<string, { default: string }>;

export const allSimImages: ImagesDataset = import.meta.glob(
  "/src/images/**/*.{png,jpg,jpeg,svg}",
  {
    eager: true,
    query: "?url",
  }
);
export const structuredImages: ImagesDataset = import.meta.glob(
  "/src/images/structured/**/*.{png,jpg,jpeg,svg}",
  {
    eager: true,
    query: "?url",
  }
);
export const unstructuredImages: ImagesDataset = import.meta.glob(
  "/src/images/unstructured/**/*.{png,jpg,jpeg,svg}",
  {
    eager: true,
    query: "?url",
  }
);

const nameRegex = /(\w*)__(\w*)/;

export function getSceneImageInfos(dataset: ImagesDataset) {
  let res: { front: string; back: string; scene: string; object: string }[] =
    [];
  for (let path in dataset) {
    if (path.includes(`/front/`)) {
      let matches = path.match(nameRegex);
      let scene = "";
      let object = "";
      if (matches) {
        scene = matches[1];
        object = matches[2];
      }
      // Front image
      // Get back pair
      let backPath = path.replace(`/front/`, `/back/`);
      res.push({
        front: dataset[path].default,
        back: dataset[backPath].default,
        scene,
        object,
      });
    }
  }
  return res;
}

export const objMJCFtoName: { [key: string]: string } = {
  obj_000005: "Orange",
  obj_000044: "Peaches Can",
  obj_000041: "Mushroom Can",
  obj_000045: "Pineapple Can",
  obj_000059: "Orange Juice Carton",
  obj_000017: "SPAM Can",
  obj_000046: "Cherries Can",
  obj_000082: "Lotion Bottle",
  obj_000048: "Green Beans Can",
  obj_000063: "Spaghetti Box",
  obj_000056: "Raisins Box",
  obj_000168: "Vitamin Bottle",
  obj_000043: "Yogurt Cup",
  obj_000065: "Mayonnaise Bottle",
  obj_000049: "Peas & Carrots Cans",
  obj_000067: "Ketchup Bottle",
  obj_000070: "Sticky Notes Pack",
  obj_000050: "Tomato Sauce Can",
  obj_000053: "Chocolate Pudding Box",
};

export function convertObjMJCFNameToEnglish(mjcfName: string) {
  const lastUnderscoreIndex = mjcfName.lastIndexOf("_");
  if (lastUnderscoreIndex == -1) return mjcfName;
  const englishName = objMJCFtoName[mjcfName.substring(0, lastUnderscoreIndex)];
  // const number = parseInt(mjcfName.substring(lastUnderscoreIndex + 1)) + 1;
  return `${englishName}`;
}
