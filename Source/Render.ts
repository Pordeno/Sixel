
export { render }

import { printSixels , cursorTo } from './XTerm.ts'
import { declareColor } from './Sixels.ts'
import { deduplicate } from './Deduplicate.ts'
import { Sixel , Color } from './Types.ts'


const { timeEnd , time , log } = console


const sum = ( a : number , b : number ) => a + b


const { fromCharCode } = String


const toChar = ( code : number ) =>
    fromCharCode(code)
    

const mapping = Array<number>(64)
    .fill(63)
    .map(sum)
    .map(toChar)


const toSixel = ([ count , decimal ] : [ number , number ] ) => {
    
    const char = mapping[ decimal ]
    
    if( count < 3 )
        return char.repeat(count)
        
    return `!${ count }${ char }`
}



function render ( palette : Array<Color> , rows : Array<Sixel[]> , width : number , height : number ){
    
    log('Palette Size:',palette.length)
    
    time('Render')
    
    time('Declare Colors')

    const colors = palette
        .map(( color , id ) => declareColor(id,color))
    
    timeEnd('Declare Colors')
    
    
    
    let lines = Array(height)
        .fill(null)
        .map(() =>
            Array(palette.length)
                .fill(null))

    
    time('Sixel Decimal')
    
    //  To Sixel Decimal
    
    let y = 0 ,
        x = 0 
    
    for ( const row of rows ){
        
        x = 0
        
        for ( const sixel of row ){
        
            sixel.forEach(( colorId , index ) => {
                lines[y][colorId] ??= Array(width).fill(0)
                lines[y][colorId][x] += ( 1 << index )
            })
            
            x++
        }
        
        y++
    }
    
    timeEnd('Sixel Decimal')
    
    console.log('ToSixel',x,y,x * y)
    
    
    time('Extracting Filled')
    
    //  To Sixel Sequence
    
    const encodeSixels = ( sequence : Array<[ number , number ]> ) => sequence
        .map(toSixel)
        .join('')

    
    lines = lines.map(( layers ) => layers
        .map(deduplicate)
        .map(encodeSixels)
    )
    
    timeEnd('Extracting Filled')
    
    
    time('Extracting Lines')
    
    
    let content = ''
    
    for ( const layers of lines ){

        layers.forEach(( sixels , layer ) => {
        
            if( sixels.length )
                content += `#${ layer }${ sixels }$`
        })
        
        content += '-'
    }
    
    timeEnd('Extracting Lines')
    

    const frame = printSixels(colors,content.slice(0,-1))
    
    timeEnd('Render')
    
    return frame
}
