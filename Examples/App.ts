
import { getPalette , toSixels } from '../Source/Assembly.ts'
import { render } from '../Source/Render.ts'

import { fromPNG } from './PNG.ts'


const { timeEnd , time , clear , log } = console


clear();
clear();

let { data , width , height } = await fromPNG('Images/Test15.png');


time('Paint');


time('ToSixel');

const sixels = toSixels(data,width);
const palette = getPalette()

timeEnd('ToSixel');


const content = render(palette,sixels,width,height);

time('Display');
log(content);
timeEnd('Display');

timeEnd('Paint');
timeEnd('Everything');


await Deno.writeTextFile('Output.txt',content);
