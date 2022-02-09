const express = require('express');
const app = express();
const registRouter = require('./routes/regist.js');
const loginRouter = require('./routes/login.js');
const auth = require('./middleware/auth.js')
const cors = require('cors');
const fs = require('fs');

app.use(express.json());
app.use('*', cors());


app.use('/regist', registRouter);
app.use('/login', loginRouter);

app.use('/api', auth);
const routes = fs.readdirSync('./routes/tasks');
routes.forEach(route => {app.use('/api', require('./routes/tasks/'+route))});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server is listening port ${PORT}`) 
})