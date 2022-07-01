import React from "react";

/* Displayed POIs */

const PoiContext = React.createContext();

export function usePoi() {
  const context = React.useContext(PoiContext);
  if (!context) {
    throw new Error("usePoi must be used within a PoiProvider");
  }
  return context;
}

export function PoiProvider(props) {
  const [poi, setPoi] = React.useState(null);
  const value = React.useMemo(() => [poi, setPoi], [poi]);
  return <PoiContext.Provider value={value} {...props} />;
}

/* Selected POI */

const SelectedPoiContext = React.createContext();

export function useSelectedPoi() {
  const context = React.useContext(SelectedPoiContext);
  if (!context) {
    throw new Error("useSelectedPoi must be used within a SelectedPoiProvider");
  }
  return context;
}

export function SelectedPoiProvider(props) {
  const [selectedPoi, setSelectedPoi] = React.useState(null);
  const value = React.useMemo(
    () => [selectedPoi, setSelectedPoi],
    [selectedPoi]
  );
  return <SelectedPoiContext.Provider value={value} {...props} />;
}
