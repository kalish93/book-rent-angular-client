import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { z } from "zod";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Autocomplete,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { selectBook } from "../../features/book/bookSlice";
import { createBook, getBooks, uploadBook } from "../../features/book/bookActions";
import AddBookForm from "./AddBookForm";
import smile from "../../assets/smile.png";

// Define the schema with Zod
const bookUploadSchema = z.object({
  book: z.string().nonempty("Book name is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.number().min(0.01, "Price must be at least 0.01"),
});

type BookUploadValues = z.infer<typeof bookUploadSchema>;

const BookUpload = () => {
  const [isAddBookDialogOpen, setIsAddBookDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const bookState = useSelector(selectBook);
  const { books, loading, error } = bookState;

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setFilePreview(objectUrl);

      // Clean up the object URL when the component unmounts or when the file changes
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  // Initialize Formik
  const formik = useFormik<BookUploadValues>({
    initialValues: {
      book: "", 
      quantity: 0,
      price: 0,
    },
    validate: (values) => {
      try {
        bookUploadSchema.parse(values);
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
    onSubmit: async (values) => {
      if (selectedFile) {
        // Prepare form data to send with file
        const formData = new FormData();
        formData.append('bookId', values.book);
        formData.append('quantity', values.quantity.toString());
        formData.append('price', values.price.toString());
        formData.append('coverPicture', selectedFile);

        const dataToSend = {
            bookId: values.book,
            quantity: values.quantity,
            price: values.price,
            coverPicture: selectedFile
        };
        console.log(dataToSend);
        // Dispatch action to upload book with cover
        await dispatch(uploadBook(formData)); // Type assertion as FormData cannot be inferred
        formik.resetForm();
        setSelectedFile(null);
        setFilePreview(null);
        setIsSuccessModalOpen(true); // Open success modal
      } else {
        // Handle case where no file is selected
        console.error('No cover image selected');
      }
    },
  });

  const handleBookChange = (event: any, value: any) => {
    if (value && value.id === "Add") {
      setIsAddBookDialogOpen(true);
    } else {
      formik.setFieldValue("book", value ? value.id : "");
    }
  };

  const handleAddBookFormSubmit = (values: { name: string; author: string; category: string }) => {
    console.log("New Book Added:", values);
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('author', values.author);
    formData.append('categoryId', values.category);
    const dataToSend = {
        name: values.name,
        author: values.author,
        categoryId: values.category,
    };
    dispatch(createBook(dataToSend)); // Refresh the book list
    dispatch(getBooks()); // Refresh the book list
    setIsAddBookDialogOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#fff",
        height: "86vh",
        marginTop: "20px",
        padding: "0 20%",
        borderRadius: "19px",
      }}
    >
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="div" sx={{ mb: 4, textAlign: "center" }}>
            Upload New Book
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Autocomplete
                freeSolo
                options={[...books.map((book: any) => ({ title: book.name, id: book.id })), { title: "Add", id: "Add" }]}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search book by name or Author"
                    value={formik.values.book}
                    onChange={(e) => handleBookChange(e, e.target.value)}
                    error={formik.touched.book && Boolean(formik.errors.book)}
                    helperText={formik.touched.book && formik.errors.book}
                  />
                )}
                onChange={handleBookChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Book Quantity"
                  type="number"
                  fullWidth
                  value={formik.values.quantity}
                  onChange={(e) => formik.setFieldValue("quantity", parseInt(e.target.value))}
                  error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                  helperText={formik.touched.quantity && formik.errors.quantity}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Rent price for 2 weeks"
                  type="number"
                  fullWidth
                  value={formik.values.price}
                  onChange={(e) => formik.setFieldValue("price", parseFloat(e.target.value))}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button
                variant="outlined"
                startIcon={<UploadFileIcon />}
                component="label"
                sx={{
                  border: "none",
                  marginTop: "10px",
                  color: "#00ABFF",
                }}
              >
                Upload Book Cover
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
              {filePreview && (
                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <img
                    src={filePreview}
                    alt="Selected file preview"
                    style={{ maxWidth: "200px", maxHeight: "200px", objectFit: "contain" }}
                  />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {selectedFile?.name}
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, px: 5, py: 1.5, backgroundColor: "#00ABFF" }}
                onClick={() => formik.handleSubmit()}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
        <AddBookForm
          open={isAddBookDialogOpen}
          onClose={() => setIsAddBookDialogOpen(false)}
          onSubmit={handleAddBookFormSubmit}
        />
      </Container>

      {/* Success Modal */}
      <Dialog
        open={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
      >
        <DialogContent         
        sx={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'column',
            gap:'1rem'
        }}>
        <img
          src={smile}
          alt="smile icon"
          style={{ maxWidth: "40%" }}
        />
          <Typography variant="body1" sx={{color:'rgba(0,0,0,.5)'}}>
          Your have uploaded the book successfully. Wait until we approved it.
          </Typography>
        </DialogContent>
        <DialogActions sx={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
        }}>
          <Button onClick={handleCloseSuccessModal} variant="contained"  sx={{ mt: 1, px: 5, py: 1, backgroundColor: "#00ABFF", mb:3 }}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookUpload;
