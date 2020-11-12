import { string } from 'yup';
import mongoose from 'mongoose';

require('dotenv/config');

mongoose.connect(
  `mongodb+srv://teste:12345678@docdb-2020-11-12-11-38-46.cluster-cw08dk3wthpc.us-east-1.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`,
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





