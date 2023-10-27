import AuthWidget from "../auth-widget";
import CitiesModal from "../cities-modal";
import Image from "next/image";
import Link from "next/link";
import React, { PropsWithChildren, use, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

const FrontLayout = ({ children, data }: PropsWithChildren<{ data: any }>) => {
  const [mapState, setMapState] = useState(null);

  const zoomToCity = (city) => {
    const [minLng, minLat, maxLng, maxLat] = city.bbox;
    const centerLng = (minLng + maxLng) / 2;
    const centerLat = (minLat + maxLat) / 2;

    mapState.flyTo({
      center: [centerLng, centerLat],
      zoom: 10,
      speed: 1,
    });
  };

  function createCustomMarker(location) {
    const customMarker = document.createElement("div");
    customMarker.style.width = "30px"; // Set the width of the custom marker
    customMarker.style.height = "30px"; // Set the height of the custom marker
    customMarker.style.borderRadius = "50%"; // Make it a circle
    customMarker.style.backgroundColor = "rgba(255, 0, 0, 0.5"; // Set the background color for the circle
    customMarker.style.cursor = "pointer"; // Set the background color for the circle

    const markerText = document.createElement("div");
    markerText.textContent = location.name.charAt(0); // Display the initial of the location name
    markerText.style.textAlign = "center";
    markerText.style.lineHeight = "30px"; // Vertically center the text
    markerText.style.fontSize = "16px"; // Adjust the font size as needed
    markerText.style.fontWeight = "bold"; // Make the letter bold
    markerText.style.color = "white"; // Set the text color

    customMarker.appendChild(markerText);

    return customMarker;
  }

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/03b8/ckvzmtn0k14xr14n7vg8aqske",
      center: [11.11829, 46.07045],
      zoom: 4,
    });
    setMapState(map);
  }, []);

  useEffect(() => {
    if (mapState) {
      mapState.on("load", () => {
        data.forEach((location) => {
          const [minLng, minLat, maxLng, maxLat] = location.bbox;
          const centerLng = (minLng + maxLng) / 2;
          const centerLat = (minLat + maxLat) / 2;
          const marker = new mapboxgl.Marker({
            element: createCustomMarker(location), // Create a custom marker element
          })
            .setLngLat([centerLng, centerLat])
            .addTo(mapState);

          marker.getElement().addEventListener("click", () => {
            window.location.href = `/${location.path_slug}`;
          });
          const popupContent = document.createElement("div");
          popupContent.innerHTML = `
          <div class="text-center">
            <h3 class="text-lg font-semibold">${location.name}</h3>
          </div>
        `;

          // Create a popup and set the custom content
          const popup = new mapboxgl.Popup({
            offset: 25,
            closeOnClick: false,
            closeButton: false,
          }) // closeOnClick: false prevents auto-close
            .setDOMContent(popupContent)
            .setMaxWidth("300px");

          // Attach the popup to the marker
          marker.setPopup(popup);

          marker.getElement().addEventListener("mouseenter", () => {
            popup.addTo(mapState);
          });

          // Hide the popup on marker mouseleave
          marker.getElement().addEventListener("mouseleave", () => {
            popup.remove();
          });
        });
      });
    }
  }, [mapState, data]);

  return (
    <div
      className="flex flex-col justify-between w-screen min-h-screen "
      style={{ backgroundColor: "#344c6c" }}
    >
      <AuthWidget />
      <CitiesModal cities={data} zoomToCity={zoomToCity} />

      {/* TITLU */}
      <div className="fixed w-1/2 sm:w-auto top-0 z-20 p-6">
        <a
          href="https://diasporacivica.berlin/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="fixed left-5 top-0 bg-white/90 p-3 rounded-b-2xl">
            <div className="flex flex-col gap-2">
              <Image
                src="/logo-dcb_old.png"
                alt="Logo rotund abstract al asociaţiei Diaspora Civică Berlin"
                width={100}
                height={100}
              />
            </div>
          </div>
        </a>
        <div className="flex gap-2 mt-16 items-center">
          <div className="flex-1/2 shrink-0">
            <Image
              className="w-full"
              src="/logo-dcb.png"
              alt="Logo rotund abstract al asociaţiei Diaspora Civică Berlin"
              width={50}
              height={50}
            />
          </div>
          <div className="flex-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Harta Diasporei
            </h1>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed w-full bottom-0 z-20 bg-white bg-opacity-80 sm:block p-3">
        <div className="flex flex-col justify-between sm:flex-row gap-2">
          <div className="flex flex-col gap-1 justify-between text-gray-800">
            <p className="text-center sm:text-left text-xs sm:font-semibold">
              Kit 2.0 pentru dezvoltarea comunității românești din orașul tău
            </p>
            <p className="text-xs text-center sm:text-left">
              Proiect finanţat de Departamentul pentru Românii de Pretutindeni
              (mai – octombrie 2023)
            </p>
          </div>
          <div className="grow-0">
            <div className="flex sm:justify-end justify-center">
              <a
                className="flex flex-col"
                href="https://dprp.gov.ro/"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src="/logo-drp.png"
                  alt="Logo al Guvernului României cu textul 'Departamentul pentru românii de pretutindeni' alături"
                  width={160}
                  height={100}
                />
              </a>
            </div>
            <div className="flex flex-col sm:text-right text-center text-xs text-gray-800 mt-1">
              <p>
                Conţinutul acestui site nu reprezintă poziţia oficială a
                Departamentului pentru Românii de Pretutindeni.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-5 text-xs text-blue-800">
          <Link href="/terms-and-conditions">Nutzungsbedingungen</Link>
          <Link href="/privacy-policy">Datenschutzerklärung</Link>
          <Link href="/contact">Kontakt</Link>
        </div>
      </div>

      {/* MAP */}
      <div
        id="map"
        style={{
          width: "100%",
          height: "100vh",
          zIndex: 1,
          position: "absolute",
        }}
        className="position-absolute top-0 bottom-0"
      ></div>
    </div>
  );
};

export default FrontLayout;
