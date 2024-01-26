const db = require('../DB/db');

async function deleteCode(email){
    let sql = 
        `DELETE FROM code WHERE email = ?`;
        db.DBModule(sql,[email],(err,res)=>{
            if(err) throw err;
        })
 }

async function insertCode(email,code){
    let sql = 
        `INSERT INTO code (email,code) VALUES (?,?)`;
        db.DBModule(sql,[email,code],(err,res)=>{
            if(err) throw err;
        })
 }

async function getCode(email){
    let sql =
        `SELECT * FROM code WHERE email = ?`;
        db.DBModule(sql,[email],(err,res)=>{
            if(err) throw err;
            console.log(res);
            return res;
        })
 }

 module.exports = {
    deleteCode,
    insertCode,
    getCode
 }