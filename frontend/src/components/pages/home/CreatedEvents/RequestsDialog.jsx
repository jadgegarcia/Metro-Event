import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const RequestsDialog = ({ open, onClose, participantsData }) => {

  const handleAccept = (participant) => {
    // Handle accept action
    console.log(`Accepted request`);
    const participantData = {
      request_id: participant.request_id, // Access username directly from participant
    };
    axios.post('http://localhost:8081/api/acceptJoinRequest', participantData)
    .then(response => {
      // Handle the response from the API
      alert(response.data.message);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleCancel = (participant) => {
    // Handle cancel action
    console.log(`Cancelled request`);
    const participantData = {
      request_id: participant.request_id, // Access username directly from participant
    };
    axios.post('http://localhost:8081/api/denyEventJoinRequest', participantData)
    .then(response => {
      // Handle the response from the API
      alert(response.data.message);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Requests</DialogTitle>
      <DialogContent>
        {participantsData.map((participant, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', border: '1px solid #ccc', paddingBottom: '12px', borderRadius: '5px', padding: '16px', margin: '14px 0' }}>
            <Typography style={{ flex: 1, marginRight: '90px' }}>
              Username: {participant.username}
            </Typography>
            <div style={{ display: 'flex', gap: '12px', marginLeft: '24px', marginTop: '6px' }}>
              <Button onClick={() => handleAccept(participant)} color="primary" variant="outlined" sx={{ minWidth: 'auto' }}>
                Accept
              </Button>
              <Button onClick={() => handleCancel(participant)} color="error" variant="outlined" sx={{ minWidth: 'auto' }}>
                Decline
              </Button>
            </div>
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestsDialog;
