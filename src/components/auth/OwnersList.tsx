// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
// import {
//   Typography,
//   Container,
//   CircularProgress,
//   Box,
//   IconButton,
//   Dialog,
//   DialogContent,
//   TextField,
//   Switch,
//   Button,
//   Avatar,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import CheckIcon from '@mui/icons-material/Check';
// import CloseIcon from '@mui/icons-material/Close';
// import { approveBookOwner, changeOwnerStatus, deleteUser, getUsers } from '../../features/user/userActions';
// import { AppDispatch } from '../../app/store';
// import { selectUser } from '../../features/user/userSlice';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { styled } from '@mui/system';
// import { BASE_URL } from '../../core/api-routes';
// import ConfirmationModal from '../common/confirmationModal';

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   isActive: boolean;
//   location: string;
//   phoneNumber: string;
//   isApprovedBookOwner: boolean;
//   books: any[];
//   profilePicture: any
// }

// // Remove the shadow from the table
// const StyledMaterialReactTable = styled(MaterialReactTable)({
//   '& .MuiTable-root': {
//     boxShadow: 'none',
//     width: '100vw',
//   },
//   '& .MuiTablePagination-root': {
//     display: 'none', // Hide pagination controls
//   },
// });

// const OwnersList = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const userState = useSelector(selectUser);
//   const { users, loading, error } = userState;
//   const [open, setOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [confirmationOpen, setConfirmationOpen] = useState(false);
//   const [userToApprove, setUserToApprove] = useState<User | null>(null);
//   const [userToDelete, setUserToDelete] = useState<User | null>(null);

//   useEffect(() => {
//     dispatch(getUsers());
//   }, [dispatch]);

//   const handleDelete = (user: User) => {
//     setUserToDelete(user);
//     setConfirmationOpen(true);
//   };

//   const handleView = (user: User) => {
//     setSelectedUser(user);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedUser(null);
//   };

//   const handleToggleActive = (user: User) => {
//     const userId = {
//       userId: user.id
//     }
//     dispatch(changeOwnerStatus(userId));
//   };


//   const handleApprove = (user: User) => {
//     setUserToApprove(user);
//     setConfirmationOpen(true);
//   };

//   const handleConfirmApprove = async () => {
//     if (userToApprove) {
//       const userId = {
//         userId: userToApprove.id
//     }

//     dispatch(approveBookOwner(userId));
//       setConfirmationOpen(false);
//       setUserToApprove(null);
//     }
//   };

//   const handleCloseConfirmation = () => {
//     setConfirmationOpen(false);
//     setUserToApprove(null);
//   };

//   const handleConfirmDelete = async () => {
//     if (userToDelete) {
      
//       dispatch(deleteUser(userToDelete.id))

//       setConfirmationOpen(false);
//       setUserToDelete(null);
//     }
//   };

//   const columns: MRT_ColumnDef<any>[] = [
//     {
//       header: 'Owner',
//       accessorKey: 'name',
//       Cell: ({ row }) => (
//         <Box display="flex" alignItems="center">
//        <Avatar
//             src={row.original?.profilePicture ? `${BASE_URL}/uploads/${row.original.profilePicture}` : ''}
//             alt={row.original.name}
//             style={{ marginRight: 8 }}
//           />  <Typography variant="body2">{row.original.name}</Typography>
//         </Box>
//       ),
//     },
//     { header: 'Upload', accessorKey: 'books.length' },
//     { header: 'Location', accessorKey: 'location' },
//     {
//       header: 'Status',
//       accessorKey: 'isActive',
//       Cell: ({ row }) => (
//         <Box display="flex" alignItems="center">
//           {row.original.isActive ? (
//             <CheckIcon style={{ color: 'green', marginRight: 8 }} />
//           ) : (
//             <CloseIcon style={{ color: 'red', marginRight: 8 }} />
//           )}
//           <Typography variant="body2" style={{ marginRight: 8 }}>
//             {row.original.isActive ? 'Active' : 'Inactive'}
//           </Typography>
//           <Switch
//             checked={row.original.isActive}
//             sx={{
//               color:'#fff'
//             }}
//             onChange={() => handleToggleActive(row.original)}
//           />
//         </Box>
//       ),
//     },
//     {
//       header: 'Actions',
//       accessorKey: 'actions',
//       Cell: ({ row }) => (
//         <Box display="flex" alignItems="center">
//           <IconButton onClick={() => handleView(row.original)} sx={{color:'black'}}>
//             <VisibilityIcon />
//           </IconButton>
//           <IconButton onClick={() => handleDelete(row.original)} color="error">
//             <DeleteIcon />
//           </IconButton>
//           {row.original.isApprovedBookOwner ?
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: '#00ABFF'
//             }}
//           >
//             Approved
//           </Button>: <Button
//             variant="contained"
//             sx={{
//               backgroundColor: '#AFAFAF'
//             }}            
//             onClick={() => handleApprove(row.original)}
//           >
//             Approve
//           </Button>
//           }

//         <ConfirmationModal
//           open={confirmationOpen}
//           onClose={handleCloseConfirmation}
//           onConfirm={userToApprove ? handleConfirmApprove : handleConfirmDelete}
//           title={userToApprove ? "Confirm Approval" : "Confirm Deletion"}
//           content={userToApprove ? "Are you sure you want to approve this user?" : "Are you sure you want to delete this user?"}
//         />
//         </Box>
//       ),
//     },
//   ];

