import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import EventCard from './EventCard';
import IconBreadcrumbs from '../user/IconBreadcrumbs';
// import FormDialog from './EventFormDialog';
// import BasicButtons from '../common/BasicButtons';

const EventList = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container sx={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
      <IconBreadcrumbs/>
      {/* <FormDialog /> */}
    </Grid>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 13 }} sx={{ justifyContent: 'center',  }}>
        {Array.from(Array(9)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <EventCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default EventList;