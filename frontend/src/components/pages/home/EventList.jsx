import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AllEventCard from './AllEvents/AllEventCard';
import JoinedEventCard from './JoinedEvents/JoinedEventCard';
import CreatedEventCard from './CreatedEvents/CreatedEventCard';
import RequestedEventCard from './AllEvents/RequestedEventCard';
import RequestOrganizerCard from './AdminOrganizer/RequestOrganizerCard';
import GiveAdminCard from './AdminUsers/GiveAdminCard';
// import FormDialog from '././CreatedEventCard
import IconBreadcrumbs from '../user/IconBreadcrumbs';
// import BasicButtons from '../common/BasicButtons';
import { useEffect } from 'react';
import axios from 'axios';

import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


const EventList = () => {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [requested, setRequestedEvents] = useState([]);
  const [requestOrganizer, setRequestOrganizer] = useState([]);
  const [giveAdmin, setGiveAdmin] = useState([]);
  
  //REDUX
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const username = useSelector(state => state.auth.username);
  const op = useSelector(state => state.event.eventOption);
  const type = useSelector(state => state.auth.userType);


  useEffect(() => {
    console.log("This is the option = " + op);
    if((op === 1 || op === 0) && type !== "admin") {
      // Fetch events from API // allevents
      axios.get('http://localhost:8081/api/allevents', { params: {username: username} })
      .then(response => {
        // Set the events state with the fetched data
        setEvents(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
    } else if(op === 3) {
      axios.get('http://localhost:8081/api/createdevents', { params: {username: username} })
      .then(response => {
        // Set the events state with the fetched data
        setCreatedEvents(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
    } else if(op === 2) {
      axios.get('http://localhost:8081/api/joinedevents', { params: {username: username} })
      .then(response => {
        // Set the events state with the fetched data
        setJoinedEvents(response.data);
        console.log("Joined Events ni ")
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
    } else if(op === 4) {
      axios.get('http://localhost:8081/api/requestedevents', { params: {username: username} })
      .then(response => {
        // Set the events state with the fetched data

        setRequestedEvents(response.data);
        console.log("Requested data ni"); 
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
    } else if(op === 5) {
      // Fetch events from API
      axios.get('http://localhost:8081/api/requestOrganizer')
      .then(response => {
        // Set the events state with the fetched data
        setRequestOrganizer(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
    } else if((op === 0 || op === 6) && type === "admin") {
      axios.get('http://localhost:8081/api/listUser')
      .then(response => {
        // Set the events state with the fetched data
        setGiveAdmin(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
    }

  }, [op]); // Empty dependency array ensures the effect runs only once on component mount
  
  return (
    <div className='eventlist-container'>
      <Box sx={{ flexGrow: 1 }}>
        {/* <Grid container sx={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
        <IconBreadcrumbs />
        <FormDialog />
        </Grid> */}
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 13 }} sx={{ justifyContent: 'center',  }}>
          
          {/* ALL EVENTS */}
          {(op === 1 || op === 0) && type !== 'admin' && (
            events.map((event, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <AllEventCard eventDetails={event} user={username} />
              </Grid>
            ))
          )}

          {/* JOIN EVENTS */}
          {op === 2 && (
            joinedEvents.map((event, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <JoinedEventCard eventDetails={event} user={username}/>
              </Grid>
            ))
          )}
              
          {/* CREATED EVENTS */}
          {op === 3 && (
            createdEvents.map((event, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <CreatedEventCard eventDetails={event} user={username} />
              </Grid>
            ))
          )}

          {/* REQUESTED EVENTS */}
          {/* {(op === 4) && (
            requestedEvents.map((event, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <RequestedEventCard eventDetails={event} user={username} />
              </Grid>
            ))
          ) } */}
          {op === 4 && (
              requested.map((event, index) => (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                      <RequestedEventCard eventDetails={event} user={username} />
                  </Grid>
              ))
          )}

          {op === 5 && (
            requestOrganizer.map(event => (
              <Grid item xs={2} sm={4} md={4} key={event.event_id}>
                <RequestOrganizerCard requestDetails={event} />
              </Grid>
            ))
          )}

          {(op === 6 || op === 0) && type === 'admin' && (
            giveAdmin.map((event, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <GiveAdminCard userDetails={event} />
              </Grid>
            ))
          )}
          
        </Grid>
      </Box>
    </div>
  );
}

export default EventList;