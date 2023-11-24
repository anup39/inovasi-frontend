import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import maplibregl, { Map } from "maplibre-gl"; // Import 'Map' type from 'maplibre-gl'

const getGeoJSON = (data, indice, component) => {
  const filteredData = [];
  indices.forEach((index) => {
    data.forEach((item) => {
      if (item.id == index) {
        filteredData.push(item);
      }
    });
  });
  const features = filteredData.map((item) => {
    // const { mill_lat, mill_long, ...properties } = item;
    return {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [
          parseFloat(item[component + "_" + "long"]),
          parseFloat(item[component + "_" + "lat"]),
        ],
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
}) {
  const columns: GridColDef[] = tableColumn;

  const handleonRowSelectionModelChange = (rows, details) => {
    if (rows.length > 0) {
      const geojson = getGeoJSON(tableData, rows, component);
      const padding = { top: 25, bottom: 25, left: 25, right: 25 };
      const bounds = new maplibregl.LngLatBounds();
      geojson.features.forEach((feature) => {
        bounds.extend(feature.geometry.coordinates);
      });
      if (map) {
        if (map.getSource("point-table") && map.getLayer("point-table-layer")) {
          const source = map.getSource("point-table");
          source.setData(geojson);
          map.fitBounds(bounds, { padding });
          map.setLayoutProperty("point-table-layer", "visibility", "visible");
        }
      }
    }
    if (rows.length == 0) {
      if (map) {
        if (map.getSource("point-table") && map.getLayer("point-table-layer")) {
          map.setLayoutProperty("point-table-layer", "visibility", "none");
        }
      }
    }
  };
  return (
    <Box sx={{ height: 350, width: "100%" }}>
      <DataGrid
        hideFooter={false}
        rows={tableData}
        columns={columns}
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
        disableColumnSelector={false}
        // onCellClick={handleOnCellClick}
        onRowSelectionModelChange={handleonRowSelectionModelChange}
      />
    </Box>
  );
}
