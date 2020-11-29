const express = require('express');
// const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);

// app.use(cors());
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const captureRouter = require('./routes/capture');

app.use('/', captureRouter);

