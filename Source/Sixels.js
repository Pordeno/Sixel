
const { fromCharCode : toChar } = String; 

const 
    SixelOffset = 63 ,
    RGBMode = 2 ;


/**
 *  @param color Normalized ( 0 - 100 ) RGB color array.
 */

export function declareColor ( id , color ){
    return `#${ id };${ RGBMode };${ color.join(';') }`
}


/**
 *  @param pixels Array of decimal sixel data.
 */
 
export function writePixels ( colorId , pixels ){
    
    const sixels = pixels
        .map(toSixel)
        .join('')
        .replace(/\?+/g,(string) => `!${ string.length }?`);
    
    return `#${ colorId }${ sixels }`
}


/**
 *  @param decimal 6-bit bitmap of one sixel column.
 */

export function toSixel ( decimal ){
    
    if(decimal)
        return toChar(decimal + SixelOffset)
    
    return '?'
}
