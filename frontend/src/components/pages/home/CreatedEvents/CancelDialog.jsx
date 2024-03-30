import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function CancelDialog( {eventDetails} ) {
  const { event_id, event_name } = eventDetails;
  const [open, setOpen] = React.useState(false);

  const handleCancelButton = () => {
    console.log(`Accepted request`);
    const eventData = {
      event_id: event_id, // Access username directly from participant
    };
    axios.post('http://localhost:8081/api/cancelEvent', eventData)
    .then(response => {
      // Handle the response from the API
      alert(response.data.message);
      setOpen(false);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Cancel
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Cancel Registration</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel the {event_name} event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleCancelButton} autoFocus>
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
