<template>
  <div class="app">
    <div class="loginbox">
      <div class="imgbox">
        <img src="../../sucai/loginsucai/controlloginlogo.png" @click="back" />
      </div>
      <span class="deng">登录</span>
      <div class="hao">
        <i class="el-icon-user"></i>
        <input type="text" placeholder="邮箱/手机号" v-model="phone" />
      </div>
      <div class="ma">
        <i class="el-icon-lock"></i>
        <input type="password" placeholder="密码" v-model="password" />
      </div>
      <button @click="denglu">登录</button>
      <div class="xiao">
        <span class="duan">短信登录</span>
        <div class="you">
          <span><a href="/#/manregist">注册</a></span>
          <span>|</span>
          <span>忘记密码</span>
        </div>
      </div>
      <span class="xia">———————使用其他方式登录———————</span>
      <div class="tu">
        <div class="tu1">
          <img src="../../sucai/loginsucai/zhifubaologo.png" />
        </div>
        <div class="tu2">
          <img src="../../sucai/loginsucai/taobaologo.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    back() {
      this.$router.push({ path: "/shoppage" });
    },
    denglu() {
      axios({
        url: "/api/guanlogin",
        method: "post",
        data: {
          phone: this.phone,
          password: this.password,
        },
      }).then((res) => {
        if (res.data.code == 200) {
          alert("登录成功");
          this.$router.push({ path: "/alldata" });
        } else {
          alert("登录失败");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.app {
  background-image: url("../../sucai/loginsucai/controlloginbackground.jpg");
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
  .loginbox {
    background-color: white;
    height: 460px;
    width: 400px;
    margin: 170px auto;
    animation-name: move;
    animation-duration: 2s;
    display: flex;
    flex-direction: column;
    .imgbox {
      width: 30px;
      height: 30px;
      margin: 20px 0px 0px 30px;
      img {
        width: 30px;
        height: 30px;
      }
    }
    .deng {
      text-align: left;
      margin: 10px 0px 0px 30px;
      font-size: 23px;
    }
    .hao {
      border: 1px solid black;
      width: 83%;
      margin: 40px auto;
      height: 35px;
      border-color: rgb(203, 207, 206);
      display: flex;
      border-radius: 5px;
      overflow: hidden;
      i {
        font-size: 20px;
        margin: 8px 0px 0px 8px;
        opacity: 0.5;
      }
      input {
        width: 100%;
        outline: none;
        border: none;
        margin-left: 6px;
      }
    }
    .hao:hover {
      border-color: black;
    }
    .ma {
      border: 1px solid black;
      width: 83%;
      margin: -20px auto;
      height: 35px;
      border-color: rgb(203, 207, 206);
      display: flex;
      border-radius: 5px;
      overflow: hidden;
      i {
        font-size: 20px;
        margin: 8px 0px 0px 8px;
        opacity: 0.5;
      }
      input {
        width: 100%;
        outline: none;
        border: none;
        margin-left: 6px;
      }
    }
    .ma:hover {
      border-color: black;
    }
    button {
      width: 83%;
      margin: 40px auto;
      height: 40px;
      font-size: 20px;
      background-color: rgb(25, 183, 238);
      color: white;
      border: none;
      border-radius: 5px;
    }
    button:hover {
      cursor: pointer;
    }
    .xiao {
      //   border: 1px solid black;
      height: 20px;
      margin: -20px auto;
      width: 83%;
      display: flex;
      justify-content: space-between;
      .duan {
        text-align: left;
        font-size: 13px;
        color: rgb(87, 167, 221);
      }
      .duan:hover {
        cursor: pointer;
        color: rgb(46, 118, 166);
      }
      .you {
        span:nth-of-type(2n-1) {
          font-size: 13px;
          color: rgb(87, 167, 221);
        }
        span:nth-of-type(2) {
          margin-right: 5px;
          margin-left: 5px;
        }
        span:hover {
          cursor: pointer;
          color: rgb(46, 118, 166);
        }
      }
    }
    .xia {
      margin-top: 40px;
      font-size: 14px;
    }
    .tu {
      width: 83%;
      margin: 10px auto;
      height: 25px;
      display: flex;
      .tu1 {
        flex: 0.5;
        height: 25px;
        display: flex;
        justify-content: flex-end;
        img:hover {
          cursor: pointer;
        }
      }
      .tu2 {
        flex: 0.5;
        height: 25px;
        display: flex;
        margin-left: 10px;
        img:hover {
          cursor: pointer;
        }
      }
    }
  }
  @keyframes move {
    0% {
      /*开始状态*/
      transform: translateY(200px);
    }
    /*结束状态*/
    100% {
      transform: translateY(0);
    }
  }
}
</style>