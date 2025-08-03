import { useShow, useOne } from "@refinedev/core";
import {
  Show,
  NumberField,
  TextFieldComponent as TextField,
  MarkdownField,
  DateField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const ArticlesShow = () => {
  const { query } = useShow();
  const { data, isLoading } = query;

  const record = data?.data;

  const { data: articleData, isLoading: articleIsLoading } = useOne({
    resource: "articles",
    id: record?.id || 0,
    queryOptions: {
      enabled: !!record,
    },
  });

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "categories",
    id: record?.category_id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Id
        </Typography>
        <NumberField value={record?.id ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Article
        </Typography>

        {articleIsLoading ? (
          <>Loading...</>
        ) : (
          <>{articleData?.data?.article_id}</>
        )}
        <Typography variant="body1" fontWeight="bold">
          Title
        </Typography>
        <TextField value={record?.title} />
        <Typography variant="body1" fontWeight="bold">
          Content
        </Typography>
        <MarkdownField value={record?.content} />
        <Typography variant="body1" fontWeight="bold">
          Category
        </Typography>

        {categoryIsLoading ? <>Loading...</> : <>{categoryData?.data?.title}</>}
        <Typography variant="body1" fontWeight="bold">
          Created At
        </Typography>
        <DateField value={record?.created_at} />
        <Typography variant="body1" fontWeight="bold">
          Featured Image Url
        </Typography>
        <img
          style={{ maxWidth: 200, width: "100%", height: 200 }}
          src={record?.featured_image_url}
        />
        <Typography variant="body1" fontWeight="bold">
          Caption
        </Typography>
        <TextField value={record?.caption} />
        <Typography variant="body1" fontWeight="bold">
          Status
        </Typography>
        <TextField value={record?.status} />
      </Stack>
    </Show>
  );
};
