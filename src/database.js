// codigo de conexión a la DB
const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/dbtest';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('DB is conected');
});
