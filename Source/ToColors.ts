
export { toColors }

import { Color } from './Types.ts'


const { floor } = Math


function * toColors ( channels : Array<number> ){
    
    let color = [] ,
        count = 0
    
    for ( const channel of channels ){
        
        color.push(floor(channel))
        
        count++
        
        if( count < 3 )
            continue
            
        yield color as Color

        color = []
        count = 0
    }
}
