
export { hash }

import { Color } from './Types.ts'


function hash ( [ r , g , b ] : Color ){
    
    return ( r <<  0 )
         + ( g <<  7 )
         + ( b << 14 )
}
