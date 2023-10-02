
export { unify }

import { hash } from './Hash.js'


const { round } = Math


function unify ( colors ){
    
    colors = [ ... colors ]
    
    let coarseness = 1 ,
        palette = [] ,
        pixels = []

        
    const coarser = ( channel ) =>
        round(channel / coarseness)
        
    const reduce = ([ r , g , b ]) => [
        coarser(r) ,
        coarser(g) ,
        coarser(b)
    ]
    
        
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
        color.map(( channel ) => 
            channel * coarseness))
    
    return [ palette , pixels ]
}
