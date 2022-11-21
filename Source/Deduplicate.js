
export default function deduplicate ( sequence ){

    sequence ??= [];

    const shortened = [];
    
    let previous;
    let count = 0;

    for ( const number of sequence ){
        
        if(number === previous){
            count++;
            continue;
        }
        
        if(count){
            shortened.push([ count , previous ])
            count = 0;
        }
        
        shortened.push([ 1 , number ]);
        previous = number;
    }
    
    if(count)
        shortened.push([ count , previous ])
    
    return shortened;
}
