import { useShow } from "@refinedev/core";
import {
  Show,
  NumberField,
  TextFieldComponent as TextField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const TagsShow = () => {
  const { query } = useShow();
  const { data, isLoading } = query;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Id
        </Typography>
        <NumberField value={record?.id ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Title
        </Typography>
        <TextField value={record?.title} />
        <Typography variant="body1" fontWeight="bold">
          Slug
        </Typography>
        <TextField value={record?.slug} />
      </Stack>
    </Show>
  );
};
