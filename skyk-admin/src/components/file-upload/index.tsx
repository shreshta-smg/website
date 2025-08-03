// src/components/MuiSupabaseFileUpload.tsx (minimal changes from last version)
import React, { useState, useCallback } from "react";
import { supabaseClient } from "../../utility/supabaseClient"; // Adjust this path
import {
  Box,
  Button,
  Typography,
  LinearProgress,
  Alert,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface FileUploaderProps {
  bucketName: string;
  folderPath: string;
  maxCount?: number;
  listType?: "text" | "picture";
  value?: string; // This will now come from Controller's `field.value`
  onChange?: (url: string | null) => void; // This will now be Controller's `field.onChange`
  // onBlur?: () => void; // You can add this if you want to pass onBlur from Controller
  // ref?: React.Ref<any>; // You can add this if your component passes a ref to an internal input
  label?: string;
  hint?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  bucketName,
  folderPath,
  maxCount = 1,
  listType = "picture",
  value, // current value (URL) provided by Controller
  onChange, // callback to update form provided by Controller
  label,
  hint,
  required,
  error,
  helperText,
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  // Internal state to manage the file/URL being displayed.
  // Initialize with the 'value' prop.
  const [currentFileUrl, setCurrentFileUrl] = useState<string | null>(
    value || null
  );
  const [currentFileName, setCurrentFileName] = useState<string | null>(null);

  // Effect to keep internal state in sync with external 'value' prop (from Controller)
  React.useEffect(() => {
    if (value !== currentFileUrl) {
      setCurrentFileUrl(value || null);
      if (value) {
        const parts = value.split("/");
        setCurrentFileName(parts[parts.length - 1]);
      } else {
        setCurrentFileName(null);
      }
    }
  }, [value, currentFileUrl]);

  const handleUploadFile = useCallback(
    async (file: File) => {
      if (!file) return;

      setUploading(true);
      setUploadError(null);
      setUploadProgress(0);

      const uniqueFileName = `${Date.now()}-${file.name}`;
      const filePath = `${folderPath}/${uniqueFileName}`;

      try {
        const { error: uploadError } = await supabaseClient.storage
          .from(bucketName)
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: true,
          });

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } = supabaseClient.storage
          .from(bucketName)
          .getPublicUrl(filePath);

        if (publicUrlData && publicUrlData.publicUrl) {
          setCurrentFileUrl(publicUrlData.publicUrl);
          setCurrentFileName(file.name);
          onChange?.(publicUrlData.publicUrl); // Call onChange provided by Controller
        } else {
          setUploadError("Failed to get public URL after upload.");
        }
      } catch (error: unknown) {
        console.error("Upload error:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setUploadError(`Upload failed: ${errorMessage}`);
        onChange?.(null); // Clear value on error via Controller
      } finally {
        setUploading(false);
        setUploadProgress(100);
      }
    },
    [bucketName, folderPath, onChange]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      handleUploadFile(event.target.files[0]);
    }
  };

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragOver(false);
      if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
        handleUploadFile(event.dataTransfer.files[0]);
      }
    },
    [handleUploadFile]
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragOver(true);
    },
    []
  );

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const handleRemoveFile = useCallback(() => {
    setCurrentFileUrl(null);
    setCurrentFileName(null);
    setUploadError(null);
    setUploadProgress(0);
    onChange?.(null); // Clear the value in the parent form via Controller
  }, [onChange]);

  return (
    <Box sx={{ mt: 2 }}>
      {label && (
        <Typography
          variant="body1"
          component="label"
          sx={{ display: "block", mb: 0.5 }}
        >
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </Typography>
      )}

      <Box
        sx={{
          border: `2px ${dragOver ? "solid" : "dashed"} ${
            error ? "red" : "grey"
          }`,
          borderRadius: 1,
          p: 3,
          textAlign: "center",
          cursor:
            uploading || (currentFileUrl && maxCount === 1)
              ? "not-allowed"
              : "pointer",
          transition: "border-color 0.2s",
          position: "relative",
          opacity: uploading ? 0.7 : 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 120,
          backgroundColor: dragOver ? "rgba(0,0,0,0.05)" : "transparent",
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {currentFileUrl && maxCount === 1 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 1,
              p: 1,
              border: "1px solid #ccc",
              borderRadius: 1,
              width: "100%",
              maxWidth: 300,
            }}
          >
            {listType === "picture" ? (
              <img
                src={currentFileUrl}
                alt="Uploaded Preview"
                style={{
                  maxWidth: 50,
                  maxHeight: 50,
                  borderRadius: 4,
                  marginRight: 8,
                  objectFit: "cover",
                }}
              />
            ) : (
              <InsertDriveFileIcon sx={{ mr: 1 }} />
            )}
            <Typography
              variant="body2"
              sx={{ flexGrow: 1, textAlign: "left", wordBreak: "break-all" }}
            >
              {currentFileName || "Uploaded File"}
            </Typography>
            <IconButton
              size="small"
              onClick={handleRemoveFile}
              disabled={uploading}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        ) : (
          <>
            {uploading ? (
              <CircularProgress size={30} />
            ) : listType === "picture" ? (
              <PhotoCameraIcon sx={{ fontSize: 40, color: "text.secondary" }} />
            ) : (
              <CloudUploadIcon sx={{ fontSize: 40, color: "text.secondary" }} />
            )}
            <Typography variant="body1" sx={{ mt: 1, color: "text.secondary" }}>
              Drag & drop an image or click to browse
            </Typography>
            <Button
              component="label"
              variant="text"
              sx={{ mt: 1 }}
              disabled={uploading || Boolean(currentFileUrl && maxCount === 1)}
            >
              Select File
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
          </>
        )}
        {hint && (
          <Typography variant="caption" sx={{ mt: 1, color: "text.secondary" }}>
            {hint}
          </Typography>
        )}
      </Box>

      {uploading && (
        <Box sx={{ width: "100%", mt: 1 }}>
          <LinearProgress variant="determinate" value={uploadProgress} />
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            uploadProgress
          )}%`}</Typography>
        </Box>
      )}

      {uploadError && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {uploadError}
        </Alert>
      )}

      {error && helperText && (
        <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
};
