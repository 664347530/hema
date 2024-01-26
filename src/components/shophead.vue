<template>
  <div class="app">
    <div class="leftbox">
      <span v-show="!ts">盒马欢迎您!</span>
      <span v-show="ts">您好!{{ goods.username }}</span>
      <span @click="login">登录/注册</span>
      <span @mouseover="show = true" @mouseout="show = false">手机盒马</span>
    </div>
    <div class="youbox">
      <ul>
        <li @click="remove">切换账号</li>
        <li @click="person">我的订单</li>
        <li>
          <el-dropdown>
            <span class="el-dropdown-link">
              个人中心<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的商品</el-dropdown-item>
              <el-dropdown-item>购物津贴</el-dropdown-item>
              <el-dropdown-item>我的红包</el-dropdown-item>
              <el-dropdown-item>
                <span @click="centers">账号管理</span>
                </el-dropdown-item>
              <el-dropdown-item>实名认证</el-dropdown-item>
              <el-dropdown-item>商品收藏</el-dropdown-item>
              <el-dropdown-item>售后管理</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li>
          <el-dropdown>
            <span class="el-dropdown-link">
              客户服务<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                ><i class="el-icon-user-solid">联系客服</i></el-dropdown-item
              >
              <el-dropdown-item
                ><i class="el-icon-question">帮助中心</i></el-dropdown-item
              >
              <el-dropdown-item
                ><i class="el-icon-s-goods">产权保护</i></el-dropdown-item
              >
              <el-dropdown-item
                ><i class="el-icon-warning">规则中心</i></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li>
          <el-dropdown>
            <span class="el-dropdown-link">
              充值中心<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>花费充值</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li>
          <el-dropdown>
            <span class="el-dropdown-link">
              消费值权益<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>消费者告知书</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li>
          <el-dropdown>
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                ><span @click="houtai">盒马后台</span></el-dropdown-item
              >
              <el-dropdown-item>新浪微博</el-dropdown-item>
              <el-dropdown-item>微信公众号</el-dropdown-item>
              <el-dropdown-item>招商合作</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li @click="hema">盒马官网</li>
      </ul>
    </div>
    <div class="imgbox" v-if="show">
      <img src="../sucai/shoppagesucai/hemaApp.png" alt="" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      show: false,
      goods: {},
      ts: false,
    };
  },
  methods: {
    login() {
      this.$router.push({ path: "/login" });
    },
    hema() {
      this.$router.push({ path: "/" });
    },
    person() {
      this.$router.push({ path: "/person" });
    },
    remove() {
      sessionStorage.removeItem("user_id");
      this.$router.push({ path: "/login" });
    },
    houtai() {
      this.$router.push({path:'/controllogin'})
    },
    centers(){
      this.$router.push({path:'/center'})
    }
  },
  mounted() {
    axios({
      url: "/api/usercount",
      method: "get",
      params: {
        user_id: sessionStorage.getItem("user_id"),
      },
    }).then((res) => {
      this.goods = res.data.data;
      console.log(res.data.data);
      this.ts = true;
    });
  },
};
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  background-color: rgb(96, 100, 102);
  justify-content: left;
  flex: 1;
  .leftbox {
    // border: 1px solid black;
    flex: 0.35;
    span {
      margin-left: 35px;
      color: black;
    }
    span:nth-of-type(2):hover {
      cursor: pointer;
      color: red;
    }
  }
  .youbox {
    display: flex;
    justify-content: left;
    // border: 1px solid black;
    flex: 0.65;
    ul {
      flex-direction: row;
      display: flex;
      li {
        list-style: none;
        margin: 0px 0px 0px 20px;

        .el-dropdown-link {
          font-size: 15px;
          color: black;
        }
      }
      li:nth-of-type(1) {
        margin-left: 200px;
      }
      li:hover {
        cursor: default;
        color: rgb(19, 18, 18);
      }
    }
  }
  .imgbox {
    // border: 1px solid black;
    position: absolute;
    width: 140px;
    height: 180px;
    display: flex;
    justify-content: center;
    left: 380px;
    top: -40px;
  }
}
</style>