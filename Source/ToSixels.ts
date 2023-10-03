
export { toSixels }

import { Sixel } from './Types.ts'


function toSixels ( rows : Array<number[]> , width : number ){
    return rows.map(( row ) => {
        
        const sixels = new Array<Sixel>
        
        for ( let x = 0 ; x < width ; x++ )
            sixels.push([
                row[ x + 0 * width ] ,
                row[ x + 1 * width ] ,
                row[ x + 2 * width ] ,
                row[ x + 3 * width ] ,
                row[ x + 4 * width ] ,
                row[ x + 5 * width ] ,
            ])

        return sixels
    })
}
