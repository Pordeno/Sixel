
export { declareColor , writePixels , toSixel }

import { Color } from './Types.ts'


const { fromCharCode : toChar } = String

const 
    SixelOffset = 63 ,
    RGBMode = 2


/**
 *  @param color Normalized ( 0 - 100 ) RGB color array.
 */

function declareColor ( id : number , color : Color ){
    return `#${ id };${ RGBMode };${ color.join(';') }`
}


/**
 *  @param pixels Array of decimal sixel data.
 */
 
function writePixels ( colorId : string , pixels : Array<number> ){
    
    const sixels = pixels
        .map(toSixel)
        .join('')
        .replace(/\?+/g,( string ) => `!${ string.length }?`)
    
    return `#${ colorId }${ sixels }`
}


/**
 *  @param decimal 6-bit bitmap of one sixel column.
 */

function toSixel ( decimal : number ){
    
    if( decimal )
        return toChar(decimal + SixelOffset)
    
    return '?'
}
