import React from "react";
import Map, { Source } from "react-map-gl";

import Pins from "../components/pins";

/**
 * Map with POIs. The initial viewport is set to the specified bbox
 * @param {object} locations The POI data as GeoJSON object.
 * @param {array} bbox Bounding box as array of four coordinates
 * [minLon, minLat, maxLon, maxLat]
 */
export default function MapWidget({ locations, bbox }) {
  const pinData = {
    ...locations,
    features: locations.features.filter((feature) => feature.geometry),
  };

  return (
    <Map
      initialViewState={{ bounds: bbox }}
      style={{ width: "100vw", height: "100vh" }}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/03b8/ckvzmtn0k14xr14n7vg8aqske"
    >
      <Source id="my-data" type="geojson" data={pinData}>
        <Pins
          data={pinData.features}
          onClick={() => console.log("CLICK ON PIN!")}
        />
      </Source>
    </Map>
  );
}
