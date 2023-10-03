
export { toRows }


function toRows ( colors : Array<number> , width : number ){
    
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
