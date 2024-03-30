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
      // Handle the response from the API
      setParticipantsData(response.data);
      console.info(Object.keys(response.data).length)
      if(Object.keys(response.data).length > 0)
        setOpenParticipantsDialog(true);
    })
    .catch(error => {
      console.error('Error:', error);
    });
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
      // Handle the response from the API
      setParticipantsData(response.data);
      if(Object.keys(response.data).length > 0)
        setOpenRequestDialog(true);
      console.log(setParticipantsData);
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
        width: 400,
        overflow: 'auto',
        resize: 'horizontal',
      }}
    >
      <Box
        sx={{
          display: 'flex',
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
            <Button variant="solid" color="primary" onClick={handleRequestDialogOpen}>
              Requests
            </Button>
            <Button variant="solid" color="primary" onClick={handleParticipantsDialogOpen}>
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
