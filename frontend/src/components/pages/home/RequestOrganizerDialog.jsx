import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from '@mui/material';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function RequestOrganizerDialog() {
  const [open, setOpen] = React.useState(true);
  const [sendRequest, setSendRequest] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  // const [user, setUser] = React.useState(location.state?.username || '');
  const user = useSelector(state => state.auth.username);


  const handleSendRequest = () => {
    // Handle accept action
    console.log(`Accepted request`);
    console.log("mao ni ang user " + user);
    const participantData = {
      username: user // Access username directly from participant
    };
    axios.post('http://localhost:8081/api/requestToBeOrganizer', {
      username: user
    })
    .then(response => {
      // Handle the response from the API
      alert(response.data.message);
      console.info(user)
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("NI ari na sya");
    navigate('..');
    setOpen(false);
    
  };

  return (
    <React.Fragment>
      {/* <Link onClick={handleClickOpen} style={{ cursor: 'pointer', color: 'black', textDecoration: 'none' }}>
        Request to be an Organizer
      </Link> */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Send Request</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Would you like to send a request to be an organizer?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {handleClose()}}>Back</Button>
          <Button type="submit" onClick={() => {handleSendRequest()}}>Request</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}