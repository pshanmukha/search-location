import type { Place } from "./Place";

interface SearchResponse {
  features: Feature[];
}

interface Feature {
  geometry: Geometry;
  properties: Properties;
}

interface Geometry {
  coordinates: number[];
  type: string;
}

interface Properties {
  display_name: string;
  place_id: number;
}

export const search = async (term: string) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${term}&format=geojson&addressdetails=1&layer=address&limit=5`
    );
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data: SearchResponse = await res.json();
    const places: Place[] = data.features.map((feature) => {
      return {
        id: feature.properties.place_id,
        name: feature.properties.display_name,
        latitude: feature.geometry.coordinates[1],
        longitude: feature.geometry.coordinates[0],
      };
    });
    return places;
  } catch (error: any) {
    throw new Error(error);
  }
};
