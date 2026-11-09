// Vite emits versioned local assets. Original user uploads stay unchanged.
export const heroPhotos = {
  before: new URL("../images/before hero.jpg", import.meta.url).href,
  after: new URL("../images/after hero.jpg", import.meta.url).href,
};
export const workshopPhoto = new URL(
  "../images/proccess of working on car engine or what it is.jpg",
  import.meta.url,
).href;
export const repairProjects = [
  {
    title: "Front bumper",
    before: new URL("../images/before1.jpg", import.meta.url).href,
    after: new URL("../images/after1.jpg", import.meta.url).href,
    beforeAlt: "White Toyota with a cracked front bumper before repair",
    afterAlt: "White Toyota front bumper after repair",
  },
  {
    title: "Rear quarter panel",
    before: new URL("../images/before2.jpg", import.meta.url).href,
    after: new URL("../images/after2.jpg", import.meta.url).href,
    beforeAlt:
      "White sedan with rear quarter-panel and bumper damage before repair",
    afterAlt: "White sedan rear quarter panel and bumper after repair",
  },
  {
    title: "Minivan doors",
    before: new URL("../images/before3.jpg", import.meta.url).href,
    after: new URL("../images/after3.jpg", import.meta.url).href,
    beforeAlt:
      "White minivan with damaged passenger-side sliding doors before repair",
    afterAlt: "White minivan passenger-side doors after repair",
  },
  {
    title: "Side-panel repair",
    before: new URL("../images/before4.jpg", import.meta.url).href,
    after: new URL("../images/after4.jpg", import.meta.url).href,
    beforeAlt:
      "Burgundy Honda with a dented rear door and quarter panel before repair",
    afterAlt: "Burgundy Honda rear door and quarter panel after repair",
  },
];
