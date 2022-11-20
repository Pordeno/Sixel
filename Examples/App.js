
import { Hash } from '../Source/FFI.js'

import normalize from '../Source/Normalize.js'
import toSixels from '../Source/ToSixels.js'
import toColors from '../Source/ToColors.js'
import reduce from '../Source/ReduceDetail.js'
import toRows from '../Source/ToRows.js'
import render from '../Source/Render.js'
import unify from '../Source/Unify.js'

import fromPNG from './PNG.js'


const 
    { timeEnd , time , clear , log } = console ,
    { fromEntries , entries } = Object ;


clear();

let { data , width , height } = await fromPNG('Images/Test.png');


time('Normalization');

data = normalize(data);

timeEnd('Normalization');


time('ToColors');

data = toColors(data);

timeEnd('ToColors');


const colors = [];


time('Unify');

data = unify(data,colors);

timeEnd('Unify');


time('Reduce');

const { associations , palette } = 
    reduce(colors);

timeEnd('Reduce');


data = data.map((colorId) => associations[colorId]);


time('ToRows');

let rows = toRows(data,width);

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
