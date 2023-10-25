import AuthWidget from "../auth-widget";
import CitiesModal from "../cities-modal";
import Image from "next/image";
import Link from "next/link";
import React, {PropsWithChildren,useEffect,useState} from "react";
// import ReactMapGL, { Source, Layer, Marker, Popup } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';

const FrontLayout = ({children}: PropsWithChildren<{}>) => {

  const countries_array = [
    {
      name: 'telaviv',
      full_name: "Tel Aviv-Yafo",
      borderGeoJSON: 'geojsons/telaviv.geojson',
      markerCoordinates: [34.7806, 32.0809],
    },
    {
      name: 'berlin',
      full_name: "Berlin",
      borderGeoJSON: 'geojsons/berlin.geojson',
      markerCoordinates: [13.4050, 52.5200],
    },
    {
      name: 'praga',
      full_name: "Praga",
      borderGeoJSON: 'geojsons/praga.geojson',
      markerCoordinates: [14.4378, 50.0755],
    },
    {
      name: 'nottingham',
      full_name: "Nottingham",
      borderGeoJSON: 'geojsons/nottingham.geojson',
      markerCoordinates: [-1.1581, 52.9548],
    },
    {
      name: 'amsterdam',
      full_name: "Amsterdam",
      borderGeoJSON: 'geojsons/amsterdam.geojson',
      markerCoordinates: [4.899431, 52.379189],
    },
    {
      name: 'muenchen',
      full_name: "Munchen",
      borderGeoJSON: 'geojsons/muenchen.geojson',
      markerCoordinates: [11.576124, 48.137154],
    },
    {
      name: 'offenbach-am-main',
      full_name: "Offenbach am main",
      borderGeoJSON: 'geojsons/offenbach-am-main.geojson',
      markerCoordinates: [8.7393692, 50.0921768],
    },
    {
      name: 'furth',
      full_name: "Furth",
      borderGeoJSON: 'geojsons/furth.geojson',
      markerCoordinates: [11.0018894, 49.480312],
    },
    {
      name: 'nuremberg',
      full_name: "Nuremberg",
      borderGeoJSON: 'geojsons/nuremberg.geojson',
      markerCoordinates: [11.061859, 49.460983],
    },
    {
      name: 'zagreb',
      full_name: "Zagreb",
      borderGeoJSON: 'geojsons/zagreb.geojson',
      markerCoordinates: [15.966568, 45.815399],
    },
    {
      name: 'giessen',
      full_name: "Giesen",
      borderGeoJSON: 'geojsons/giessen.geojson',
      markerCoordinates: [9.8554344,52.1981902],
    },
    {
      name: 'frankfurt-am-main',
      full_name: "Frankfurt am main",
      borderGeoJSON: 'geojsons/frankfurt-am-main.geojson',
      markerCoordinates: [8.5670227,50.1492757],
    },
    {
      name: 'Mansfield',
      full_name: "Mansfield",
      borderGeoJSON: 'geojsons/Mansfield.geojson',
      markerCoordinates: [-1.1935052,53.138624],
    },
    {
      name: 'grenoble',
      full_name: "Grenoble",
      borderGeoJSON: 'geojsons/grenoble.geojson',
      markerCoordinates: [5.7262,45.1755],
    }
  ];

  const [mapState, setMapState] = useState(null);

  const zoomToCity = (city) => {
    mapState.flyTo({
      center: city.markerCoordinates,
      zoom: 10,
      speed: 1,
    });
  };

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/03b8/ckvzmtn0k14xr14n7vg8aqske',
      center: [11.11829, 46.07045],
      zoom: 4,
    });

    map.on('load', () => {
      Object.keys(countries_array).forEach(async (sourceId)=>{
        const {name, borderGeoJSON, markerCoordinates} = countries_array[sourceId];
        map.addSource(name, {
          type: 'geojson',
          data: borderGeoJSON
        });

        map.addLayer({
          id: `${name}-fills`,
          type: 'fill',
          source: name,
          layout: {},
          paint: {
            'fill-color': '#627BC1',
            'fill-opacity': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              1,
              0.5
            ]
          }
        });

        map.loadImage('pin_landing_2.png', (error, image) => {
          if (error) throw error;
          map.addImage(`${name}-marker`, image);
          map.addLayer({
            id: `${name}-markers`,
            type: 'symbol',
            source: {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: markerCoordinates,
                },
              },
            },
            layout: {
              'icon-image': `${name}-marker`,
              'icon-size': 0.2, 
            },
          });
        });

        map.addLayer({
          id: `${name}-text`,
          type: 'symbol',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: markerCoordinates, // Textul va fi afișat la coordonatele markerului
              },
            },
          },
          layout: {
            'text-field': countries_array[sourceId].full_name,
            'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
            'text-size': 12,
          },
          paint: {
            'text-color': 'black',
          },
        });

        map.setLayoutProperty(`${name}-text`, 'visibility', 'none');

        map.on('zoom', () => {
          const newZoomLevel = map.getZoom();
          // Hide the markers when zoom level exceeds a certain value
          if (newZoomLevel > 7) {
            map.setLayoutProperty(`${name}-markers`, 'visibility', 'none');
            map.setLayoutProperty(`${name}-text`, 'visibility', 'visible');
          } else {
            map.setLayoutProperty(`${name}-markers`, 'visibility', 'visible');
            map.setLayoutProperty(`${name}-text`, 'visibility', 'none');
          }
        });

        map.on('click', `${name}-markers`, (e) => {
          map.flyTo({
            center: markerCoordinates,
            zoom: 7.5,
            speed: 1,
          });
        });

        map.on('mouseenter', `${name}-markers`, () => {
          map.getCanvas().style.cursor = 'pointer';
        });
        
        map.on('mouseleave', `${name}-markers`, () => {
          map.getCanvas().style.cursor = '';
        });

        map.on('mousemove', `${name}-fills`, (e) => {
         map.getCanvas().style.cursor = 'pointer';
         map.setPaintProperty(`${name}-fills`, 'fill-color', 'red');
        });

        map.on('click', `${name}-fills`, (e) => {
        window.location.href= countries_array[sourceId].name;
        });

        map.on('mouseleave', `${name}-fills`, () => {
            map.getCanvas().style.cursor = ''; 
            map.setPaintProperty(`${name}-fills`, 'fill-color', '#627BC1');
        });
      });
    });

    setMapState(map);
  }, []);

  return (
    <div className="flex flex-col justify-between w-screen min-h-screen " style={{backgroundColor:'#344c6c'}}>
      <AuthWidget/>
      <CitiesModal cities={countries_array} zoomToCity={zoomToCity}/>
  
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

      <div id="map" style={{ width: '100%', height: '100vh', zIndex: 1, position:"absolute" }} className="position-absolute top-0 bottom-0"></div>  

      {/* <div className="w-full mt-12">
        <div className="flex flex-col md:flex-row gap-8 p-12 justify-center">
          <a href="https://diasporacivica.berlin" target="_blank" rel="noreferrer">
            <h3 className="text-gray-800 mb-3">realizat de</h3>
            <Image
              src="/logo-dcb.png"
              alt="Logo rotund abstract al asociaţiei Diaspora Civică Berlin"
              width={150}
              height={65}
            />
          </a>
          <a href="https://dprp.gov.ro/" target="_blank" rel="noreferrer">
            <h3 className="text-gray-800 mb-3">finanţat de</h3>
            <Image
              src="/logo-drp.png"
              alt="Logo al Guvernului României cu textul 'Departamentul pentru românii de pretutindeni' alături"
              width={270}
              height={100}
            />
          </a>
        </div>
      </div> */}
      {/* <div className="flex justify-center text-xs pb-4 px-12 text-gray-800">
        <p>Conţinutul acestui site nu reprezintă poziţia oficială a Departamentului pentru românii de pretutindeni.</p>
      </div>
      <div className="flex justify-center gap-5 text-xs pb-4 pt-6 px-12 text-blue-800">
        <Link href="/terms-and-conditions" >Nutzungsbedingungen</Link>
        <Link href="/privacy-policy" >Datenschutzerklärung</Link>
        <Link href="/contact" >Kontakt</Link>
      </div> */}
    </div>
  );
}

export default FrontLayout;
