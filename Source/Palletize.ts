
export { unify }

import { Color } from './Types.ts'
import { hash } from './Hash.ts'



const { round } = Math


function unify ( colors : Array<Color> ){
    
    colors = [ ... colors ]
    
    let coarseness = 1 ,
        palette = new Array<Color> ,
        pixels = new Array<number>

        
    const coarser = ( channel : number ) =>
        round(channel / coarseness)
        
    const reduce = ([ r , g , b ] : Color ) => [
        coarser(r) ,
        coarser(g) ,
        coarser(b)
    ] as Color
    
        
    function calculate (){
        
        const unique = []

        palette = []
        pixels = []
        
        
        for ( const color of colors ){
            
            const reduced = reduce(color)
            
            const id = hash(reduced)
            
            let index = unique.indexOf(id)

            if( index < 0 ){
                
                if( unique.length >= 256 )
                    return false
                
                index = unique.length

                palette.push(reduced)
                unique.push(id)
            }

            pixels.push(index)
        }
        
        return true
    }
    
    while ( true ){
        
        if( calculate() )
            break
            
        coarseness++
    }
    
    console.log(`Final Coarseness:`,coarseness)
    
    palette = palette.map(( color ) => 
        color.map(( channel ) => channel * coarseness) as Color )
    
    return [ palette , pixels ] as const
}
