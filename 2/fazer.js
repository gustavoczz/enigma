// [2^0, 2^0, 2^0, 2^0, 2^0, 2^0, 2^0, 2^0, 2^0, 2^0, 2^0, 2^0, 2^0, 2^0, 2^0, 2^0, 2^0, ...]

const LENGTH = 320;

const w = 197;
const h = 156;

const Jimp = require("jimp");

Jimp.read("./final.png", (err, image) => {
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

    let rgbaarray = [];
    for (let y = 0; y < h; y++) {
        let row = [];
        for (let x = 0; x < w; x++) {
            const a = Jimp.intToRGBA(intArray[y][x]);
            row.push(a);
        }
        rgbaarray.push(row);
    }

    const dec2bin = (dec) => {
        return (dec >>> 0).toString(2).padEnd(8, "0");
    };

    let binarray = [];
    for (let y = 0; y < h; y++) {
        let row = [];
        for (let x = 0; x < w; x++) {
            row.push([
                dec2bin(rgbaarray[y][x].r),
                dec2bin(rgbaarray[y][x].g),
                dec2bin(rgbaarray[y][x].b),
                dec2bin(rgbaarray[y][x].a),
            ]);
        }
        binarray.push(row);
    }

    let c = 0;
    let mes = [];
    console.log(binarray);
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            for (let z = 0; z < 4; z++) {
                mes.push(binarray[y][x][z].split("")[7]);
                c++;
                if (c >= LENGTH) break;
            }
            if (c >= LENGTH) break;
        }
        if (c >= LENGTH) break;
    }

    // console.log(mes.join(""));
});
