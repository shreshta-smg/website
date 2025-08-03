import React from "react";
import {
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
  DateField,
  List,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMany } from "@refinedev/core";

export const ArticlesList = () => {
  const { dataGridProps } = useDataGrid();

  const { data: articleData, isLoading: articleIsLoading } = useMany({
    resource: "articles",
    ids: dataGridProps?.rows?.map((item: any) => item?.id) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "categories",
    ids: dataGridProps?.rows?.map((item: any) => item?.category_id) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "Id",
        type: "number",
        minWidth: 50,
      },
      {
        field: "article_id",
        flex: 1,
        headerName: "Article",
        minWidth: 300,
      },
      {
        field: "title",
        flex: 1,
        headerName: "Title",
        minWidth: 200,
      },
      {
        field: "category_id",
        flex: 1,
        headerName: "Category",
        minWidth: 300,
        renderCell: function render({ value }) {
          return categoryIsLoading ? (
            <>Loading...</>
          ) : (
            categoryData?.data?.find((item) => item.id === value)?.title
          );
        },
      },
      {
        field: "created_at",
        flex: 1,
        headerName: "Created At",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} format={"MMM DD YYYY"} />;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        align: "right",
        headerAlign: "right",
        minWidth: 120,
        sortable: false,
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
      },
    ],
    [articleData?.data, categoryData?.data]
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
};
