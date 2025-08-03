import { Edit } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";

export const TagsEdit = () => {
  const {
    saveButtonProps,
    refineCore: { query },
    register,
    control,
    formState: { errors },
  } = useForm();

  const tagsData = query?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("id", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.id}
          helperText={(errors as any)?.id?.message}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          type="number"
          label="Id"
          name="id"
          disabled
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
          {...register("slug", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.slug}
          helperText={(errors as any)?.slug?.message}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          type="text"
          label="Slug"
          name="slug"
        />
      </Box>
    </Edit>
  );
};
