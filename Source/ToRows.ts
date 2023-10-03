
export { toRows }

import { Color } from './Types.ts'


function toRows ( colors : Array<Color> , width : number ){
    
    const rows = []
    
    let row = []
    
    for ( const color of colors ){
        
        row.push(color)
        
        if( row.length < width * 6 )
            continue
            
        rows.push(row)
        
        row = []
    }
    
    return rows
}
