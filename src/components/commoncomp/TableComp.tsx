import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import maplibregl, { Map, GeoJSONSource, LngLatBounds } from "maplibre-gl";

interface DataItem {
  id: number;
  [key: string]: unknown;
}

interface DataGridDemoProps {
  tableColumn: GridColDef[];
  tableData: DataItem[];
  map: Map | null;
  component: string;
}

type PointFeature = {
  type: "Feature";
  properties: Record<string, string>;
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
};

function calculateBoundingBox(geoJSON) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  geoJSON.features.forEach((feature) => {
    if (feature.geometry.type === "Polygon") {
      const coordinates = feature.geometry.coordinates[0]; // Considering only the exterior ring
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

function parseCoordinates(coordString) {
  // Remove Z value and filter out null coordinates
  const pairs = coordString
    .split(",")
    .map((pair) => pair.trim().split(/\s+/).slice(0, 2).map(parseFloat));
  return pairs.filter((pair) => pair.every((coord) => !isNaN(coord)));
}
const getGeoJSON = (
  data: DataItem[],
  indices: number[],
  component: string
): GeoJSON.FeatureCollection<GeoJSON.Geometry, GeoJSON.GeoJsonProperties> => {
  const filteredData = data.filter((item) => indices.includes(item.id));

  const features: PointFeature[] = filteredData.map((item) => {
    const longKey = `${component}_long`;
    const latKey = `${component}_lat`;

    const long = parseFloat(String(item[longKey as keyof typeof item]));
    const lat = parseFloat(String(item[latKey as keyof typeof item]));
    return {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [long, lat],
      },
    };
  });

  const geojson: GeoJSON.FeatureCollection<
    GeoJSON.Geometry,
    GeoJSON.GeoJsonProperties
  > = {
    type: "FeatureCollection",
    features: features,
  };
  return geojson;
};

const getGeoJSONPolygon = (
  data: DataItem[],
  indices: number[],
  component: string
): GeoJSON.FeatureCollection<GeoJSON.Geometry, GeoJSON.GeoJsonProperties> => {
  const filteredData = data.filter((item) => indices.includes(item.id));

  const features: PointFeature[] = filteredData.map((item) => {
    const wkt = item.geom;
    const cleanWKT = wkt.replace(/SRID=\d+;/i, "");
    const matches = cleanWKT.match(/(\w+)\s*\((.*)\)/);

    if (matches && matches.length === 3) {
      const coordinates = matches[2].trim();
      const coordinatesArray = parseCoordinates(coordinates);
      coordinatesArray.push(coordinatesArray[0]);
      return {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [coordinatesArray],
        },
      };
    }
  });

  const geojson: GeoJSON.FeatureCollection<
    GeoJSON.Geometry,
    GeoJSON.GeoJsonProperties
  > = {
    type: "FeatureCollection",
    features: features,
  };
  return geojson;
};

export default function DataGridDemo({
  tableColumn,
  tableData,
  map,
  component,
}: DataGridDemoProps) {
  const handleonRowSelectionModelChange = (rows: GridRowId[]) => {
    if (component === "mill") {
      if (rows.length > 0 && map) {
        const numericRows: number[] = rows.map((rowId) =>
          parseInt(rowId as string, 10)
        );
        const geojson = getGeoJSON(tableData, numericRows, component);
        const padding = { top: 25, bottom: 25, left: 25, right: 25 };
        const bounds = new maplibregl.LngLatBounds() as LngLatBounds;

        geojson.features.forEach((feature) => {
          if (feature.geometry.type === "Point") {
            const pointCoordinates = feature.geometry.coordinates as [
              number,
              number
            ];
            bounds.extend(pointCoordinates);
          }
        });

        if (map.getSource("point-table") && map.getLayer("point-table-layer")) {
          const source = map.getSource("point-table") as GeoJSONSource;
          source.setData(geojson);
          map.fitBounds(bounds, { padding });
          map.setLayoutProperty("point-table-layer", "visibility", "visible");
        }
      } else if (
        map &&
        map.getSource("point-table") &&
        map.getLayer("point-table-layer")
      ) {
        map.setLayoutProperty("point-table-layer", "visibility", "none");
      }
    } else {
      if (rows.length > 0 && map) {
        const numericRows: number[] = rows.map((rowId) =>
          parseInt(rowId as string, 10)
        );
        const geojson_polygon = getGeoJSONPolygon(
          tableData,
          numericRows,
          component
        );
        console.log(geojson_polygon, "geojson");
        const padding = { top: 25, bottom: 25, left: 25, right: 25 };
        const bounds = new maplibregl.LngLatBounds() as LngLatBounds;

        const boundingBox = calculateBoundingBox(geojson_polygon);

        if (
          map.getSource("polygon-table") &&
          map.getLayer("polygon-table-layer")
        ) {
          const source = map.getSource("polygon-table") as GeoJSONSource;
          source.setData(geojson_polygon);
          map.fitBounds(boundingBox, { padding });
          map.setLayoutProperty("polygon-table-layer", "visibility", "visible");
        }
      } else if (
        map &&
        map.getSource("polygon-table") &&
        map.getLayer("polygon-table-layer")
      ) {
        map.setLayoutProperty("polygon-table-layer", "visibility", "none");
      }
    }
  };

  return (
    <Box sx={{ height: 350, width: "100%" }}>
      <DataGrid
        hideFooter={false}
        rows={tableData}
        columns={tableColumn}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection={true}
        disableRowSelectionOnClick
        onRowSelectionModelChange={handleonRowSelectionModelChange}
      />
    </Box>
  );
}
