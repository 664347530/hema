<template>
  <div class="app">
    <ShopHead></ShopHead>
    <div class="box">
      <div class="head">
        <img src="../sucai/footerlogo.png" alt="" />
        <div class="inputbox">
          <input type="text" class="box-input" placeholder="口红" @click="sou"/>
          <i class="el-icon-s-data">热搜榜</i>
          <i class="el-icon-search"></i>
        </div>
        <button @click="goes">
          <i class="el-icon-shopping-cart-2">购物车</i>
        </button>
      </div>
      <div class="bodybox">
        <el-carousel height="450px">
          <el-carousel-item v-for="item in images" :key="item">
            <img :src="require(`../sucai/shoppagesucai/${item.url}`)" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="shangping">
        <span>品类推荐</span>
        <div class="producttype" @click="all">
          <ul>
            <li><img src="../sucai/shoppagesucai/type1.jpg" alt="" /></li>
            <li><img src="../sucai/shoppagesucai/type2.jpg" alt="" /></li>
            <li><img src="../sucai/shoppagesucai/type3.jpg" alt="" /></li>
            <li><img src="../sucai/shoppagesucai/type4.jpg" alt="" /></li>
            <li><img src="../sucai/shoppagesucai/type5.jpg" alt="" /></li>
            <li><img src="../sucai/shoppagesucai/type6.jpg" alt="" /></li>
          </ul>
        </div>
      </div>
      <div class="tejia">
        <span>今日特惠 镇店之宝</span>
        <div class="zhengdian" @click="all">
          <ul>
            <li>
              <div class="dianbao">
                <div class="imgbox">
                  <img src="../sucai/shoppagesucai/zhengdian1.jpg" />
                </div>
                <div class="detail">
                  <span>￥79.77</span>
                  <span>镇店之宝</span>
                </div>
                <span>专业运动商品跳水价</span>
              </div>
            </li>
            <li>
              <div class="dianbao">
                <div class="imgbox">
                  <img src="../sucai/shoppagesucai/zhengdian2.jpg" />
                </div>
                <div class="detail">
                  <span>￥305.09</span>
                  <span>镇店之宝</span>
                </div>
                <span>舒适鞋靴降价</span>
              </div>
            </li>
            <li>
              <div class="dianbao">
                <div class="imgbox">
                  <img src="../sucai/shoppagesucai/zhengdian3.jpg" />
                </div>
                <div class="detail">
                  <span>￥39.09</span>
                  <span>镇店之宝</span>
                </div>
                <span>精美碟瓷降价</span>
              </div>
            </li>
            <li>
              <div class="dianbao">
                <div class="imgbox">
                  <img src="../sucai/shoppagesucai/zhengdian4.jpg" />
                </div>
                <div class="detail">
                  <span>￥134.92</span>
                  <span>镇店之宝</span>
                </div>
                <span>实用居家生活品惊喜价</span>
              </div>
            </li>
            <li>
              <div class="dianbao">
                <div class="imgbox">
                  <img src="../sucai/shoppagesucai/zhengdian5.jpg" />
                </div>
                <div class="detail">
                  <span>￥124.26</span>
                  <span>镇店之宝</span>
                </div>
                <span>畅销护肤美妆及健康营养品惊爆价</span>
              </div>
            </li>
            <li>
              <div class="dianbao">
                <div class="imgbox">
                  <img src="../sucai/shoppagesucai/zhengdian6.jpg" />
                </div>
                <div class="detail">
                  <span>￥77.97</span>
                  <span>镇店之宝</span>
                </div>
                <span>高科技电子数码降价</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <img src="../sucai/shoppagesucai/xiaoback.png" class="image1" />
      <div class="product">
        <span>部分产品展示</span>
        <span class="checkall" @click="all"
          >查看更多<i class="el-icon-arrow-right"></i
        ></span>
        <div class="allproduct">
          <ul>
            <li
              v-for="(good, index) in goods"
              :key="index"
              @click="gooddetail(good.productid)"
            >
              <div class="dianbao">
                <div class="imgbox">
                  <img :src="'/showproduct/' + good.img" />
                </div>
                <div class="detail">
                  <span>￥{{ good.price }}</span>
                  <span>促销</span>
                </div>
                <span>{{ good.jieshao }}</span>
              </div>
            </li>
          </ul>
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
      images: [
        { url: "background1.avif" },
        { url: "background2.avif" },
        { url: "background3.avif" },
      ],
      goods: {},
    };
  },
  components: {
    ShopHead,
    Footer,
  },
  mounted() {
    axios({
      url: "/api/showproduct",
      method: "get",
    }).then((res) => {
      this.goods = res.data.data;
      console.log(res.data.data);
    });
  },
  methods: {
    all() {
      this.$router.push({ path: "/allproduct" });
    },
    goes() {
      this.$router.push({ path: "/shopcart" });
    },
    sou(){
      this.$router.push({ path: "/search" });
    },
    gooddetail(productid) {
      this.$router.push({
        path: "/detail",
        query: {
          productid: productid,
        },
      });
    },
  },
  props: ["productid"], //只接收
};
</script>

