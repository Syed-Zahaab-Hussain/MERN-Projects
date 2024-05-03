import { Box, useTheme } from "@mui/material";
import { Header } from "../components";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const Customers = () => {
  // const theme = useTheme();

  const [data, setData] = useState([]);
  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    { field: "country", headerName: "Country", flex: 0.4 },
    { field: "occupation", headerName: "Occupation", flex: 1 },
    { field: "role", headerName: "Role", flex: 0.5 },
  ];
  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/client/customers`
      );

      const data = await response.json();
      console.log(data);
      setData(data);
    };
    getProducts();
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List of customers" />
      <Box
        mt="40px"
        height="75vh"
        // sx={{
        //   "& .MuiDataGrid-root": { border: "none" },
        //   "& .MuiDataGrid-cell": {
        //     borderBottom: "none",
        //   },
        //   "& .MuiDataGrid-columnHeaders": {
        //     background: theme.palette.background.alt,
        //     color: theme.palette.secondary[100],
        //     borderBottom: "none",
        //   },
        //   "& .MuiDataGrid-footerContainer": {
        //     background: theme.palette.background.alt,
        //     color: theme.palette.secondary[100],
        //     borderTop: "none",
        //   },
        //   "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
        //     color: `${theme.palette.secondary[200]} !important`,
        //   },
        // }}
      >
        <DataGrid
          loading={data.length === 0 ? true : false}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Customers;
