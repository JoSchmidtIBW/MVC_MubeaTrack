const express = require('express');
const morgan = require('morgan');

const shipmentRouter = require('./routes/shipmentRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes Mounting
app.use('/api/v1/shipments', shipmentRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
