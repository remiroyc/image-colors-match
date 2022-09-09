import * as Jimp from "jimp";

export async function generatePaletteImage(
  dest: string,
  colors: { rgba: number[]; hex: string }[]
) {
  return new Promise((resolve, reject) => {
    let image = new Jimp(10 * colors.length, 10, (err, image) => {
      if (err) {
        reject(err);
      }

      for (let i = 0; i < colors.length; i++) {
        const color = colors[i];
        const [r, g, b] = color.rgba;

        const minX = i * 10;
        const maxX = i * 10 + 10;

        for (let x = minX; x < maxX; x++) {
          for (let y = 0; y < 10; y++) {
            const hex = Jimp.rgbaToInt(r, g, b, 255);
            image.setPixelColor(hex, x, y);
          }
        }

        image.write(dest, (err) => {
          if (err) {
            reject(err);
          }

          resolve(image);
        });
      }
    });
  });
}
