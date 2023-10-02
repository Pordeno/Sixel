
export { printSixels , cursorTo }


const { floor } = Math

const Escape = '\x1B'


function cursorTo ( x , y ){
    return Escape + `[${ floor(y) };${ floor(x) }H`
}

function printSixels ( colors , sixels ){
    
    
    const data = colors
        .concat(sixels)
        .join('')
    
    return `${ Escape }Pq${ data }${ Escape }\\`
}
