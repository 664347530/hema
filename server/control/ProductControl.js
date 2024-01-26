var db = require('../DB/db')
// 展示商品
function showproduct(req, callback) {
    var sql = 'select * from product order by rand() limit 12'
    db.DBModule(sql, [], (err, results) => {
        if (err) {
            return callback(101, '出现错误', +err, null);
        }
        callback(200, '', results)
    })
}
// 展示所有商品
function allproduct(req, callback) {
    var sql = 'select * from product where stute="在售"'
    db.DBModule(sql, [], (err, results) => {
        if (err) {
            return callback(101, '出现错误', +err, null);
        }
        callback(200, '', results)
    })
}
// 进入商品详情
function productdetail(req, callback) {
    var productid = req.query.productid
    var sql = "select * from product where productid=?";
    // console.log(productid);
    db.DBModule(sql, [productid], (err, results) => {
        if (err) {
            return callback(101, '出现错误' + err, null);
        }
        callback(200, '', results[0]);
    })
}
//加入购物车
async function addshopcart(req, callback) {
    // 从请求对象中提取商品信息、用户ID以及商品总价
    var goods = req.query.goods;
    var user_id = req.query.user_id;
    var total = goods.price; // 初始总价等于商品价格
    // 检查产品是否已经在购物车中
    var checkSql = "select * from shopcart where productid = ? and user_id = ?";
    db.DBModule(checkSql, [goods.productid, user_id], (checkErr, checkResults) => {
        if (checkErr) {
            return callback(101, '出现错误1' + checkErr, null);
        }
        if (checkResults.length > 0) {
            // 产品已经在购物车中，更新数量和总价
            var updateSql = "update shopcart set num = num + 1, total = num * ? where productid = ? and user_id = ?";
            db.DBModule(updateSql, [goods.price, goods.productid, user_id], (updateErr, updateResults) => {
                if (updateErr) {
                    return callback(101, '出现错误2' + updateErr, null);
                }
                callback(200, '', updateResults);
            });
        } else {
            // 产品不在购物车中，插入新行
            var insertSql = "insert into shopcart (productid, img, price, num, jieshao, total, user_id, stute) values (?, ?, ?, 1, ?, ?, ?, 0)";
            db.DBModule(insertSql, [goods.productid, goods.img, goods.price, goods.jieshao, total, user_id], (insertErr, insertResults) => {
                if (insertErr) {
                    return callback(101, '出现错误3' + insertErr, null);
                }
                callback(200, '', insertResults[0]);
            });
        }
    });
}
// 渲染购物车
function xuanshopcart(req, callback) {
    var user_id = req.query.user_id;
    console.log('id为' + user_id);
    var sql = 'select * from shopcart where user_id=?';
    db.DBModule(sql, [user_id], (err, results) => {
        if (err) {
            return callback(101, '出现错误', +err, null);
        }
        callback(200, '查询成功', results)
    })
}
// 删除商品
function deleteproduct(req, callback) {
    var user_id = req.body.user_id;
    var productid = req.body.productid;
    var sql = 'delete from shopcart where user_id=? and productid=?';
    db.DBModule(sql, [user_id, productid], (err, results) => {
        if (err) {
            return callback(101, '出现错误', +err, null);
        }
        callback(200, '删除成功', results)
    })
}
// 更新商品数量
function updateproduct(req, callback) {
    var num = req.body.num;
    var productid = req.body.productid;
    var user_id = req.body.user_id;
    var total = req.body.total
    var sql = 'update shopcart set num=?,total=? where productid=? and user_id=? ';
    db.DBModule(sql, [num, total, productid, user_id], (err, results) => {
        if (err) {
            return callback(101, '出现错误', +err, null);
        }
        callback(200, '更新成功', results)
    })
}
// 是否被选中
function selectcheck(req, callback) {
    var user_id = req.body.user_id;
    var stute = req.body.stute;
    var sql = "update shopcart set stute=? where user_id=?";
    db.DBModule(sql, [stute, user_id], (err, results) => {
        if (err) {
            return callback(101, '出现错误', +err, null);
        }
        callback(200, '更新成功', results)
    })
}
// 取消选中
function cancelcheck(req, callback) {
    var user_id = req.body.user_id;
    var productid = req.body.productid;
    var stute = req.body.stute;
    var sql = "update shopcart set stute=? where user_id=? and productid=?";
    db.DBModule(sql, [stute, user_id, productid], (err, results) => {
        if (err) {
            return callback(101, '出现错误', +err, null);
        }
        callback(200, '更新成功', results)
    })
}
// 渲染订单页面
function xuanranorder(req, callback) {
    var user_id = req.body.user_id;
    var sql = 'select * from shopcart where stute=1 and user_id=?';
    db.DBModule(sql, [user_id], (err, results) => {
        if (err) {
            return callback(101, '出现错误', +err, null);
        }
        callback(200, '渲染成功', results)
    })
}
// 删除订单商品
function deletorder(req, callback) {
    var productid = req.body.productid;
    var user_id = req.body.user_id;
    var sql = 'delete from shopcart where user_id=? and productid=?';
    db.DBModule(sql, [user_id, productid], (err, results) => {
        if (err) {
            return callback(101, '出现错误', +err, null);
        }
        callback(200, '删除成功', results)
    })
}
// 生成订单
function createorder(req, callback) {
    var user_id = req.body.user_id;
    var username = req.body.username;
    var dizhi = req.body.dizhi;
    var phone = req.body.phone;
    var total = req.body.total;
    var num = req.body.num
    var productid = req.body.productid
    console.log('总价分别为'+totals);
    for (var i = 0; i < productid.length; i++) {
        var wo = productid[i]
        var nums = num[i]
        var totals = total[i]
        var sql = 'insert into orders (order_id,user_id,username,dizhi,phone,time,total,productid,num,zhuangtai,logistics) values(default,?,?,?,?,NOW(),?,?,?,"已支付","未发货")';
        db.DBModule(sql, [user_id, username, dizhi, phone, totals, wo, nums], (err) => {
            if (err) {
                return console.log(err);
            }
        })
    }

}
//生成订单后删除订单信息
function deleteorder(req, callback) {
    var user_id = req.query.user_id;
    var sql = 'delete from shopcart where user_id=?'
    db.DBModule(sql, [user_id], (err, results) => {
        if (err) {
            return callback(101, '出现错误', +err, null);
        }
        callback(200, '删除成功', results)
    })
}
//渲染个人订单(未发货)
async function personorder(req, callback) {
    var user_id = req.body.user_id;
    var sql = `select * from orders,product,user where orders.productid=product.productid and orders.user_id=user.user_id and user.user_id=? 
    and orders.logistics="未发货"`
    db.DBModule(sql, [user_id], (err, results) => {
        if (err) {
            return callback(101, '出现错误', +err, null);
        }
        callback(200, '查询成功', results)
    })
}
// 渲染个人订单（已发货）
async function personorders(req, callback) {
    var user_id = req.body.user_id;
    var sql = `select * from orders,product,user where orders.productid=product.productid and orders.user_id=user.user_id and user.user_id=? 
    and orders.logistics="已发货"`
    db.DBModule(sql, [user_id], (err, results) => {
        if (err) {
            return callback(101, '出现错误', +err, null);
        }
        callback(200, '查询成功', results)
    })
}
// 确认收货
function defineproduct(req, callback) {
    var user_id = req.body.user_id;
    var productid = req.body.productid;
    console.log('ID我'+user_id,productid);
    var sql = 'delete from orders where user_id=? and productid=?';
    db.DBModule(sql, [user_id, productid], (err, results) => {
        if (err) {
            return callback(101, '出现错误', +err, null);
        }
        callback(200, '删除成功', results)
    })
}
// 催发货
function cuiproduct(req,callback){
    var user_id=req.body.user_id;
    var username=req.body.username;
    var order_id=req.body.order_id;
    console.log('商品信息为'+user_id,username,order_id);
    var sql=`insert into shipping (message_id,user_id,username,order_id) values(default,?,?,?)`;
    db.DBModule(sql,[user_id,username,order_id],(err,results)=>{
        if(err){
            return callback(101,'出现错误',null);
        }
        callback(200,'插入成功',results)
    })
}
// 个人中心
function personcenter(req, callback) {
    var user_id = req.body.user_id;
    var sql = `select * from user where user_id=?`;
    db.DBModule(sql, [user_id], (err, results) => {
        if (err) {
            return callback(101, '查询错误', +err, null);
        }
        callback(200, '查询成功', results)
    })
}
// 注销账户
function sancount(req, callback) {
    var user_id = req.body.user_id;
    var sql = `delete from user where user_id=?`;
    db.DBModule(sql, [user_id], (err, results) => {
        if (err) {
            return callback(101, '出现错误', +err, null);
        }
        callback(200, '删除成功', results)
    })
}
// 添加评论
function personmark(req, callback) {
    var user_id = req.body.user_id;
    var neirong = req.body.remark;
    var productid = req.body.productid;
    var name = req.body.name;
    var sql = `insert into remarks (user_id,productid,neirong,name,time) values(?,?,?,?,NOW())`;
    db.DBModule(sql, [user_id, productid, neirong, name], (err, results) => {
        if (err) {
            return callback(101, '出现错误', +err, null);
        }
        callback(200, '插入成功', results[0])
    })
}
// 查用户
function selectcount(req, callback) {
    var user_id = req.query.user_id;
    var sql = "select * from user where user_id=?"
    db.DBModule(sql, [user_id], (err, results) => {
        if (err) {
            return callback(101, '出现错误' + err, null);
        }
        callback(200, '', results[0])
    })
}
// 查看评论
function selectmark(req, callback) {
    var productid = req.body.productid;
    var sql = `select * from remarks where productid=?`;
    db.DBModule(sql, [productid], (err, results) => {
        if (err) {
            return callback(101, '查询错误', +err, null);
        }
        callback(200, '查询成功', results)
    })
}
// 验证验证码
function provema(req, callback) {
    var codes = req.body.codes;
    var sql = `select * from code where code=?`;
    console.log('验证码为' + codes);
    db.DBModule(sql, [codes], (err, results) => {
        if (err) {
            return callback(101, '查询错误', +err, null);
        }
        callback(200, '查询成功', results)
    })
}
// 修改密码
function uppassword(req, callback) {
    var user_id = req.body.user_id;
    var password = req.body.password;
    var sql = `update user set password=? where user_id=?`;
    db.DBModule(sql, [password, user_id], (err, results) => {
        if (err) {
            return callback(101, '出现错误', +err, null);
        }
        callback(200, '更新成功', results)
    })
}
// 搜索商品
function searchgoods(req, callback) {
    var searchkey = req.body.searchkey;
    if (!searchkey) {
        return callback(400, '搜索关键字为空', null);
    }
    var sql = `SELECT * FROM product WHERE jieshao LIKE '%${searchkey}%'`;
    db.DBModule(sql, [], (err, results) => {  //[]查询语句中没有参数可以省略
        if (err) {
            return callback(101, '查询错误', +err, null);
        }
        callback(200, '查询成功', results)
    })
}
module.exports = {
    showproduct,
    allproduct,
    productdetail,
    addshopcart,
    xuanshopcart,
    deleteproduct,
    updateproduct,
    selectcheck,
    cancelcheck,
    xuanranorder,
    deletorder,
    createorder,
    deleteorder,
    personorder,
    defineproduct,
    personcenter,
    sancount,
    personmark,
    selectcount,
    selectmark,
    provema,
    uppassword,
    searchgoods,
    personorders,
    cuiproduct
}