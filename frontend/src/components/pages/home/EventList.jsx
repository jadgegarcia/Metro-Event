import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AllEventCard from './AllEvents/AllEventCard';
import JoinEventDialog  from './AllEvents/JoinEventDialog';
import JoinedEventCard from './JoinedEvents/JoinedEventCard';
import CreatedEventCard from './CreatedEvents/CreatedEventCard';
import CancelEventDialog from './CreatedEvents/CancelEventDialog';
// import FormDialog from '././CreatedEventCard
import IconBreadcrumbs from '../user/IconBreadcrumbs';
// import BasicButtons from '../common/BasicButtons';
import { useEffect } from 'react';
import axios from 'axios';

const EventList = () => {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from API
    axios.get('http://localhost:8081/api/events')
      .then(response => {
        // Set the events state with the fetched data
        setEvents(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on component mount
  
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

        {/* {events.map(event => (
          <Grid item xs={2} sm={4} md={4} key={event.event_id}>
            <EventCard eventDetails={event}/>
          </Grid>
        ))} */}


        {events.map(event => (
          <Grid item xs={2} sm={4} md={4} key={event.event_id}>
            <AllEventCard handleClickOpen={handleClickOpen} eventDetails={event} />
            <JoinEventDialog open={open} onClose={handleClose} />
          </Grid>
        ))}

            {/* <JoinedEventCard />

            <CreatedEventCard handleClickOpen={handleClickOpen} />
            <CancelEventDialog open={open} onClose={handleClose} /> */}

      </Grid>
    </Box>
  );
}

export default EventList;