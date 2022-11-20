

const { floor } = Math;


export default function * toColors ( channels ){
    
    let color = [];
    let count = 0;
    
    for ( const channel of channels ){
        
        color.push(floor(channel));
        
        count++;
        
        if(count < 3)
            continue
            
        yield color;

        [ color , count ] = [ [] , 0 ]
    }
}
