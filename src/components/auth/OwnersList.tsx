import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { Typography, Container, CircularProgress, Box, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Switch } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getUsers } from '../../features/user/userActions';
import { AppDispatch } from '../../app/store';
import { selectUser } from '../../features/user/userSlice';

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

  const handleToggleActive = () => {
    if (selectedUser) {
      setSelectedUser({
        ...selectedUser,
        isActive: !selectedUser.isActive,
      });
      // Implement your update logic here
      console.log(`Toggle active status for user with ID: ${selectedUser.id}`);
    }
  };

  const columns: MRT_ColumnDef<any>[] = [
    { header: 'Owner', accessorKey: 'name' },
    { header: 'Upload', accessorKey: 'books.length' },
    { header: 'Location', accessorKey: 'location' },
    { 
      header: 'Status', 
      accessorKey: 'isActive', 
      Cell: ({ row }) => (
        <Switch
          checked={row.original.isActive}
          onChange={() => handleToggleActive()}
        />
      ) 
    },
    {
      header: 'Actions',
      accessorKey: 'actions',
      Cell: ({ row }) => (
        <Box>
          <IconButton onClick={() => handleView(row.original)} sx={{color:'#000'}}>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(row.original.id)} sx={{color:'#FF0000'}}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container sx={{ width: '100%' }}>
      <Box mt={4}>
        <MaterialReactTable columns={columns} data={users} />
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogContent sx={{padding:'40px'}}>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={selectedUser?.name || ''}
          />
          <TextField
            margin="dense"
            label="Email address"
            type="email"
            fullWidth
            value={selectedUser?.email || ''}
                        />
          <TextField
            margin="dense"
            label="Location"
            type="text"
            fullWidth
            value={selectedUser?.location || ''}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            type="text"
            fullWidth
            value={selectedUser?.phoneNumber || ''}
          />
          
        </DialogContent>
        
      </Dialog>
    </Container>
  );
};

export default OwnersList;
