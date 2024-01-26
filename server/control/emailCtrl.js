// 发送邮件模块
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const Code = require('../DB/email')

// 创建一个邮件传输对象，用于发送邮件
const transporter = nodemailer.createTransport(smtpTransport({
    // 邮件服务器地址
    host: 'smtp.qq.com',
    // 使用TLS加密传输
    secure: true,
    // 邮件服务器端口
    port: 465,
    // 邮件服务器身份验证信息
    auth: {
        // 发件人邮箱地址
        user: '664347530@qq.com',
        // 发件人邮箱密码
        pass: 'ddutnxftdirzbfhg'
    }
}));

function getNumber() {
    // padStart(6, '0') 是一个字符串方法，用于在字符串前面填充字符 '0'，直到达到长度 6
    return Math.floor(Math.random() * 1e6).toString().padStart(6, '0');
}

//验证邮箱正则
const regEmail = /^[\w.-]+@[\w.-]+\.\w+$/;
// [\w.-]+ 匹配一个或多个字母、数字、点或下划线字符。
// \w 一个数字或字母


// 建立连接发送验证码
async function sendEmail(req, callback) {
    let email = req.body.email;
    console.log(email);
    if (regEmail.test(email)) {
        let code = getNumber();

        try {
            // 发送邮件
            await transporter.sendMail({

                from: '盒马鲜生 <664347530@qq.com>',
                to: email,
                subject: '验证码', //标题
                html: `
                        <p>你好！</p>
                        <p>您正在使用邮箱修改盒马鲜生购物平台的密码</p>
                        <p>你的验证码是：<strong style="color: #ff4e2a;">${code}</strong></p>
                        <p>***该验证码2分钟内有效***</p>` // html 内容
            });

            // 存储验证码
            const em = email
            await Code.deleteCode(em).then(r => {
                Code.insertCode(em, code);

            })



            // 5分钟后删除验证码
            setTimeout(async () => {
                await Code.deleteCode(em);
            }, 2 * 60 * 1000);

            callback(null, 200, '验证码已发送');
        } catch (err) {
            callback(err, 500, '邮件发送失败');
        }
    } else {
        callback(null, 400, '邮箱格式错误!')
    }
}




module.exports = {
    sendEmail
};
