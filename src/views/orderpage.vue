<template>
  <div class="app">
    <ShopHead></ShopHead>
    <div class="head">
      <img src="../sucai/footerlogo.png" alt="" @click="zou" />
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
      <div class="leftbox">
        <h3>我的订单详情</h3>
        <el-empty description=" 您还没有订单呦!" v-if="goods == ''"></el-empty>
        <ul v-else>
          <li v-for="(good, index) in goods" :key="index">
            <div class="shangbox">
              <div class="imgbox">
                <img :src="'/showproduct/' + good.img" />
              </div>
              <div class="jieshao">
                <span>{{ good.jieshao }}</span>
                <span>单价:￥{{ good.price }}</span>
                <span>数量:{{ good.num }}</span>
                <span>总价:￥{{ good.num * good.price }}</span>
                <div class="xiaol">
                  <h3>假一赔四</h3>
                  <h3>7天无理由退换</h3>
                  <h3>全程保价</h3>
                </div>
                <span @click="sanchu(index)"
                  ><i class="el-icon-delete-solid" id="laji"></i
                ></span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="rightbox" v-show="showRightBox">
        <div class="dizhi">
          <div class="message">
            <span>收货人姓名:</span><input type="text" v-model="username" />
            <span>收货人地址:</span><input type="text" v-model="dizhi" />
            <span>收货人电话:</span><input type="text" v-model="phone" />
          </div>
          <hr />
          <div class="money">
            <span>预计运费和手续费</span>
            <span>免费</span>
          </div>
          <hr />
          <div class="qian">
            <span>总价</span>
            <span>￥{{ this.all }}</span>
          </div>
          <hr />
          <button @click="createorder">结算</button>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import axios from "axios";
