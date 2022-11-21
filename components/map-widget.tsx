import React from "react";
import Map, {Source, Layer, Marker, useMap} from "react-map-gl";

import {useSelectedPoi, usePois} from "../context";
import {ArrowDownIcon} from "@heroicons/react/solid";

/**
 * Map with POIs. The initial viewport is set to the specified bbox
 * @param {object} locations The POI data as GeoJSON object.
 * @param {array} bbox Bounding box as array of four coordinates
 * [minLon, minLat, maxLon, maxLat]
 */
export default function MapWidget({bbox}) {
  const [cursor, setCursor] = React.useState("auto");
  const [pois, setPois] = usePois();
  const [selectedPoi, setSelectedPoi] = useSelectedPoi();

  const onClick = (e) => {
    if (e.features.length > 0) {
      const {lng, lat} = e.lngLat;
      const [feature] = e.features;
      setSelectedPoi(feature);
    }
  };

  if (pois) {
    const pinData = {
      ...pois,
      features: pois.features.filter((feature) => feature.geometry),
    };

    return (
      <div className="fixed">
        <Map
          initialViewState={{bounds: bbox}}
          style={{width: "100vw", height: "100vh"}}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/03b8/ckvzmtn0k14xr14n7vg8aqske"
          interactiveLayerIds={["poi"]}
          onClick={onClick}
          cursor={cursor}
          onMouseEnter={() => setCursor("pointer")}
          onMouseLeave={() => setCursor("auto")}
          minZoom={6}
        >
          <MapImage/>
          <Source id="poi-data" type="geojson" data={pinData}>
            {selectedPoi?.geometry && (
              <Marker
                longitude={selectedPoi.geometry.coordinates[0]}
                latitude={selectedPoi.geometry.coordinates[1]}
                anchor="bottom"
              >
                <ArrowDownIcon className="text-red-600 pb-3 w-10 h-10 animate-bounce"/>
              </Marker>
            )}
            <Layer
              id={"poi"}
              type={"symbol"}
              source={"map-pin"}
              layout={{"icon-image": "map-pin", "icon-size": 0.5}}
              paint={{"icon-color": ["get", "pin_color"]}}
            />
          </Source>
        </Map>
      </div>
    );
  }
}

function MapImage() {
  const {current: map} = useMap();

  map.loadImage("/pin.png", (error, image) => {
    if (error) throw error;
    if (!map.hasImage("map-pin")) {
      map.addImage("map-pin", image, {sdf: true});
    }
  });

  return null;
}
