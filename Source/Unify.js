
import hash from '../Source/Hash.js'

const { round , min } = Math;


export default function unify ( colors , palette ){
    
    const colormap = [];
    const unique = [];
    
    for ( const color of colors ){
        
        const id = hash(color);
    
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
