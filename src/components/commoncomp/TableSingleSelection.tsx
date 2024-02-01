import Box from "@mui/material/Box";
import { useState } from "react";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { IControl } from "maplibre-gl";

import maplibregl, { Map, GeoJSONSource, LngLatBounds } from "maplibre-gl";

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
  indices: GridRowId[],
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

interface DataGridSingleDemoProps {
  // @ts-ignore
  tableColumn: GridColDef[];
  tableData: [];
  map: Map | null;
  component: string;
  height: string;
  width: string;
  pageSize: number;
  page: number;
}

export default function DataGridSingleDemo({
  tableColumn,
  tableData,
  map,
  component,
  height,
  pageSize,
  page,
}: DataGridSingleDemoProps) {
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
  const handleonRowSelectionModelChange = (rows: GridRowId[]) => {
    console.log(rows, "rows");
    if (rows.length > 0 && map) {
      const selectionSet = new Set(selectionModel);
      const result = rows.filter((s) => !selectionSet.has(s));
      console.log(result, "selection");

      const numericRows: GridRowId[] = [rows[rows.length - 1]];

      console.log("numericsRows", numericRows);
      setSelectionModel(result);
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

      const filteredData = tableData.filter((item) =>
        // @ts-ignore

        numericRows.includes(item.id)
      );

      const popup_name: string = "PopupControl";
      // @ts-ignore
      const popup_index = map._controls.indexOf(popup_name);

      if (popup_index) {
        const popup_control: IControl = map._controls[map._controls.length - 1];
        // @ts-ignore
        popup_control.updatePopup(filteredData[0], true, true);
      }
      console.log(filteredData, "filtered data");

      if (map.getSource("point-table") && map.getLayer("point-table-layer")) {
        const source = map.getSource("point-table") as GeoJSONSource;
        source.setData(geojson);
        map.fitBounds(bounds, { padding });
        map.setLayoutProperty("point-table-layer", "visibility", "visible");
      }
    } else {
      setSelectionModel(rows);
    }
  };

  return (
    <div className="max-w-[1772px]">
      <Box
        sx={{
          height: height,
          // maxWidth: "1772px",
          // minWidth: "1566px",
          // width: "100%",
          // width: width,
          backgroundColor: "#EFEFEF",
        }}
      >
        <DataGrid
          sx={{
            "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
              {
                display: "none",
              },
          }}
          hideFooter={true}
          rows={tableData}
          columns={tableColumn.map((col) => ({
            ...col,
            // @ts-ignore
            headerName: col.headerName.toUpperCase(),
            sx: {
              color: "#848686", // Set the text color
              fontWeight: 700, // Set font weight directly
            },
          }))}
          initialState={{
            pagination: {
              paginationModel: {
                page: page,
                pageSize: pageSize,
              },
            },
          }}
          paginationModel={{ page: page, pageSize: pageSize }}
          pageSizeOptions={[pageSize]}
          checkboxSelection={true}
          disableRowSelectionOnClick
          rowSelectionModel={selectionModel}
          onRowSelectionModelChange={handleonRowSelectionModelChange}
          disableColumnSelector={true}
        />
      </Box>
    </div>
  );
}
