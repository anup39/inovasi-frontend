type Position = [number, number];
type PolygonCoordinates = Position[];

const convertCoordinatesToWKT = (coordinates: PolygonCoordinates): string => {
  return coordinates.map(([lon, lat]: Position) => `${lon} ${lat}`).join(", ");
};

const convertGeojsonToWKT = (
  geojson: GeoJSON.FeatureCollection<GeoJSON.Polygon, GeoJSON.GeoJsonProperties>
): string => {
  const geometryType = geojson.features[0].geometry.type;

  if (geometryType !== "Polygon") {
    throw new Error("Unsupported geometry type. Only Polygon is supported.");
  }

  const coordinates = geojson.features[0].geometry
    .coordinates[0] as PolygonCoordinates;
  const wktGeometry = `POLYGON ((${convertCoordinatesToWKT(coordinates)}))`;

  return wktGeometry;
};

export default convertGeojsonToWKT;
