import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import maplibregl, { Map, LngLatBoundsLike } from "maplibre-gl";

interface DataItem {
  id: number;
  [key: string]: any; // Any other key can have any value
}

interface DataGridDemoProps {
  tableColumn: GridColDef[];
  tableData: DataItem[];
  map: Map | null;
  component: string;
}

const getGeoJSON = (data: DataItem[], indices: number[], component: string) => {
  const filteredData = data.filter((item) => indices.includes(item.id));

  const features = filteredData.map((item) => {
    const long = `${component}_long`;
    const lat = `${component}_lat`;

    return {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [parseFloat(item[long]), parseFloat(item[lat])],
      },
    };
  });

  const geojson = {
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
      const geojson: any = getGeoJSON(tableData, rows, component);
      const padding = { top: 25, bottom: 25, left: 25, right: 25 };
      const bounds = new maplibregl.LngLatBounds() as LngLatBoundsLike;

      geojson.features.forEach((feature: any) => {
        //// @ts-ignore
        bounds.extend(feature.geometry.coordinates);
      });

      if (map.getSource("point-table") && map.getLayer("point-table-layer")) {
        const source: any = map.getSource("point-table");
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
