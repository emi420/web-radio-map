
/*
    DTMFCoordinate will decode strings like this:

        "115726148993"

    Where 115726148993 are two (coordinate + 180) * 10000 together:
    
        (-64.273 + 180) * 10000 => 115727
        (-31.006 + 180) * 10000 => 148994

*/

const DTMFCoordinate = (valuesString) => {

    const coords = [
        valuesString.substring(0, 6),
        valuesString.substring(6, 13),
    ]

    try {
        var lat = parseFloat(coords[0].substring(0, 3) + "." + coords[0].substring(3, coords[0].length)) - 180;
        var lon = parseFloat(coords[1].substring(0, 3) + "." + coords[1].substring(3, coords[1].length)) - 180 ; 
        return {
            coordinate: [lat, lon],
            decoded: true,
        }

    } catch(e) {
        console.log("Error decoding.", e);
        return {
            decoded: false,
            error: true,
        }
    }
}

export default DTMFCoordinate;