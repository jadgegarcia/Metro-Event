import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import EventList from './EventList';
import EventDetail from './EventDetail';

const EventContainer = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth={false} style={{ marginTop: '20px', marginBottom: '20px' }}>
        <EventList />
        {/* <EventDetail /> */}
      </Container>
    </React.Fragment>
  );
}

export default EventContainer;