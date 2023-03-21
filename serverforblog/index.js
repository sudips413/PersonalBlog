const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;

const PORT = process.env.PORT || 4000
app.use(express.static('public'));
dotenv.config();
//cloudinary config
cloudinary.config({
    cloud_name: "ghfn",
    api_key: "252317821961778",
    api_secret: "vEuwyi2AbOsSIQzq3P535WymCuY"
  });
mongoose 
    .connect("mongodb+srv://sudip:MongoDB123@cluster0.iwq7e3d.mongodb.net/blog", { useNewUrlParser: true, useUnifiedTopology: true })   
.then(() => console.log('DB Connected!'))
.catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
});

app.use(cors(
    {
        origin: '*'
    }
));
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use('/api', require('./routes/UserRoute'));
app.use('/api', require('./routes/PostRoutes'));

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
    }
);
