const Jimp = require("jimp");
const fs = require("fs");

const w = 197;
const h = 156;
const image = "./sample.png";

// const w = 6;
// const h = 3;

const ehPrimeiroPixel = (x, y) => x === 0 && y === 0;

const binaryFormatter = (rgba) => {
    function dec2bin(dec) {
        const bin = (dec >>> 0).toString(2).padEnd(8, "0");
        // console.log(`dec: ${dec} | bin: ${bin}`);
        return bin;
    }

    return [dec2bin(rgba.r), dec2bin(rgba.g), dec2bin(rgba.b), dec2bin(rgba.a)];
};

let rgbArray = [];
let intArray = [];

const debugWrite = (message) => {
    fs.appendFileSync("debug.txt", message + "\n");
};

Jimp.read(image, function (err, image) {
    if (err) console.log(err);
    for (let y = 0; y < h; y++) {
        let row = [];
        for (let x = 0; x < w; x++) {
            const a = image.getPixelColor(x, y);
            if (y === 0 && x === 0) debugWrite(`debug color: (int) ${a}`);
            row.push(a);
            rgbArray.push(...binaryFormatter(Jimp.intToRGBA(a)));
            // rgbArray = [...rgbArray, ...binaryFormatter(a)];
        }
        intArray.push(row);
    }
    let rgbaArray = toRGBAArray(intArray);
    let binaryArray = toBinaryArray(rgbaArray);
    let binaryArrayWithMessage = hideMessageInBinaryArray(binaryArray);
    let loko = binaryToIntArray(binaryArrayWithMessage);
    voltar(loko);
    fs.writeFileSync("./rgbArray.json", JSON.stringify(rgbArray));
});

const toRGBAArray = (intArray) => {
    let rgbaArray = [];
    for (let y = 0; y < h; y++) {
        let row = [];
        for (let x = 0; x < w; x++) {
            const rgba = Jimp.intToRGBA(intArray[y][x]);
            if (ehPrimeiroPixel(x, y))
                debugWrite(
                    `debug color: (rgba) ${rgba.r} | ${rgba.g} | ${rgba.b} | ${rgba.a}`
                );
            row.push(rgba);
        }
        rgbaArray.push(row);
    }
    return rgbaArray;
};

const toBinaryArray = (rgbaArray) => {
    const binaryFormatter = (rgba) => {
        const dec2bin = (dec) => {
            return (dec >>> 0).toString(2).padEnd(8, "0");
        };

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
            const binary = binaryFormatter(rgbaArray[y][x]);
            if (ehPrimeiroPixel(x, y))
                debugWrite(`debug color: (rgba > bin) ${binary}`);
            row.push(binary);
        }
        binaryArray.push(row);
    }
    return binaryArray;
};

const hideMessageInBinaryArray = (binaryArray) => {
    let newBinaryArray = [];
    let currMessIndex = 0;
    for (let y = 0; y < h; y++) {
        let row = [];
        for (let x = 0; x < w; x++) {
            let subRow = [];
            for (let z = 0; z < 4; z++) {
                if (currMessIndex < message.length - 1) {
                    const parseValue = binaryArray[y][x][z];

                    console.log("parseValue: ", parseValue);
                    console.log("currMessIndex: ", currMessIndex);

                    const vet = parseValue.split("");
                    vet.splice(-1);
                    console.log("vet: ", vet);
                    console.log("vet.join(''): ", vet.join(""));
                    console.log(
                        "message[currMessIndex]: ",
                        message[currMessIndex]
                    );
                    console.log(
                        "vet.join('') + message[currMessIndex]: ",
                        vet.join("") + message[currMessIndex]
                    );
                    const newBit = vet.join("") + message[currMessIndex];
                    console.log("newBit: ", newBit);
                    currMessIndex++;

                    // if (ehPrimeiroPixel(x, y))
                    //     debugWrite(
                    //         `debug color (z = ${z}): (bin to newBit) ${newBit}`
                    //     );

                    subRow.push(newBit);
                } else {
                    subRow.push(binaryArray[y][x][z]);
                }
            }
            row.push(subRow);
        }
        newBinaryArray.push(row);
    }
    return newBinaryArray;
};

