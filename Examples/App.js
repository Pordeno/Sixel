
import { normalize } from '../Source/Normalize.ts'
import { toSixels } from '../Source/ToSixels.ts'
import { toColors } from '../Source/ToColors.ts'
import { toRows } from '../Source/ToRows.ts'
import { render } from '../Source/Render.ts'
import { unify } from '../Source/Palletize.ts'

import fromPNG from './PNG.js'


const { timeEnd , time , clear , log } = console


clear();
clear();

let { data , width , height } = await fromPNG('Images/Test15.png');


time('Normalization');

data = normalize(data);

timeEnd('Normalization');


time('ToColors');

data = toColors(data);

timeEnd('ToColors');


time('Palletize');

const [ palette , pixels ] = unify(data);

timeEnd('Palletize');


time('ToRows');

let rows = toRows(pixels,width);

timeEnd('ToRows');


time('ToSixel');

rows = toSixels(rows,width);

timeEnd('ToSixel');


const content = render(palette,rows,width,height);

time('Display');
log(content);
timeEnd('Display');

timeEnd('Paint');
timeEnd('Everything');


await Deno.writeTextFile('Output.txt',content);
