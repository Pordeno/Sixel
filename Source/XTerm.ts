
export { printSixels }


const Escape = '\x1B'


function printSixels ( colors : Array<string> , sixels : string ){
    
    
    const data = colors
        .concat(sixels)
        .join('')
    
    return `${ Escape }Pq${ data }${ Escape }\\`
}
