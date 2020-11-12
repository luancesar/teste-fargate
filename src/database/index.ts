import { string } from 'yup';
import mongoose from 'mongoose';

require('dotenv/config');

mongoose.connect(
  `mongodb+srv://squads:squads@cluster0-w8s7a.mongodb.net/squads?retryWrites=true&w=majority`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("conectado")
});





