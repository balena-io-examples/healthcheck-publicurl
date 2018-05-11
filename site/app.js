const express = require('express')
const app = express()
const path = require('path');

const PORT = process.env.PORT || 8080;
var HEALTHY = true;
const STARTTIME = Date.now()

// Send the displayed page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

// Return the status and the time the service has started
app.get('/status', (req, res) => {
    var status = { starttime: STARTTIME }

    if (HEALTHY) {
        status.status = 'OK';
    } else {
        status.status = 'BROKEN';
        res.status(503);
    }
    res.send(status);
})

// Break the service if this endpoint is called
app.get('/break_things', (req, res) => {
    console.log("Got broken...");
    HEALTHY = false;
    res.send('Done, you happy?');
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Started on port ${PORT}`)
})
