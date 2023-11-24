import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import maplibregl, { Map } from "maplibre-gl"; // Import 'Map' type from 'maplibre-gl'

const getGeoJSON = (data, indices) => {
  const filteredData = [];
  indices.forEach((index) => {
    data.forEach((item) => {
      if (item.id == index) {
        filteredData.push(item);
      }
    });
  });
  const features = filteredData.map((item) => {
    const { mill_lat, mill_long, ...properties } = item;
    return {
      type: "Feature",
      properties: properties,
      geometry: {
        type: "Point",
        coordinates: [parseFloat(item.mill_long), parseFloat(item.mill_lat)],
      },
    };
  });

  const geojson = {
    type: "FeatureCollection",
    features: features,
  };
  return geojson;
};

export default function DataGridDemo({ tableColumn, tableData, map }) {
  const columns: GridColDef[] = tableColumn;

  const handleonRowSelectionModelChange = (rows, details) => {
    if (rows.length >= 0) {
      const geojson = getGeoJSON(tableData, rows);
      const padding = { top: 25, bottom: 25, left: 25, right: 25 };
      const bounds = new maplibregl.LngLatBounds();
      geojson.features.forEach((feature) => {
        bounds.extend(feature.geometry.coordinates);
      });
      // console.log(geojson, "geojson");
      if (map) {
        if (map.getSource("point-table") && map.getLayer("point-table-layer")) {
          const source = map.getSource("point-table");
          source.setData(geojson);
          map.fitBounds(bounds, { padding });
        } else {
          map.addSource("point-table", { type: "geojson", data: geojson });
          map.addLayer({
            id: "point-table-layer",
            type: "circle",
            source: "point-table",
            paint: {
              "circle-radius": 8,
              "circle-color": "#233430",
            },
          });
          map.fitBounds(bounds, { padding });
          console.log(map);
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
