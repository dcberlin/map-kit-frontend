import React from "react";
import Map, { Source, Layer, useMap } from "react-map-gl";

import { useSelectedPoi, usePois } from "../context";

/**
 * Map with POIs. The initial viewport is set to the specified bbox
 * @param {object} locations The POI data as GeoJSON object.
 * @param {array} bbox Bounding box as array of four coordinates
 * [minLon, minLat, maxLon, maxLat]
 */
export default function MapWidget({ bbox }) {
  const [cursor, setCursor] = React.useState("auto");
  const [pois, setPois] = usePois();
  const [selectedPoi, setSelectedPoi] = useSelectedPoi();

  const layerStyle = {
    id: "poi",
    type: "symbol",
    source: "map-pin",
    layout: {
      "icon-image": "map-pin",
      "icon-size": 0.5,
    },
    paint: {
      "icon-color": ["get", "pin_color"],
    },
  };

  const onClick = (e) => {
    if (e.features.length > 0) {
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
          initialViewState={{ bounds: bbox }}
          style={{ width: "100vw", height: "100vh" }}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/03b8/ckvzmtn0k14xr14n7vg8aqske"
          interactiveLayerIds={["poi"]}
          onClick={onClick}
          cursor={cursor}
          onMouseEnter={() => setCursor("pointer")}
          onMouseLeave={() => setCursor("auto")}
        >
          <MapImage />
          <Source id="poi-data" type="geojson" data={pinData}>
            <Layer {...layerStyle} />
          </Source>
        </Map>
      </div>
    );
  }
}

function MapImage() {
  const { current: map } = useMap();

  map.loadImage("/pin.png", (error, image) => {
    if (error) throw error;
    if (!map.hasImage("map-pin")) {
      map.addImage("map-pin", image, { sdf: true });
    }
  });

  return null;
}
