
import { printSixels , cursorTo } from './XTerm.js'
import { declareColor } from './Sixels.js'


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

const toSixel = ( decimal ) =>
    mapping[decimal];



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
    
    for ( const row of rows ){
        
        let x = 0;
        
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
    
    
    time('Extracting Filled');
    
    //  To Sixel Sequence
    
    function deduplicate ( string ){
        
        let
            unique = '' ,
            count = 0 ,
            last ;
            
        const addReated = () => {
            
            //  Doesn't make a real differrence on either side
            
            // unique += `!${ count }${ last }`;
            
            unique += (count > 3) 
                ? `!${ count }${ last }`
                : last.repeat(count) ;
            
            count = 0;
        }
        
        for ( const char of string ){
            
            if(last === char){
                count++;
                continue
            }
            
            if(count)
                addReated();
            
            unique += char;
            last = char;
        }
        
        if(count)
            addReated();
        
        return unique;
    }
    
    
    const shortenEmpty = ( string ) => {
        
        if(/^\?*$/.test(string))
            return ''
        
        return string
    }
    
    const encodeSixels = ( row ) => 
        row?.map(toSixel)
            .join('') ?? '';

    
    const filled = layers.map((rows) => rows
        .map(encodeSixels)
        // .map(shortenEmpty)
        .map(deduplicate)
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
