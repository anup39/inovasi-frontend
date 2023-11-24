const createPointGeojson = (coordinates: [number, number]) => {
  const geojson: GeoJSON.FeatureCollection<
    GeoJSON.Geometry,
    GeoJSON.GeoJsonProperties
  > = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          coordinates: coordinates,
          type: "Point",
        },
      },
    ],
  };
  return geojson;
};
export default createPointGeojson;
