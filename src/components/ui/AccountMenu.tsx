import { Logout, Settings } from '@mui/icons-material';
import KeyIcon from '@mui/icons-material/Key';
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Stack, Tooltip, Typography } from '@mui/material';
import { signOut, useSession } from 'next-auth/react'
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EmailIcon from '@mui/icons-material/Email';
import React from 'react'

const AccountMenu = () => {
  const { data: session, status} = useSession();  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [changeMyPasswordModal, setChangeMyPasswordModal] = React.useState<boolean>(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

 return (
   <React.Fragment>
     <Box
       sx={{
         display: "flex",
         alignItems: "center",
         textAlign: "center",
         flexGrow: 1,
         justifyContent: "end",
       }}
     >
       <Tooltip title="Account settings">
         <IconButton
           onClick={handleClick}
           size="small"
           sx={{ ml: 2 }}
           aria-controls={open ? "account-menu" : undefined}
           aria-haspopup="true"
           aria-expanded={open ? "true" : undefined}
         >
           <Avatar sx={{ width: 32, height: 32 }}>
             {session?.user.email[0].toUpperCase()}
           </Avatar>
         </IconButton>
       </Tooltip>
     </Box>
     <Menu
       anchorEl={anchorEl}
       id="account-menu"
       open={open}
       onClose={handleClose}
       onClick={handleClose}
       PaperProps={{
         elevation: 0,
         sx: {
           overflow: "visible",
           filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
           mt: 1.5,
           "& .MuiAvatar-root": {
             width: 72,
             height: 72,
             ml: 0,
             mr: 0,
           },
           "&:before": {
             content: '""',
             display: "block",
             position: "absolute",
             top: 0,
             right: 14,
             width: 10,
             height: 10,
             bgcolor: "background.paper",
             transform: "translateY(-50%) rotate(45deg)",
             zIndex: 0,
           },
         },
       }}
       transformOrigin={{ horizontal: "right", vertical: "top" }}
       anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
     >
       <Box sx={{ paddingX: "16px", paddingY: "6px" }}>
         <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
           <Avatar
             alt={session?.user.nombreCompleto}
             src="/gigachad.jpg"
           />
           <Typography textAlign="center" variant="button">{session?.user.roles.join(", ")}</Typography>
         </Box>
         <Typography variant="body1">
           {session?.user.nombreCompleto}
         </Typography>
         <Typography variant="body2">
           {session?.user.email}
         </Typography>
       </Box>
       <Divider />
       <MenuItem
         onClick={() => {
           handleClose();
           setChangeMyPasswordModal(!changeMyPasswordModal);
         }}
       >
         <ListItemIcon>
           <KeyIcon fontSize="small" />
         </ListItemIcon>
         Cambiar contraseña
       </MenuItem>
       <MenuItem
         onClick={() => {
           handleClose();
           signOut();
         }}
       >
         <ListItemIcon>
           <Logout fontSize="small" />
         </ListItemIcon>
         Cerrar Sesión
       </MenuItem>
     </Menu>
     {/* {changeMyPasswordModal && (
        <ChangeMyPasswordModalForm
          changeMyPasswordModal={changeMyPasswordModal}
          setChangeMyPasswordModal={setChangeMyPasswordModal}
        />
      )} */}
   </React.Fragment>
 );
}

export default AccountMenu