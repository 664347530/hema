<template>
  <div class="app">
    <div class="datapage">
      <div class="top">
        <div class="left">
          <button><i class="el-icon-delete">批量删除</i></button>
          <button @click="add">
            <i class="el-icon-circle-plus-outline">添加</i>
          </button>
          <button><i class="el-icon-upload">导出数据</i></button>
        </div>
        <div class="right">
          <input
            type="text"
            placeholder="输入您要查询的商品信息"
            v-model="xinxi"
          />
          <button @click="searchproduct"><i class="el-icon-search"></i></button>
        </div>
      </div>
      <div class="bodys">
        <table border="1">
          <tr>
            <th>商品ID</th>
            <th>价格</th>
            <th>图片</th>
            <th>商品名</th>
            <th>商品类型</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
          <tr v-for="(good, index) in goods" :key="index">
            <th v-if="istrue != index">{{ good.productid }}</th>
            <th v-else><input type="text" v-model="good.productid" /></th>
            <th v-if="istrue != index">￥{{ good.price }}</th>
            <th v-else><input type="text" v-model="good.price" /></th>
            <th>
              <div class="imgbox">
                <img :src="'/showproduct/' + good.img" />
              </div>
            </th>
            <th v-if="istrue != index">{{ good.jieshao }}</th>
            <th v-else><input type="text" v-model="good.jieshao" /></th>
            <th v-if="istrue != index">{{ good.type }}</th>
            <th v-else>
              <el-select
                v-model="type"
                placeholder="请选择"
                style="width: 100px"
              >
                <el-option
                  v-for="item in types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </th>
            <th v-if="istrue != index">
              <span>{{ good.stute }}</span>
            </th>
            <th v-else>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </th>
            <th>
              <button @click="gai(index)" v-if="istrue != index">修改</button>
              <button @click="cun(index)" v-else>保存</button>
              <i class="el-icon-delete-solid" @click="sanchu(index)"></i>
            </th>
          </tr>
        </table>
      </div>
      <div class="numpage">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          page-size="5"
          @current-change="huan"
        >
        </el-pagination>
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
      page: 1,
      total: 0,
      istrue: -1,
      productid: "",
      price: "",
      xinxi: "",
      jieshao: "",
      type: "cloth",
      stute: "",
      options: [
        {
          value: "在售",
        },
        {
          value: "售罄",
        },
      ],
      value: "在售",
      types: [
        { value: "cloth" },
        { value: "food" },
        { value: "sport" },
        { value: "phone" },
        { value: "wuping" },
      ],
    };
  },
  mounted() {
    axios({
      url: "/api/productpage",
      method: "post",
      data: {
        page: this.page,
      },
    }).then((res) => {
      this.goods = res.data.data;
    });
    // 商品页数
    axios({
      url: "/api/pageproduct",
      method: "post",
    }).then((res) => {
      this.total = res.data.data[0].total;
      console.log(res.data);
    });
  },
  methods: {
    huan(page) {
      axios({
        url: "/api/productpage",
        method: "post",
        data: {
          page: page,
        },
      }).then((res) => {
        this.goods = res.data.data;
        console.log(res.data);
      });
    },
    sanchu(index) {
      axios({
        url: "/api/deletepro",
        method: "post",
        data: {
          productid: this.goods[index].productid,
        },
      }).then((res) => {
        alert("删除成功");
        this.$router.go(0);
      });
    },
    gai(index) {
      this.istrue = index;
    },
    cun(index) {
      this.istrue = -1;
      let productid = this.goods[index].productid;
      let price = this.goods[index].price;
      let jieshao = this.goods[index].jieshao;
      axios({
        url: "/api/upproduct",
        method: "post",
        data: {
          productid: productid,
          price: price,
          jieshao: jieshao,
          type: this.type,
          stute: this.value,
        },
      }).then((res) => {
        this.$router.go(0);
      });
    },
    add() {
      this.$router.push({ path: "/addproduct" });
    },
    searchproduct() {
      axios({
        url: "/api/searchproduct",
        method: "post",
        data: {
          searchkey: this.xinxi,
        },
      }).then((res) => {
        if (!res.data.data || res.data.data.length === 0) {
          // 如果为空，弹出提示消息
          alert("没有找到相关商品");
        } else {
          // 如果不为空，更新 this.goods
          this.goods = res.data.data;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.app {
  .datapage {
    width: 1410px;
    height: 690px;
    background-color: #9ac1f0;
    position: absolute;
    top: 100px;
    right: 15px;
    display: flex;
    flex-direction: column;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    overflow: auto;
    .top {
      //   border: 1px solid black;
      height: 50px;
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      .left {
        display: flex;
        // border: 1px solid black;
        button:nth-of-type(1) {
          width: 80px;
          border: none;
          background-color: rgb(255, 72, 0);
          color: white;
          font-weight: 600;
          margin-left: 30px;
        }
        button:nth-of-type(2) {
          color: white;
          font-weight: 600;
          background-color: rgb(0, 151, 138);
          width: 80px;
          margin-left: 20px;
          border: none;
        }
        button:nth-of-type(3) {
          color: white;
          font-weight: 600;
          background-color: rgb(255, 180, 0);
          width: 80px;
          margin-left: 20px;
          border: none;
        }
        button:hover {
          cursor: pointer;
        }
      }
      .right {
        // border: 1px solid black;
        width: 400px;
        display: flex;
        input {
          width: 320px;
        }
        button {
          width: 80px;
          background-color: rgb(0, 161, 255);
          border: none;
          font-size: 25px;
        }
        button:hover {
          cursor: pointer;
        }
      }
    }
    .bodys {
      // border: 1px solid black;
      height: 590px;
      overflow: auto;
      table {
        width: 1350px;
        border-collapse: collapse;
        border-color: rgb(161, 151, 151);
        margin: 10px auto;
        background-color: white;
        border-radius: 10px;
        tr:nth-of-type(1) {
          height: 30px;
          background: #ccc;
          th {
            color: rgb(5, 5, 5);
          }
        }
        tr:nth-of-type(2) {
          th:nth-of-type(3) {
            width: 200px;
          }
        }
        tr:nth-of-type(2) {
          th:nth-of-type(6) {
            width: 100px;
          }
        }
        tr {
          th {
            color: black;
            button {
              width: 50px;
              height: 50px;
              font-weight: 600;
            }
            i {
              font-size: 20px;
              margin-left: 10px;
            }
            i:hover {
              color: red;
            }
          }
        }
        tr:hover {
          background: #cc0;
          cursor: pointer;
        }
      }
    }
    .numpage {
      // border: 1px solid black;
      height: 30px;
    }
  }
}
.imgbox {
  // border: 1px solid black;
  height: 100px;
  width: 100px;
  margin: 0px auto;
  display: flex;
}
span {
  // border: 1px solid black;
  font-size: 20px;
  color: blue;
}
</style>