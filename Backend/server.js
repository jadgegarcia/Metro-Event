const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Add this line to parse JSON bodies

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'metroevents'
});

// Login endpoint
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.query("SELECT * FROM user WHERE username = ? AND password = ?", [username, password], 
        (err, result) => {
            if(err){
                console.error('Error executing MySQL query:', err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                if(result.length > 0){
                    console.log("Successful")
                    console.log(result[0]);
                    res.json(result);
                } else {
                    res.status(401).json({ message: "Wrong username or password" });
                }
            }
        }
    );
});

// Signup endpoint
app.post("/signup", (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;

    db.query("CALL registerUser(?, ?)", [username, password],
        (err, result) => {
            if(err) {
                console.error("Error registering user:", err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                if(result.length > 0) {
                    console.log("Registration success");
                    res.json(result);
                } else {
                    res.status(401).json({ message: "All inputs must be valid" });
                }
            }
        }
    );
});

// Get allevents endpoint
app.get('/api/allevents', (req, res) => {
    const {username} = req.query;
    
    // Call the listEvents() procedure using the db connection
    db.query('CALL listEventsNotParticipantAndNotRequested(?)', [username], (error, results) => {
      if (error) {
        console.error('Error executing stored procedure:', error);
        res.status(500).json({ error: 'Error executing stored procedure' });
        return;
      }
      
      // Assuming the procedure returns a result set with event data
      const events = results[0];
  
      res.json(events);
    });
});

// Get createdevents endpoint
app.get('/api/createdevents', (req, res) => {
    const {username} = req.query;
    // Call the listEvents() procedure using the db connection
    db.query('CALL listEventsCreatedByOrganizer(?)', [username], (error, results) => {
      if (error) {
        console.error('Error executing stored procedure:', error);
        res.status(500).json({ error: 'Error executing stored procedure' });
        return;
      }
      
      // Assuming the procedure returns a result set with event data
      const events = results[0];
  
      res.json(events);
    });
});

app.get('/api/joinedevents', (req, res) => {
    const {username} = req.query;
    // Call the listEvents() procedure using the db connection
    db.query('CALL listEventsJoinedByUser(?)', [username], (error, results) => {
      if (error) {
        console.error('Error executing stored procedure:', error);
        res.status(500).json({ error: 'Error executing stored procedure' });
        return;
      } else {
        if(results > 0) {
            console.log("Joined Events");

        } else {
            console.log("No Joined events");
        }
      }
      
      // Assuming the procedure returns a result set with event data
      const events = results[0];
      console.log(events);
  
      res.json(events);
    });
});

app.get('/api/requestedevents', (req, res) => {
    const { username } = req.query;
    console.log(username)
    // Call the countUpvotes() stored procedure with the event ID
    db.query('CALL listRequestedToJoinEvents(?)', [username], (error, results) => {
        if (error) {
            console.error('Error executing stored procedure:', error);
            res.status(500).json({ error: 'Error executing stored procedure' });
            return;
        } else {
            if(results.length > 0) {
                console.log("Requested Events Successfully loaded");
            } else {
                console.log("No Requested Events");
            }
           
        }

        // Assuming the stored procedure returns a result set with upvote count
        const events = results[0];
        console.log(events);
        res.json(events);
    });
});

//Endpoint for fetching notifications
app.get('/api/notifications/:username', (req, res) => {
    const username = req.params.username;
    console.log(username);

    db.query("SELECT * FROM notification WHERE username = ?", [username], (error, results) => {
        if(error){
            console.error('Error fetching notifs:', error);
            res.status(500).json({error: 'Error fetching notifs'});
            return;
        }
        const notifications = results;
        res.json(notifications);
    });
});

//Upvote
app.get('/api/upvotecount', (req, res) => {
    const eventId = req.query.event_id;
    // Call the countUpvotes() stored procedure with the event ID
    db.query('CALL countUpvotes(?)', [eventId], (error, results) => {
        if (error) {
            console.error('Error executing stored procedure:', error);
            res.status(500).json({ error: 'Error executing stored procedure' });
            return;
        }

        // Assuming the stored procedure returns a result set with upvote count
        const upvoteCount = results[0][0].upvotes;

        res.json({ upvotes: upvoteCount });
    });
});

app.post('/api/upvoteEvent', (req, res) => {
    const eventId = req.body.event_id;
    const username = req.body.username;
    // Call the upvoteEvent stored procedure with the event ID and username
    db.query('CALL upvoteEvent(?, ?)', [eventId, username], (error, results) => {
        if (error) {
            console.error('Error executing stored procedure:', error);
            res.status(500).json({ error: 'Error executing stored procedure' });
            return;
        }

        // Assuming the stored procedure returns a message indicating success or error
        const message = results[0][0].Message;

        res.json({ message: message });
    });
});

app.post('/api/requestEventJoin', (req, res) => {
    const eventId = req.body.event_id;
    const username = req.body.username;

    // Call the requestEventJoin stored procedure with the event ID and username
    db.query('CALL requestEventJoin(?, ?)', [eventId, username], (error, results) => {
        if (error) {
            console.error('Error executing stored procedure:', error);
            res.status(500).json({ error: 'Error executing stored procedure' });
            return;
        }

        // Assuming the stored procedure returns a message indicating success or error
        const message = results[0][0].Message;

        res.json({ message: message });
    });
});

app.get('/api/requestOrganizer', (req, res) => {
    // Call the getPendingRequests() procedure using the db connection
    db.query('CALL getPendingRequests()', (error, results) => {
      if (error) {
        console.error('Error executing stored procedure:', error);
        res.status(500).json({ error: 'Error executing stored procedure' });
        return;
      }
      
      // Assuming the procedure returns a result set with event data
      const events = results[0];
  
      res.json(events);
    });
});

app.post('/api/requestToBeOrganizer', (req, res) => {
    const username = req.body.username;
    console.log(username)
    // Call the createOrganizerRequest procedure using the db connection
    db.query('CALL createOrganizerRequest(?)', [username], (error, results) => {
        if (error) {
            console.error('Error executing stored procedure:', error);
            console.info(username);
            res.status(500).json({ error: 'Error executing stored procedure' });
            return;
        }
        
        // Assuming the procedure returns a message indicating success or error
        const message = results[0][0].Message;

        res.json({ message });
    });
    // Calling the API
//     axios.post('http://localhost:8081/api/organizerrequest', { username })
//   .then(response => {
//     alert('Response:', response.data);
//     // Handle the response here
//   })
//   .catch(error => {
//     console.error('Error:', error);
//     // Handle errors here
//   });
});

app.post('/api/denyEventJoinRequest', (req, res) => {
    const request_id = req.body.request_id;
    console.log(request_id)
    // Call the denyEventJoinRequest stored procedure with the request ID and username
    db.query('CALL denyEventJoinRequest(?)', [request_id], (error, results) => {
        if (error) {
            console.error('Error executing stored procedure:', error);
            res.status(500).json({ error: 'Error executing stored procedure' });
            return;
        }

        // Assuming the stored procedure returns a message indicating success or error
        const message = results[0][0].Message;

        res.json({ message });
    });
});

app.post('/api/denyOrganizerRequest', (req, res) => {
    const request_id = req.body.request_id;
    console.log(request_id)
    // Call the denyOrganizerRequest stored procedure with the request ID and username
    db.query('CALL denyOrganizerRequest(?)', [request_id], (error, results) => {
        if (error) {
            console.error('Error executing stored procedure:', error);
            res.status(500).json({ error: 'Error executing stored procedure' });
            return;
        }

        // Assuming the stored procedure returns a message indicating success or error
        const message = results[0][0].Message;

        res.json({ message });
    });
});

app.post("/create_event", (req, res) => {
    const username = req.body.username;
    const eventname = req.body.eventname;
    const eventlocation = req.body.eventlocation;
    const eventdate = req.body.eventdate;
    // Call the createEvent stored procedure with the request ID and username
    db.query("CALL createEvent(?, ?, ?, ?)", [username, eventname, eventlocation, eventdate],
        (err, result) => {
            if(err){
                console.error("Error creating event:", err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                console.log("Event created");
                res.json(result);
            }
        });
});

app.post('/api/makeAdmin', (req, res) => {
    const username = req.body.username;
    //Calling the API
    db.query("UPDATE user SET user_type = 'Administrator' WHERE username = ?", [username], 
        (err, result) => {
            if(err){
                console.error("Error updating user type:", err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                console.log("User type updated successfully");
                res.json({ message: "User type updated successfully" });
            }
        });
    });

app.get('/api/listUser', (req, res) => {
    // Call the listUser() procedure using the db connection
    db.query('CALL listUser()', (error, results) => {
      if (error) {
        console.error('Error executing stored procedure:', error);
        res.status(500).json({ error: 'Error executing stored procedure' });
        return;
      }
      
      // Assuming the procedure returns a result set with event data
      const events = results[0];
  
      res.json(events);
    });
});

app.get('/api/listEventJoinRequests', (req, res) => {
    // Call the listUser() procedure using the db connection
    const event_id = req.query.event_id;
    db.query('CALL listEventJoinRequests(?)', [event_id], (error, results) => {
      if (error) {
        console.error('Error executing stored procedure:', error);
        res.status(500).json({ error: 'Error executing stored procedure' });
        return;
      }
      
      // Assuming the procedure returns a result set with event data
      const events = results[0];
  
      res.json(events);
    });
});

app.post('/api/acceptJoinRequest', (req, res) => {
    const {request_id} = req.query;
    console.log(request_id);
    // Call the acceptJoinRequest stored procedure with the request ID and username
    db.query('CALL acceptJoinRequest(?)', [request_id], (error, results) => {
        if (error) {
            console.error('Error executing stored procedure:', error);
            res.status(500).json({ error: 'Error executing stored procedure' });
            return;
        }

        // Assuming the stored procedure returns a message indicating success or error
        const message = results[0][0].Message;

        res.json({ message });
    });
});
app.post('/api/denyEventJoinRequest', (req, res) => {
    const {request_id} = req.query;
    console.log(request_id);
    // Call the denyEventJoinRequest stored procedure with the request ID and username
    db.query('CALL denyEventJoinRequest(?)', [request_id], (error, results) => {
        if (error) {
            console.error('Error executing stored procedure:', error);
            res.status(500).json({ error: 'Error executing stored procedure' });
            return;
        }

        // Assuming the stored procedure returns a message indicating success or error
        const message = results[0][0].Message;

        res.json({ message });
    });
});

app.get('/api/listParticipantsInEvent', (req, res) => {
    // Call the listParticipantsInEvent() procedure using the db connection
    const event_id = req.query.event_id;
    db.query('CALL listParticipantsInEvent(?)', [event_id], (error, results) => {
      if (error) {
        console.error('Error executing stored procedure:', error);
        res.status(500).json({ error: 'Error executing stored procedure' });
        return;
      }
      
      // Assuming the procedure returns a result set with event data
      const events = results[0];
  
      res.json(events);
    });
});

app.post('/api/cancelEvent', (req, res) => {
    const event_id = req.body.event_id;
  console.log(event_id)
    // Call the cancelEvent stored procedure
    db.query('CALL cancelEvent(?)', [event_id], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Internal server error' });
        throw error;
      }
      const message = results[0][0].Message;

      res.json({ message });
    });
  });

app.listen(8081, () => {
    console.log("Server listening on port 8081");
});
