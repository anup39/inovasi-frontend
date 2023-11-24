import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default function DataGridDemo({ tableColumn, tableData }) {
  const columns: GridColDef[] = tableColumn;

  const rows = tableData;
  const handleOnCellClick = (params, event, details) => {
    console.log(params, "params");
    console.log(event, "event");
    console.log(details, "details");
  };
  const handleonRowSelectionModelChange = (rows, details) => {
    console.log(rows, "rows");
    // console.log(tableData, "table data");
    // console.log(details, "details");
    if (rows.length > 0) {
      console.log("add layer to maps");
    }
  };
  return (
    <Box sx={{ height: 350, width: "100%" }}>
      <DataGrid
        hideFooter={false}
        rows={rows}
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
        // onCellDoubleClick={handleOnCellClick}
      />
    </Box>
  );
}
