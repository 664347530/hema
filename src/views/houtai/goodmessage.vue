<template>
  <div class="app">
    <div class="datapage">
      <div class="head">
        <div class="type">
          <span>订单状态:</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="topsearch">
          <span>订单编号:</span>
          <input type="text" placeholder="请输入订单编号" v-model="keywords" />
          <button @click="search" v-if="istrue != -1">查询</button>
          <button v-else @click="cancel">取消</button>
        </div>
      </div>
      <div class="content">
        <table border="1">
          <tr>
            <th>订单编号</th>
            <th>用户ID</th>
            <th>用户名</th>
            <th>收货地址</th>
            <th>下单时间</th>
            <th>总价</th>
            <th>联系方式</th>
            <th>商品ID</th>
            <th>数量</th>
            <th>支付状态</th>
            <th>订单状态</th>
            <th>操作</th>
          </tr>
          <tr v-for="(good, index) in goods" :key="index" class="t1">
            <th>{{ good.order_id }}</th>
            <th>{{ good.user_id }}</th>
            <th>{{ good.username }}</th>
            <th>{{ good.dizhi }}</th>
            <th>下单时间:{{ (good.time + "").substring(0, 10) }}</th>
            <th>￥{{ good.total }}</th>
            <th>{{ good.phone }}</th>
            <th>{{ good.productid }}</th>
            <th>{{ good.num }}件</th>
            <th>{{ good.zhuangtai }}</th>
            <th>{{ good.logistics }}</th>
            <th>
              <button @click="fahuo(index)" v-if="good.logistics=='未发货'">发货</button>
              <button v-else style="background:rgb(103,194,58)">已发货</button>
            </th>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "已发货",
        },
        {
          value: "选项2",
          label: "未发货",
        },
      ],
      value: "",
      goods: {},
      keywords: "",
      istrue: 1,
    };
  },
  mounted() {
    axios({
      url: "/api/vieworder",
      method: "post",
    }).then((res) => {
      this.goods = res.data.data;
      console.log(res.data.data);
    });
  },
  methods: {
    search() {
      if (this.keywords == null) {
        alert("没有此订单");
      }
      axios({
        url: "/api/searchorder",
        method: "post",
        data: {
          order_id: this.keywords,
        },
      }).then((res) => {
        this.goods = res.data.data;
        this.istrue = -1;
      });
    },
    cancel() {
      this.istrue = 1;
      axios({
        url: "/api/vieworder",
        method: "post",
      }).then((res) => {
        this.goods = res.data.data;
        console.log(res.data.data);
        this.keywords = null;
      });
    },
    fahuo(index) {
      axios({
        url: "/api/updateorder",
        method: "post",
        data: {
          user_id: this.goods[index].user_id,
          productid: this.goods[index].productid,
        },
      }).then((res) => {
        this.$message({
          showClose: true,
          message: "订单正在发货",
          type: "success",
        });
        this.$router.go(0);
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
    .head {
      //   border: 1px solid black;
      height: 45px;
      display: flex;
      margin-top: 10px;
      .type {
        // border: 1px solid black;
        margin-left: 20px;
        width: 310px;
        display: flex;
        background-color: white;
        border-top-left-radius: 10px;
        span {
          margin: 8px 0px 0px 20px;
          color: black;
          font-weight: 600;
        }
      }
      .topsearch {
        //   border: 1px solid black;
        width: 380px;
        background-color: white;
        display: flex;
        span {
          margin: 8px 0px 0px 20px;
          color: black;
          font-weight: 600;
        }
        input {
          margin-left: 10px;
          font-size: 18px;
          // border-color: white;
          outline: none;
        }
        input:focus {
          outline: none;
        }
        button {
          width: 57.5px;
          border: none;
          color: white;
          font-weight: 600;
          background-color: rgb(30, 159, 255);
          border-radius: 2px;
        }
        button:hover {
          cursor: pointer;
        }
      }
    }
    .content {
      // border: 1px solid black;
      height: 650px;
      width: 1370px;
      margin: 0px auto;
      overflow: auto;
      table {
        width: 1350px;
        border-collapse: collapse;
        border-color: white;
        margin: 10px auto;
        tr:nth-of-type(1) {
          height: 30px;
          background: #ccc;
          th {
            color: rgb(5, 5, 5);
          }
        }
        tr:hover {
          cursor: pointer;
          background: #cc0;
        }
        .t1 {
          th {
            font-weight: 400;
            color: black;
            background-color: rgb(223, 215, 215, 0.7);
            line-height: 50px;
            i:hover {
              color: red;
              cursor: pointer;
            }
            button {
              width: 50px;
              height: 35px;
              background-color: rgb(30, 159, 255);
              border: none;
              border-radius: 10px;
              color: white;
              font-weight: 400;
            }
            button:hover {
              cursor: pointer;
              background-color: rgb(156, 207, 247);
            }
          }
        }
      }
    }
  }
}
</style>