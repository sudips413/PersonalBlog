const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const PORT = process.env.PORT || 4000
app.use('/', express.static('images'));
dotenv.config();
mongoose 
    .connect("mongodb+srv://sudip:MongoDB123@cluster0.iwq7e3d.mongodb.net/blog", { useNewUrlParser: true, useUnifiedTopology: true })   
.then(() => console.log('DB Connected!'))
.catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
});

app.use(cors(
    {
        origin: 'https://blog-sudips413.vercel.app'
    }
));
app.use(bodyParser.json());
app.use('/api', require('./routes/UserRoute'));
app.use('/api', require('./routes/PostRoutes'));

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
    }
);
