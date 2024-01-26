var db = require('../DB/db')

// 注册
function register(req, callback) {
    var username = req.body.user.username;
    var password = req.body.user.password;
    var email = req.body.user.email;
    var phone = req.body.user.phone;
    var sql = `insert into user (user_id,username,password,email,phone) values(default,?,?,?,?)`;
    db.DBModule(sql, [username, password, email, phone], (err, results) => {
        if (err) {
            return callback(101, '出现错误', +err, null);
        }
        callback(200, '注册成功', null);
    })
}
// 登录
function userlogin(req, callback) {
    var phone = req.phone;
    var password = req.password;
    var sql = `select * from user where phone=? and password=? and stute=1`;
    db.DBModule(sql, [phone, password], (err, results) => {
        if (err) {
            return callback(101, '出现错误:' + err, null);
        }
        if (results.length == 0) {
            return callback(301, '密码错误或账号异常', null);
        }
        callback(200, '登录成功', results[0])
        console.log(results);
    })
}
// 显示登录用户
function usercount(req,callback){
    var user_id=req.query.user_id;
    var sql="select * from user where user_id=?"
    console.log(user_id);
    db.DBModule(sql,[user_id],(err,results)=>{
        if(err){
            return callback(101,'出现错误'+err,null);
        }
        callback(200,'',results[0])
    })
}

// 管理员注册
function managerregist(req,callback){
    var phone=req.body.phone;
    var password=req.body.password;
    var sql=`insert into manager (manager_id,phone,password) values (default,?,?)`;
    db.DBModule(sql, [phone,password], (err, results) => {
        if (err) {
            return callback(101, '出现错误', +err, null);
        }
        callback(200, '注册成功', results);
    })
}
// 管理员登录
function mangerlogin(req, callback) {
    var phone = req.body.phone;
    var password = req.body.password;
    var sql = `select * from manager where phone=? and password=?`;
    db.DBModule(sql, [phone, password], (err, results) => {
        if (err) {
            return callback(101, '出现错误:' + err, null);
        }
        if (results.length == 0) {
            return callback(301, '密码错误或账号异常', null);
        }
        callback(200, '登录成功', results[0])
        console.log(results);
    })
}
module.exports = {
    register,
    userlogin,
    usercount,
    managerregist,
    mangerlogin
}