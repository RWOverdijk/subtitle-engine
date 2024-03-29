"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const Subtitles_1 = require("./Subtitles");
(() => __awaiter(this, void 0, void 0, function* () {
    // const srt: Subtitles = await Subtitles.fromFile(path.join(__dirname, '../sources/example.srt'));
    const srt = yield Subtitles_1.Subtitles.fromFile(path.join(__dirname, '../sources/The.Elephant.Queen.2019.1080p.WEB-DL.DD5.1.H264-TARS.SDH.srt'));
    let matches = 0;
    let prev;
    let a;
    // console.log(srt.lookup(741533));//753,533
    console.log(srt.lookup(5624000));
    return;
    for (let i = 0; i <= 750000; i++) {
        const match = srt.lookup(i);
        prev = match || prev;
    }
    // 739406
    console.log({ matches, prev });
}))();