const binaryToIntArray = (binaryArray) => {
    const binToDec = (a) => {
        return parseInt(a, 2);
    };
    let final = [];
    for (let y = 0; y < h; y++) {
        let row = [];
        for (let x = 0; x < w; x++) {
            const inttedBinary = Jimp.rgbaToInt(
                binToDec(binaryArray[y][x][0]),
                binToDec(binaryArray[y][x][1]),
                binToDec(binaryArray[y][x][2]),
                binToDec(binaryArray[y][x][3])
            );
            row.push(inttedBinary);
            if (ehPrimeiroPixel(x, y))
                debugWrite(`debug color: (bin to int) ${inttedBinary}`);
            if (inttedBinary === 4294869759)
                debugWrite(`criminoso ${binaryArray[y][x]} at ${x} e ${y}`);
        }
        final.push(row);
    }
    // console.log("final:", final);
    return final;
};

const voltar = (intArray) => {
    new Jimp(w, h, function (err, image) {
        if (err) throw err;

        console.log(intArray);

        intArray.forEach((row, y) => {
            // console.log("row.length", row.length);
            row.forEach((color, x) => {
                // console.log(color, x, y);
                image.setPixelColor(color, x, y);
            });
        });

        image.write("batata.png", (err) => {
            if (err) throw err;
        });
    });
};

const message = [
    "0",
    "1",
    "1",
    "1",
    "0",
    "0",
    "1",
    "0",
    "0",
    "1",
    "1",
    "0",
    "0",
    "1",
    "0",
    "1",
    "0",
    "1",
    "1",
    "1",
    "0",
    "0",
    "1",
    "1",
    "0",
    "1",
    "1",
    "1",
    "0",
    "0",
    "0",
    "0",
    "0",
    "1",
    "1",
    "0",
    "1",
    "1",
    "1",
    "1",
    "0",
    "1",
    "1",
    "1",
    "0",
    "0",
    "1",
    "1",
    "0",
    "1",
    "1",
    "1",
    "0",
    "1",
    "0",
    "0",
    "0",
    "1",
    "1",
    "0",
    "0",
    "0",
    "0",
    "1",
    "0",
    "0",
    "1",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "1",
    "1",
    "0",
    "0",
    "1",
    "0",
    "0",
    "0",
    "1",
    "1",
    "0",
    "0",
    "0",
    "0",
    "1",
    "0",
    "0",
    "1",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "1",
    "1",
    "0",
    "0",
    "1",
    "1",
    "0",
    "0",
    "1",
    "1",
    "0",
    "0",
    "0",
    "0",
    "1",
    "0",
    "1",
    "1",
    "1",
    "0",
    "0",
    "1",
    "1",
    "0",
    "1",
    "1",
    "0",
    "0",
    "1",
    "0",
    "1",
    "0",
    "0",
    "1",
    "1",
    "1",
    "0",
    "1",
    "0",
    "0",
    "0",
    "1",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "1",
    "0",
    "0",
    "0",
    "0",
    "1",
    "1",
    "0",
    "1",
    "1",
    "0",
    "1",
    "1",
    "1",
    "1",
    "0",
    "1",
    "1",
    "0",
    "0",
    "0",
    "1",
    "0",
    "0",
    "1",
    "1",
    "0",
    "1",
    "1",
    "1",
    "1",
    "0",
    "1",
    "1",
    "0",
    "1",
    "1",
    "0",
    "0",
    "0",
    "0",
    "1",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "1",
    "1",
    "0",
    "1",
    "1",
    "0",
    "1",
    "0",
    "1",
    "1",
    "0",
    "0",
    "1",
    "0",
    "1",
    "0",
    "1",
    "1",
    "0",
    "1",
    "1",
    "0",
    "0",
    "0",
    "1",
    "1",
    "0",
    "1",
    "0",
    "0",
    "0",
    "0",
    "1",
    "1",
    "0",
    "1",
    "1",
    "1",
    "1",
    "0",
    "1",
    "1",
    "1",
    "0",
    "0",
    "1",
    "0",
    "0",
    "0",
    "1",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "1",
    "1",
    "0",
    "1",
    "1",
    "0",
    "0",
    "0",
    "1",
    "1",
    "0",
    "1",
    "0",
    "0",
    "1",
    "0",
    "1",
    "1",
    "0",
    "1",
    "1",
    "1",
    "0",
    "0",
    "1",
    "1",
    "0",
    "0",
    "1",
    "1",
    "1",
    "0",
    "1",
    "1",
    "1",
    "0",
    "1",
    "0",
    "1",
    "0",
    "1",
    "1",
    "0",
    "0",
    "0",
    "0",
    "1",
    "0",
    "1",
    "1",
    "0",
    "0",
    "1",
    "1",
    "1",
    "0",
    "1",
    "1",
    "0",
    "0",
    "1",
    "0",
    "1",
    "0",
    "1",
    "1",
    "0",
    "1",
    "1",
    "0",
    "1",
];
