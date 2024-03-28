import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

const GiveAdminCard = ({ handleClickOpen }) => {
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
      </Box>
      <CardContent>
        <Typography level="title-lg">Username</Typography>
      </CardContent>
      <CardActions buttonFlex="0 1 120px">
        <Button variant="outlined" color="neutral" onClick={handleClickOpen}>
          Make Admin
        </Button>
      </CardActions>
    </Card>
  );
}

export default GiveAdminCard;