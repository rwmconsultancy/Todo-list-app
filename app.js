const express = require('express')
const app = express();
const dotenv = require('dotenv')
const route = require('./routes/userRoute');
const bodyParser = require('body-parser');

dotenv.config({path:'./config/config.env'});
require('./config/connection')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.use('/', route);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening at ${process.env.PORT}`);
});
