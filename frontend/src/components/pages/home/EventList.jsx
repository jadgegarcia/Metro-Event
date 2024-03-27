import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AllEventCard from './AllEvents/AllEventCard';
import JoinEventDialog  from './AllEvents/JoinEventDialog';
import JoinedEventCard from './JoinedEvents/JoinedEventCard';
import CreatedEventCard from './CreatedEvents/CreatedEventCard';
import CancelEventDialog from './CreatedEvents/CancelEventDialog';
// import FormDialog from '././CreatedEventCard
import IconBreadcrumbs from '../IconBreadcrumbs';
// import BasicButtons from '../common/BasicButtons';

const EventList = () => {
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
      {/* <FormDialog /> */}
    </Grid>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 13 }} sx={{ justifyContent: 'center',  }}>
        {Array.from(Array(3)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <AllEventCard handleClickOpen={handleClickOpen} />
            <JoinEventDialog open={open} onClose={handleClose} />

            <JoinedEventCard />

            <CreatedEventCard handleClickOpen={handleClickOpen} />
            <CancelEventDialog open={open} onClose={handleClose} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default EventList;