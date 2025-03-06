const express = require('express');
const app = express();
const port = 5050;
const projectRoutes = require('./routes/projectRoute');

app.get('/', (req, res) => {
    res.send('Hello!')
});

app.use('/api', projectRoutes);

app.listen(port, () => {
    console.log(`App is listening at: ${port}`);
})