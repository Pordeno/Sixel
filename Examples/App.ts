
import { normalize } from '../Source/Normalize.ts'
import { toSixels } from '../Source/ToSixels.ts'
import { toColors } from '../Source/ToColors.ts'
import { toRows } from '../Source/ToRows.ts'
import { render } from '../Source/Render.ts'
import { unify } from '../Source/Palletize.ts'

import fromPNG from './PNG.ts'


const { timeEnd , time , clear , log } = console


clear();
clear();

let { data , width , height } = await fromPNG('Images/Test15.png');


time('Paint');

time('Conversion');


time('Normalization');

const normalized = [ ... normalize(data) ]

timeEnd('Normalization');


time('ToColors');

const colors = [ ... toColors(normalized) ]

timeEnd('ToColors');


time('Palletize');

const [ palette , pixels ] = unify(colors);

timeEnd('Palletize');


time('ToRows');

const rows = toRows(pixels,width);

timeEnd('ToRows');


time('ToSixel');

const sixels = toSixels(rows,width);

timeEnd('ToSixel');

timeEnd('Conversion');


const content = render(palette,sixels,width,height);

time('Display');
log(content);
timeEnd('Display');

timeEnd('Paint');
timeEnd('Everything');


await Deno.writeTextFile('Output.txt',content);
