// @ts-ignore
import * as turf from "@turf/turf";

function makeRadiusfrompoint(lngLatArray: number[], radiusInMeters: number) {
  const point = turf.point(lngLatArray);
  const buffered = turf.buffer(point, radiusInMeters, { units: "meters" });
  const extent = turf.bbox(buffered);
  return { buffered, extent };
}

export default makeRadiusfrompoint;
