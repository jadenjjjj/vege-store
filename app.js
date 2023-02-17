//const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');



mongoose.set('strictQuery', true);

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to the database!');
    } catch(error) {
        console.log(error);
    }
}

connectToDatabase();

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// middlewares
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.use(
    session({
        secret: 'my key',
        saveUninitialized: false,
        resave: false
    })
);

app.use((req, res, next) => {
  req.session.touch = () => {
    req.session.save();
  };
  next();
});

app.use((req, res, next) => {
    // Check if a message is stored in the session
    if (req.session.message) {
      // If a message is found, copy it to res.locals and delete it from the session
      res.locals.message = req.session.message;
      delete req.session.message;
    }
    // Call the next middleware function in the stack
    next();
});

//set ejs as engine
app.set('view engine', 'ejs');

/*app.use(cookieSession({
  name: 'session',
  secret: 'secret',
  sameSite: 'none',
  secure: true,
}));*/

app.use('', require('./routes/routes'));

app.use('/login', require('./routes/login'));
  
app.use('/signup', require('./routes/signup'));

app.use('/service', require('./routes/service'));

app.use('/service/calculate', require('./routes/calculate'));

app.use('/products', require('./routes/products'));

app.use('/cart', require('./routes/cart'));

app.use('/checkout', require('./routes/checkout'));




app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
