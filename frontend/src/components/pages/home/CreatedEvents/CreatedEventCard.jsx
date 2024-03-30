import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ParticipantsDialog from './ParticipantsDialog'; // Assuming you'll create this component
import RequestDialog from './RequestsDialog'; // Assuming you'll create this component
import CancelDialog from './CancelDialog';
import axios from 'axios';
import { useState, useEffect } from 'react';


const CreatedEventCard = ({ eventDetails }) => {
  const { event_id, event_date, event_location, event_name, event_organizer, event_status } = eventDetails;
  const date = new Date(event_date);
  const formattedDate = date.toLocaleDateString(); // Format the date as a string
  const [openParticipantsDialog, setOpenParticipantsDialog] = React.useState(false);
  const [openRequestDialog, setOpenRequestDialog] = React.useState(false);
  const [participantsData, setParticipantsData] = React.useState(null);

  const handleParticipantsDialogOpen = () => {
    const requestData = {
      event_id: event_id, 
    };
    axios.get('http://localhost:8081/api/listParticipantsInEvent', requestData)
    .then(response => {
<<<<<<< HEAD
      // Check if participants data is null
      if (Object.keys(response.data).length > 0) {
        setParticipantsData(response.data);
        setOpenParticipantsDialog(true);
      } else {
        // Participants data is null, display an alert message
        alert('There are currently no participants in the event.');
      }
=======
      // Handle the response from the API
      setParticipantsData(response.data);
      console.info(Object.keys(response.data).length)
      if(Object.keys(response.data).length > 0)
        setOpenParticipantsDialog(true);
>>>>>>> 7bd16f659912d8a1fd4fd91ec9fd01b5ab91a7e2
    })
  };

  const handleParticipantsDialogClose = () => {
    setOpenParticipantsDialog(false);
  };

  const handleRequestDialogOpen = () => {
    const requestData = {
      event_id: event_id, 
    };
    axios.get('http://localhost:8081/api/listEventJoinRequests', requestData)
    .then(response => {
<<<<<<< HEAD
      // Check if participants data is null
      if (Object.keys(response.data).length > 0) {
        setOpenRequestDialog(response.data);
        openRequestDialog(true);
      } else {
        // Participants data is null, display an alert message
        alert('There are currently no participants who wish to join the event.');
      }
=======
      // Handle the response from the API
      setParticipantsData(response.data);
      if(Object.keys(response.data).length > 0)
        setOpenRequestDialog(true);
      console.log(setParticipantsData);
>>>>>>> 7bd16f659912d8a1fd4fd91ec9fd01b5ab91a7e2
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleRequestDialogClose = () => {
    setOpenRequestDialog(false);
  };


  return (
    <Card
      variant="outlined"
      sx={{
        width: '350px',
        overflow: 'auto',
        height: '300px',
        marginLeft: '10px',
      }}
    >
      <Box
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Avatar src="./josiah.png" size="lg" />
      </Box>
      <CardContent>
        <Typography level="title-lg">{event_name}</Typography>
          <Typography level="body-sm">
            Event ID: {event_id}
          </Typography>
          <Typography level="body-sm">
            Date: {formattedDate}
          </Typography>
          <Typography level="body-sm">
            Location: {event_location}
          </Typography>
          <Typography level="body-sm">
            Organizer: {event_organizer}
          </Typography>
          <Typography level="body-sm">
           Status: {event_status}
          </Typography>
      </CardContent>
      <CardActions buttonFlex="0 1 120px">
        {event_status !== 'Cancelled' && (
          <>
            <IconButton variant="outlined" color="neutral" sx={{ mr: 'auto' }}>
             <FavoriteBorder />
            </IconButton>
<<<<<<< HEAD
            <Button variant="solid" color="primary" size='small' onClick={handleRequestDialogOpen}>
              Requests
            </Button>
            <Button variant="solid" color="primary" size='small' onClick={handleParticipantsDialogOpen}>
=======
            <Button variant="solid" color="primary" onClick={handleRequestDialogOpen}>
              Requests
            </Button>
            <Button variant="solid" color="primary" onClick={handleParticipantsDialogOpen}>
>>>>>>> 7bd16f659912d8a1fd4fd91ec9fd01b5ab91a7e2
              Participants
            </Button>
            <CancelDialog eventDetails={eventDetails}/>
          </>
        )}
      </CardActions>

      <ParticipantsDialog open={openParticipantsDialog} onClose={handleParticipantsDialogClose} participantsData={participantsData} />
      <RequestDialog open={openRequestDialog} onClose={handleRequestDialogClose} participantsData={participantsData} />
      
    </Card>
  );
}

export default CreatedEventCard;
