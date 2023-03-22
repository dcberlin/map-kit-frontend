import React from "react";
import {Location} from "./models";
import {Feature, FeatureCollection, GeoJsonProperties, Geometry} from "geojson";

type UseStateHookReturn<T> = [T, React.Dispatch<React.SetStateAction<T>>];

type AddElementToTuple<Tuple extends any[], Element> = [...Tuple, Element];

type UseStateHookReturnExtended<T, C> = AddElementToTuple<UseStateHookReturn<T>, C>;

/* Displayed locations */

const PoisContext = React.createContext(null);

type PoisState = FeatureCollection<Geometry, Location> | null;

export function usePois(): UseStateHookReturn<PoisState> {
  const context = React.useContext(PoisContext);
  if (!context) {
    throw new Error("usePois must be used within a PoisProvider");
  }
  return context;
}

export function PoisProvider(props): JSX.Element {
  const [pois, setPois] = React.useState(null);
  return <PoisContext.Provider value={[pois, setPois]} {...props} />;
}

/* Selected location */

type SelectedPoi = Feature<Geometry, Location>;

type SelectedPoiState = UseStateHookReturnExtended<SelectedPoi | null, Location>;

export const SelectedPoiContext = React.createContext<SelectedPoiState>(null);

export function useSelectedPoi(): SelectedPoiState {
  const context = React.useContext(SelectedPoiContext);
  if (!context) {
    throw new Error("useSelectedPoi must be used within a SelectedPoiProvider");
  }
  return context;
}

export function SelectedPoiProvider(props): JSX.Element {
  const [selectedPoi, setSelectedPoi] = React.useState<SelectedPoi | null>(null);

  const urlQueryKey = "poi";

  // extend setSelectedPoi, so it changes the url if a poi is selected
  const setSelectedPoiExtended = (poi: SelectedPoi | null) => {
    setSelectedPoi(poi);
    if (poi) {
      const {pk} = poi.properties;
      const url = new URL(window.location.href);
      url.searchParams.set(urlQueryKey, String(pk));
      window.history.pushState({path: url.toString()}, "", url.toString());
    } else {
      const url = new URL(window.location.href);
      url.searchParams.delete(urlQueryKey);
      window.history.pushState({path: url.toString()}, "", url.toString());
    }
  }

  const [pois] = usePois();

  // if a poi is present in the url, select it
  React.useEffect(() => {
    const url = new URL(window.location.href);
    const poi = url.searchParams.get(urlQueryKey);
    if (!poi) {
      setSelectedPoi(null);
      return;
    }
    const poiFeature = pois?.features.find((feature) => feature.properties.pk === Number(poi));
    setSelectedPoi(poiFeature);
  }, [pois]);

  // intercept the escape key to deselect any selected poi
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPoi(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const featureProperties: GeoJsonProperties = selectedPoi?.properties || {};

  return (
    <SelectedPoiContext.Provider
      value={[selectedPoi, setSelectedPoiExtended, featureProperties as Location]}
      {...props}
    />
  );
}

/* Selected category */

const SelectedCategory = React.createContext(null);

export function useSelectedCategory() {
  const context = React.useContext(SelectedCategory);
  if (!context) {
    throw new Error(
      "useSelectedCategory must be used within a SelectedCategoryProvider"
    );
  }
  return context;
}

export function SelectedCategoryProvider(props): JSX.Element {
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  return (
    <SelectedCategory.Provider
      value={[selectedCategory, setSelectedCategory]}
      {...props}
    />
  );
}

/* Search phrase */

const SearchPhrase = React.createContext(null);

export function useSearchPhrase() {
  const context = React.useContext(SearchPhrase);
  if (!context) {
    throw new Error(
      "useSearchPhrase must be used within a SearchPhraseProvider"
    );
  }
  return context;
}

export function SearchPhraseProvider(props): JSX.Element {
  const [searchPhrase, setSearchPhrase] = React.useState("");
  return (
    <SearchPhrase.Provider value={[searchPhrase, setSearchPhrase]} {...props} />
  );
}
