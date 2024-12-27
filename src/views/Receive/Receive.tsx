import { useState } from "react";
import Map from '../../components/Map/Map';
import "./Receive.styles.css";
import { useDispatch } from 'react-redux';
import { setLocations, createFeature } from '../../store/locationsSlice';
import DTMFListener from "../../components/DTMF/DTMFListener";
import decodeDTMF from "../../components/DTMF/DTMFCoordDecoder";
import { Badge } from '@hotosm/ui/dist/react';
import { useSelector } from 'react-redux';

const statusStyles = {
  "Initializing": "neutral",
  "Listening": "danger",
  "Receiving": "warning",
  "Decoding": "success"
}

const Receive = () => {

    const locations = useSelector((state) => state.project.locations);
    const [receivedDigits, setReceivedDigits] = useState([]);
    const [status, setStatus] = useState("Initializing");

    const dispatch = useDispatch();

    const DTMFDigitHandler = (digit) => {
        setReceivedDigits(prevState => {
    
          // Prevent repeated digits
          if (digit === prevState[prevState.length - 1]) {
            return prevState;
          }
    
          // A is valid only once
          if (digit === "A" && prevState.indexOf("A") > 0) {
            return prevState;
          }
    
          // Initialize message
          if (digit === "*") {
            setStatus("Receiving")
            if (prevState.length > 0) {
              return ["*"];
            }
          }
    
          const newState = [
            ...prevState,
            digit
          ];

          // Close message
          if (digit === "#" && newState.length > 10 && newState.indexOf("*") > -1 && newState.indexOf("A") > -1) {
              setStatus("Decoding")
              const message = newState.join("").replaceAll("B","");
              const coords = decodeDTMF(message);
              if (coords) {
                const feature = createFeature(coords.longitude, coords.latitude);
                dispatch(setLocations({
                  type: locations.type,
                  features: [feature, ...locations.features]
                }));
              }
              setTimeout(() => {
                setStatus("Listening")
              }, 1000);

            return [];
          }

          return newState;
        })
    }

    const onMicReadyHandler = () => {
      setStatus("Listening")
    }

    return (
        <>
            <div className="aoi-view--top">
                <h1 className="title"><strong>Receive</strong> location</h1>
                <Badge onClick={() => status != "Initializing" && setStatus("Listening")}variant={statusStyles[status]}>{status}</Badge>
            </div>

            <Map pois={locations} center={[-13.56, -16.52]} zoom={3} />
            <DTMFListener onMicReady={onMicReadyHandler} onDigit={DTMFDigitHandler} />
        </>
    )
}

export default Receive;
