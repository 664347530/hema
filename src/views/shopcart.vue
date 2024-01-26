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
      <div class="tophead">
        <span>购物车</span>
        <span>已选商品(不包含运费)</span>
        <span>{{ this.all }}</span>
        <button @click="jiesuan">结算</button>
      </div>
      <table border="1" style="width: 100%">
        <el-empty
          description=" 您的购物车空空如也!"
          v-if="goods == ''"
        ></el-empty>
        <thead v-else>
          <tr style="border: none">
            <th>
              <input
                type="checkbox"
                v-model="isAll"
                @change="toggleSelectAll"
              />全选
            </th>
            <th>商品信息</th>
            <th>商品名称</th>
            <th>数量</th>
            <th>金额</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(good, index) in goods" :key="index">
            <th>
              <input
                type="checkbox"
                v-model="good.stute"
                @change="toggleSelectOne(index)"
              />
            </th>
            <th>
              <div class="imgbox">
                <img :src="'/showproduct/' + good.img" />
              </div>
            </th>
            <th>{{ good.jieshao }}</th>
            <th>
              <div class="jiajianbox">
                <button
                  @click="del"
                  :data-id="index"
                  :data-gid="good.productid"
                >
                  -
                </button>
                <span class="sp2">{{ good.num }}</span>
                <button
                  @click="add"
                  :data-id="index"
                  :data-gid="good.productid"
                >
                  +
                </button>
              </div>
            </th>
            <th class="p6">￥{{ good.num * good.price }}</th>
            <th>
              <button>
                <i
                  class="el-icon-delete-solid"
                  @click="delet"
                  :data-de="index"
                ></i>
              </button>
            </th>
          </tr>
        </tbody>
      </table>
      <div class="footer">
        <span
          ><input
            type="checkbox"
            v-model="isAll"
            @change="toggleSelectAll"
          />全选</span
        >
        <span>已选商品(不包含运费)</span>
        <span>{{ this.all }}</span>
        <button @click="jiesuan">结算</button>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import ShopHead from "../components/shophead.vue";
