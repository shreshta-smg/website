import React from "react";
import {
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
  List,
  DateField,
  MarkdownField,
  EmailField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Checkbox, Typography } from "@mui/material";

export const FeedbacksList = () => {
  const { dataGridProps } = useDataGrid();

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        flex: 1,
        headerName: "Id",
        minWidth: 200,
        type: "number",
      },
      {
        field: "created_at",
        flex: 1,
        headerName: "Created At",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} format="MMM DD YYYY" />;
        },
      },
      {
        field: "full_name",
        flex: 1,
        headerName: "Full Name",
        minWidth: 200,
      },
      {
        field: "email_address",
        flex: 1,
        headerName: "Email Address",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <EmailField value={value} />;
        },
      },
      {
        field: "phone_number",
        flex: 1,
        headerName: "Phone Number",
        type: "number",
        minWidth: 200,
      },
      {
        field: "is_approved",
        headerName: "Is Approved",
        minWidth: 50,
        renderCell: function render({ value }) {
          return <Checkbox checked={!!value} />;
        },
      },
      {
        field: "feedback_type", // Your number field
        headerName: "Review/Inquiry",
        width: 120,
        renderCell: (params) => {
          // Custom rendering logic for the 'type' field
          if (params.value === 2) {
            return <Typography>Inquiry</Typography>;
          }
          return <Typography>Review</Typography>;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
