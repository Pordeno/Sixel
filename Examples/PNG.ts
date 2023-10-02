
export { fromPNG }

import { decode } from 'https://deno.land/x/pngs@0.1.1/mod.ts';

const 
    { timeEnd , time , clear , log } = console ,
    { readFile } = Deno ;


clear();


async function fromPNG ( path : string ){
    
    time('Loading');


    time('Everything');

    const bytes = await readFile(path);

    timeEnd('Loading');


    time('Decoding');

    let { image , width , height , colorType , ...details } = decode(bytes);

    timeEnd('Decoding');


    log(`
        Original : ${ width } x ${ height }
        ColorType : ${ colorType }
        Bytes : ${ image.length }
    `)


    if(colorType === 6)
        image = image.filter((_,index) => (index % 4) !== 3);
        
    return { data : image , width , height }
}
