
import { Hash } from '../Source/FFI.js'

import { decode } from 'https://deno.land/x/pngs/mod.ts';

import normalize from '../Source/Normalize.js'
import toSixels from '../Source/ToSixels.js'
import toColors from '../Source/ToColors.js'
import reduce from '../Source/ReduceDetail.js'
import toRows from '../Source/ToRows.js'
import render from '../Source/Render.js'
import unify from '../Source/Unify.js'

const 
    { timeEnd , time , clear , log } = console ,
    { fromEntries , entries } = Object ,
    { readFile } = Deno ;


clear();


const file = 'Images/Test.png';

time('Loading');


time('Everything');

const bytes = await readFile(file);

timeEnd('Loading');


time('Decoding');

const { image , width , height , colorType , ...details } = decode(bytes);

timeEnd('Decoding');


log(details,image.length);



log(`
    Original : ${ width } x ${ height }
`)



time('Paint');

let data = image;


if(colorType === 6)
    data = data.filter((_,index) => (index % 4) !== 3);


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
