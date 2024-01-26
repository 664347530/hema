<template>
  <div class="bigbox">
    <div class="box">
      <!-- 遮盖框 -->
      <div id="pre-box" :style="yidong">
        <h1>WELCOME</h1>
        <p>JOIN US!</p>
        <div class="img-box">
          <img src="../sucai/loginsucai/xiaobiao.png" id="t1" />
        </div>
      </div>
      <!-- 注册框 -->
      <div class="register-form">
        <div class="title-box">
          <img src="../sucai/footerlogo.png" alt="">
          <h1>第一步</h1>
        </div>
        <div class="input-box">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="btn-box">
          <button @click="change">下一步</button>
          <p @click="fanhui">已有账号?去登录</p>
        </div>
      </div>
      <!-- 第二步 -->
      <div class="login-form">
        <div class="title-boxs">
          <h1>第二步</h1>
        </div>
        <div class="input-box">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="邮箱" prop="email" id="q1">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone" id="q1">
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="btn-boxs">
          <Vcode :show="isShow" @success="success" @close="close" />
          <button @click="submitForm('ruleForm')">注册</button>
          <p @click="move">返回上一步</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Vcode from "vue-puzzle-vcode";
export default {
  data() {
    return {
      boxtransform: "",
      username: "",
      password: "",
      email: "",
      phone: "",
      ruleForm: {
        username: "",
        password: "",
        email: "",
        phone: "",
      },
      isShow: false, // 验证码模态框是否出现
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 返回上一步
    move() {
      this.boxtransform = "translateX(0%)";
    },
    // 下一步
    change() {
      this.boxtransform = "translateX(-100%)";
    },
    fanhui() {
      this.$router.push({ path: "/login" });
      this.$router.go(0);
    },
    submitForm(formName) {
      this.isShow = true;
      //进行表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios({
            url: "/api/reg",
            method: "post",
            data: {
              user: this.ruleForm,
            },
          }).then((res) => {
            console.log(res.data);
          });
        } else {
          console.log("注册失败!");
          return false;
        }
      });
    },
    // 用户通过了验证
    success(msg) {
      //如果表单验证成功，提交注册请求
      alert("注册成功!");
      this.isShow = false; // 通过验证后，需要手动隐藏模态框
      this.$router.push({ path: "/login" });
    },
    close() {
      this.isShow = false;
    },
  },
  computed: {
    yidong() {
      return {
        transform: this.boxtransform,
      };
    },
  },
  components: {
    Vcode,
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.el-input {
  width: 300px;
}
.el-form-item {
  margin-left: 50px;
}
#hui {
  position: relative;
  top: 150px;
  left: 80px;
}
#hui a {
  text-decoration: none;
  color: rgb(185, 177, 180);
  font-size: 20px;
}
input {
  outline: none;
}
:deep(.el-form-item__label) {
  color: white;
  line-height: 50px;
}
.bigbox {
  display: flex;
  background-image: url("../sucai/registsucai/registground.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed; /*图片固定*/
  background-position: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 785px;
  min-width: 1400px;
  z-index: -10;
  zoom: 1;
}
.box {
  width: 1050px;
  height: 600px;
  display: flex;
  margin: auto;
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  background-color: rgb(35,163,255);
}
#pre-box {
  position: absolute;
  width: calc(1050px / 2);
  z-index: 1;
  right: 0;
  top: 0;
  height: 100%;
  border-radius: 25px;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
  background-color: rgb(92, 212, 233);
  transition: 0.5s ease-in-out;
}
#pre-box h1 {
  margin-top: 150px;
  text-align: center;
  letter-spacing: 5px;
  color: white;
}
#pre-box p {
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 20px 0;
  color: white;
  font-weight: bold;
}
.img-box {
  width: 400px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin: 20px auto;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}
.img-box img {
  width: 100%;
  transition: 3s;
}
.login-form {
  flex: 1;
  height: 100%;
}
.reister-form {
  flex: 1;
  height: 100%;
}
.title-box {
  height: 200px;
  /* line-height: 500px;  */
}
.title-boxs {
  height: 200px;
}
.title-boxs h1 {
  text-align: center;
  position: relative;
  margin-top: 30px;
  top: 100px;
  left: -20px;
}
.title-box h1 {
  text-align: center;
  position: relative;
  margin-top: 30px;
  color: white;
  /* top: 100px;
  left: 30px; */
}
.title-box img{
  display: flex;
  width: 150px;
}
.input-box1 {
  width: 530px;
  position: relative;
  left: 80px;
}
input {
  width: 60%;
  height: 40px;
  margin-bottom: 20px;
  text-indent: 4px;
  border: 1px solid #b0cfe9;
  border-radius: 4px;
}
.btn-box {
  display: flex;
  justify-content: center;
  color: rgb(10, 1, 1);
  position: relative;
  left: 70px;
  margin-top: 40px;
}
.btn-boxs {
  display: flex;
  justify-content: center;
  color: rgb(10, 1, 1);
  position: relative;
  left: 70px;
  margin-top: 40px;
}
.btn-boxs button {
  border: none;
  background-color: #69b3f0;
  width: 100px;
  height: 30px;
  line-height: 30px;
  color: white;
  border-radius: 4px;
  margin-right: 120px;
}
.btn-boxs button:hover {
  cursor: pointer;
  opacity: 0.8;
}
button {
  border: none;
  background-color: #69b3f0;
  width: 100px;
  height: 30px;
  line-height: 30px;
  color: white;
  border-radius: 4px;
  margin: 0 7px;
}
button:hover {
  cursor: pointer;
  opacity: 0.8;
}
.btn-box p {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
}
.btn-boxs p {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  position: relative;
  right: 100px;
}
input:focus {
  color: #b0cfe9;
}
input:focus::placeholder {
  opacity: 0;
}
.btn-box p:hover {
  cursor: pointer;
  border-bottom: 1px solid white;
}
.btn-boxs p:hover {
  cursor: pointer;
  border-bottom: 1px solid white;
}
#q1 {
  position: relative;
  right: 30px;
}
:deep(.el-form-item__content) {
  margin-right: 100px;
}
</style>