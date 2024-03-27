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

app.listen(8081, () => {
    console.log("Server listening on port 8081");
});