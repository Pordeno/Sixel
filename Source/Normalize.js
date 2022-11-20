

const Factor = ( 100 / 255 );


export default function * normalize ( channels ){
    for ( const channel of channels )
        yield channel * Factor
}
