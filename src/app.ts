import 'dotenv/config';
import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import logger from './middlewares/logger';
import routes from './routes';
import './database';
import { swaggerUi, swaggerDocs } from './middlewares/swagger';



const app = express();

//Cors
app.use(cors());

//Middlewares
app.use(express.json());
// this.server.use(
//   morgan(
//     '":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms ":referrer" ":user-agent"',
//     { stream: logger.stream }
//   )
// );

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Routes
app.use(routes);



export default app
