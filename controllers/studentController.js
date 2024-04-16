import {pool} from '../database/dbConnection.js';

export const getAllStudents = async (req, res, next) => {
   let sqlQuery = 'SELECT * FROM students_info';
   const [students] = await pool.query(sqlQuery);

   res.status(200).json({
    status: 'success',
    results: students.length,
    data: {students} 
   });
}


export const newStudent = async (req, res, next) => {
   const studentData = new Object();
   studentData.first_name = req.body.first_name;
   studentData.last_name = req.body.last_name;
   studentData.phone = req.body.phone;
   
   const sqlQuery = 'INSERT INTO students_info (first_name, last_name, phone) VALUES (?, ?, ?)';
   
   try {
       await pool.query(sqlQuery, [studentData.first_name, studentData.last_name, studentData.phone]);
       
       res.status(200).json({ 
           status: 'success', 
           message: 'Student added successfully' 
       });
   } catch (error) {
       console.error('Error adding student:', error);
       
       res.status(500).json({ 
           status: 'error', 
           message: 'An error occurred while adding the student' 
       });
   }
};



export const deleteSingleStudent = async (req, res, next) => {
   try {
       const id = parseInt(req.params.id);
       if (isNaN(id) || id <= 0) {
           return res.status(400).json({ status: 'error', message: 'Invalid student ID' });
       }

       const sqlQuery = 'DELETE FROM students_info WHERE id = ?';
       const [result] = await pool.query(sqlQuery, [id]);

       if (result.affectedRows === 0) {
           return res.status(404).json({ status: 'error', message: 'Student not found' });
       }

       res.status(200).json({
           status: 'success',
           message: 'Student deleted successfully'
       });
   } catch (error) {
       console.error('Error deleting student:', error);
       res.status(500).json({ status: 'error', message: 'An error occurred while deleting the student' });
   }
};


export const updateStudent = async (req, res, next) => {
   const studentData = new Object();
   studentData.id = parseInt(req.body.id);
   studentData.first_name = req.body.first_name;
   studentData.last_name = req.body.last_name;
   studentData.phone = req.body.phone;
   
   const sqlQuery = 'UPDATE students_info SET first_name = ?, last_name = ?, phone = ? WHERE id = ?';g
   
   try {
       await pool.query(sqlQuery, [studentData.first_name, studentData.last_name, studentData.phone]);
       
       res.status(200).json({ 
           status: 'success', 
           message: 'Student added successfully' 
       });
   } catch (error) {
       console.error('Error adding student:', error);
       
       res.status(500).json({ 
           status: 'error', 
           message: 'An error occurred while adding the student' 
       });
   }
};

// studentRouter.post('/new-students', createNewStudent)
// studentRouter.post('/update-students', createNewStudent)