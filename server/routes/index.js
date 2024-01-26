var express = require('express');
var router = express.Router();
var userCtrl = require("../control/UserControl")
var productCtrl = require('../control/ProductControl')
var houtaicontrol = require('../control/houtaiControl')
var emailctrl = require('../control/emailCtrl')


// 注册
router.post('/reg', function (req, res) {
  userCtrl.register(req, (code, msg, data) => {
    res.send({ code, msg, data });
  })
})
// 登录
router.post('/login', function (req, res) {
  userCtrl.userlogin(req.body, (code, msg, data) => {
    res.send({ code, msg, data });
  })
})
// 管理员注册
router.post('/guanzhu', function (req, res) {
  userCtrl.managerregist(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 管理员登录
router.post('/guanlogin', function (req, res) {
  userCtrl.mangerlogin(req, (code, msg, data) => {
    res.send({ code, msg, data });
  })
})
// 商品展示
router.get('/showproduct', function (req, res) {
  productCtrl.showproduct(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 所有商品展示
router.get('/allproduct', function (req, res) {
  productCtrl.allproduct(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 进入商品详情
router.get('/xiangqing', function (req, res) {
  productCtrl.productdetail(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 显示登录用户
router.get('/usercount', function (req, res) {
  userCtrl.usercount(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 加入购物车
router.get('/addshopcart', function (req, res) {
  productCtrl.addshopcart(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 渲染购物车
router.get('/xuanshopcart', function (req, res) {
  productCtrl.xuanshopcart(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 删除商品
router.post('/deletproduct', function (req, res) {
  productCtrl.deleteproduct(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 更新商品
router.post('/updateproduct', function (req, res) {
  productCtrl.updateproduct(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 是否被选中
router.post('/selectcheck', function (req, res) {
  productCtrl.selectcheck(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 取消选中
router.post('/cancelcheck', function (req, res) {
  productCtrl.cancelcheck(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 渲染订单页面
router.post('/xuanranorder', function (req, res) {
  productCtrl.xuanranorder(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 删除订单商品
router.post('/deletorder', function (req, res) {
  productCtrl.deletorder(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 生成订单
router.post('/createorder', function (req, res) {
  productCtrl.createorder(req, (code, msg, data) => {
    // res.send({code,msg,data})
  })
})
//生成订单后删除订单信息
router.get('/deleteorder', function (req, res) {
  productCtrl.deleteorder(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
//渲染个人订单(未发货)
router.post('/personorder', function (req, res) {
  productCtrl.personorder(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 渲染个人订单(已发货)
router.post('/personorders', function (req, res) {
  productCtrl.personorders(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 确认收货
router.post('/defineproduct', function (req, res) {
  productCtrl.defineproduct(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 催发货
router.post('/cuiproduct', function (req, res) {
  productCtrl.cuiproduct(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 个人中心
router.post('/personcenter', function (req, res) {
  productCtrl.personcenter(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 注销账户
router.post('/sancount', function (req, res) {
  productCtrl.sancount(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 添加评论
router.post('/personmarks', function (req, res) {
  productCtrl.personmark(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 查用户
router.get('/selectcount', function (req, res) {
  productCtrl.selectcount(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 查看评论
router.post('/selectmark', function (req, res) {
  productCtrl.selectmark(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 搜索商品
router.post('/searchgood', function (req, res) {
  productCtrl.searchgoods(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})


// 后台部分
// //查询用户数量
router.get('/selectyh', function (req, res) {
  houtaicontrol.selectyh(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 冻结用户账号
router.post('/dongcount', function (req, res) {
  houtaicontrol.dongcount(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 查看订单信息
router.post('/vieworder', function (req, res) {
  houtaicontrol.vieworder(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 搜索订单
router.post('/searchorder', function (req, res) {
  houtaicontrol.searchorder(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 商品数量分页
router.post('/productpage', function (req, res) {
  houtaicontrol.productpage(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 分页商品总数
router.post('/pageproduct', function (req, res) {
  houtaicontrol.pageproduct(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 删除商品
router.post('/deletepro', function (req, res) {
  houtaicontrol.deletepro(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 修改商品信息
router.post('/upproduct', function (req, res) {
  houtaicontrol.upproduct(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 后台搜素商品信息
router.post('/searchproduct', function (req, res) {
  houtaicontrol.searchprodcut(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 上传增加新商品
router.post('/addproduct', function (req, res) {
  houtaicontrol.addproduct(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
// 所有评论
router.get('/allmark', function (req, res) {
  houtaicontrol.allmark(req, (code, msg, data) => {
    res.send({ code, msg, data });
  })
})
// 催发货消息
router.get('/allcui', function (req, res) {
  houtaicontrol.selectcui(req, (code, msg, data) => {
    res.send({ code, msg, data });
  })
})
// 删除催费货信息
router.post('/deletemessage', function (req, res) {
  houtaicontrol.deletecui(req, (code, msg, data) => {
    res.send({ code, msg, data });
  })
})
// 计算多少条催货消息
router.get('/jisuancui', function (req, res) {
  houtaicontrol.jisuancui(req, (code, msg, data) => {
    res.send({ code, msg, data });
  })
})
// 邮箱
router.post('/getemail', function (req, res) {
  emailctrl.sendEmail(req, (code, msg, data) => {
    res.send({ code, msg, data });
  })
})
// 验证验证码
router.post('/provema', function (req, res) {
  productCtrl.provema(req, (code, msg, data) => {
    res.send({ code, msg, data });
  })
})
// 修改密码
router.post('/uppassword', function (req, res) {
  productCtrl.uppassword(req, (code, msg, data) => {
    res.send({ code, msg, data });
  })
})
// 修改订单状态
router.post('/updateorder', function (req, res) {
  houtaicontrol.updateorder(req, (code, msg, data) => {
    res.send({ code, msg, data })
  })
})
module.exports = router;
