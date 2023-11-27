function calculateBoundingBoxPolygonfromGeojson(
  geoJSON: GeoJSON.FeatureCollection<
    GeoJSON.Geometry,
    GeoJSON.GeoJsonProperties
  >
) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  geoJSON.features.forEach((feature) => {
    if (feature.geometry.type === "Polygon") {
      const coordinates = feature.geometry.coordinates[0];
      coordinates.forEach((point) => {
        const [lng, lat] = point;
        minX = Math.min(minX, lng);
        minY = Math.min(minY, lat);
        maxX = Math.max(maxX, lng);
        maxY = Math.max(maxY, lat);
      });
    }
  });

  return [
    [minX, minY],
    [maxX, maxY],
  ];
}
export default calculateBoundingBoxPolygonfromGeojson;
