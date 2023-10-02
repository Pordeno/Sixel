
export { toSixels , getPalette }


function toId ( color : Color , coarseness : u8 ) : u32 {
    return (
        Math.round( ( color[ 0 ] / coarseness ) <<  0 ) + 
        Math.round( ( color[ 1 ] / coarseness ) <<  7 ) + 
        Math.round( ( color[ 2 ] / coarseness ) << 14 )
    ) as u32
}


const ToRange = 100.0 / 255.0

function normalize ( colors : Uint8Array ) : Uint8Array {
    return colors.map(( channel ) => ( channel * ToRange ) as u8 ) 
}


type Sixel = Array<u8>
type Color = Array<u8>



var 
    palette : Array<Color> = [] , 
    pixels : Array<u8> = []


function getPalette () : Array<Color> {
    return palette
}


function unify ( data : Uint8Array ) : void {

    data = normalize(data)

    let coarseness : u8 = 1
    palette = []
    pixels = []

    while ( true ){
        
        if( calculate(data,coarseness) )
            break
            
        coarseness++
    }
}


function calculate ( data : Uint8Array , coarseness : u8 ) : boolean {
        
    const unique = []

    palette = []
    pixels = []
    

    const size = data.length

    for ( let i = 0 ; i < size ; i += 3 ){

        const slice = data
            .slice(i, i + 3)

        const color = [ 
            slice[ 0 ] ,
            slice[ 1 ] ,
            slice[ 2 ] ,
        ] as Color
        
        const id = toId(color,coarseness)
        
        let index = unique.indexOf(id)

        if( index < 0 ){
            
            if( unique.length >= 256 )
                return false
            
            index = unique.length

            palette.push(color)
            unique.push(id)
        }

        pixels.push( index as u8 )
    }
    
    return true
}


function toRows ( pixels : Array<u8> , width : u16 ) : Array<Color> {

    width *= 6
    
    const rows : Array<Color> = []

    while ( pixels.length ){

        const row = pixels.splice(0,width)

        if( ( row.length as u16 ) < width )
            break

        rows.push(row)
    }
    
    return rows
}


function toSixels ( data : Uint8Array , width : u16 ) : Array<Sixel[]> {

    unify(data)

    const rows = toRows(pixels,width)

    console.log(`Rows : ${ rows.length }`)

    const sixels : Array<Sixel[]> = []

    while ( rows.length )
        sixels.push(toSixelRow(rows.shift(),width))

    return sixels
}


function toSixelRow ( row : Array<u8> , width : u16 ) : Array<Sixel> {
    
    const sixels : Array<Sixel> = []
    
    for ( let x : u16 = 0 ; x < width ; x++ )
        sixels.push([
            row[ ( x + 0 * width ) as i32 ] ,
            row[ ( x + 1 * width ) as i32 ] ,
            row[ ( x + 2 * width ) as i32 ] ,
            row[ ( x + 3 * width ) as i32 ] ,
            row[ ( x + 4 * width ) as i32 ] ,
            row[ ( x + 5 * width ) as i32 ] ,
        ])

    return sixels
}
