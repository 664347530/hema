<template>
  <div class="app">
    <ShopHead></ShopHead>
    <div class="head">
      <img src="../sucai/footerlogo.png" @click="back" />
      <div class="inputbox">
        <input type="text" class="box-input" @click="sou" />
        <i class="el-icon-s-data" @click="back">热搜榜</i>
        <i class="el-icon-search"></i>
      </div>
      <button @click="goes">
        <i class="el-icon-shopping-cart-2">购物车</i>
      </button>
    </div>
    <div class="centers">
      <div class="kuang">
        <div class="left">
          <img :src="'/showproduct/' + goods.img" />
          <!-- 鼠标层罩 -->
          <div v-show="topShow" class="top" :style="topStyle"></div>
          <!-- 最顶层覆盖了整个原图空间的透明层罩 -->
          <div
            class="maskTop"
            @mouseenter="enterHandler"
            @mousemove="moveHandler"
            @mouseout="outHandler"
          ></div>
        </div>
        <div v-show="rShow" class="right">
          <img
            :style="r_img"
            class="rightImg"
            :src="'/showproduct/' + goods.img"
            alt=""
          />
        </div>
      </div>
      <div class="rightbox">
        <span>{{ goods.jieshao }}</span>
        <div class="jishi">
          <span>新风潮·聚划算<span>距结束:</span></span>
          <el-row :gutter="20">
            <el-col :span="14">
              <el-card
                shadow="hover"
                style="
                  width: 180px;
                  background-color: transparent;
                  margin: 8px 25px 0px 0px;
                  border: none;
                "
              >
                <div style="width: 100%; display: inline-block">
                  <el-statistic :value="deadline2" time-indices> </el-statistic>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <div class="content">
            <h2>售价:</h2>
            <span>￥{{ goods.price }}</span>
            <span>前往查看更多优惠<i class="el-icon-arrow-right"></i></span>
          </div>
        </div>
        <hr />
        <div class="nums">
          <span v-if="goods.type == 'cloth'">尺码:</span>
          <span v-else-if="goods.type == 'food'">重量:</span>
          <span v-else>颜色</span>
          <div class="buttons" v-if="goods.type == 'cloth'">
            <button>美码S</button>
            <button>美码M</button>
            <button>美码L</button>
            <button>美码XL</button>
            <button>美码2XL</button>
            <button>美码3XL</button>
          </div>
          <div class="buttons" v-else-if="goods.type == 'food'">
            <button>1斤</button>
            <button>5斤</button>
            <button>10斤</button>
            <button>15斤</button>
            <button>20斤</button>
            <button>25斤</button>
          </div>
          <div class="buttons" v-else>
            <button>黑色</button>
            <button>棕色</button>
            <button>蓝色</button>
            <button>淡粉</button>
            <button>橙蓝</button>
            <button>玫红</button>
          </div>
        </div>
        <div class="shop">
          <el-button :plain="true" @click="addshopcart">加入购物车</el-button>
          <el-button>立即购买</el-button>
        </div>
        <div class="shuoming">
          <h4>说明:</h4>
          <span><i class="el-icon-circle-check">正品保障</i></span>
          <span><i class="el-icon-circle-check">支持七天无理由退货</i></span>
          <span><i class="el-icon-circle-check">包运费险</i></span>
        </div>
      </div>
    </div>
    <div class="remarkbox">
      <i class="el-icon-chat-line-round">客户留言</i>
      <el-empty description=" 暂时还没有留言哟!" v-if="marks == ''"></el-empty>
      <div class="neirong" v-for="(mark, index) in marks" :key="index" v-else>
        <div class="yi">
          <i class="el-icon-user-solid"></i>
          <h4>{{ mark.name }}:</h4>
          <span>{{ mark.neirong }}</span>
        </div>
        <div class="er">
          <em>{{ (mark.time + "").substring(0, 10) }}</em>
        </div>
      </div>
    </div>
    <Daohang :productid="goods.productid"></Daohang>
    <Footer></Footer>
  </div>
</template>

