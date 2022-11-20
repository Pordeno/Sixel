
// import { Hash } from '../Source/FFI.js'
import hash from '../Source/Hash.js'

const { round , min } = Math;


const reduceDetail = ( channel ) =>
    min(100,round(channel / 4) * 4)

const coarse = ( color ) => 
    color.map(reduceDetail)


export default function unify ( colors , palette ){
    
    const colormap = [];
    const unique = [];
    
    for ( const color of colors ){
        
        const id = hash(coarse(color));
    
        let index = unique.indexOf(id);
    
        if(index < 0){
            index = unique.length;
            palette.push(color);
            unique.push(id);
        }
    
        colormap.push(index);
    }
    
    return colormap
}
