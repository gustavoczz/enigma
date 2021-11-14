const Jimp = require("jimp");
const fs = require("fs");

const w = 197;
const h = 156;
const image = "./sample.png";

// const w = 6;
// const h = 3;
// const image = "./coresTeste.png";

const dw = (message) => {
    let activated = false;
    activated && fs.appendFileSync("debug.txt", message + "\n");
};

Jimp.read(image, function (err, image) {
    if (err) console.log(err);

    let intArray = [];

    for (let y = 0; y < h; y++) {
        let row = [];
        for (let x = 0; x < w; x++) {
            const a = image.getPixelColor(x, y);
            row.push(a);
        }
        intArray.push(row);
    }
    let rgbaArray = intToRgb(intArray);
    let binaryArray = rgbaToBinary(rgbaArray);
    // let binaryArrayWithMessage = hideMessageInBinaryArray(binaryArray);
    let rgbaArray2 = binaryToRgba(binaryArray);
    let intArray2 = rgbToInt(rgbaArray2);
    voltarImagem(intArray2);
});

function binaryToRgba(binaryArray) {
    let rgbaArray = [];
    for (let y = 0; y < h; y++) {
        let row = [];
        for (let x = 0; x < w; x++) {
            let rgba = {
                r: parseInt(binaryArray[y][x][0], 2),
                g: parseInt(binaryArray[y][x][1], 2),
                b: parseInt(binaryArray[y][x][2], 2),
                a: parseInt(binaryArray[y][x][3], 2),
            };
            dw(
                `${binaryArray[y][x][0]} - ${binaryArray[y][x][1]} - ${
                    binaryArray[y][x][2]
                } - ${binaryArray[y][x][3]} - ${Object.keys(
                    rgba
                )} | ${Object.values(rgba)}`
            );
            row.push(rgba);
        }
        rgbaArray.push(row);
    }
    return rgbaArray;
}

function rgbaToBinary(rgbaArray) {
    const binaryFormatter = (rgba) => {
        const dec2bin = (dec) => {
            return (dec >>> 0).toString(2).padEnd(8, "0");
        };

        dw(
            `${Object.entries(rgba).join(" | ")} - ${[
                dec2bin(rgba.r),
                dec2bin(rgba.g),
                dec2bin(rgba.b),
                dec2bin(rgba.a),
            ]}`
        );

        return [
            dec2bin(rgba.r),
            dec2bin(rgba.g),
            dec2bin(rgba.b),
            dec2bin(rgba.a),
        ];
    };

    let binaryArray = [];
    for (let y = 0; y < h; y++) {
        let row = [];
        for (let x = 0; x < w; x++) {
            row.push(binaryFormatter(rgbaArray[y][x]));
        }
        binaryArray.push(row);
    }
    return binaryArray;
}

function rgbToInt(rgbaArray) {
    let intArray = [];
    for (let y = 0; y < h; y++) {
        let row = [];
        for (let x = 0; x < w; x++) {
            const { r, g, b, a } = rgbaArray[y][x];
            // console.log(r, g, b, a);
            // Jimp.rgbaToInt(
            //     Math.max(0, r),
            //     Math.max(0, g - 50),
            //     Math.max(0, b - 50),
            //     Math.max(0, a - 50)
            // );
            row.push(Jimp.rgbaToInt(r, g, b, a));
        }
        intArray.push(row);
    }
    return intArray;
}

function intToRgb(intArray) {
    let rgbaArray = [];

    for (let y = 0; y < h; y++) {
        let row = [];
        for (let x = 0; x < w; x++) {
            const rgba = Jimp.intToRGBA(intArray[y][x]);
            row.push(rgba);
        }
        rgbaArray.push(row);
    }
    return rgbaArray;
}

function voltarImagem(intArray) {
    new Jimp(w, h, function (err, image) {
        if (err) throw err;

        intArray.forEach((row, y) => {
            row.forEach((color, x) => {
                image.setPixelColor(color, x, y);
            });
        });

        image.write("final.png", (err) => {
            if (err) throw err;
        });
    });
}
