<template>
  <div class="app">
    <div class="loginbox">
      <div class="leftbox">
        <span>HEMA</span>
        <span>OS</span>
        <span>Better Life,Right Here</span>
      </div>
      <div class="rightbox">
        <img src="../sucai/loginsucai/loginlogo.svg" alt="" />
        <input type="text" placeholder="请输入账号/手机号/邮箱" v-model="phone"/>
        <input type="password" placeholder="请输入登录密码"  v-model="password"/>
        <button @click="login">登录</button>
        <span @click="regist">忘记密码/注册</span>
        <span>——————合作账号登录——————</span>
        <img src="../sucai/loginsucai/xiaobiao.png" class="xiao" @click="back">
        <span>盒马小二</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return{
      phone:'',
      password:''
    }
  },
  methods: {
    back(){
      this.$router.push({path:'/shoppage'})
    },
    regist(){
      this.$router.push({path:'/regist'})
    },
    login(){
      axios({
        url:'/api/login',
        method:"post",
        data:{
          phone:this.phone,
          password:this.password
        },
      }).then((res)=>{
        console.log(res.data);
        if(res.data.code==200){
          alert('登录成功');
          sessionStorage.setItem("user_id",res.data.data.user_id);
          this.$router.push({path:"/shoppage"})
        }else{
          alert("登录失败")
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.loginbox {
  // border: 1px solid black;
  width: 900px;
  height: 600px;
  margin: 90px auto;
  border-radius: 25px;
  display: flex;
  .leftbox {
    background-color: rgb(219, 233, 248);
    width: 500px;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    display: flex;
    flex-direction: column;
    text-align: right;
    span {
      color: rgb(35, 163, 255);
      margin: 20px 20px 0px 0px;
    }
    span:nth-of-type(1) {
      font-size: 100px;
      margin-top: 60px;
    }
    span:nth-of-type(2) {
      font-size: 100px;
      margin-top: 10px;
    }
    span:nth-of-type(3) {
      font-size: 30px;
      margin-top: 230px;
      font-weight: 600;
    }
  }
  .rightbox {
    background-color: rgb(35, 163, 255);
    width: 400px;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    display: flex;
    flex-direction: column;
    img {
      width: 140px;
      margin: 30px 0px 0px 130px;
    }
    input {
      text-align: center;
      width: 300px;
      margin: 20px 0px 0px 50px;
      height: 35px;
      border: none;
      background-color: rgb(35, 163, 255);
      border-bottom: 1px solid white;
      outline: none;
    }
    // 修改placeholder里面字体默认样式
    input[type="text"]::placeholder,
    input[type="password"]::placeholder {
      color: rgb(189,217,255);
      font-size: 18px;
      font-weight: 600;

    }
    button{
      width: 300px;
      height: 40px;
      margin: 60px 0px 0px 50px;
      background-color: rgb(86,184,255);
      border: none;
      border-radius: 20px;
      color: white;
    }
    button:hover{
      background-color: rgb(138,206,255);
      cursor: pointer;
    }
    span{
      color: rgb(189,217,255);
      margin-top: 35px;
      font-size: 13px;
    }
    span:nth-of-type(1):hover{
      color: rgb(235, 240, 243);
      cursor: pointer;
    }
    .xiao{
      width: 40px;
      height: 40px;
      margin: 20px auto;
      margin-top: 20px;
      background-color: rgb(79,181,255);
      border-radius: 50%;
    }
    .xiao:hover{
      background-color: rgb(123,200,255);
      cursor: pointer;
    }
    span:nth-of-type(3){
      margin-top: -5px;
      color: white;
    }
  }
}
.app {
  background-image: url("../sucai/loginsucai/loginbackground.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-size: cover;
  background-attachment: fixed; /*图片固定*/
  background-position: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 790px;
  min-width: 1400px;
  z-index: -10;
  zoom: 1;
  display: flex;
}
</style>