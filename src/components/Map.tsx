import type { Place } from "../api/Place";
import "leaflet/dist/leaflet.css";
import L, { Map as LeafletMap } from "leaflet";
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import { useEffect, useRef } from "react";
//marker images
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

//At  initial place is empty so null, if user click on any location map component will get place props of type "Place"
interface MapProps {
  place: Place | null;
}

const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({ place }: MapProps) => {
  const mapRef = useRef<LeafletMap | null>(null); //Creates a reference for the Leaflet map instance

  useEffect(() => {
    if (place && mapRef.current) {
      mapRef.current.flyTo([place.latitude, place.longitude]);
    }
  }, [place]);
  return (
    <MapContainer
      ref={mapRef}
      center={[13.1224253, 77.6187995]}
      zoom={12}
      scrollWheelZoom
      className="h-full"
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {place && <Marker position={[place.latitude, place.longitude]} />}
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
};

export default Map;
