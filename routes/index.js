const routes = require('express').Router();
const dbRoutes = require('./db');

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Mongo DB!!!' });
});
routes.use('/db', dbRoutes);

module.exports = routes;