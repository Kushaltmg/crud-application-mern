const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://admin:password321@cluster0.0hajq.mongodb.net/formDB',
     { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

const connection= mongoose.connection;
connection.once('open', () => {
    console.log("Mongodb database connection established successfully !!");
})

const formsRouter = require('./routes/forms');
const usersRouter = require('./routes/users');

app.use('/forms', formsRouter);
app.use('/users', usersRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});