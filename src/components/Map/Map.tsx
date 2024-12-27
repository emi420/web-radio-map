import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { getMapBase } from "./MapBaselayer";
import extent from 'turf-extent';
import "./Map.style.css";

const Map = ({
    center,
    zoom,
    source,
    config,
    mapProps,
    onLoad,
    aoi,
    grid,
    pois
}) => {

    const map = useRef(null);
    const mapContainer = useRef(null);

    // Map initialization
    useEffect(() => {
        if (map.current) return;
        const rasterStyle = getMapBase(source, config);
        let mapLibreOptions = {
            container: mapContainer.current,
            style: rasterStyle,
            center,
            zoom: zoom || 17,
            ...mapProps
        }
        map.current = new maplibregl.Map(mapLibreOptions);

        // Run immediately on the first time
        map.current.on("load", () => {
            map.current.addControl(new maplibregl.NavigationControl());
            onLoad && onLoad(map.current);
        });
    }, []);


    // Source
    useEffect(() => {
        if (!map.current) return;
        const rasterStyle = getMapBase(source, config);
        map.current.setStyle(rasterStyle)

        map.current.once("styledata", () => {
            // AOI
            if (aoi) {
                map.current.addSource("aoi", {
                    type: "geojson",
                    data: aoi,
                });
                map.current.addLayer({
                    id: "aoi",
                    type: "line",
                    source: "aoi",
                    paint: {
                        "line-color": getComputedStyle(document.body).getPropertyValue('--hot-color-primary-700'),
                        'line-dasharray': [2, 2],
                        'line-width': 3,
                    }
                });

                const bbox = extent(aoi);
                map.current.fitBounds(bbox, {
                    padding: 20
                });
            }

            // Grid
            if (grid) {
                map.current.addSource("grid", {
                    type: "geojson",
                    data: grid || [],
                });
                map.current.addLayer({
                    id: "grid",
                    type: "line",
                    source: "grid",
                    paint: {
                        "line-color": getComputedStyle(document.body).getPropertyValue('--hot-color-neutral-0'),
                        'line-dasharray': [2, 2],
                        'line-width': 1,
                    }
                });
            }

            // POIs
            if (pois) {
                map.current.addSource("pois", {
                    type: "geojson",
                    data: pois,
                });
                map.current.addLayer({
                    id: "pois",
                    type: "circle",
                    source: "pois",
                    paint: {
                        "circle-color": getComputedStyle(document.body).getPropertyValue('--hot-color-primary-700'),
                        'circle-radius': 10,
                    }
                });

                const bbox = extent(pois);
                map.current.fitBounds(bbox, {
                    padding: 20
                });
            }

        });
    }, [map.current, source, grid, aoi, pois]);

    return (
        <div
            className={"mapWrapper"}
            style={{ position: "relative" }}
        >
            <div className={"mapContainer"} ref={mapContainer} />
        </div>
    );
}

export default Map;