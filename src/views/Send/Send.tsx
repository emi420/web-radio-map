import { useState } from "react";
import "./Send.styles.css";
import { Button } from '@hotosm/ui/dist/react';
import DTMFCoordEncoder from "../../components/DTMF/DTMFCoordEncoder";

const Send = () => {

    const [coords, setCoords] = useState([null, null]);
    const [loading, setLoading] = useState(false);

    function getLocation() {
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCoords([
                    position.coords.latitude, position.coords.longitude
                ]);
                setLoading(false);
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    return (
        <>
            <div className="aoi-view--top">
                <h1 className="title"><strong>Send</strong> location</h1>
            </div>
            <Button disabled={loading} variant="primary" onClick={getLocation}>
                {loading ? "Loading ..." : "Send my location"}
            </Button>
            <DTMFCoordEncoder latitude={coords[0]} longitude={coords[1]} />
        </>
    )
}

export default Send;