import ShopHead from "../components/shophead.vue";
import Footer from "../components/footer.vue";
export default {
  data() {
    return {
      goods: {},
      all: 0,
      username: "",
      phone: "",
      dizhi: "",
      showRightBox: true,
    };
  },
  methods: {
    handleScroll() {
      const triggerOffset = 200; // 触发隐藏的滚动距离
      if (window.scrollY > triggerOffset) { //窗口滚动的像素
        this.showRightBox = false;
      } else {
        this.showRightBox = true;
      }
    },
    sou() {
      this.$router.push({ path: "/search" });
    },
    goes() {
      this.$router.push({ path: "/shopcart" });
    },
    zou() {
      this.$router.push({ path: "/shoppage" });
    },
    sanchu(index) {
      axios({
        url: "/api/deletorder",
        method: "post",
        data: {
          user_id: sessionStorage.getItem("user_id"),
          productid: this.goods[index].productid,
        },
      }).then((res) => {
        this.$router.go(0);
      });
    },
    createorder() {
      axios({
        url: "/api/createorder",
        method: "post",
        data: {
          user_id: sessionStorage.getItem("user_id"),
          username: this.username,
          dizhi: this.dizhi,
          phone: this.phone,
          total: this.danjias,
          productid: this.ids,
          num: this.nums,
        },
      });
      alert("订单支付成功");
      this.$router.go(0);
      axios({
        url: "/api/deleteorder",
        method: "get",
        params: {
          user_id: sessionStorage.getItem("user_id"),
        },
      }).then((res) => {
        console.log(res.data.data);
      });
    },
  },
  components: {
    ShopHead,
    Footer,
  },
  mounted() {
    axios({
      url: "/api/xuanranorder",
      method: "post",
      data: {
        user_id: sessionStorage.getItem("user_id"),
      },
    }).then((res) => {
      this.goods = res.data.data;
      console.log(res.data.data);
      let total = 0;
      for (let z of this.goods) {
        total += z.num * z.price;
      }
      this.all = total;
      let idlist = [];
      let numlist = [];
      let danjia=[];
      for (let z of res.data.data) {
        idlist.push(z.productid);
        numlist.push(z.num);
        danjia.push(z.total)
      }
      this.ids = idlist;
      this.nums = numlist;
      this.danjias=danjia;
    });
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss" scoped>
.app {
  .head {
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
    display: flex;
    flex: 1;
    background-color: white;
    .leftbox {
      // border: 1px solid black;
      max-height: 700px;
      flex: 0.6;
      display: flex;
      flex-direction: column;
      overflow: auto;
      h3 {
        margin-left: 220px;
        margin-top: 20px;
        color: black;
        font-size: 30px;
        width: 200px;
      }
      .el-empty {
        height: 600px;
      }
      ul {
        margin-right: 50px;
        li {
          list-style: none;
          margin-top: 10px;
          .shangbox {
            // border: 1px solid black;
            height: 250px;
            width: 780px;
            margin-left: auto;
            background-color: white;
            border-radius: 25px;
            margin-top: 10px;
            display: flex;
            .imgbox {
              // border: 1px solid black;
              height: 250px;
              width: 300px;
              border-top-left-radius: 25px;
              border-bottom-left-radius: 25px;
              display: flex;
              overflow: hidden;
              justify-content: center;
            }
            .jieshao {
              // border: 1px solid black;
              height: 250px;
              width: 480px;
              border-top-right-radius: 25px;
              border-bottom-right-radius: 25px;
              display: flex;
              flex-direction: column;
              span:nth-of-type(1) {
                text-align: left;
                margin-top: 25px;
                color: black;
                font-size: 20px;
                font-weight: 600;
                width: 420px;
              }
              span:nth-of-type(2) {
                width: 160px;
                color: rgb(170, 167, 167);
                font-size: 20px;
                margin-top: 15px;
                text-align: left;
              }
              span:nth-of-type(3) {
                width: 110px;
                color: rgb(141, 140, 143);
                font-size: 20px;
                margin-top: 15px;
                text-align: left;
              }
              .xiaol {
                // border: 1px solid black;
                height: 50px;
                display: flex;
                width: 480px;
                h3 {
                  border: 2px solid red;
                  font-size: 15px;
                  color: red;
                  width: 130px;
                  border-radius: 8px;
                  margin-left: 15px;
                  text-align: center;
                  padding-top: 5px;
                }
                span {
                  margin-left: auto;
                }
              }
              span:nth-of-type(4) {
                width: 110px;
                color: rgb(141, 140, 143);
                font-size: 20px;
                margin-top: 15px;
                text-align: left;
              }
              span:nth-of-type(5) {
                position: relative;
                left: 200px;
                bottom: 200px;
                font-size: 25px;
                width: 100px;
                #laji {
                  width: 100px;
                  margin-left: 150px;
                }
              }
              span:nth-of-type(5):hover {
                cursor: pointer;
                color: red;
              }
            }
          }
        }
      }
    }
    .rightbox {
      // border: 1px solid black;
      display: flex;
      flex-direction: column;
      position: fixed;
      left: 1100px;
      .dizhi {
        // border: 1px solid black;
        width: 450px;
        height: 500px;
        margin: 70px auto;
        background-color: #d5e1e1;
        border-radius: 25px;
        // background: linear-gradient(
        //   to right,
        //   rgb(20, 125, 224),
        //   rgb(18, 194, 238)
        // );
        .message {
          text-align: left;
          width: 310px;
          // border: 1px solid black;
          margin: 0px auto;
          margin-top: 20px;
          span {
            font-size: 18px;
            color: black;
            font-weight: 600;
          }
          input {
            height: 25px;
            margin-top: 20px;
            width: 200px;
            // border: none;
            margin-left: 10px;
          }
        }
        hr {
          margin-top: 20px;
          border: 0.1px dashed black;
        }
        .money {
          // border: 1px solid black;
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          span:nth-of-type(1) {
            font-size: 18px;
            font-weight: 600;
            margin-left: 30px;
            color: black;
          }
          span:nth-of-type(2) {
            color: black;
            font-size: 18px;
            font-weight: 600;
            margin-right: 45px;
          }
        }
        .qian {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          span:nth-of-type(1) {
            font-size: 18px;
            font-weight: 600;
            margin-left: 30px;
            color: black;
          }
          span:nth-of-type(2) {
            color: black;
            font-size: 18px;
            font-weight: 600;
            margin-right: 45px;
          }
        }
        button {
          width: 320px;
          margin-top: 60px;
          height: 60px;
          font-size: 20px;
          background-color: black;
          color: white;
          font-weight: 600;
          border-radius: 30px;
          border: none;
        }
        button:hover {
          cursor: pointer;
          background-color: rgb(64, 64, 64);
        }
      }
    }
  }
}
</style>