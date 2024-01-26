var db = require('../DB/db');

// 查询用户数量
function selectyh(req, callback) {
    var sql = 'select * from user'
    db.DBModule(sql, [], (err, results) => {
        if (err) {
            return callback(101, '查询错误', +err, null);
        }
        callback(200, '查询成功', results);
    })
}
// 冻结用户账号
function dongcount(req,callback){
    var user_id=req.body.user_id;
    var stute=req.body.stute;
    var sql=`update user set stute=? where user_id=?`;
    db.DBModule(sql,[stute,user_id],(err,results)=>{
        if(err){
            return callback(101,'更新失败',+err,null)
        }
        callback(200,'更新成功',results)  
    })
}
// 查看订单信息
function vieworder(req,callback){
    var sql=`select * from orders`;
    db.DBModule(sql,[],(err,results)=>{
        if(err){
            return(101,'查询失败',+err,null)
        }
        callback(200,'查询成功',results)
    })
}
// 搜索订单
function searchorder(req,callback){
    var order_id=req.body.order_id;
    var sql='select * from orders where order_id=?';
    db.DBModule(sql,[order_id],(err,results)=>{
        if(err){
            return callback(101,'查询失败',+err,null)
        }
        callback(200,'查询成功',results)
    })
}
// 修改订单状态
function updateorder(req,callback){
    var user_id=req.body.user_id;
    var productid=req.body.productid;
    var sql=`update orders set logistics="已发货" where user_id=? and productid=?`;
    db.DBModule(sql,[user_id,productid],(err,results)=>{
        if(err){
            return callback(101,'更新失败',null)
        }
        callback(200,'查询成功',results)
    })
}
// 查询商品页数
function productpage(req,callback){
    var page=req.body.page;
    var sql=`select * from product limit ?,5;`;
    db.DBModule(sql,[(page-1)*5],(err,results)=>{
        if(err){
            return callback(101,'查询失败',+err,null)
        }
        callback(200,'查询成功',results)
    })
}
// 分页商品总数
function pageproduct(req,callback){
    var page=req.body.page;
    var sql=`select count(*) as total from product`;
    db.DBModule(sql,[(page-1)*5],(err,results)=>{
        if(err){
            return callback(101,'查询失败',+err,null)
        }
        callback(200,'查询成功',results)
    })
}
// 删除商品
function deletepro(req,callback){
    var productid=req.body.productid;
    var sql='delete from product where productid=?';
    db.DBModule(sql,[productid],(err,results)=>{
        if(err){
            return callback(101,'删除失败',+err,null);
        }
        callback(200,'删除成功',results)
    })
} 
// 修改商品信息
function upproduct(req,callback){
    var productid=req.body.productid;
    var price=req.body.price;
    var jieshao=req.body.jieshao;
    var type=req.body.type;
    var stute=req.body.stute;
    var sql='update product set price=?,jieshao=?,type=?,stute=? where productid=?';
    db.DBModule(sql,[price,jieshao,type,stute,productid],(err,results)=>{
        if(err){
            return callback(101,'更新失败',+err,null)
        }
        callback(200,'更新成功',results)  
    })
}
// 后台搜索商品信息
function searchprodcut(req,callback){
    var searchkey=req.body.searchkey;
    if (!searchkey) {
        return callback(400, '搜索关键字为空', null);
    }
    var sql=`SELECT * FROM product WHERE jieshao LIKE '%${searchkey}%'`;
    db.DBModule(sql,[],(err,results)=>{
        if (err) {
            return callback(101, '查询错误', +err, null);
        }
        callback(200, '查询成功', results)        
    })
}
// 上传增加新商品
function addproduct(req,callback){
    var productid=req.body.productid;
    var price=req.body.price;
    var jieshao=req.body.jieshao;
    var type=req.body.type;
    var stute=req.body.stute;
    var img=req.body.img;
    var sql='insert into product(productid,price,img,jieshao,type,stute) values(?,?,?,?,?,?);';
    db.DBModule(sql,[productid,price,img,jieshao,type,stute],(err,results)=>{
        if (err) {
            return callback(101, '出现错误', +err, null);
        }
        callback(200, '插入成功', results)
    })
}
// 所有评论
function allmark(req,callback){
    var sql=`select * from remarks`;
    db.DBModule(sql, [], (err, results) => {
        if (err) {
            return callback(101, '查询错误', +err, null);
        }
        callback(200, '查询成功', results);
    })
}
// 查看催发货信息
function selectcui(req,callback){
    var sql=`select * from shipping`;
    db.DBModule(sql,[],(err,results)=>{
        if (err) {
            return callback(101, '查询错误', +err, null);
        }
        callback(200, '查询成功', results); 
    })
}
// 删除催发货信息
async function deletecui(req,callback){
    var message_id=req.body.message_id
    var sql=`delete from shipping where message_id=?`;
    db.DBModule(sql,[message_id],(err,results)=>{
        if(err){
            return callback(101,'删除失败',+err,null);
        }
        callback(200,'删除成功',results)
    })
}
// 计算多少条催货消息
async function jisuancui(req,callback){
    var sql='select count(*) as totalCount from shipping;';
    db.DBModule(sql,[],(err,results)=>{
        if (err) {
            return callback(101, '查询错误', +err, null);
        }
        const count = results[0] ? results[0].totalCount : 0;
        callback(200, '查询成功', count); 
    })
}
module.exports = {
    selectyh,
    vieworder,
    searchorder,
    productpage,
    deletepro,
    upproduct,
    addproduct,
    pageproduct,
    dongcount,
    allmark,
    searchprodcut,
    updateorder,
    selectcui,
    deletecui,
    jisuancui
}