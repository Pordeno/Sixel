

const Factor = ( 100 / 255 );

const restrictRange = ( channel ) =>
    channel * Factor;


export default function normalize ( colorValues ){
    return colorValues
        .map(restrictRange);
}
