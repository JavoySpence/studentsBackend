import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {studentRouter} from './routes/studentsRouter.js';

const app = express();

app.options('*', cors(['http://localhost: 4200', 'http://localhost:46500']));
app.use(cors()); 


app.use(express.json({limit: '5kb'}));
app.use(express.urlencoded({extended: true, limit: '5kb'}));

if(process.env.NODE_ENV !== "production") app.use(morgan('dev'));

app.use('/api/v1/students', studentRouter);

const PORT = process.env.PORT || 8080; 
const server = app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}...`);
});



