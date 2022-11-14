

export default function toSixels ( rows , width ){
    return rows.map((row) => {
        
        const sixels = [];
        
        for ( let x = 0 ; x < width ; x++ ){
        
            sixels.push([
                row[x + 0 * width] ,
                row[x + 1 * width] ,
                row[x + 2 * width] ,
                row[x + 3 * width] ,
                row[x + 4 * width] ,
                row[x + 5 * width] ,
            ]);
        }

        return sixels
    })
}
