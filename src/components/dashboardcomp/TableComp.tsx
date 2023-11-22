import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default function DataGridDemo({ tableColumn, tableData }) {
  const columns: GridColDef[] = tableColumn;

  const rows = tableData;
  return (
    <Box sx={{ height: 350, width: "100%" }}>
      <DataGrid
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
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