//   const theme = createTheme({
//     components: {
//       MuiTableHead: {
//         styleOverrides: {
//           root: {
//             backgroundColor: '#f5f5f5', // Adjust the header background color if needed
//           },
//         },
//       },
//       MuiTableCell: {
//         styleOverrides: {
//           head: {
//             color: '#000', // Set the header text color to black or any other visible color
//             fontWeight: 'bold',
//           },
//         },
//       },
//     },
//   });

//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <ThemeProvider theme={theme}>
//       <Container sx={{ width: '100%' }}>
//         <Box mt={4}>
//           <StyledMaterialReactTable
//             columns={columns}
//             data={users}
//             initialState={{ showGlobalFilter: false }}
//             renderTopToolbarCustomActions={() => (
//               <Typography variant="h6" gutterBottom>
//                 List of Owners
//               </Typography>
//             )}
//             enablePagination={false}   
//             enableBottomToolbar={false}         
//             />
//         </Box>
//         <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//           <DialogContent sx={{ padding: '40px' }}>
//             <TextField
//               margin="dense"
//               label="Name"
//               type="text"
//               fullWidth
//               value={selectedUser?.name || ''}
//               InputProps={{
//                 readOnly: true,
//               }}
//             />
//             <TextField
//               margin="dense"
//               label="Email address"
//               type="email"
//               fullWidth
//               value={selectedUser?.email || ''}
//               InputProps={{
//                 readOnly: true,
//               }}
//             />
//             <TextField
//               margin="dense"
//               label="Location"
//               type="text"
//               fullWidth
//               value={selectedUser?.location || ''}
//               InputProps={{
//                 readOnly: true,
//               }}
//             />
//             <TextField
//               margin="dense"
//               label="Phone Number"
//               type="text"
//               fullWidth
//               value={selectedUser?.phoneNumber || ''}
//               InputProps={{
//                 readOnly: true,
//               }}
//             />
//           </DialogContent>
//         </Dialog>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default OwnersList;
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
  Avatar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { approveBookOwner, changeOwnerStatus, deleteUser, getUsers } from '../../features/user/userActions';
import { AppDispatch } from '../../app/store';
import { selectUser } from '../../features/user/userSlice';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';
import { BASE_URL } from '../../core/api-routes';
import ConfirmationModal from '../common/confirmationModal';

interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  location: string;
  phoneNumber: string;
  isApprovedBookOwner: boolean;
  books: any[];
  profilePicture: any
}

// Remove the shadow from the table
const StyledMaterialReactTable = styled(MaterialReactTable)({
  '& .MuiTable-root': {
    boxShadow: 'none',
    width: '100%',
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
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [userToApprove, setUserToApprove] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setConfirmationOpen(true);
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
    const userId = {
      userId: user.id
    }
    dispatch(changeOwnerStatus(userId));
  };

  const handleApprove = (user: User) => {
    setUserToApprove(user);
    setConfirmationOpen(true);
  };

  const handleConfirmApprove = async () => {
    if (userToApprove) {
      const userId = {
        userId: userToApprove.id
      }

      dispatch(approveBookOwner(userId));
      setConfirmationOpen(false);
      setUserToApprove(null);
    }
  };

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
    setUserToApprove(null);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      dispatch(deleteUser(userToDelete.id))
      setConfirmationOpen(false);
      setUserToDelete(null);
    }
  };

  const columns: MRT_ColumnDef<any>[] = [
    {
      header: 'Owner',
      accessorKey: 'name',
      Cell: ({ row }) => (
        <Box display="flex" alignItems="center">
          <Avatar
            src={row.original?.profilePicture ? `${BASE_URL}/uploads/${row.original.profilePicture}` : ''}
            alt={row.original.name}
            style={{ marginRight: 8 }}
          />  
          <Typography variant="body2">{row.original.name}</Typography>
        </Box>
      ),
    },
    { header: 'Upload', accessorKey: 'books.length' },
    { header: 'Location', accessorKey: 'location' },
    {
      header: 'Status',
      accessorKey: 'isActive',
      Cell: ({ row }) => (
        <Box display="flex" alignItems="center" justifyContent='center' sx={{backgroundColor:'#0080001A', padding:'.3rem .7rem', borderRadius:'1rem'}}>
          {row.original.isActive ? (
            <CheckIcon style={{ color: 'green', marginRight: 8 }} />
          ) : (
            <CloseIcon style={{ color: 'red', marginRight: 8 }} />
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
          <IconButton onClick={() => handleView(row.original)} sx={{ color: 'black' }}>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(row.original)} color="error">
            <DeleteIcon />
          </IconButton>
          {row.original.isApprovedBookOwner ?
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#00ABFF',
                marginLeft: '8px',
                textTransform: 'none'
              }}
            >
              Approved
            </Button> : 
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#AFAFAF',
                marginLeft: '8px',
                textTransform: 'none'
              }}
              onClick={() => handleApprove(row.original)}
            >
              Approve
            </Button>
          }
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
        <ConfirmationModal
          open={confirmationOpen}
          onClose={handleCloseConfirmation}
          onConfirm={userToApprove ? handleConfirmApprove : handleConfirmDelete}
          title={userToApprove ? "Confirm Approval" : "Confirm Deletion"}
          content={userToApprove ? "Are you sure you want to approve this user?" : "Are you sure you want to delete this user?"}
        />
      </Container>
    </ThemeProvider>
  );
};

export default OwnersList;
