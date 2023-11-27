const convertCoordinatesToWKT = (coordinates: number[]) => {
  return coordinates.map(([lon, lat]) => `${lon} ${lat}`).join(", ");
};
const convertGeojsonToWlT = (
  geojson: GeoJSON.FeatureCollection<
    GeoJSON.Geometry,
    GeoJSON.GeoJsonProperties
  >
) => {
  const geometryType = geojson.geometry.type;

  if (geometryType !== "Polygon") {
    throw new Error("Unsupported geometry type. Only Polygon is supported.");
  }

  const coordinates = geojson.geometry.coordinates[0];
  const wktGeometry = `POLYGON ((${convertCoordinatesToWKT(coordinates)}))`;

  return wktGeometry;
};

export default convertCoordinatesToWKT;
