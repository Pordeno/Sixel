
export { normalize }


const Factor = 100 / 255

function * normalize ( channels : Uint8Array ){
    for ( const channel of channels )
        yield channel * Factor
}

