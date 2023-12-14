import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import maplibregl, {
  Map,
  GeoJSONSource,
  LngLatBounds,
  LngLatBoundsLike,
} from "maplibre-gl";
import calculateBoundingBoxPolygonfromGeojson from "../../maputils/calculateBoundingBoxPolygonfromGeojson";
import getGeojsonFromwktTableWithGeom from "../../maputils/getGeojsonFromwktTableWithGeom";
// @ts-ignore
// import getGeojsonFromwktTableWithLatlong from "../../maputils/getGeojsonFromwktTablewithLatlong";

interface DataItem {
  id: number;
  [key: string]: unknown;
}

type PointFeature = {
  type: "Feature";
  properties: Record<string, string>;
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
};

const getGeojsonFromwktTableWithLatlong = (
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

// export default getGeojsonFromwktTableWithLatlong;

interface DataGridDemoProps {
  tableColumn: GridColDef[];
  tableData: [];
  map: Map | null;
  component: string;
}

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
        const geojson = getGeojsonFromwktTableWithLatlong(
          tableData,
          numericRows,
          component
        );
        const padding = { top: 25, bottom: 25, left: 25, right: 25 };
        const bounds = new maplibregl.LngLatBounds() as LngLatBounds;

        // @ts-ignore
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
        const geojson_polygon = getGeojsonFromwktTableWithGeom(
          tableData,
          numericRows
        );
        const padding = { top: 25, bottom: 25, left: 25, right: 25 };
        const boundingBox =
          calculateBoundingBoxPolygonfromGeojson(geojson_polygon);
        const bounds: LngLatBoundsLike = [
          boundingBox[0][0],
          boundingBox[0][1],
          boundingBox[1][0],
          boundingBox[1][1],
        ];

        if (
          map.getSource("polygon-table") &&
          map.getLayer("polygon-table-layer")
        ) {
          const source = map.getSource("polygon-table") as GeoJSONSource;
          source.setData(geojson_polygon);
          map.fitBounds(bounds, { padding });
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
    <Box sx={{ height: "400px ", minWidth: "1568px", width: "80vw" }}>
      <DataGrid
        hideFooter={true}
        rows={tableData}
        columns={tableColumn}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 6,
            },
          },
        }}
        pageSizeOptions={[6]}
        checkboxSelection={true}
        disableRowSelectionOnClick
        onRowSelectionModelChange={handleonRowSelectionModelChange}
      />
    </Box>
  );
}
