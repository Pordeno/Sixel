

export default function toColors ( channels ){
    
    const colors = []
    
    const { length } = channels;
    
    let offset = 0;
    
    while ( offset < length )
        colors.push([ 
            channels[ offset++ ] ,
            channels[ offset++ ] ,
            channels[ offset++ ]
        ])
        
    return colors
}
