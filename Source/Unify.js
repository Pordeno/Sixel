
import { Hash } from '../Source/FFI.js'


const reduceDetail = ( channel ) =>
    Math.min(100,Math.round(channel / 4) * 4)

const coarse = ( color ) => 
    color.map(reduceDetail)


export default function unify ( colors , palette ){
    
    const unique = [];
    
    return colors.map((color) => {
    
        const id = Hash(...coarse(color));
    
        let index = unique.indexOf(id);
    
        if(index < 0){
            index = unique.length;
            palette.push(color);
            unique.push(id);
        }
    
        return index
    })
}
