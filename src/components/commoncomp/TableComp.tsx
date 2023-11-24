import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
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

export default function DataGridDemo({
  tableColumn,
  tableData,
  map,
  component,
}: DataGridDemoProps) {
  const handleonRowSelectionModelChange = (rows: number[]) => {
    if (rows.length > 0 && map) {
      const geojson = getGeoJSON(tableData, rows, component);
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
