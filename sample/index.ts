import { extractColorPalette, generatePaletteImage } from "../src";

(async () => {
  const path = __dirname + "/../test/nodelogo.png";
  const data = await extractColorPalette(path);
  await generatePaletteImage(__dirname + "/../test/nodelogo.palette.png", data);
})();
