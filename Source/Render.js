
export { render }

import { printSixels , cursorTo } from './XTerm.js'
import { declareColor } from './Sixels.js'
import { deduplicate } from './Deduplicate.js'


const { timeEnd , time , log } = console


const sum = ( a , b ) => a + b


const { fromCharCode } = String


const toChar = ( code ) =>
    fromCharCode(code)
    

const mapping = Array(64)
    .fill(63)
    .map(sum)
    .map(toChar)


const toSixel = ([ count , decimal ]) => {
    
    decimal = mapping[ decimal ]
    
    if( count < 3 )
        return decimal.repeat(count)
        
    return `!${ count }${ decimal }`
}



function render ( palette , rows , width , height ){
    
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
        
            sixel.forEach((colorId,index) => {
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
    
    const encodeSixels = ( sequence ) => sequence
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
