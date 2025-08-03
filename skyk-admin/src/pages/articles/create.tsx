import { Create, MarkdownField, useAutocomplete } from "@refinedev/mui";
import {
  Box,
  Autocomplete,
  TextField,
  FormHelperText,
  Chip,
  FormControl,
  FormLabel,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller, set, useWatch } from "react-hook-form";
import { v4 } from "uuid";
import { FileUploader } from "../../components";
import MDEditor from "@uiw/react-md-editor";

interface ITag {
  id: number;
  title: string;
  slug?: string;
}

interface IArticle {
  id: number;
  title: string;
  content: string;
  featured_image_url?: string;
  caption?: string;
  category_id?: number;
  tags: ITag[];
}

export const ArticlesCreate: React.FC = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm();

  const { autocompleteProps: articleAutocompleteProps } = useAutocomplete({
    resource: "articles",
  });

  const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
    resource: "categories",
  });

  const articleId = v4({});

  const { autocompleteProps, query: tagsQueryResult } = useAutocomplete<ITag>({
    resource: "tags", // The Refine resource name for your tags table
    onSearch: (value) => [{ field: "title", operator: "contains", value }],
    // If you need more complex filtering or remote data fetching, adjust onSearch.
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
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
          label="Article ID"
          name="article_id"
          defaultValue={articleId}
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

        {/* --- MDEditor for Content --- */}
        <FormControl fullWidth margin="normal" error={!!errors.content}>
          <FormLabel sx={{ mb: 0.5 }}>Content</FormLabel>
          <Controller
            name="content"
            control={control}
            rules={{ required: "Content is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Box data-color-mode="light">
                {" "}
                {/* Ensures MDEditor uses light theme */}
                <MDEditor
                  value={value || ""} // MDEditor expects string or undefined, not null
                  onChange={(newValue) => onChange(newValue || "")} // MDEditor passes string or undefined
                />
                {/* Optional: Add a simple preview below the editor
                        <MDEditor.Markdown source={value || ""} style={{ whiteSpace: 'pre-wrap', mt: 1, p: 2, border: '1px solid #ccc', borderRadius: 1 }} />
                        */}
              </Box>
            )}
          />
          {errors.content && (
            <FormHelperText error>{errors.content?.message}</FormHelperText>
          )}
        </FormControl>
        {/* --- End MDEditor for Content --- */}

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
          defaultValue={new Date()}
          disabled
        />

        <Controller
          name="featured_image_url" // The name of the field in your form data
          control={control} // Pass the control object
          rules={{ required: "Featured image is required" }} // Validation rules here
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
              value={value as string | undefined} // Pass the value from Controller
              onChange={onChange} // Pass Controller's onChange to your component
              // onBlur={onBlur} // Can pass onBlur if your component has an onBlur equivalent
              // ref={ref} // If your component uses a ref internally for the input
              required={true} // For visual indication
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

        {/* --- Tags Autocomplete with Controller --- */}
        <FormControl fullWidth margin="normal" error={!!errors.tags}>
          <FormLabel sx={{ mb: 0.5 }}>Tags</FormLabel>
          <Controller
            name="tags"
            control={control}
            // No 'required' rule here if tags are optional.
            // If required, add rules: { required: "At least one tag is required" }
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Autocomplete
                {...autocompleteProps}
                multiple
                // The 'value' from Controller should be an array of selected tags (ITag or string)
                value={(value || []) as (ITag | string)[]}
                // Render options correctly. When creating a new tag, it's a string.
                // When selecting an existing tag, it's an ITag object.
                getOptionLabel={(option) => {
                  if (typeof option === "string") {
                    return option; // For new tags entered as strings
                  }
                  return option.title; // For existing tags (ITag objects)
                }}
                // Check if option is already selected
                isOptionEqualToValue={(option, val) => {
                  if (typeof option === "string" && typeof val === "string") {
                    return option === val;
                  }
                  if (typeof option !== "string" && typeof val !== "string") {
                    return option.id === val.id;
                  }
                  return false;
                }}
                onChange={(event, newValue) => {
                  onChange(newValue); // Update form value
                }}
                filterSelectedOptions
                freeSolo // Allows creating new tags that are not in the options
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={typeof option === "string" ? option : option.title}
                      {...getTagProps({ index })}
                      key={typeof option === "string" ? option : option.id} // Use ID if available, else name
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Select or add tags"
                    error={!!error}
                    // No separate helperText here, it's managed by FormHelperText below
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {autocompleteProps.loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            )}
          />
          {errors.status && (
            <FormHelperText error>
              {errors.tags?.message?.toString()}
            </FormHelperText>
          )}
        </FormControl>
        {/* --- End Tags Autocomplete --- */}

        {/* --- Select Field for Status --- */}
        <FormControl fullWidth margin="normal" error={!!errors.status}>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Controller
            name="status"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Select
                labelId="status-select-label"
                id="status-select"
                value={value || ""} // Ensure value is not undefined
                label="Status"
                onChange={onChange}
              >
                <MenuItem value="Draft">Draft</MenuItem>
                <MenuItem value="Published">Published</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            )}
          />
          {errors.status && (
            <FormHelperText error>
              {errors.status?.message?.toString()}
            </FormHelperText>
          )}
        </FormControl>
        {/* --- End Select Field for Status --- */}
      </Box>
    </Create>
  );
};
