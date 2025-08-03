import { Edit, useAutocomplete } from "@refinedev/mui";
import { Box, TextField, Autocomplete } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { FileUploader } from "../../components";

export const ArticlesEdit = () => {
  const {
    saveButtonProps,
    refineCore: { query },
    register,
    control,
    formState: { errors },
  } = useForm();

  const articlesData = query?.data?.data;

  const { autocompleteProps: articleAutocompleteProps } = useAutocomplete({
    resource: "articles",
    defaultValue: articlesData?.id,
  });

  const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
    resource: "categories",
    defaultValue: articlesData?.category_id,
  });

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
          {...register("article_id", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.article_id}
          helperText={(errors as any)?.article_id?.message}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          type="text"
          label="Article Ref"
          name="article_id"
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
          {...register("content", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.content}
          helperText={(errors as any)?.content?.message}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          multiline
          label="Content"
          name="content"
        />
        <Controller
          control={control}
          name="category_id"
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...categoryAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.id ?? value);
              }}
              getOptionLabel={(item) => {
                return (
                  categoryAutocompleteProps?.options?.find(
                    (p) => p?.id?.toString() === (item?.id ?? item)?.toString()
                  )?.title ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) =>
                value === undefined ||
                option?.id?.toString() === (value?.id ?? value)?.toString()
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.category_id}
                  helperText={(errors as any)?.category_id?.message}
                  required
                />
              )}
            />
          )}
        />
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
          label="Created At"
          name="created_at"
        />
        <Controller
          name="featured_image_url" // The name of the field in your form data
          control={control} // Pass the control object
          rules={{ required: "Featured image is required" }} // Validation rules
          // defaultValue property for Controller can be useful if not relying on useForm's defaultValues
          // defaultValue={articleData.featured_image_url || ""}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { error },
          }) => (
            <FileUploader
              label="Featured Image"
              hint="Drag & drop an image or click to browse. Max 1 image."
              bucketName="article-images"
              folderPath="public/articles"
              maxCount={1}
              listType="picture"
              value={value as string | undefined} // This will be the existing URL or undefined
              onChange={onChange} // Controller's onChange to update form
              required={true}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <TextField
          {...register("caption", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.caption}
          helperText={(errors as any)?.caption?.message}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          type="text"
          label="Caption"
          name="caption"
        />
        <TextField
          {...register("status", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.status}
          helperText={(errors as any)?.status?.message}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          type="text"
          label="Status"
          name="status"
        />
      </Box>
    </Edit>
  );
};
