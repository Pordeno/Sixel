
import { Hash } from '../Source/FFI.js'



const 
    { fromEntries , entries } = Object ,
    { round , min } = Math ,
    { log } = console ;



export default function reduce ( palette ){
    
    //  Starts with ( lastest / current ) -> [ ( oldest / current ) ] ids.
    
    let newToOld = fromEntries(palette.map((color,colorId) => [ colorId , [ colorId ] ]));
    
    
    let coarseness = 1;
    
    const reduceDetail = ( channel ) =>
        min(100,round(channel / coarseness) * coarseness)
    
    
    while ( palette.length > 256){
        
        coarseness += 1;
        
        const 
            unique = [] ,
            ids = [] ;
        
        let currentId = 0;
        let nextNewToOld = {};
        
        for ( let color of palette ){
            
            color = color
                .map(reduceDetail);
            
            const id = Hash(...color);
            
            let index = ids.indexOf(id);
            
            if(index < 0){
                
                index = ids.length;
                
                unique.push(color);
                ids.push(id);
            }
            
            nextNewToOld[index] ??= [];
            nextNewToOld[index].push(...newToOld[currentId]);
            
            currentId++;
        }
        
        newToOld = nextNewToOld;
        palette = unique;
    }
    
    
    log('Final Coarseness:',coarseness);
    
    
    const associations = {};
    
    for ( const [ newId , oldIds ] of entries(newToOld))
        for ( const oldId of oldIds )
            associations[oldId] = parseInt(newId);
    
    return { palette , associations }
}
