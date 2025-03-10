const express = require('express');
const app = express();
const port = 5050;
const projectRoutes = require('./routes/projectRoute');
const userRoutes = require('./routes/userRoute');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello!')
});


app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`App is listening at: ${port}`);
})