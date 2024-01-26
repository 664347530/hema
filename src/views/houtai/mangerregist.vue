<template>
  <div class="app">
    <div class="header">
      <h1>欢迎注册盒马管理员账号</h1>
    </div>
    <div class="content" :style="huan">
      <button @click="zhuce">通过手机号注册账号</button>
      <button @click="youxiang">通过邮箱注册账号</button>
    </div>
    <div class="neirong" :style="xianla">
      <div style="margin-top: 15px" class="kuang1">
        <span>电话号码:</span>
        <el-input
          placeholder="请输入电话号码"
          v-model="input3"
          class="input-with-select"
        >
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="+86" value="1"></el-option>
          </el-select>
        </el-input>
      </div>
      <div class="mima">
        <span>密码:</span>
        <el-input
          placeholder="请输入密码"
          v-model="input"
          show-password
        ></el-input>
      </div>
      <Vcode :show="isShow" @success="success" @close="close" />
      <button @click="wancheng">注册</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vcode from "vue-puzzle-vcode";
export default {
  data() {
    return {
      yingchang: "",
      xian: "",
      input3: "",
      input: "",
      select: "",
      isShow: false, // 验证码模态框是否出现
    };
  },
  methods: {
    zhuce() {
      this.yingchang = "none";
      this.xian = "block";
    },
    wancheng() {
      this.isShow = true;
      axios({
        url: "/api/guanzhu",
        method: "post",
        data: {
          phone: this.input3,
          password: this.input,
        },
      }).then((res) => {
        console.log(res.data.data);
      });
    },
    // 用户通过了验证
    success(msg) {
      //如果表单验证成功，提交注册请求
      alert("注册成功!");
      this.isShow = false; // 通过验证后，需要手动隐藏模态框
      this.$router.push({ path: "/controllogin" });
    },
    close() {
      this.isShow = false;
    },
    youxiang() {
      this.$message({
        showClose: true,
        message: "暂未开通",
      });
    },
  },
  computed: {
    huan() {
      return {
        display: this.yingchang,
      };
    },
    xianla() {
      return {
        display: this.xian,
      };
    },
  },
  components: {
    Vcode,
  },
};
</script>

<style lang="scss" scoped>
.app {
  .header {
    // border: 1px solid black;
    height: 150px;
    display: flex;
    h1 {
      margin: 100px auto;
      color: black;
      font-weight: 300;
    }
  }
  .content {
    // border: 1px solid black;
    height: 300px;
    display: flex;
    flex-direction: column;
    // display: none;
    button {
      width: 330px;
      height: 50px;
      margin: 10px auto;
      font-size: 18px;
      color: rgb(21, 127, 226);
      border: 1px solid rgb(21, 127, 226);
    }
    button:nth-of-type(1) {
      margin-top: 70px;
    }
    button:hover {
      cursor: pointer;
      background-color: rgb(221, 244, 252);
    }
  }
  .neirong {
    // border: 1px solid black;
    height: 300px;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    display: none;
    .kuang1 {
      width: 530px;
      margin: 30px auto;
      // border: 1px solid black;
      display: flex;
      .el-input {
        border: 1px solid rgb(21, 127, 226);
        border-radius: 5px;
      }
      span {
        width: 100px;
        margin: auto;
        color: black;
      }
    }
    .mima {
      //   border: 1px solid black;
      width: 530px;
      margin: 20px auto;
      display: flex;
      .el-input {
        border: 1px solid rgb(21, 127, 226);
        border-radius: 5px;
      }
      span {
        width: 100px;
        margin: auto;
        color: black;
      }
    }
    button {
      width: 100px;
      margin: 10px auto;
      height: 40px;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 600;
      background-color: rgb(7, 177, 237);
      border: none;
      color: white;
    }
    button:hover {
      cursor: pointer;
    }
  }
}
</style>