type CoordinateTuple = [number, number];

// Define GeoJSON types

type Point = {
  type: "Point";
  coordinates: [number, number];
};

type LineString = {
  type: "LineString";
  coordinates: [number, number][];
};

type Polygon = {
  type: "Polygon";
  coordinates: [number, number][][];
};

type Geometry = Point | LineString | Polygon;

type Feature<G extends Geometry = Geometry> = {
  type: "Feature";
  geometry: G;
  properties?: Record<string, string>; // You can adjust the properties type as needed
};

type FeatureCollection<G extends Geometry = Geometry> = {
  geometry: GeoJSON.Geometry;
  type: "FeatureCollection";
  features: Feature<G>[];
};

const convertCoordinatesToWKT = (coordinates: CoordinateTuple[]): string => {
  return coordinates
    .map(([lon, lat]: CoordinateTuple) => `${lon} ${lat}`)
    .join(", ");
};
const convertGeojsonToWKT = (geojson: FeatureCollection) => {
  const geometryType = geojson.geometry.type;

  if (geometryType !== "Polygon") {
    throw new Error("Unsupported geometry type. Only Polygon is supported.");
  }

  const coordinates = geojson.geometry.coordinates[0];
  //   @ts-ignore
  const wktGeometry = `POLYGON ((${convertCoordinatesToWKT(coordinates)}))`;

  return wktGeometry;
};

export default convertGeojsonToWKT;
