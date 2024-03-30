import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const PartcipantsDialog = ({ open, onClose, participantsData }) => {

  if (!participantsData) {
    return null; 
  }

  // Check if participantsData is an array
  if (!Array.isArray(participantsData)) {
    return null; 
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Requests</DialogTitle>
      <DialogContent>
        {participantsData && participantsData.map((participant, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', border: '1px solid #ccc', paddingBottom: '12px', borderRadius: '5px', padding: '16px', margin: '14px 0' }}>
            <Typography style={{ flex: 1, marginRight: '90px' }}>
              Username: {participant.username}
            </Typography>
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

export default PartcipantsDialog;
