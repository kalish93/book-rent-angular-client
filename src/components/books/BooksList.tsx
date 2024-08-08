import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import {
  Typography,
  Container,
  CircularProgress,
  Box,
  Dialog,
  DialogContent,
  TextField,
  Switch,
  Avatar,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { changeBookStatus, getAllUploadedBooks } from '../../features/book/bookActions'; 
import { AppDispatch } from '../../app/store';
import { selectBook } from '../../features/book/bookSlice';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';
import { BASE_URL } from '../../core/api-routes';

const StyledMaterialReactTable = styled(MaterialReactTable)({
  '& .MuiTable-root': {
    boxShadow: 'none',
    width: '100vw',
  },
  '& .MuiTablePagination-root': {
    display: 'none', 
  },
});

const BooksList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const bookState = useSelector(selectBook);
  const { uploadedBooks, loading, error } = bookState;
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);

  useEffect(() => {
    dispatch(getAllUploadedBooks());
  }, [dispatch]);

  const handleClose = () => {
    setOpen(false);
    setSelectedBook(null);
  };

  const handleToggleStatus = (book: any) => {
    const bookId = {
        bookId: book.id
    }

    dispatch(changeBookStatus(bookId));
  };

  const columns: MRT_ColumnDef<any>[] = [
    {
      header: 'Author',
      accessorKey: 'book.author',
    },
    {
      header: 'Owner',
      accessorKey: 'user',
      Cell: ({ row }) => (
        <Box display="flex" alignItems="center">
       <Avatar
            src={row.original.user?.profilePicture ? `${BASE_URL}/uploads/${row.original.user.profilePicture}` : ''}
            alt={row.original.user?.name}
            style={{ marginRight: 8 }}
          />  <Typography variant="body2">{row.original.user?.name}</Typography>
        </Box>
      ),
    },
    { header: 'Category', accessorKey: 'book.category.name' },
    { header: 'Book Name', accessorKey: 'book.name' },
    {
      header: 'Status',
      accessorKey: 'isApproved',
      Cell: ({ row }) => (
        <Box display="flex" alignItems="center" justifyContent='center' sx={{backgroundColor:'#0080001A', padding:'.3rem .7rem', borderRadius:'1rem'}}>
          {row.original.isApproved ? (
            <CheckIcon style={{ color: 'green', marginRight: 8 }} />
          ) : (
            <CloseIcon style={{ color: 'red', marginRight: 8 }} />
          )}
          <Typography variant="body2" style={{ marginRight: 8 }}>
            {row.original.isApproved ? 'Active' : 'Inactive'}
          </Typography>
          
          <Switch
            checked={row.original.isApproved}
            onChange={() => handleToggleStatus(row.original)}
          />
        </Box>
      ),
    },
    
  ];

  const theme = createTheme({
    components: {
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: '#f5f5f5', // Adjust the header background color if needed
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            color: '#000', // Set the header text color to black or any other visible color
            fontWeight: 'bold',
          },
        },
      },
    },
  });

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ width: '100%' }}>
        <Box mt={4}>
          <StyledMaterialReactTable
            columns={columns}
            data={uploadedBooks}
            initialState={{ showGlobalFilter: false }}
            renderTopToolbarCustomActions={() => (
              <Typography variant="h6" gutterBottom>
                List of Books
              </Typography>
            )}
            enablePagination={false}
            enableBottomToolbar={false}
          />
        </Box>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogContent sx={{ padding: '40px' }}>
            <TextField
              margin="dense"
              label="Author"
              type="text"
              fullWidth
              value={selectedBook?.author || ''}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              margin="dense"
              label="Book Name"
              type="text"
              fullWidth
              value={selectedBook?.name || ''}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              margin="dense"
              label="Category"
              type="text"
              fullWidth
              value={selectedBook?.category || ''}
              InputProps={{
                readOnly: true,
              }}
            />
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default BooksList;
