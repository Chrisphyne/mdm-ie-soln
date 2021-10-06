import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader
} from '@coreui/react';
import GoogleMapReact from 'google-map-react';
import Marker from './marker';



const DeviceGeolocation = (props: any) => {

  const getMapOptions = (maps: any) => {
    return {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
    };
  };

    const [center, setCenter] = useState({lat: -1.2558224,  lng: 36.7871681 });
    const [zoom, setZoom] = useState(11);
  return (
      <CCard>
          <CCardHeader>
                <b><h4>Device Geolocation</h4></b> 
          </CCardHeader>
        <CCardBody>
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAXs8DKub7SD-NDmKQLVeB_R7C0D7EX1Es' }}
          defaultCenter={center}
            defaultZoom={zoom}
            options={getMapOptions}
        >
          <Marker
            lat={-1.2558224}
            lng={36.7871681}
            name="My Marker"
            color="blue"
          />
        </GoogleMapReact>
        </div>
        </CCardBody>
      </CCard>
    );
}

export default DeviceGeolocation;