import AuthWidget from "../auth-widget";
import CitiesModal from "../cities-modal";
import Image from "next/image";
import Link from "next/link";
import React, {PropsWithChildren,use,useEffect,useState} from "react";
import mapboxgl from 'mapbox-gl';

const FrontLayout = ({children, data}: PropsWithChildren<{data : any}>) => {

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
    const customMarker = document.createElement('div');
  customMarker.style.width = '30px'; 
  customMarker.style.height = '30px'; 
  customMarker.style.borderRadius = '50%'; 
  customMarker.style.backgroundColor = 'rgba(255, 0, 0, 0.5'; 
  customMarker.style.cursor = 'pointer'; 

  const markerText = document.createElement('div');
  markerText.textContent = location.name.charAt(0); 
  markerText.style.textAlign = 'center';
  markerText.style.lineHeight = '30px';
  markerText.style.fontSize = '16px';
  markerText.style.fontWeight = 'bold';
  markerText.style.color = 'white'; 

  customMarker.appendChild(markerText);

  return customMarker;
  }

  useEffect(() => {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/03b8/ckvzmtn0k14xr14n7vg8aqske',
        center: [11.11829, 46.07045],
        zoom: 4,
      });
      setMapState(map);
  },[]);

  useEffect(() => {
   if(mapState){
    mapState.on('load', () => {
      data.forEach((location) => {

        const [minLng, minLat, maxLng, maxLat] = location.bbox;
        const centerLng = (minLng + maxLng) / 2;
        const centerLat = (minLat + maxLat) / 2;
        const marker = new mapboxgl.Marker({
          element: createCustomMarker(location) // Create a custom marker element
        })
        .setLngLat([centerLng, centerLat])
        .addTo(mapState);

        marker.getElement().addEventListener('click', () => {
          window.location.href = `/${location.path_slug}`;
        });
        const popupContent = document.createElement('div');
        popupContent.innerHTML = `
          <div class="text-center">
            <h3 class="text-lg font-semibold">${location.name}</h3>
          </div>
        `;
    
        // Create a popup and set the custom content
        const popup = new mapboxgl.Popup({ offset: 25, closeOnClick: false, closeButton: false }) // closeOnClick: false prevents auto-close
          .setDOMContent(popupContent)
          .setMaxWidth("300px");
    
        // Attach the popup to the marker
        marker.setPopup(popup);

        marker.getElement().addEventListener('mouseenter', () => {
          popup.addTo(mapState);
        });

        // Hide the popup on marker mouseleave
        marker.getElement().addEventListener('mouseleave', () => {
          popup.remove();
        });
    
      });
    });
   }
  }, [mapState]);

  return (
    <div className="flex flex-col justify-between w-screen min-h-screen " style={{backgroundColor:'#344c6c'}}>
      <AuthWidget/>
      <CitiesModal cities={data} zoomToCity={zoomToCity}/>
  
  {/* TITLU */}
      <div className="fixed w-full sm:w-auto bottom-0 sm:left-5 sm:top-0 z-20 bg-black bg-opacity-30 sm:bg-transparent sm:h-20">
        <div className="flex flex-col gap-5 p-8">
          <div className="flex">
            <Image
                src="/logo-dcb.png"
                alt="Logo rotund abstract al asociaţiei Diaspora Civică Berlin"
                width={50}
                height={50}
              />
            <h1 className="text-4xl md:text-5xl font-bold text-black text-center sm:text-left ml-2">Harta Diasporei</h1>
          </div>
          <h4 className="text-xl md:text-2xl text-center sm:text-left text-black">Kit de dezvoltare pentru harta comunității <br/> românești din orașul
            tău</h4>
        </div>
      </div>

    {/* Footer */}
      <div className="fixed w-auto sm:right-0 sm:bottom-0 z-20 bg-white bg-opacity-50 hidden sm:block">
        <div className="flex flex-col gap-2 pt-5">
          <div className="flex justify-center text-md px-12 text-gray-800">
            <p>Conţinutul acestui site nu reprezintă poziţia oficială a Departamentului <br/> pentru românii de pretutindeni.</p>
          </div>
          <div className="w-full pt-0 mt-0">
            <div className="flex gap-8 justify-center px-3 pr-12 py-0 my-0">
              <div className="w-1/2 p-4 flex justify-center pt-0 mt-0">
                <a className="flex flex-col justify-center" href="https://diasporacivica.berlin" target="_blank" rel="noreferrer">
                  <h3 className="text-gray-800 mb-3">Realizat de</h3>
                  <Image
                  className="mx-auto"
                    src="/logo-dcb_old.png"
                    alt="Logo rotund abstract al asociaţiei Diaspora Civică Berlin"
                    width={100}
                    height={100}
                  />
                </a>
                </div>
                <div className="w-1/2 p-4 flex justify-center pt-0 mt-0">
                  <a className="flex flex-col justify-center" href="https://dprp.gov.ro/" target="_blank" rel="noreferrer">
                    <h3 className="text-gray-800 mb-3 mx-auto">Finanţat de</h3>
                    <Image
                    className="mx-auto"
                      src="/logo-drp.png"
                      alt="Logo al Guvernului României cu textul 'Departamentul pentru românii de pretutindeni' alături"
                      width={270}
                      height={100}
                    />
                  </a>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAP */}
      <div id="map" style={{ width: '100%', height: '100vh', zIndex: 1, position:"absolute" }} className="position-absolute top-0 bottom-0"></div>  

    </div>
  );
}

export default FrontLayout;
