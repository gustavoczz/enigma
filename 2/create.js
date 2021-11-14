const Jimp = require("jimp");

const w = 197;
const h = 156;

let rgbArray = [];

const binaryFormatter = (rgba) => {
    function dec2bin(dec) {
        return (dec >>> 0).toString(2).padEnd(8, "0");
    }

    return [dec2bin(rgba.r), dec2bin(rgba.g), dec2bin(rgba.b), dec2bin(rgba.a)];
};

Jimp.read("./sample.jpg", function (err, image) {
    if (err) console.log(err);

    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            rgbArray.push(
                ...binaryFormatter(Jimp.intToRGBA(image.getPixelColor(x, y)))
            );
            // rgbArray = [...rgbArray, ...binaryFormatter(a)];
        }
    }
    continueProcess();
});

function continueProcess() {
    const binToDec = (a) => {
        return parseInt(a, 2);
    };

    const intFormatter = (array) => {
        let final = [];
        for (let y = 0; y < h; y++) {
            let row = [];
            console.log(w, y, w * y, w * (y + 1));
            for (let x = w * y * 4; x < w * (y + 1) * 4; x += 4) {
                if (
                    array[x] === undefined ||
                    array[x + 1] === undefined ||
                    array[x + 2] === undefined ||
                    array[x + 3] === undefined
                )
                    break;

                row.push(
                    Jimp.rgbaToInt(
                        binToDec(array[x]),
                        binToDec(array[x + 1]),
                        binToDec(array[x + 2]),
                        binToDec(array[x + 3])
                    )
                );
            }
            final.push(row);
        }
        return final;
    };

    const intArray = intFormatter(rgbArray);

    console.log(intArray);

    new Jimp(w, h, function (err, image) {
        if (err) throw err;

        // console.log(intArray);

        intArray.forEach((row, y) => {
            // console.log("row.length", row.length);
            row.forEach((color, x) => {
                image.setPixelColor(color, x, y);
            });
        });

        image.write("test.png", (err) => {
            if (err) throw err;
        });
    });
}
