
// import { Hash } from '../Source/FFI.js'
import hash from '../Source/Hash.js'


const 
    { fromEntries , entries } = Object ,
    { round , min } = Math ,
    { log } = console ;


function reduced ( palette , newToOld , coarseness ){

    const coarser = ( channel ) =>
        min(100,round(channel / coarseness) * coarseness);

    const 
        unique = [] ,
        ids = [] ;
    
    let nextNewToOld = {};
    let currentId = 0;
    
    for ( let color of palette ){
        
        color = color.map(coarser);
        
        const id = hash(color);
        
        let index = ids.indexOf(id);
        
        if(index < 0){
            
            if(unique.length >= 256)
                return
            
            index = ids.length;
            
            unique.push(color);
            ids.push(id);
        }
        
        nextNewToOld[index] ??= [];
        nextNewToOld[index].push(...newToOld[currentId]);
        
        currentId++;
    }
    
    return [ nextNewToOld , unique ]
}


export default function reduce ( palette ){
    
    //  Starts with ( lastest / current ) -> [ ( oldest / current ) ] ids.
    
    let newToOld = fromEntries(palette.map((color,colorId) => [ colorId , [ colorId ] ]));
    
    
    let coarseness = 1;
    let change = 5;
    
    let previous;
    
    while ( true ){
        
        coarseness += change;
        
        const result = reduced(palette,newToOld,coarseness);
        
        if(result){
            coarseness -= change;
            previous = result;
            break
        }
    }
    
    if(previous){
        newToOld = previous[0];
        palette = previous[1];
    }
    
    log('Mid Coarseness:',coarseness);
    
    while ( true ){
        
        coarseness += 1;
        
        
        const result = reduced(palette,newToOld,coarseness);
        
        if(result){
            newToOld = result[0];
            palette = result[1];
            break
        }
    }
    
    
    log('Final Coarseness:',coarseness);
    
    
    const associations = {};
    
    for ( const [ newId , oldIds ] of entries(newToOld))
        for ( const oldId of oldIds )
            associations[oldId] = parseInt(newId);
    
    return { palette , associations }
}
