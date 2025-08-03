import { Create } from "@refinedev/mui";
import { Box, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export const FeedbacksCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm();

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
        <TextField
          {...register("created_at", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.created_at}
          helperText={(errors as any)?.created_at?.message}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          defaultValue={new Date()}
          disabled
          label="Created At"
          name="created_at"
        />
        <TextField
          {...register("title", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.title}
          helperText={(errors as any)?.title?.message}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          type="text"
          label="Title"
          name="title"
        />
        <TextField
          {...register("rating", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.rating}
          helperText={(errors as any)?.rating?.message}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          type="number"
          label="Rating"
          name="rating"
        />
        <TextField
          {...register("comment", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.comment}
          helperText={(errors as any)?.comment?.message}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          multiline
          label="Comment"
          name="comment"
        />
        <TextField
          {...register("full_name", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.full_name}
          helperText={(errors as any)?.full_name?.message}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          type="text"
          label="Full Name"
          name="full_name"
        />
        <TextField
          {...register("email_address", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.email_address}
          helperText={(errors as any)?.email_address?.message}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          type="email"
          label="Email Address"
          name="email_address"
        />
        <TextField
          {...register("phone_number", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.phone_number}
          helperText={(errors as any)?.phone_number?.message}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          type="number"
          label="Phone Number"
          name="phone_number"
        />
        <Controller
          control={control}
          name="is_approved"
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <FormControlLabel
              label="Is Approved"
              control={
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={(event) => {
                    field.onChange(event.target.checked);
                  }}
                />
              }
            />
          )}
        />
        <TextField
          {...register("feedback_type", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.feedback_type}
          helperText={(errors as any)?.feedback_type?.message}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          type="number"
          label="Feedback Type"
          name="feedback_type"
        />
        <TextField
          {...register("feedback_category", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.feedback_category}
          helperText={(errors as any)?.feedback_category?.message}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          type="number"
          label="Feedback Category"
          name="feedback_category"
        />
      </Box>
    </Create>
  );
};
