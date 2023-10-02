
export { toColors }


const { floor } = Math


function * toColors ( channels ){
    
    let color = [] ,
        count = 0
    
    for ( const channel of channels ){
        
        color.push(floor(channel))
        
        count++
        
        if( count < 3 )
            continue
            
        yield color

        color = []
        count = 0
    }
}
