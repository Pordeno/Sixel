
import hash from '../Source/Hash.js'

const { round , min } = Math;


export default function unify ( colors ){
    
    colors = [ ... colors ];
    
    let palette = [];
    let pixels = [];
    
    let coarseness = 1;
    
    const coarser = ( channel ) =>
        round(channel / coarseness) * coarseness
        
    const reduce = ([ r , g , b ]) => [
        coarser(r) ,
        coarser(g) ,
        coarser(b)
    ]
    
        
    function calculate (){
        
        const unique = [];
        palette = [];
        pixels = [];
        
        
        for ( const color of colors ){
            
            const reduced = reduce(color);
            
            const id = hash(reduced);
            
            let index = unique.indexOf(id);

            if(index < 0){
                
                if(unique.length >= 256)
                    return false
                
                index = unique.length;
                palette.push(color);
                unique.push(id);
            }

            pixels.push(index);
        }
        
        return true
    }
    
    while ( true ){
        
        if(calculate())
            break
            
        coarseness++;
    }
    
    console.log('Final Coarseness:',coarseness);
    
    return [ palette , pixels ]
}
