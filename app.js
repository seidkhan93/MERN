// console.log('App! working');

const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');

const app = express(); //наш будущий сервер


app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

//нужно отдавать фронтенд
if(process.env.NODE_ENV === 'production'){
  app.use('/', express.static(path.join(__dirname, 'client', 'build'))) // если идет запрос на корень приложения, то отдаем статику, то есть папку build

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')) //на любой get запрос мы отдаем файл index.html
  })
}

const PORT = config.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'));
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`)); //запускаем сервер только после успешного коннекта

  } catch (e) {
    console.log('Server error occurred:', e.message);
    process.exit(1);
  }
}

start();