import Footer from "../components/footer.vue";
import axios from "axios";
import $ from "jquery";
export default {
  data() {
    return {
      num: 1,
      goods: [],
      isAll: false,
      all: 0,
    };
  },
  components: {
    ShopHead,
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
    jiesuan() {
      this.$router.push({ path: "/order" });
    },
    // 删除商品
    delet(index) {
      let productid = Number(index.target.dataset.de);
      axios({
        url: "/api/deletproduct",
        method: "post",
        data: {
          user_id: sessionStorage.getItem("user_id"),
          productid: this.lists[productid],
        },
      }).then((res) => {
        console.log(res.data);
        console.log(productid);
        this.$router.go(0);
        alert("删除成功");
      });
    },
    // 更新数量
    // 加
    add(index) {
      let add = Number(index.target.dataset.id);
      let num = Number($(index.target).siblings(".sp2").text());
      num++;
      $(index.target).siblings(".sp2").text(num);
      let total = this.pricelists[add] * num;
      $(index.target)
        .parent()
        .parent()
        .siblings(".p6")
        .text("￥" + total);
      let productid = index.target.dataset.gid;
      console.log(productid);
      axios({
        url: "/api/updateproduct",
        method: "post",
        data: {
          user_id: sessionStorage.getItem("user_id"),
          num: num,
          total: total,
          productid: productid,
        },
      }).then((res) => {
        console.log(res.data);
        this.$router.go(0);
      });
    },
    // 减
    del(index) {
      let del = Number(index.target.dataset.id);
      let num = Number($(index.target).siblings(".sp2").text());
      if (num > 1) {
        num--;
        $(index.target).siblings(".sp2").text(num);
        var total = this.pricelists[del] * num;
        $(index.target)
          .parent()
          .parent()
          .siblings(".p6")
          .text("￥" + total);
      } else {
        alert("不能再少了");
      }
      let productid = index.target.dataset.gid;
      console.log(index.target.dataset.id);
      axios({
        url: "/api/updateproduct",
        method: "post",
        data: {
          user_id: sessionStorage.getItem("user_id"),
          num: num,
          total: total,
          productid: productid,
        },
      }).then((res) => {
        console.log(res.data);
        this.$router.go(0);
      });
    },
    // 全选
    toggleSelectAll() {
      for (let good of this.goods) {
        good.stute = this.isAll;
      }
      axios({
        url: "/api/selectcheck",
        method: "post",
        data: {
          user_id: sessionStorage.getItem("user_id"),
          stute: this.isAll ? 1 : 0,
        },
      }).then((res) => {
        console.log(res.data.data);
      });
      this.All();
    },
    // 反选
    toggleSelectOne(index) {
      if (this.goods.every((good) => good.stute)) {
        this.isAll = true;
      } else {
        this.isAll = false;
      }
      axios({
        url: "/api/cancelcheck",
        method: "post",
        data: {
          user_id: sessionStorage.getItem("user_id"),
          stute: this.goods[index].stute ? 1 : 0,
          productid: this.goods[index].productid,
        },
      }).then((res) => {
        console.log(res.data.data);
      });
      this.All();
    },
    // 算总价
    All() {
      let total = 0;
      for (let z of this.goods) {
        if (z.stute) {
          total += z.num * z.price;
        }
      }
      this.all = total;
    },
  },
  mounted() {
    axios({
      url: "/api/xuanshopcart",
      method: "get",
      params: {
        user_id: sessionStorage.getItem("user_id"),
      },
    }).then((res) => {
      this.goods = res.data.data;
      var list = [];
      var pricelist = [];
      for (let x of res.data.data) {
        list.push(x.productid);
      }
      for (let y of res.data.data) {
        pricelist.push(y.price);
      }
      this.lists = list;
      this.pricelists = pricelist;
      this.All();
    });
  },
  computed: {},
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
    width: 1300px;
    // height: 500px;
    border: 1px solid black;
    margin: 0px auto;
    background-color: white;
    border-radius: 25px;
    .el-empty {
      height: 600px;
    }
    .tophead {
      display: flex;
      border: 1px solid black;
      height: 80px;
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
      span {
        margin: 25px 0px 0px 20px;
        font-size: 20px;
        font-weight: 600;
        color: black;
      }
      span:nth-of-type(2) {
        margin-left: auto;
        font-size: 15px;
        color: black;
        margin-top: 30px;
      }
      span:nth-of-type(3) {
        margin-top: 30px;
        color: rgb(245, 39, 66);
      }
      button {
        height: 60px;
        width: 80px;
        margin-right: 20px;
        margin-left: 10px;
        margin-top: 12px;
        border-radius: 30px;
        border: none;
        background-color: rgb(255, 80, 0);
        font-size: 15px;
        color: white;
      }
    }
    table {
      // border-collapse: collapse;
      tbody {
        tr:nth-of-type(2n) {
          background-color: rgb(32, 128, 238, 0.2);
        }
        tr:nth-of-type(2n + 1) {
          background-color: rgba(124, 126, 128, 0.2);
        }
        tr:hover {
          background-color: beige;
          cursor: pointer;
        }
        th {
          // border: none;
          color: black;
          .imgbox {
            display: flex;
            width: 200px;
            height: 200px;
            margin: 0px auto;
          }
        }
        th:nth-of-type(6) {
          button {
            border: none;
            i {
              font-size: 30px;
              color: red;
            }
          }
          button:hover {
            cursor: pointer;
          }
        }
        th:nth-of-type(4) {
          .jiajianbox {
            height: 50px;
            width: 150px;
            margin: 0px auto;
            button:nth-of-type(1) {
              margin-top: 15px;
              height: 30px;
              width: 30px;
              margin-right: 15px;
            }
            button:nth-of-type(2) {
              margin-top: 15px;
              height: 30px;
              width: 30px;
              margin-left: 15px;
            }
          }
        }
      }
    }
    .footer {
      display: flex;
      border: 1px solid black;
      height: 80px;
      border-bottom-left-radius: 25px;
      border-bottom-right-radius: 25px;
      span {
        margin: 25px 0px 0px 20px;
        font-size: 20px;
        font-weight: 600;
        color: black;
      }
      span:nth-of-type(2) {
        margin-left: auto;
        font-size: 15px;
        color: black;
        margin-top: 30px;
      }
      span:nth-of-type(3) {
        margin-top: 30px;
        color: rgb(245, 39, 66);
      }
      button {
        height: 60px;
        width: 80px;
        margin-right: 20px;
        margin-left: 10px;
        margin-top: 12px;
        border-radius: 30px;
        border: none;
        background-color: rgb(255, 80, 0);
        font-size: 15px;
        color: white;
      }
    }
  }
}
</style>