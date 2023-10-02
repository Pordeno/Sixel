
export { normalize }


const Factor = 100 / 255

function * normalize ( channels ){
    for ( const channel of channels )
        yield channel * Factor
}

