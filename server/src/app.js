import http from "http";
import createError from "http-errors";
import express from "express";
import logger from "morgan";
import {jwt } from './middleware/jwt.js';
import users from './controllers/users.js';
import tables from './controllers/tables.js';
import posts from './controllers/posts.js';
import milkshakes from './controllers/milkshakes.js';
import reservations from './controllers/reservations.js';
import orders from './controllers/orders.js';
import config from './config/config.js';
import mongoose from 'mongoose';


const app = express();
mongoose.connect(config.DB, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Mongo has connected succesfully')
});
mongoose.connection.on('reconnected', () => {
  console.log('Mongo has reconnected')
});
mongoose.connection.on('error', error => {
  console.log('Mongo connection has an error', error)
  mongoose.disconnect()
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongo connection is disconnected')
});

// use JWT auth to secure the api
app.use(jwt());

/** Get port from environment and store in Express. */
const port = process.env.PORT || "3000";
app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/users', users);
app.use('/tables', tables);
app.use('/reservations', reservations);
app.use('/milkshakes', milkshakes);
app.use('/orders', orders);
app.use('/posts', posts);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});
// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/** Create HTTP server. */
// const server = http.createServer(app);
/** Listen on provided port, on all network interfaces. */
app.listen(port);
/** Event listener for HTTP server "listening" event. */
app.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`);
});