const spawn = require("child_process").spawn;

export function extractColorPalette(path: string) {
  return new Promise((resolve, reject) => {
    var convert = spawn("convert", [
        path,
        "-colors",
        "16",
        "-depth",
        "8",
        "-format",
        "%c",
        "histogram:info:-",
      ]),
      out = "",
      err = "";

    convert.stdout.on("data", function (data: any) {
      out += data.toString();
    });

    convert.stderr.on("data", function (data: any) {
      err += data.toString();
    });

    // a big note. exit may be fired before or after close of stdout (0.8.20)
    // to respond properly in any lib using spawn you really need to wait for both.
    let exit: any;
    let closed: any;

    function done() {
      if (exit === undefined) process.exit(9);
      err = exit ? (err ? err : exit) : false;
      var colors;
      if (!err) {
        colors = parseImagickColors(out);
        if (!colors.length) {
          console.log("no colors from parse:", out);
        }
        resolve(colors);
      } else {
        reject(err);
      }
    }

    convert.on("exit", function (code: string) {
      exit = code;
      if (closed) done();
    });

    convert.stdout.on("close", function () {
      closed = true;
      if (exit !== undefined) done();
    });

    convert.stdin.end();
  });
}

export function parseImagickColors(colorStr: string) {
  const { rows, totalPixels } = colorStr.split("\n").reduce<{
    totalPixels: number;
    rows: { pixels: number; rgba: string; hex: string }[];
  }>(
    (acc, str) => {
      if (str) {
        const [countStr, rgba, hex] = str
          .trim()
          .replace(/([(]) |(,) |:( )/g, "$1$2$3")
          .split(" ");

        if (countStr) {
          const count = parseInt(countStr);
          return {
            ...acc,
            totalPixels: acc.totalPixels + count,
            rows: [
              ...acc.rows,
              {
                pixels: count,
                rgba,
                hex,
              },
            ],
          };
        }
      }

      return acc;
    },
    { rows: [], totalPixels: 0 }
  );

  console.log("totalPixels", totalPixels);
  return rows
    .map((row) => {
      return {
        ...row,
        percent: (row.pixels * 100) / totalPixels,
      };
    })
    .sort((a, b) => b.percent - a.percent);
}
