const createPointGeojson = (coordinates, properties) => {
  const geojson = {
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
