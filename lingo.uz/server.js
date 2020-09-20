const express = require('express');
const app = express();
const mongoose = require('mongoose');
const addressRoute = require('./routes/addresses');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const config = require('config');
const fetchMiddleware = require('./middleware/fetch')

if (!config.get('jwtPrivateKey')) {
  console.error(
    'Jiddiy hatolik lingouz_jwtPrivateKey muhit ozgaruvchisi aniqlanmadi'
  );
} 

mongoose
  .connect('mongodb://localhost/lingo-uz', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Mongodb listened...');
  })
  .catch((err) => {
    console.log('ERROR...', err);
  });

app.use(express.json());
app.use(fetchMiddleware);
app.use('/api/addresses', addressRoute);
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`${port} port listened!!!`);
});
