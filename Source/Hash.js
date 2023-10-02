
export { hash }


function hash ([ r , g , b ]){
    
    return ( r <<  0 )
         + ( g <<  7 )
         + ( b << 14 )
}
