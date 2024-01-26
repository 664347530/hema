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
    <div class="all">
      <div class="leftcontent">
        <div class="daohang">
          <ul>
            <li>全部功能</li>
            <li>我的购物车</li>
            <li>我买到的宝贝<i class="el-icon-caret-bottom"></i></li>
            <li>购买过的商品</li>
            <li>我的发票<i class="el-icon-caret-bottom"></i></li>
            <li>我的收藏</li>
            <li>我的积分</li>
            <li>评价管理</li>
            <li>退款维权</li>
            <li>我的足迹</li>
            <li>流量钱包</li>
          </ul>
        </div>
      </div>
      <div class="zhongjian">
        <div class="person">
          <div class="imgbox">
            <img src="../sucai/head.png" alt="" />
          </div>
          <span>{{ this.names }}</span>
          <div class="hang">
            <h4>我的收货地址</h4>
          </div>
          <div class="hang">
            <el-dropdown>
              <h4 class="el-dropdown-link">
                我的优惠信息<i class="el-icon-arrow-down el-icon--right"></i>
              </h4>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>红包</el-dropdown-item>
                <el-dropdown-item>优惠劵</el-dropdown-item>
                <el-dropdown-item>盒马积分</el-dropdown-item>
                <el-dropdown-item>盒马点券卡</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="hang">
            <h4><i class="el-icon-bank-card"></i>我的支付宝</h4>
          </div>
        </div>
        <div class="ping">
          <ul>
            <li>待付款</li>
            <li @click="xian1" :style="yanse1">待发货</li>
            <li @click="xian" :style="yanse">待收货</li>
            <li>待评价</li>
            <li>退款</li>
          </ul>
        </div>
        <div class="wuliu">
          <i class="el-icon-truck"></i>
          <span>我的物流</span>
        </div>
        <!-- 待收货框 -->
        <div class="showcontent" :style="gai">
          <el-empty
            description=" 您还没有相关订单!"
            v-if="yifahuo == ''"
          ></el-empty>
          <div
            class="small"
            v-for="(good, index) in yifahuo"
            :key="index"
            v-else
          >
            <div class="ibox">
              <img :src="'/showproduct/' + good.img" />
            </div>
            <div class="limian">
              <h4>{{ good.jieshao }}</h4>
              <span id="liang">数量:{{ good.num }}</span>
              <div class="server">
                <span>假一赔四</span>
                <span>7天无理由退换</span>
                <span>全程保价</span>
              </div>
              <div class="server1">
                <i class="el-icon-success"></i>
                <span>服务推荐</span>
                <span>精选洗护服务，点击购买预约上门</span>
              </div>
              <span id="liang2">实付款:{{ good.price * good.num }}元</span>
              <div class="buttons">
                <button>查看物流</button>
                <button @click="define(index)">确认收货</button>
              </div>
            </div>
          </div>
        </div>
        <!-- 待发货 -->
        <div class="showcontent2" :style="gai1">
          <el-empty
            description=" 您还没有相关订单!"
            v-if="goods == ''"
          ></el-empty>
          <div class="small" v-for="(good, index) in goods" :key="index" v-else>
            <div class="ibox">
              <img :src="'/showproduct/' + good.img" />
            </div>
            <div class="limian">
              <h4>{{ good.jieshao }}</h4>
              <span id="liang">数量:{{ good.num }}</span>
              <div class="server">
                <span>假一赔四</span>
                <span>7天无理由退换</span>
                <span>全程保价</span>
              </div>
              <div class="server1">
                <i class="el-icon-success"></i>
                <span>服务推荐</span>
                <span>精选洗护服务，点击购买预约上门</span>
              </div>
              <span id="liang2">实付款:{{ good.price * good.num }}元</span>
              <div class="buttons">
                <button>申请退款</button>
                <button @click="huo(index)">催发货</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="rightbox">
        <span>我的日历</span>
        <div class="databiao">
          <el-calendar v-model="value"></el-calendar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ShopHead from "../components/shophead.vue";
