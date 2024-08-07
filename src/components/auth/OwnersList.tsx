import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import {
  Typography,
  Container,
  CircularProgress,
  Box,
  IconButton,
  Dialog,
  DialogContent,
  TextField,
  Switch,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { getUsers } from '../../features/user/userActions';
import { AppDispatch } from '../../app/store';
import { selectUser } from '../../features/user/userSlice';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  location: string;
  phoneNumber: string;
  isApprovedBookOwner: boolean;
  books: any[];
}

// Remove the shadow from the table
const StyledMaterialReactTable = styled(MaterialReactTable)({
  '& .MuiTable-root': {
    boxShadow: 'none',
    width: '100vw',
  },
  '& .MuiTablePagination-root': {
    display: 'none', // Hide pagination controls
  },
});

const OwnersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userState = useSelector(selectUser);
  const { users, loading, error } = userState;
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    // Implement your delete logic here
    console.log(`Delete user with ID: ${id}`);
  };

  const handleView = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleToggleActive = (user: User) => {
    // Implement your update logic here
    console.log(`Toggle active status for user with ID: ${user.id}`);
  };

  const handleApprove = (user: User) => {
    // Implement your approve logic here
    console.log(`Approve user with ID: ${user.id}`);
  };

  const columns: MRT_ColumnDef<any>[] = [
    { header: 'Owner', accessorKey: 'name' },
    { header: 'Upload', accessorKey: 'books.length' },
    { header: 'Location', accessorKey: 'location' },
    {
      header: 'Status',
      accessorKey: 'isActive',
      Cell: ({ row }) => (
        <Box display="flex" alignItems="center">
          {row.original.isActive ? (
            <CheckIcon style={{ color: 'green', marginRight: 8 }} />
          ) : (
            <CancelIcon style={{ color: 'red', marginRight: 8 }} />
          )}
          <Typography variant="body2" style={{ marginRight: 8 }}>
            {row.original.isActive ? 'Active' : 'Inactive'}
          </Typography>
          <Switch
            checked={row.original.isActive}
            onChange={() => handleToggleActive(row.original)}
          />
        </Box>
      ),
    },
    {
      header: 'Actions',
      accessorKey: 'actions',
      Cell: ({ row }) => (
        <Box display="flex" alignItems="center">
          <IconButton onClick={() => handleView(row.original)} color="primary">
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(row.original.id)} color="error">
            <DeleteIcon />
          </IconButton>
          <Button
            variant="contained"
            color={row.original.isApprovedBookOwner ? 'success' : 'primary'}
            onClick={() => handleApprove(row.original)}
          >
            {row.original.isApprovedBookOwner ? 'Approved' : 'Approve'}
          </Button>
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
            data={users}
            initialState={{ showGlobalFilter: false }}
            renderTopToolbarCustomActions={() => (
              <Typography variant="h6" gutterBottom>
                List of Owners
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
              label="Name"
              type="text"
              fullWidth
              value={selectedUser?.name || ''}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              margin="dense"
              label="Email address"
              type="email"
              fullWidth
              value={selectedUser?.email || ''}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              margin="dense"
              label="Location"
              type="text"
              fullWidth
              value={selectedUser?.location || ''}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              margin="dense"
              label="Phone Number"
              type="text"
              fullWidth
              value={selectedUser?.phoneNumber || ''}
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

export default OwnersList;
