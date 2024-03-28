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
                    res.json(result);
                } else {
                    res.status(401).json({ message: "Wrong username or password" });
                }
            }
        }
    );
});

// Get events endpoint
app.get('/api/events', (req, res) => {
    // Call the listEvents() procedure using the db connection
    db.query('CALL listEvents()', (error, results) => {
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

// Signup endpoint
app.post("/signup", (req, res) => {
    const firstname = req.body.firstname;
    const password = req.body.password;

    db.query("CALL registerUser(?, ?)", [firstname, password],
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

//Endpoint for creating events
app.post("/create_event", (req, res) => {
    const username = req.body.username;
    const eventname = req.body.eventname;
    const eventlocation = req.body.eventlocation;
    const eventdate = req.body.eventdate;

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

app.listen(8081, () => {
    console.log("Server listening on port 8081");
});