export default {
  data() {
    return {
      goods: {},
      yifahuo: {},
      dis: "",
      disp: "",
      yan: "",
      yans: "",
      value: new Date(),
      username: this.names,
    };
  },
  components: {
    ShopHead,
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
    xian() {
      (this.dis = "none"),
        (this.disp = "block"),
        (this.yan = "red"),
        (this.yans = "black");
    },
    xian1() {
      (this.dis = "block"),
        (this.disp = "none"),
        (this.yan = "black"),
        (this.yans = "red");
    },
    // 确认收货
    define(index) {
      axios({
        url: "/api/defineproduct",
        method: "post",
        data: {
          user_id: sessionStorage.getItem("user_id"),
          productid: this.yifahuo[index].productid,
        },
      }).then((res) => {
        this.$message({
          showClose: true,
          message: "收货成功",
          type: "success",
        });
        this.$router.go(0);
      });
    },
    // 催发货
    huo(index) {
      axios({
        url:'/api/cuiproduct',
        method:'post',
        data:{
          user_id:this.goods[index].user_id,
          username:this.goods[index].username,
          order_id:this.goods[index].order_id
        }
      }).then((res)=>{
      this.$message({
        showClose: true,
        message: "已通知商家及时发货",
        type: "success",
      });        
      })

    },
  },
  computed: {
    gai() {
      return {
        display: this.dis,
        display: this.disp,
      };
    },
    gai1() {
      return {
        display: this.dis,
      };
    },
    yanse() {
      return {
        color: this.yan,
      };
    },
    yanse1() {
      return {
        color: this.yan,
        color: this.yans,
      };
    },
  },
  mounted() {
    // 未发货
    axios({
      url: "/api/personorder",
      method: "post",
      data: {
        user_id: sessionStorage.getItem("user_id"),
      },
    }).then((res) => {
      console.log(res.data.data);
      this.goods = res.data.data;
      let name = [];
      for (let z of res.data.data) {
        name.push(z.username);
      }
      this.names = name[0];
    });
    // 已发货
    axios({
      url: "/api/personorders",
      method: "post",
      data: {
        user_id: sessionStorage.getItem("user_id"),
      },
    }).then((res) => {
      this.yifahuo = res.data.data;
      let name = [];
      for (let z of res.data.data) {
        name.push(z.username);
      }
      this.names = name[0];
    });
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
  .all {
    display: flex;
    .leftcontent {
      // border: 1px solid black;
      width: 350px;
      height: 400px;
      display: flex;
      .daohang {
        // border: 1px solid black;
        margin-left: auto;
        width: 180px;
        ul {
          li {
            list-style: none;
            margin-top: 10px;
            text-align: left;
            margin-left: 50px;
            color: black;
            i {
              margin-left: auto;
            }
          }
          li:nth-of-type(1) {
            margin-top: 30px;
            color: rgb(228, 171, 17);
          }
          li:hover {
            color: rgb(228, 171, 17);
            cursor: pointer;
          }
        }
      }
    }
    .zhongjian {
      // border: 1px solid rgb(20, 20, 19);
      width: 900px;
      display: flex;
      flex-direction: column;
      margin-top: 30px;
      .person {
        border: 2px solid rgb(212, 201, 201);
        height: 100px;
        display: flex;
        .imgbox {
          display: flex;
          width: 80px;
          height: 80px;
          // border: 1px solid black;
          border-radius: 50%;
          margin: 10px 0px 0px 20px;
          img {
            border-radius: 50%;
          }
        }
        span {
          margin: 35px 0px 0px 20px;
          font-size: 20px;
          width: 300px;
          text-align: left;
          color: black;
        }
        .hang {
          // border: 1px solid black;
          width: 150px;
          h4 {
            margin-top: 35px;
            color: black;
            font-weight: 600;
          }
        }
        .hang:hover {
          cursor: pointer;
          h4 {
            color: rgb(228, 171, 17);
          }
        }
      }
      .ping {
        border: 1px solid rgb(212, 201, 201);
        height: 60px;
        display: flex;
        ul {
          display: flex;
          flex: 1;
          li {
            list-style: none;
            border: 1px solid rgb(212, 201, 201);
            flex: 0.25;
            padding-top: 20px;
            color: black;
            font-weight: 600;
          }
          li:hover {
            cursor: pointer;
            color: rgb(228, 171, 17);
          }
        }
      }
      .wuliu {
        border: 0.5px solid rgb(212, 201, 201);
        height: 50px;
        margin-top: 30px;
        display: flex;
        i {
          margin-top: 5px;
          font-size: 40px;
          margin-left: 20px;
          color: rgb(124, 199, 199);
        }
        span {
          font-size: 15px;
          margin-left: 10px;
          margin-top: 15px;
          font-weight: 600;
          color: rgb(124, 199, 199);
        }
      }
      .showcontent {
        // border: 1px solid black;
        background-color: rgba(207, 205, 202, 0.6);
        display: none;
        .small {
          // border: 1px solid aqua;
          margin: 10px auto;
          width: 600px;
          background-color: white;
          border-radius: 15px;
          height: 250px;
          display: flex;
          .ibox {
            // border: 1px solid black;
            height: 180px;
            width: 180px;
            display: flex;
            margin-left: 40px;
            border-radius: 15px;
            overflow: hidden;
            margin-top: 20px;
          }
          .limian {
            // border: 1px solid black;
            width: 360px;
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            text-align: left;
            h4 {
              margin: 15px 0px 0px 20px;
              color: black;
              font-size: 18px;
            }
            #liang {
              margin: 15px 0px 0px 20px;
              font-weight: 600;
              color: black;
            }
            #liang2 {
              margin-left: auto;
              font-weight: 600;
              color: black;
            }
            .server {
              margin-top: 5px;
              display: flex;
              span {
                color: red;
                margin: 10px 0px 0px 25px;
                font-size: 13px;
                border: 1px solid red;
                border-radius: 5px;
              }
            }
            .server1 {
              display: flex;
              margin: 10px auto;
              width: 350px;
              background-color: rgb(214, 211, 205);
              i {
                font-size: 25px;
                margin-left: 5px;
              }
              i:hover {
                color: red;
              }
              span:nth-of-type(1) {
                font-weight: 600;
              }
              span:nth-of-type(1):hover {
                color: red;
                cursor: pointer;
              }
              span:nth-of-type(2) {
                margin-left: 10px;
                color: black;
              }
            }
            .buttons {
              margin-top: 15px;
              display: flex;
              margin-left: auto;
              margin-right: 10px;
              button {
                width: 100px;
                height: 30px;
                margin-left: 10px;
                border-radius: 15px;
                font-weight: 600;
              }
              button:nth-of-type(2) {
                color: red;
                border-color: red;
              }
              button:hover {
                cursor: pointer;
                color: rgb(241, 127, 20);
                border-color: rgb(241, 201, 20);
              }
            }
          }
        }
      }
      .showcontent2 {
        // border: 1px solid black;
        background-color: rgba(207, 205, 202, 0.6);
        display: none;
        .small {
          // border: 1px solid aqua;
          margin: 10px auto;
          width: 600px;
          background-color: white;
          border-radius: 15px;
          height: 250px;
          display: flex;
          .ibox {
            // border: 1px solid black;
            height: 180px;
            width: 180px;
            display: flex;
            margin-left: 40px;
            border-radius: 15px;
            overflow: hidden;
            margin-top: 20px;
          }
          .limian {
            // border: 1px solid black;
            width: 360px;
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            text-align: left;
            h4 {
              margin: 15px 0px 0px 20px;
              color: black;
              font-size: 18px;
            }
            #liang {
              margin: 15px 0px 0px 20px;
              font-weight: 600;
              color: black;
            }
            #liang2 {
              margin-left: auto;
              font-weight: 600;
              color: black;
            }
            .server {
              margin-top: 5px;
              display: flex;
              span {
                color: red;
                margin: 10px 0px 0px 25px;
                font-size: 13px;
                border: 1px solid red;
                border-radius: 5px;
              }
            }
            .server1 {
              display: flex;
              margin: 10px auto;
              width: 350px;
              background-color: rgb(214, 211, 205);
              i {
                font-size: 25px;
                margin-left: 5px;
              }
              i:hover {
                color: red;
              }
              span:nth-of-type(1) {
                font-weight: 600;
              }
              span:nth-of-type(1):hover {
                color: red;
                cursor: pointer;
              }
              span:nth-of-type(2) {
                margin-left: 10px;
                color: black;
              }
            }
            .buttons {
              margin-top: 15px;
              display: flex;
              margin-left: auto;
              margin-right: 10px;
              button {
                width: 100px;
                height: 30px;
                margin-left: 10px;
                border-radius: 15px;
                font-weight: 600;
              }
              button:nth-of-type(2) {
                color: red;
                border-color: red;
              }
              button:hover {
                cursor: pointer;
                color: rgb(241, 127, 20);
                border-color: rgb(241, 201, 20);
              }
            }
          }
        }
      }
    }
    .rightbox {
      // border: 1px solid black;
      width: 350px;
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      margin-left: 30px;
      span {
        font-size: 30px;
        font-weight: 600;
        background-color: greenyellow;
      }
    }
  }
}
</style>