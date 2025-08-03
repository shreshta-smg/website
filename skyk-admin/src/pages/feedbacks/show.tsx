import { useShow } from "@refinedev/core";
import {
  Show,
  NumberField,
  DateField,
  TextFieldComponent as TextField,
  MarkdownField,
  EmailField,
  BooleanField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const FeedbacksShow = () => {
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
          Created At
        </Typography>
        <DateField value={record?.created_at} />
        <Typography variant="body1" fontWeight="bold">
          Title
        </Typography>
        <TextField value={record?.title} />
        <Typography variant="body1" fontWeight="bold">
          Rating
        </Typography>
        <NumberField value={record?.rating ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Comment
        </Typography>
        <MarkdownField value={record?.comment} />
        <Typography variant="body1" fontWeight="bold">
          Full Name
        </Typography>
        <TextField value={record?.full_name} />
        <Typography variant="body1" fontWeight="bold">
          Email Address
        </Typography>
        <EmailField value={record?.email_address} />
        <Typography variant="body1" fontWeight="bold">
          Phone Number
        </Typography>
        <NumberField value={record?.phone_number ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Is Approved
        </Typography>
        <BooleanField value={record?.is_approved} />
        <Typography variant="body1" fontWeight="bold">
          Feedback Type
        </Typography>
        <NumberField value={record?.feedback_type ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Feedback Category
        </Typography>
        <NumberField value={record?.feedback_category ?? ""} />
      </Stack>
    </Show>
  );
};
