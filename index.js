const express = require('express');
const app = express();
const auth = require('./middleware/auth.js')
const cors = require('cors');
const fs = require('fs');

app.use(express.json());
app.use('*', cors());

app.use('/api', auth);
const routes = fs.readdirSync('./routes');
routes.forEach(route => {app.use('/', require('./routes/'+route))});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server is listening port ${PORT}`) 
})