<style lang="scss" scoped>
.app {
  .box {
    background-color: rgb(4, 63, 126);
  }
  .head {
    // border: 1px solid black;
    display: flex;
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
  .bodybox {
    .el-carousel img {
      width: 100%;
      height: 100%;
    }
  }
  .shangping {
    // border: 1px solid black;
    height: 280px;
    background-color: rgb(255, 255, 255);
    display: flex;
    width: 98%;
    margin-left: 15px;
    border-radius: 10px;
    flex-direction: column;
    span {
      font-size: 25px;
      color: black;
      font-weight: 600;
      margin: 10px 0px 0px 40px;
      text-align: left;
    }
    .producttype {
      // border: 1px solid black;
      height: 240px;
      display: flex;
      ul {
        display: flex;
        li {
          margin-top: 10px;
          list-style: none;
          margin-left: 40px;
          img {
            width: 225px;
            flex-direction: row;
            display: flex;
          }
        }
        li:hover {
          cursor: pointer;
        }
      }
    }
  }
  .tejia {
    height: 350px;
    background-color: rgb(255, 255, 255);
    display: flex;
    width: 98%;
    margin-left: 15px;
    margin-top: 20px;
    border-radius: 10px;
    flex-direction: column;
    span {
      font-size: 25px;
      color: black;
      font-weight: 600;
      margin: 10px 0px 0px 40px;
      text-align: left;
    }
    .zhengdian {
      // border: 1px solid black;
      height: 350px;
      display: flex;
      ul {
        display: flex;
        li {
          list-style: none;
          .dianbao {
            // border: 1px solid black;
            display: flex;
            width: 274px;
            justify-content: center;
            flex-direction: column;
            height: 300px;
            .imgbox {
              height: 300px;
              display: flex;
            }
            img {
              display: flex;
              width: 200px;
              justify-content: center;
              flex-direction: column;
              margin-left: 50px;
            }
            span {
              font-size: 15px;
              font-weight: 400;
            }
            .detail {
              display: flex;
              // border: 1px solid black;
              height: 40px;
              span {
                font-size: 17px;
                color: rgb(204, 12, 57);
              }
              span:nth-of-type(1) {
                background-color: rgb(204, 12, 57);
                color: white;
                border-radius: 5px;
                width: 150px;
              }
              span:nth-of-type(2) {
                margin-right: 40px;
                font-weight: 600;
                width: 130px;
              }
            }
          }
        }
        li:hover {
          cursor: pointer;
        }
      }
    }
  }
  .image1 {
    width: 100%;
    margin-top: 10px;
  }
  .product {
    // height: 350px;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    margin-top: -10px;
    span {
      font-size: 25px;
      color: black;
      font-weight: 600;
      margin: 10px 0px 0px 40px;
      text-align: left;
    }
    .checkall {
      position: absolute;
      left: 1500px;
      font-size: 15px;
      margin-top: 20px;
    }
    .checkall:hover {
      cursor: pointer;
      color: aquamarine;
    }
    .allproduct {
      // border: 1px solid black;
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          list-style: none;
          margin-top: 30px;
          // border: 1px solid black;
          .dianbao {
            // border: 1px solid black;
            display: flex;
            width: 274px;
            justify-content: center;
            flex-direction: column;
            height: 350px;
            z-index: 1;
            .imgbox {
              height: 300px;
              display: flex;
            }
            img {
              display: flex;
              width: 200px;
              justify-content: center;
              flex-direction: column;
              margin-left: 50px;
            }
            span {
              font-size: 15px;
              font-weight: 400;
            }
            .detail {
              display: flex;
              // border: 1px solid black;
              height: 40px;
              span {
                font-size: 17px;
                color: rgb(204, 12, 57);
              }
              span:nth-of-type(1) {
                color: black;
                border-radius: 5px;
                width: 150px;
              }
              span:nth-of-type(2) {
                margin-right: 40px;
                font-weight: 600;
                width: 130px;
                background-color: rgb(204, 12, 57);
                text-align: center;
                color: white;
              }
            }
          }
        }
        li:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>