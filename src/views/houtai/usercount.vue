<template>
  <div class="app">
    <div class="datapage">
      <span>用户账号管理</span>
      <div class="yonghu">
        <table border="1">
          <tr>
            <th>用户ID</th>
            <th>用户名</th>
            <th>用户密码</th>
            <th>用户邮箱</th>
            <th>用户电话</th>
            <th>操作</th>
          </tr>
          <tr v-for="(good, index) in goods" :key="index">
            <th>{{ good.user_id }}</th>
            <th>{{ good.username }}</th>
            <th>{{ good.password|gai}}</th>
            <th>{{ good.email }}</th>
            <th>{{ good.phone }}</th>
            <th>
              <button v-if="good.stute == 1" @click="dongjie(index)">
                账号冻结
              </button>
              <button
                v-else
                @click="jiefen(index)"
                style="background-color: #48e40a; color: white"
              >
                账号解封
              </button>
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
      goods: {},
    };
  },
  mounted() {
    axios({
      url: "/api/selectyh",
      method: "get",
    }).then((res) => {
      this.goods = res.data.data;
      console.log(res.data.data);
    });
  },
  methods: {
    dongjie(index) {
      axios({
        url: "/api/dongcount",
        method: "post",
        data: {
          user_id: this.goods[index].user_id,
          stute: 0,
        },
      }).then((res) => {
        this.$message({
          showClose: true,
          message: "账号正在冻结",
        });
        this.$router.go(0);
      });
    },
    jiefen(index) {
      axios({
        url: "/api/dongcount",
        method: "post",
        data: {
          user_id: this.goods[index].user_id,
          stute: 1,
        },
      }).then((res) => {
        this.$message({
          showClose: true,
          message: "账号已解封",
          type: "success",
        });
        this.$router.go(0);
      });
    },
  },
  filters:{
    gai(val){
      // 字符串截取
      return `${val.substring(0,3)}***${val.substring(val.length-2)}`
    }
  }
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
    span {
      font-size: 25px;
      color: black;
    }
    .yonghu {
      // border: 1px solid black;
      margin-top: 10px;
      table {
        width: 1390px;
        border-collapse: collapse;
        background-color: #ffffff;
        margin: 0px auto;
        tr:nth-of-type(1) {
          background: #ccc;
          color: black;
          height: 40px;
          th {
            font-weight: 600;
          }
        }
        tr {
          color: black;
          height: 40px;
        }
        tr:hover {
          background: #cc0;
          cursor: pointer;
        }
        th {
          font-weight: normal;
          line-height: 25px;
          button {
            width: 70px;
            height: 50px;
            border-radius: 15px;
            margin-right: 10px;
            border: none;
            font-weight: 600;
            background-color: rgb(14, 193, 248);
            color: black;
          }
          #bao {
            background-color: #f6c445;
          }
          i {
            font-size: 25px;
            margin-left: 10px;
            color: red;
          }
          i:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>