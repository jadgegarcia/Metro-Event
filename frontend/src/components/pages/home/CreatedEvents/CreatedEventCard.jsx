import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

const CreatedEventCard = ({ handleClickOpen }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 360,
        // to make the card resizable
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
        <Typography level="title-lg">NYC Event</Typography>
        <Typography level="body-sm">
          We are a community of developers prepping for coding interviews,
          participate, chat with others and get better at interviewing.
          Sponsored by Zabdiel.
        </Typography>
      </CardContent>
      <CardActions buttonFlex="0 1 120px">
        <IconButton variant="outlined" color="neutral" sx={{ mr: 'auto' }}>
          <FavoriteBorder />
          69
        </IconButton>
        <Button variant="outlined" color="neutral" onClick={handleClickOpen}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}

export default CreatedEventCard;