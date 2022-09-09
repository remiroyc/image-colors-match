import { extractColorPalette, parseImagickColors } from "../src/extract";

test("extract color palette", async () => {
  const colors = await extractColorPalette(__dirname + "/nodelogo.png");
  console.log(colors);
  expect(colors).toEqual([
    {
      pixels: 10853,
      rgba: "(255,255,255)",
      hex: "#FFFFFF",
      percent: 67.11811997526283,
    },
    {
      pixels: 2876,
      rgba: "(70,72,62)",
      hex: "#46483E",
      percent: 17.786023500309213,
    },
    {
      pixels: 1578,
      rgba: "(140,200,75)",
      hex: "#8CC84B",
      percent: 9.758812615955472,
    },
    {
      pixels: 183,
      rgba: "(227,242,212)",
      hex: "#E3F2D4",
      percent: 1.1317254174397031,
    },
    {
      pixels: 149,
      rgba: "(105,107,98)",
      hex: "#696B62",
      percent: 0.9214594928880643,
    },
    {
      pixels: 137,
      rgba: "(162,163,158)",
      hex: "#A2A39E",
      percent: 0.847247990105133,
    },
    {
      pixels: 117,
      rgba: "(165,212,114)",
      hex: "#A5D472",
      percent: 0.7235621521335807,
    },
    {
      pixels: 101,
      rgba: "(202,229,172)",
      hex: "#CAE5AC",
      percent: 0.6246134817563389,
    },
    {
      pixels: 63,
      rgba: "(211,215,206)",
      hex: "#D3D7CE",
      percent: 0.38961038961038963,
    },
    {
      pixels: 52,
      rgba: "(182,220,140)",
      hex: "#B6DC8C",
      percent: 0.32158317872603587,
    },
    {
      pixels: 47,
      rgba: "(165,166,161)",
      hex: "#A5A6A1",
      percent: 0.2906617192331478,
    },
    {
      pixels: 14,
      rgba: "(128,129,123)",
      hex: "#80817B",
      percent: 0.08658008658008658,
    },
  ]);
});
