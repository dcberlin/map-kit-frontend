import React from "react";

/* Displayed POIs */

const PoisContext = React.createContext();

export function usePois() {
  const context = React.useContext(PoisContext);
  if (!context) {
    throw new Error("usePoi must be used within a PoisProvider");
  }
  return context;
}

export function PoisProvider(props) {
  const [pois, setPois] = React.useState(null);
  return <PoisContext.Provider value={[pois, setPois]} {...props} />;
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
  return (
    <SelectedPoiContext.Provider
      value={[selectedPoi, setSelectedPoi]}
      {...props}
    />
  );
}

/* Selected category */

const SelectedCategory = React.createContext();

export function useSelectedCategory() {
  const context = React.useContext(SelectedCategory);
  if (!context) {
    throw new Error(
      "useSelectedCategory must be used within a SelectedCategoryProvider"
    );
  }
  return context;
}

export function SelectedCategoryProvider(props) {
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  return (
    <SelectedCategory.Provider
      value={[selectedCategory, setSelectedCategory]}
      {...props}
    />
  );
}