<script>
import ShopHead from "../components/shophead.vue";
import Footer from "../components/footer.vue";
import Daohang from "../components/daohang.vue";
import axios from "axios";
export default {
  data() {
    return {
      deadline2: Date.now() + 1000 * 60 * 60 * 1,
      goods: {},
      marks: {},
      topStyle: { transform: "" },
      r_img: {},
      topShow: false,
      rShow: false,
    };
  },
  components: {
    ShopHead,
    Footer,
    Daohang,
  },
  mounted() {
    axios({
      url: "/api/xiangqing",
      method: "get",
      params: {
        productid: this.$route.query.productid,
      },
    }).then((res) => {
      console.log(res.data);
      this.goods = res.data.data;
    });
    // 评论
    axios({
      url: "/api/selectmark",
      method: "post",
      data: {
        productid: this.$route.query.productid,
      },
    }).then((res) => {
      this.marks = res.data.data;
      console.log(res.data.data);
    });
  },
  methods: {
    sou() {
      this.$router.push({ path: "/search" });
    },
    back() {
      this.$router.push({ path: "/shoppage" });
    },
    goes() {
      this.$router.push({ path: "/shopcart" });
    },
    addshopcart(){
      axios({
        url: "/api/addshopcart",
        method: "get",
        params: {
          goods: this.goods,
          
          user_id: sessionStorage.getItem("user_id"),
        },
      }).then((res) => {
        console.log(res.data);
        this.$message({
          showClose: true,
          message: "加入购物车成功",
          type: "success",
        });
        this.$router.push({ path: "/allproduct" });
      });
    },
    // 鼠标进入原图空间函数
    enterHandler() {
      // 层罩及放大空间的显示
      this.topShow = true;
      this.rShow = true;
    },
    // 鼠标移动函数
    moveHandler(event) {
      // 鼠标的坐标位置
      let x = event.offsetX;
      let y = event.offsetY;
      // 层罩的左上角坐标位置，并对其进行限制：无法超出原图区域左上角
      let topX = x - 100 < 0 ? 0 : x - 100;
      let topY = y - 100 < 0 ? 0 : y - 100;
      // 对层罩位置再一次限制，保证层罩只能在原图区域空间内
      if (topX > 400) {
        topX = 400;
      }
      if (topY > 400) {
        topY = 400;
      }
      // 通过 transform 进行移动控制
      this.topStyle.transform = `translate(${topX}px,${topY}px)`;
      this.r_img.transform = `translate(-${2 * topX}px,-${2 * topY}px)`;
    },
    // 鼠标移出函数
    outHandler() {
      // 控制层罩与放大空间的隐藏
      this.topShow = false;
      this.rShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.app {
  .head {
    // border: 1px solid black;
    background-color: rgb(4, 63, 126);
    display: flex;
    img {
      margin-left: 330px;
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
        color: rgb(36, 197, 197);
      }
    }
    button:hover {
      cursor: pointer;
    }
  }
  .centers {
    margin: 0 auto;
    width: 1300px;
    height: 640px;
    display: flex;
    .kuang {
      position: relative;
      /* 放大的图片，通过定位将左上角定位到(0,0) */
      .rightImg {
        display: inline-block;
        width: 1400px;
        height: 1400px;
        position: absolute;
        top: 0;
        left: 0;
        // border: 1px solid black;
      }
      /* 右边的区域图片放大空间 */
      .right {
        margin-left: 412px;
        width: 600px;
        height: 600px;
        position: absolute;
        overflow: hidden;
        // border: 1px solid black;
        left: 190px;
        z-index: 100;
      }
      /* 一个最高层层罩 */
      .maskTop {
        width: 600px;
        height: 600px;
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        // border: 1px solid black;
      }
      /* 层罩，通过定位将左上角定位到(0,0) */
      .top {
        width: 200px;
        height: 200px;
        background-color: lightcoral;
        opacity: 0.4;
        position: absolute;
        top: 0;
        left: 0;
        // border: 1px solid black;
      }
      /* 原图的显示 */
      .leftImg {
        width: 600px;
        height: 600px;
        display: inline-block;
      }
      /* 原图的容器 */
      .left {
        width: 600px;
        height: 600px;
        float: left;
        position: relative;
        // border: 1px solid black;
        overflow: hidden;
        display: flex;
      }
    }
    .rightbox {
      display: flex;
      // border: 1px solid black;
      width: 700px;
      height: 630px;
      flex-direction: column;
      border-radius: 15px;
      span:nth-of-type(1) {
        text-align: left;
        font-size: 25px;
        font-weight: 600;
        color: black;
        margin: 20px 0px 0px 30px;
        border-bottom: 1px solid rgb(158, 161, 161);
        width: 600px;
        padding-bottom: 10px;
      }
      .jishi {
        // border: 1px solid black;
        width: 500px;
        height: 200px;
        margin-top: 10px;
        margin-left: 30px;
        border-radius: 15px;
        background: linear-gradient(
          to right,
          rgb(242, 44, 73),
          rgb(253, 240, 129)
        );
        display: flex;
        span {
          text-align: left;
          span {
            font-size: 20px;
            border: none;
          }
        }
        .content {
          // border: 1px solid black;
          position: absolute;
          top: 270px;
          background-color: white;
          width: 400px;
          height: 80px;
          margin-left: 35px;
          border-radius: 10px;
          display: flex;
          h2 {
            margin: 20px 0px 0px 20px;
            width: 90px;
          }
          span {
            color: rgb(242, 44, 73);
            border: none;
            text-align: left;
            width: 80px;
            margin: 20px 0px 0px 0px;
          }
          span:nth-of-type(2) {
            margin: 35px 0px 0px 20px;
            // border: 1px solid black;
            width: 150px;
            font-size: 10px;
          }
          span:nth-of-type(2):hover {
            cursor: pointer;
          }
        }
      }
      hr {
        width: 610px;
        margin-left: 25px;
        margin-top: 10px;
      }
      .nums {
        // border: 1px solid black;
        display: flex;
        width: 600px;
        // margin: 0px auto;
        flex-wrap: wrap;
        margin-top: 30px;
        span {
          width: 60px;
          margin-top: 60px;
          font-size: 20px;
          font-weight: 400;
          color: rgb(96, 102, 102);
          border: none;
        }
        .buttons {
          width: 450px;
          // border: 1px solid black;
        }
        button {
          width: 100px;
          height: 50px;
          margin-left: 20px;
          margin-top: 20px;
          border-radius: 4px;
          border: 1px solid rgb(203, 206, 209);
        }
        button:hover {
          border: 1px solid black;
        }
      }
      .shop {
        // border: 1px solid black;
        display: flex;
        margin-left: 70px;
        margin-top: 40px;
        button {
          width: 200px;
          height: 60px;
          margin-left: 20px;
        }
        .el-button:nth-of-type(1) {
          border-top-left-radius: 15px;
          border-bottom-left-radius: 15px;
          background: linear-gradient(
            to right,
            rgb(242, 44, 73),
            rgb(253, 240, 129)
          );
          font-size: 20px;
          font-weight: 600;
          color: white;
        }
        button:nth-of-type(2) {
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          background: linear-gradient(
            to right,
            rgb(253, 240, 129),
            rgb(242, 44, 73)
          );
          font-size: 20px;
          font-weight: 600;
          color: white;
        }
      }
      .shuoming {
        // border: 1px solid black;
        margin-top: 20px;
        display: flex;
        h4 {
          color: black;
          margin-left: 25px;
        }
        span {
          border: none;
          font-size: 13px;
          width: 100px;
          // border: 1px solid black;
          margin: auto 0px;
        }
        span:nth-of-type(2) {
          width: 140px;
        }
        span:nth-of-type(1) {
          // margin-top:10px ;
          height: 10px;
          text-align: center;
          margin-top: 5px;
        }
      }
    }
  }
  .remarkbox {
    // border: 1px solid black;
    width: 1685px;
    margin: 0px auto;
    display: flex;
    flex-direction: column;
    background-color: white;
    i {
      font-size: 20px;
      font-weight: 600;
      color: black;
      margin: 20px 0px 0px 240px;
      text-align: left;
    }
    .el-empty {
      height: 230px;
      display: flex;
    }
    .neirong {
      // border: 1px solid black;
      width: 1200px;
      margin: 0px auto;
      display: flex;
      justify-content: space-between;
      .yi {
        display: flex;
        margin-top: 10px;
        i {
          margin: 0px 0px;
        }
        h4 {
          color: black;
          margin-left: 10px;
        }
        span {
          margin-left: 10px;
          color: black;
          font-weight: 500;
        }
      }
      .er {
        width: 100px;
        // border: 1px solid black;
        display: flex;
        em {
          color: black;
        }
      }
    }
  }
}
</style>