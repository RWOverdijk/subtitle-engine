import { parse, subTitleType } from 'subtitle';
import * as fs from 'fs';
import * as util from 'util';

export class Subtitles {
  private indexed: SubtitlesIndices = {};

  private current: subTitleType | null = null;

  constructor(subtitles: subTitleType[]) {
    this.index(subtitles);
  }

  public static async fromFile(path: string): Promise<Subtitles> {
    const content = await util.promisify(fs.readFile)(path, 'utf8');

    return new Subtitles(parse(content));
  }

  private index (subtitles: subTitleType[]) {
    subtitles.forEach((sub: subTitleType) => {
      const startKey = Math.floor(sub.start as number / 1000);
      const endKey = Math.floor(sub.end as number / 1000);

      for (let iterator = startKey; iterator <= endKey; iterator++) {
        this.indexed[iterator] = this.indexed[iterator] || [];
        this.indexed[iterator].push(sub);
      }
    });
  }

  public lookup(time: number) {
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

export interface SubtitlesSource { 
  [key: number]: subTitleType[];
}

export interface SubtitlesIndices { 
  [key: number]: subTitleType[];
}