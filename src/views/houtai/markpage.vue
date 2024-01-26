<template>
  <div class="app">
    <div class="datapage">
      <div class="top">
        <i class="el-icon-chat-dot-round">客户留言</i>
      </div>
      <div class="content">
        <table border="1">
          <tr>
            <th>用户ID</th>
            <th>商品ID</th>
            <th>评论内容</th>
            <th>评论者</th>
            <th>评论时间</th>
          </tr>
          <tr v-for="(mark, index) in marks" :key="index">
            <th>{{ mark.user_id }}</th>
            <th>{{ mark.productid }}</th>
            <th>{{ mark.neirong }}</th>
            <th>{{ mark.name }}</th>
            <th>{{ (mark.time + "").substring(0, 10) }}</th>
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
      marks: {},
    };
  },
  mounted() {
    axios({
      url: "/api/allmark",
      method: "get",
    }).then((res) => {
      this.marks = res.data.data;
    });
  },
  methods: {
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
      // border: 1px solid black;
      margin-top: 20px;
      display: flex;
      i {
        margin-left: 30px;
        font-size: 30px;
        color: black;
        font-weight: 600;
      }
    }
    .content {
    //   border: 1px solid black;
      width: 1340px;
      margin: 10px auto;
      table {
        width: 1340px;
        border-collapse: collapse;
        background-color: #ffffff;
        tr:nth-of-type(1) {
          height: 35px;
          background-color: rgb(204, 204, 204);
          color: black;
        }
        tr {
          height: 40px;
          th {
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
  }
}
</style>