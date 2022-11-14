
const { floor } = Math;

const Escape = '\x1B';


export function cursorTo ( x , y ){
    return Escape + `[${ floor(y) };${ floor(x) }H`
}

export function printSixels ( colors , sixels ){
    
    
    const data = colors
        .concat(sixels)
        .join('');
    
    return Escape + `Pq${ data }` + Escape + '\\'
}
