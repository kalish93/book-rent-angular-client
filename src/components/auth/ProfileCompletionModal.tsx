import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { z } from "zod";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
} from "@mui/material";

// Define the schema with Zod
const validationSchema = z.object({
  name: z.string().nonempty("Name is required"),
  profilePicture: z.instanceof(File).optional(),
});

type ValidationSchema = z.infer<typeof validationSchema>;

interface ProfileCompletionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: ValidationSchema) => void;
}

const ProfileCompletionModal: React.FC<ProfileCompletionModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const formik = useFormik<ValidationSchema>({
    initialValues: {
      name: "",
      profilePicture: undefined,
    },
    validate: (values) => {
      try {
        validationSchema.parse(values);
        return {}; // No errors
      } catch (err) {
        if (err instanceof z.ZodError) {
          const errors: { [key: string]: string } = {};
          err.errors.forEach((error) => {
            if (error.path.length) {
              errors[error.path[0] as string] = error.message;
            }
          });
          return errors;
        }
        return {};
      }
    },
    onSubmit: (values) => {
      onSubmit(values);
      onClose();
    },
  });

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      formik.setFieldValue("profilePicture", event.currentTarget.files[0]);
      const objectUrl = URL.createObjectURL(event.currentTarget.files[0]);
      setFilePreview(objectUrl);

      // Clean up the object URL when the component unmounts or when the file changes
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Complete Your Profile</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
            />
            <FormHelperText error>
              {formik.touched.name && formik.errors.name}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <input
              id="profilePicture"
              name="profilePicture"
              type="file"
              onChange={handleProfilePictureChange}
              onBlur={formik.handleBlur}
            />
            <FormHelperText error>
              {formik.touched.profilePicture && formik.errors.profilePicture}
            </FormHelperText>
            {filePreview && (
              <img
                src={filePreview}
                alt="Profile Preview"
                style={{ marginTop: "10px", maxWidth: "100%" }}
              />
            )}
          </FormControl>
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileCompletionModal;
