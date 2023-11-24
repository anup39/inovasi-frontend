const createPointGeojson = (coordinates: [], properties: object) => {
  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: properties,
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
