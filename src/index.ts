import * as path from 'path';
import { Subtitles } from './Subtitles';

(async () => {
  // const srt: Subtitles = await Subtitles.fromFile(path.join(__dirname, '../sources/example.srt'));
  const srt: Subtitles = await Subtitles.fromFile(path.join(__dirname, '../sources/The.Elephant.Queen.2019.1080p.WEB-DL.DD5.1.H264-TARS.SDH.srt'));

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
})();
