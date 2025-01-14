const mongoose = require('mongoose');
const app = require('./app');
const { DB_HOST } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log('Database connection success');
  })
  .catch(err => {
    console.error(err.message);
    process.exit(1);
  });
