let Data = require('./Data.json');
const express = require('express');
const app = express();

const PORT = 4000;

app.get('/tasks/', (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
    });
    res.send(Data);

})

app.listen(PORT, () => {
    console.log(`Server is listening port ${PORT}`)
})