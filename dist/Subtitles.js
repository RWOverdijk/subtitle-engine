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
const subtitle_1 = require("subtitle");
const fs = __importStar(require("fs"));
const util = __importStar(require("util"));
class Subtitles {
    constructor(subtitles) {
        this.indexed = {};
        this.current = null;
        this.index(subtitles);
    }
    static fromFile(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = yield util.promisify(fs.readFile)(path, 'utf8');
            return new Subtitles(subtitle_1.parse(content));
        });
    }
    index(subtitles) {
        subtitles.forEach((sub) => {
            const startKey = Math.floor(sub.start / 1000);
            const endKey = Math.floor(sub.end / 1000);
            for (let iterator = startKey; iterator <= endKey; iterator++) {
                this.indexed[iterator] = this.indexed[iterator] || [];
                this.indexed[iterator].push(sub);
            }
        });
    }
    lookup(time) {
        const current = this.current;
        // Still active, no need to do any lookups.
        if (current && time >= current.start && time <= current.end) {
            return current;
        }
        const key = Math.floor(time / 1000);
        const indexed = this.indexed;
        if (!indexed[key]) {
            this.current = null;
            return null;
        }
        const subMatch = indexed[key].find(sub => {
            return time >= sub.start && time <= sub.end;
        });
        if (!subMatch) {
            this.current = null;
            return null;
        }
        this.current = subMatch;
        return this.current;
    }
}
exports.Subtitles = Subtitles;
