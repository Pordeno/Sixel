
import { printSixels , cursorTo } from './XTerm.js'
import { declareColor } from './Sixels.js'
import deduplicate from './Deduplicate.js'


const { timeEnd , time , log } = console; 


const sum = ( a , b ) => 
    a + b;


const { fromCharCode } = String;


const toChar = ( code ) =>
    fromCharCode(code);
    

const mapping = Array(64)
    .fill(63)
    .map(sum)
    .map(toChar);


const toSixel = ([ count , decimal ]) => {
    
    decimal = mapping[decimal];
    
    if(count < 3)
        return decimal.repeat(count)
        
    return `!${ count }${ decimal }`
}


function arrayOf ( size , filler ){
    return Array(size)
        .fill(null)
        .map(filler);
}




export default function render ( palette , rows , width , height ){
    
    log('Palette Size:',palette.length)
    
    time('Render');
    
    time('Declare Colors');
    const colors = palette.map((color,id) => declareColor(id,color));
    timeEnd('Declare Colors');
    
    
    
    const layers = Array(palette.length)
        .fill(null)
        .map(() =>
            Array(height)
                .fill(null));

    
    time('Sixel Decimal');
    
    //  To Sixel Decimal
    
    let y = 0;
    let x = 0;
    
    for ( const row of rows ){
        
        x = 0;
        
        for ( const sixel of row ){
        
            sixel.forEach((colorId,index) => {
                layers[colorId][y] ??= Array(width).fill(0)
                layers[colorId][y][x] += ( 1 << index );
            })
            
            x++;
        }
        
        y++;
    }
    
    timeEnd('Sixel Decimal');
    console.log('ToSixel',x,y,x * y)
    
    
    time('Extracting Filled');
    
    //  To Sixel Sequence
    
    const encodeSixels = ( sequence ) => sequence
        .map(toSixel)
        .join('');

    
    const filled = layers.map((rows) => rows
        .map(deduplicate)
        .map(encodeSixels)
    )
    
    timeEnd('Extracting Filled');
    
    
    time('Extracting Lines');
    
    const lines = arrayOf(height,() => []);
    
    for ( const color in filled ){
        
        const rows = filled[color];
        
        for ( const line in rows ){
            
            const content = rows[line];
            
            if(content.length)
                lines[line].push(`#${ color }${ content }`);
        }
    }
    
    timeEnd('Extracting Lines');
    

    time('Combine Rows');

    const sixels = lines
        .map((content) => content.join('$') + '-')
        .join('');
    
    timeEnd('Combine Rows');
    
    
    const content = printSixels(colors,sixels);
    
    timeEnd('Render');
    
    return content
}
