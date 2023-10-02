
export { toRows }


function toRows ( colors , width ){
    
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
