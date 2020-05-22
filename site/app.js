const fs = require('fs');
const _ = require('lodash');
const express = require('express')
const app = express()
const path = require('path');

const DATAFILE = '/data/count.json';
const PORT = process.env.PORT || 8080;
var HEALTHY = true;
const STARTTIME = Date.now()

let count;
try {
    count = JSON.parse(fs.readFileSync(DATAFILE, 'utf8'))
} catch (e) {
    console.log("An error occurred while reading.");
}

if (count == null || count == undefined || ! _.includes(_.keys(count), 'count')) {
    count = { count: 0 }
}

console.log(`initialized with count of ${count.count}`);

// Send the displayed page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

// Return the status and the time the service has started
app.get('/status', (req, res) => {
    var status = { starttime: STARTTIME, restarts: count.count }

    if (HEALTHY) {
        status.status = `OK`;
    } else {
        status.status = 'BROKEN';
        res.status(503);
    }
    res.send(status);
})

// Break the service if this endpoint is called
app.get('/break_things', (req, res) => {
    count.count += 1;
    fs.writeFileSync(DATAFILE, JSON.stringify(count), 'utf8', function (err) {
        if (err) {
            console.log("An error occurred while writing count.");
            return console.log(err);
        }
    });
    console.log("Got broken...");
    HEALTHY = false;
    res.send('Done, you happy?');
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Started on port ${PORT}`)
})
