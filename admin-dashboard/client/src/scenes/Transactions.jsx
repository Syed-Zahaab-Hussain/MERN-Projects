import { DataGrid } from "@mui/x-data-grid";
import { Header, dataGridCustomToolbar } from "../components";
import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const Transactions = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);

  // values to be send to backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/client/transactions?page=${page}&pageSize=${pageSize}&sort=${JSON.stringify(
          sort
        )}&search=${search}`
      )
        .then((response) => response.json())
        // .then((data) => console.log(data))
        .then((data) => setData(data))
        .catch((error) => console.error(error));
    };
    getProducts();
  }, [page, pageSize, search, sort]);

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "userId", headerName: "User ID", flex: 0.5 },
    { field: "createdAt", headerName: "CreatedAt", flex: 1 },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            background: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            background: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={data.length === 0 ? true : false}
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: dataGridCustomToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
