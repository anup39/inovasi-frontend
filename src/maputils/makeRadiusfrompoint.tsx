import * as turf from "@turf/turf";

function makeRadiusfrompoint(lngLatArray: number[], radiusInMeters: number) {
  const point = turf.point(lngLatArray);
  const buffered = turf.buffer(point, radiusInMeters, { units: "meters" });
  return buffered;
}

export default makeRadiusfrompoint;
