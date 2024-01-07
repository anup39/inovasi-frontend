interface DataItem {
  id: number;
  [key: string]: unknown;
}

type PolygonFeature = {
  type: "Feature";
  properties: Record<string, string>;
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
};

function parseCoordinates(coordString: string) {
  // Remove Z value and filter out null coordinates
  const pairs = coordString
    .split(",")
    .map((pair) => pair.trim().split(/\s+/).slice(0, 2).map(parseFloat));
  return pairs.filter((pair) => pair.every((coord) => !isNaN(coord)));
}
const getGeojsonFromwktTableWithGeom = (
  data: DataItem[],
  indices: number[]
): GeoJSON.FeatureCollection<GeoJSON.Polygon, GeoJSON.GeoJsonProperties> => {
  console.log(data, indices);
  const filteredData = data.filter((item) => indices.includes(item.id));

  const features: PolygonFeature[] = filteredData
    .map((item) => {
      // const wkt: string = item.geom as string;
      // const cleanWKT = wkt.replace(/SRID=\d+;/i, "");
      // const matches = cleanWKT.match(/(\w+)\s*\((.*)\)/);

      // if (matches && matches.length === 3) {
      // const coordinates = matches[2].trim();
      // const coordinatesArray = parseCoordinates(coordinates);
      // coordinatesArray.push(coordinatesArray[0]);
      return {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: item.geom.coordinates,
        },
      };
      // }
      // Return null for invalid or unrecognized geometries
      // return null;
    })
    .filter((feature): feature is PolygonFeature => feature !== null);

  const geojson: GeoJSON.FeatureCollection<
    GeoJSON.Polygon,
    GeoJSON.GeoJsonProperties
  > = {
    type: "FeatureCollection",
    features: features as GeoJSON.Feature<
      GeoJSON.Polygon,
      GeoJSON.GeoJsonProperties
    >[],
  };
  return geojson;
};

export default getGeojsonFromwktTableWithGeom;
