const express = require('express');
const cors = require('cors');
const app = express();
const port = 5050;
const projectRoutes = require('./routes/projectRoute');
const userRoutes = require('./routes/userRoute');
const freelancerRoutes = require('./routes/freelancerRoute');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello!')
});

app.use('/api/users', userRoutes);
app.use('/api/freelancers', freelancerRoutes);
app.use('/api/projects', projectRoutes);

app.listen(port, () => {
    console.log(`App is listening at: ${port}`);
})