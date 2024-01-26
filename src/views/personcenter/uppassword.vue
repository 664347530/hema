<template>
  <div class="app">
    <div class="all">
      <h2>账号设置</h2>
      <div class="passwordbox">
        <span>密码</span>
        <div class="xiao">
          <p>{{ goods[0].password | gai }}</p>
          <em @click="appear">修改密码</em>
        </div>
      </div>
      <div class="passwordbox">
        <span>手机</span>
        <div class="xiao">
          <p>{{ goods[0].phone | xiu }}</p>
          <em>修改手机</em>
        </div>
      </div>
      <div class="passwordbox">
        <span>邮箱</span>
        <div class="xiao">
          <p>{{ goods[0].email }}</p>
          <em>绑定邮箱</em>
        </div>
      </div>
      <div class="passwordbox">
        <span>三方账号</span>
        <div class="xiao">
          <p>微信</p>
          <em>绑定/解绑</em>
        </div>
      </div>
      <div class="passwordbox">
        <span>登录记录</span>
        <div class="xiao">
          <em>查看记录</em>
        </div>
      </div>
      <div class="passwordbox">
        <span>账号注销</span>
        <div class="xiao">
          <em @click="san">立即注销</em>
        </div>
      </div>
    </div>
    <div class="zhezhao" :style="zhe">
      <div class="tou">
        <em>账号设置/修改密码</em>
        <span @click="guan">X</span>
      </div>
      <div class="jindu">
        <!-- 步骤条 -->
        <el-steps :active="activeStep" align-center>
          <el-step
            title="邮箱验证"
            :status="activeStep === 0 ? 'edit' : ''"
          ></el-step>
          <el-step
            title="修改密码"
            :status="activeStep === 1 ? 'edit' : ''"
          ></el-step>
          <el-step
            title="完成修改"
            :status="activeStep === 2 ? 'edit' : ''"
          ></el-step>
        </el-steps>
      </div>
      <!-- 邮箱验证框 -->
      <div class="youxiang" :style="xia">
        <el-input v-model="input" :disabled="true"></el-input>
        <div class="yan">
          <input type="text" placeholder="输入验证码" v-model="yanma" />
          <button @click="getma">获取验证码</button>
        </div>
        <button class="next" @click="ne">下一步</button>
      </div>
      <!-- 设置密码框 -->
      <div class="newpassword" :style="migai">
        <el-input v-model="mima" :disabled="true"></el-input>
        <input type="text" placeholder="输入新密码" v-model="newpass" />
        <div class="buttonbox">
          <button @click="hui">上一步</button>
          <button @click="xiug">确认修改</button>
        </div>
      </div>
      <!-- 完成框 -->
      <div class="wan" :style="wanchen">
        <el-progress
          type="circle"
          :percentage="dynamicPercentage"
        ></el-progress>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      goods: {},
      dis: "",
      input: null,
      mima: null,
      mimakuang: "",
      youxiang: "",
      wanceng: "",
      dynamicPercentage: 0,
      activeStep: 0,
      yanma: "",
      newpass: "",
    };
  },
  mounted() {
    axios({
      url: "/api/personcenter",
      method: "post",
      data: {
        user_id: sessionStorage.getItem("user_id"),
      },
    }).then((res) => {
      this.goods = res.data.data;
      console.log(res.data.data);
      this.input = this.goods[0].email;
      this.mima = this.goods[0].password;
    });
    this.startProgressAnimation();
  },
  filters: { //过滤器
    gai(val) {
      //substring()返回一个索引和另一个索引之间的字符串
      return `${val.substring(0, 1)}****${val.substring(val.length - 1)}`;
    },
    xiu(val) {
      return `${val.substring(0, 3)}*****${val.substring(val.length - 3)}`;
    },
  },
  methods: {
    // 遮罩部分
    appear() {
      this.dis = "block";
    },
    guan() {
      this.dis = "none";
      this.$router.go(0);
    },
    // 步骤隐显
    ne() {
      axios({
        url: "/api/provema",
        method: "post",
        data: {
          codes: this.yanma,
        },
      }).then((res) => {
        if (!res.data.data || res.data.data.length === 0) {
          // 如果为空，弹出提示消息
        this.$message({
          showClose: true,
          message: "验证码错误",
        });          
        } else {
        this.$message({
          showClose: true,
          message: "验证码正确",
          type: "success",
        });
        this.youxiang = "none";
        this.mimakuang = "block";
        if (this.activeStep < 2) {
          this.activeStep += 1;
        }        
        }
      });
    },
    xiug() {
      axios({
        url: "/api/uppassword",
        method: "post",
        data: {
          user_id: sessionStorage.getItem("user_id"),
          password: this.newpass,
        },
      }).then((res) => {
        this.mimakuang = "none";
        this.wanceng = "block";
      });
      let interval = setInterval(() => {
        if (this.dynamicPercentage < 100) {
          this.dynamicPercentage += 1;
        } else {
          // 动画完成后清除定时器
          clearInterval(interval);
          this.showUpdateSuccessMessage();
        }
      }, 10); // 调整时间间隔以控制动画速度
      this.activeStep = 2;
    },
    showUpdateSuccessMessage() {
      this.$message.success("更新成功");
    },
    hui() {
      this.youxiang = "block";
      this.mimakuang = "none";
      if (this.activeStep > 0) {
        this.activeStep -= 1;
      }
    },
    san() {
      axios({
        url: "/api/sancount",
        method: "post",
        data: {
          user_id: sessionStorage.getItem("user_id"),
        },
      }).then((res) => {
        this.$message({
          showClose: true,
          message: "账户注销成功",
          type: "success",
        });
        this.$router.push({ path: "/shoppage" });
      });
    },
    getma() {
      axios({
        url: "/api/getemail",
        method: "post",
        data: {
          email: this.input,
        },
      }).then((res) => {
        this.$message({
          showClose: true,
          message: "验证码已发送",
          type: "success",
        });
      });
    },
  },
  computed: {
    // 遮罩
    zhe() {
      return {
        display: this.dis,
      };
    },
    // 边框隐显
    xia() {
      return {
        display: this.youxiang,
      };
    },
    migai() {
      return {
        display: this.mimakuang,
      };
    },
    wanchen() {
      return {
        display: this.wanceng,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.app {
  width: 910px;
  height: 648px;
  border: 1px solid black;
  background-color: rgb(154, 193, 240, 0.6);
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  h2 {
    color: black;
    margin-top: 60px;
    margin-left: 20px;
    font-size: 30px;
    text-align: left;
  }
  .passwordbox {
    // border: 1px solid black;
    height: 40px;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    span {
      color: black;
      font-weight: 600;
      margin: auto 70px;
      font-size: 17px;
    }
    .xiao {
      // border: 1px solid black;
      width: 300px;
      display: flex;
      justify-content: flex-end;
      padding-top: 10px;
      padding-right: 30px;
      em {
        color: rgb(50, 118, 243);
      }
      em:hover {
        color: aqua;
        cursor: pointer;
      }
      p {
        color: black;
        margin-right: 20px;
        // border: 1px solid black;
        width: 180px;
        padding-top: 3px;
        text-align: center;
      }
    }
  }
  .zhezhao {
    background-color: #9ac5e5;
    height: 650px;
    position: absolute;
    top: 113px;
    width: 910px;
    flex-direction: column;
    overflow: hidden;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    display: none;
    .tou {
      // border: 1px solid black;
      height: 30px;
      display: flex;
      justify-content: space-between;
      em {
        color: black;
        margin: 5px 0px 0px 10px;
        color: rgb(50, 118, 243);
      }
      em:hover {
        color: aqua;
        cursor: pointer;
      }
      span {
        margin-right: 20px;
        margin-top: 5px;
        font-size: 20px;
        font-weight: 600;
      }
      span:hover {
        cursor: pointer;
        color: red;
      }
    }
    .jindu {
      // border: 1px solid black;
      height: 50px;
      margin-top: 20px;
    }
    .youxiang {
      border: 2px solid black;
      height: 300px;
      margin: 50px auto;
      width: 500px;
      flex-direction: column;
      border-radius: 10px;
      background-color: #84c9ef;
      .el-input {
        width: 65%;
        margin: 40px auto;
        font-size: 20px;
      }
      .yan {
        // border: 1px solid black;
        height: 35px;
        display: flex;
        input {
          margin-left: 90px;
          border-radius: 5px;
          border: none;
          outline: none;
        }
        button {
          height: 30px;
          margin: 2.5px 0px 0px 30px;
          color: white;
          border-radius: 7px;
          width: 100px;
          border: none;
          background-color: rgb(34, 161, 214);
        }
        button:hover {
          cursor: pointer;
          background-color: rgb(0, 181, 229);
        }
      }
      .next {
        width: 20%;
        margin: 30px auto;
        height: 35px;
        font-weight: 600;
        font-size: 15px;
      }
    }
    .newpassword {
      border: 2px solid black;
      height: 300px;
      margin: 50px auto;
      width: 500px;
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      background-color: #84c9ef;
      display: none;
      .el-input {
        width: 65%;
        margin: 40px auto;
        font-size: 20px;
      }
      input {
        // margin-left: 90px;
        border-radius: 5px;
        border: none;
        outline: none;
        width: 65%;
        margin: 0px auto;
        height: 38px;
      }
      button {
        width: 20%;
        margin: 30px auto;
        height: 35px;
        font-weight: 600;
        font-size: 15px;
      }
    }
    .wan {
      border: 2px solid black;
      height: 300px;
      margin: 50px auto;
      width: 500px;
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      background-color: #84c9ef;
      display: none;
      .el-progress {
        margin-top: 70px;
      }
    }
  }
}
</style>