const Jimp = require("jimp");

// console.log(Jimp.rgbaToInt(255, 255, 255, 255));
// console.log(Jimp.rgbaToInt(254, 255, 255, 255));
// console.log(Jimp.intToRGBA(4294967295));
// console.log(Jimp.intToRGBA(4278190079));
Jimp.intToRGBA
console.log(Jimp.rgbaToInt(255, 254, 130, 255));
let color = Jimp.rgbaToInt(255, 0, 255, 255);
const r = color / Math.pow(256, 3);
color -= r;
const g = r / Math.pow(256, 2);
color -= g;
const b = g / Math.pow(256, 1);
color -= b;
const a = b / Math.pow(256, 0);
console.log(r, g, b, a);
