// FILE: STUDENTROUTES.JS
// CREATED BY: JAVOY SPENCE
// DESCRIPTION: FILE TO HANDLE STUDENT ROUTES
// DATE CREATED: 16/4/2024

import express from 'express';
import {getAllStudents, newStudent, deleteSingleStudent} from '../controllers/studentController.js';

export const studentRouter = express.Router();


// Route to fetch all students data from database
studentRouter.get('/all-students', getAllStudents);

// Route to create student data to database
studentRouter.post('/addStudent', newStudent);


// Route to delete student data from database
studentRouter.delete('/delete/:id', deleteSingleStudent);









