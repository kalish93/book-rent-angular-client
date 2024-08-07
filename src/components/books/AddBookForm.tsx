import React, { useEffect } from "react";
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
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { selectBook } from "../../features/book/bookSlice";
import { getCategories } from "../../features/book/bookActions";

// Define the schema with Zod
const validationSchema = z.object({
  name: z.string().nonempty("Name is required"),
  author: z.string().nonempty("Author is required"),
  category: z.string().nonempty("Category is required"),
});

type ValidationSchema = z.infer<typeof validationSchema>;

interface AddBookFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: ValidationSchema) => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ open, onClose, onSubmit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const bookState = useSelector(selectBook);
  const { categories } = bookState;

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const formik = useFormik<ValidationSchema>({
    initialValues: {
      name: "",
      author: "",
      category: "",
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

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Book</DialogTitle>
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
            <TextField
              label="Author"
              name="author"
              value={formik.values.author}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.author && Boolean(formik.errors.author)}
            />
            <FormHelperText error>
              {formik.touched.author && formik.errors.author}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.category && Boolean(formik.errors.category)}
            >
              {categories.map((category: any) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error>
              {formik.touched.category && formik.errors.category}
            </FormHelperText>
          </FormControl>
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookForm;
