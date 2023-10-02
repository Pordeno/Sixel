
export { printSixels , cursorTo }


const { floor } = Math

const Escape = '\x1B'


function cursorTo ( x : number , y : number ){
    return Escape + `[${ floor(y) };${ floor(x) }H`
}

function printSixels ( colors : Array<string> , sixels : string ){
    
    
    const data = colors
        .concat(sixels)
        .join('')
    
    return `${ Escape }Pq${ data }${ Escape }\\`
}
