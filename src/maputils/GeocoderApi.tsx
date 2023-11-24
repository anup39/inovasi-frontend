interface GeoFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  place_name: string;
  properties: object;
  text: string;
  place_type: string[];
  center: number[];
}

interface ForwardGeocodeResponse {
  features: GeoFeature[];
}

const GeocoderApi = {
  forwardGeocode: async (config: {
    query: string;
  }): Promise<ForwardGeocodeResponse> => {
    const features: GeoFeature[] = [];
    try {
      const request =
        "https://nominatim.openstreetmap.org/search?q=" +
        config.query +
        "&format=geojson&polygon_geojson=1&addressdetails=1";
      const response = await fetch(request);
      const geojson = await response.json();
      for (const feature of geojson.features) {
        const center = [
          feature.bbox[0] + (feature.bbox[2] - feature.bbox[0]) / 2,
          feature.bbox[1] + (feature.bbox[3] - feature.bbox[1]) / 2,
        ];
        const point: GeoFeature = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: center,
          },
          place_name: feature.properties.display_name,
          properties: feature.properties,
          text: feature.properties.display_name,
          place_type: ["place"],
          center: center,
        };
        features.push(point);
      }
    } catch (e) {
      console.error(`Failed to forwardGeocode with error: ${e}`);
    }

    return {
      features: features,
    };
  },
};

export default GeocoderApi;
