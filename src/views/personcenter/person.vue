<template>
  <div class="app">
    <ShopHead></ShopHead>
    <div class="head">
      <img src="../../sucai/footerlogo.png" alt="" @click="zou" />
      <div class="inputbox">
        <input type="text" class="box-input" placeholder="口红" @click="sou" />
        <i class="el-icon-s-data">热搜榜</i>
        <i class="el-icon-search"></i>
      </div>
      <button @click="goes">
        <i class="el-icon-shopping-cart-2">购物车</i>
      </button>
    </div>
    <div class="content">
      <div class="personbox">
        <div class="leftbox">
          <div class="imgbox">
            <img src="../../sucai/head.png" />
          </div>
          <ul>
            <li @click="message">个人资料</li>
            <li @click="password">账号设置</li>
            <li>消息通知</li>
            <li>隐私设置</li>
            <li>信息认证</li>
          </ul>
        </div>
        <div class="rightbox">
          <component :is="comName"></component>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import ShopHead from "../../components/shophead.vue";
import Message from "./message.vue";
import Uppassword from "./uppassword.vue";
import Footer from "../../components/footer.vue";
export default {
  data() {
    return {
      comName: "Message",
    };
  },
  components: {
    ShopHead,
    Message,
    Uppassword,
    Footer,
  },
  methods: {
    sou() {
      this.$router.push({ path: "/search" });
    },
    goes() {
      this.$router.push({ path: "/shopcart" });
    },
    zou() {
      this.$router.push({ path: "/shoppage" });
    },
    message() {
      // this.$router.push({ path: "/message" });
      this.comName = "Message";
    },
    password() {
      // this.$router.push({ path: "/uppassword" });
      this.comName = "Uppassword";
    },
  },
};
</script>

<style lang="scss" scoped>
.app {
  .head {
    // border: 1px solid black;
    display: flex;
    background-color: rgb(4, 63, 126);
    img {
      margin-left: 230px;
    }
    .inputbox {
      border: 1px solid rgb(8, 8, 8);
      height: 40px;
      margin-top: 15px;
      margin-left: 200px;
      width: 500px;
      border-radius: 5px;
      background-color: rgb(227, 230, 234);
      font-weight: 600;
      text-indent: 10px;
      display: flex;
      i {
        margin-top: 15px;
        font-size: 15px;
        font-weight: 600;
      }
      i:hover:nth-of-type(2) {
        cursor: pointer;
      }
      .box-input {
        height: 40px;
        width: 380px;
        border-radius: 5px;
        border: none;
        background-color: rgb(227, 230, 234);
        font-weight: 600;
        text-indent: 10px;
        outline: none;
      }
      .box-input:hover {
        background-color: rgb(255, 255, 255);
      }
      .inputbox:hover {
        background-color: rgb(255, 255, 255);
      }
    }
    .inputbox i:hover:nth-of-type(1) {
      color: red;
      cursor: pointer;
    }
    button {
      height: 45px;
      margin-top: 15px;
      margin-left: 100px;
      width: 120px;
      border-radius: 25px;
      border-color: blue;
      i {
        font-size: 18px;
        color: rgb(241, 189, 45);
        font-weight: 600;
      }
    }
  }
  .content {
    // border: 1px solid black;
    height: 670px;
    display: flex;
    background-color: rgb(195, 197, 199, 0.5);
    padding-top: 10px;
    .personbox {
      border: 1px solid black;
      height: 650px;
      width: 65%;
      margin: 0px auto;
      border-radius: 15px;
      display: flex;
      .leftbox {
        // border: 1px solid black;
        width: 200px;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        display: flex;
        flex-direction: column;
        background-color: rgb(154, 193, 240);
        .imgbox {
          //   border: 1px solid black;
          height: 120px;
          width: 120px;
          margin: 10px auto;
          display: flex;
          overflow: hidden;
          border-radius: 50%;
          img {
            border-radius: 50%;
          }
        }
        ul {
          li {
            list-style: none;
            color: black;
            height: 50px;
            padding-top: 30px;
            font-weight: 600;
            font-size: 18px;
            border-bottom: 1px solid rgb(172, 163, 163);
          }
          li:hover {
            background-color: rgb(228, 171, 17);
            cursor: pointer;
            color: white;
          }
        }
      }
      .rightbox {
        // border-left: 1px solid black;
        width: 910px;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
      }
    }
  }
}
</style>