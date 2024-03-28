import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function GiveAdminDialog({ open, onClose }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;
    console.log(email);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="form-dialog-title">Admin Privelege</DialogTitle>
      <DialogContent>
        <DialogContentText>Do you approve of this user to be an Admin?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Decline</Button>
        <Button type="submit">Approve</Button>
      </DialogActions>
    </Dialog>
  );
}
