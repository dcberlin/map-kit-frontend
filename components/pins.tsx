import React from "react";
import {Marker} from "react-map-gl";

import {usePois, useSelectedPoi} from "../context";
import {Point} from "geojson";

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 25;

/**
 * Pins for representing POIs across all categories.
 * @param {array} data All locations to be represented by the pins, as GeoJSON features.
 * @param {function} onClick Callback for a click event on a pin.
 */
export default function Pins() {
  const [pois] = usePois();
  const [selectedPoi, _, selectedLocation] = useSelectedPoi();

  return pois.features
    .filter((feature) => feature.geometry)
    .map((feature, index) => {
      const [lon, lat] = (feature.geometry as Point).coordinates;
      const isSelectedPoi = selectedLocation?.pk === feature.properties.pk;

      return (
        <Marker key={`marker-${index}`} longitude={lon} latitude={lat}>
          <svg
            height={SIZE}
            viewBox="0 0 24 24"
            style={{
              cursor: "pointer",
              fill:
                !selectedPoi || isSelectedPoi
                  ? feature.properties.pin_color
                  : "#ccc",
              stroke: "#eee",
              transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
            }}
          >
            <path d={ICON} />
          </svg>
        </Marker>
      );
    });
}
