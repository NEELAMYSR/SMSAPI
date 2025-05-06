const express = require ('express');
const cors = require ('cors');
const pool= require ('./db');
require('dotenv').config();
const app= express();
app.use(cors());
app.use(express.json());

app.get('/',async(req,res)=>{
    try {
        res.json('WELCOME TO STUDENT API');    
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
})


app.get('/gettotalstd',async(req,res)=>{
    try{
        const result = await pool.query('select count(Id) from student');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
})

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Connected Successfully....Running on PORT ${PORT}`);    
});

// 50) Find job history records with employee, job, and country details
app.get('/getemployeejobhistory',async(req,res)=>{
    try{
        const result = await pool.query(`SELECT jh.employee_id, e.first_name, e.last_name, j.job_title, c.country_name FROM job_history jh JOIN employees e ON jh.employee_id = e.employee_id JOIN jobs j ON jh.job_id = j.job_id JOIN departments d ON jh.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id JOIN countries c ON l.country_id = c.country_id`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

// 51) Retrieve regions along with their countries and locations.
app.get('/getregionsalongcountry',async(req,res)=>{
    try{
        const result = await pool.query("SELECT r.region_name, c.country_name, l.city, l.state_province FROM regions r JOIN countries c ON r.region_id = c.region_id JOIN locations l ON c.country_id = l.country_id");
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});
// job query.
app.get('/getjob',async(req,res)=>{
    try{
        const result = await pool.query(`Select * from jobs`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});