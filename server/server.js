const express = require('express');
const app = express();
const port = 5050;

app.get('/', (req, res) => {
    res.send('Hello!')
});

app.listen(port, () => {
    console.log(`App is listening at: ${port}`);
})