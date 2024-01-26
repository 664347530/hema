// 连接数据库
var mysql=require('mysql');
var config=require('../config')

var pool=mysql.createPool(config.connectpool);
module.exports.DBModule=(sql,value,callback)=>{
    pool.getConnection((err,con)=>{
        if(err){
            return callback('连接池错误'+err,null);
        }
        con.query(sql,value,(erro,results)=>{
            if(erro){
                return callback('查询错误'+erro,null);
            }
            callback(null,results)
            con.release();
        })
        
    })
}