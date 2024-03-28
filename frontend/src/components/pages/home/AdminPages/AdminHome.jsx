import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ApproveOrganizerCard from './AdminOrganizers/ApproveOrganizerCard';
import ApproveOrganizerDialog  from './AdminOrganizers/ApproveOrganizerDialog';
import GiveAdminCard from './AdminUsers/GiveAdminCard';
import GiveAdminDialog from './AdminUsers/GiveAdminDialog';
import AdminBreadcrumbs from '../admin/AdminBreadcrumbs';
import { useEffect } from 'react';

const AdminHome = () => {
  const [open, setOpen] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container sx={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
        <IconBreadcrumbs />
      </Grid>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 13 }} sx={{ justifyContent: 'center',  }}>
        {/* {events.map(event => ( */}
          <Grid item xs={2} sm={4} md={4} key={event.event_id}>
            <ApproveEventCard handleClickOpen={handleClickOpen} eventDetails={event} />
            <ApproveEventDialog open={open} onClose={handleClose} />
          </Grid>
        {/* ))} */}

        {/* {events.map(event => ( */}
          {/* <Grid item xs={2} sm={4} md={4} >
            <GiveAdminCard handleClickOpen={handleClickOpen} />
            <GiveAdminDialog open={open} onClose={handleClose} />
          </Grid> */}
        {/* ))} */}
      </Grid>
    </Box>
  );
}

export default AdminHome;