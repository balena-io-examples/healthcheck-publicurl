const express = require('express')
const app = express()
const path = require('path');

const PORT = process.env.PORT || 80;
var HEALTHY = true;
const STARTTIME = Date.now()

app.get('/break_things', (req, res) => {
    HEALTHY = false;
    res.send('Done, you happy?');
})

app.get('/status', (req, res) => {
    var status = { starttime: STARTTIME }

    if (HEALTHY) {
        status.status = 'OK';
    } else {
        status.status = 'BROKEN';
        res.status(500);
    }
    res.send(status);
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(PORT, () => {
    console.log(`Started on port ${PORT}`)
})
