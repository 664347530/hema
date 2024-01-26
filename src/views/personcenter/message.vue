<template>
  <div class="app">
    <h3>基本信息</h3>
    <div class="xinx">
      <table border="1">
        <tr>
          <th>用户ID</th>
          <th>用户名称</th>
          <th>邮箱</th>
          <th>手机</th>
        </tr>
        <tr>
          <th>{{ goods[0].user_id }}</th>
          <th>{{ goods[0].username }}</th>
          <th>{{ goods[0].email }}</th>
          <th>{{ goods[0].phone }}</th>
        </tr>
      </table>
    </div>
    <div class="ti">
      <i class="el-icon-key"></i>
      <h4>账号安全</h4>
    </div>
    <div class="protect">
      <div class="shezhi1">
        <div class="imgbox">
          <img src="../../sucai/personphoto/messagelogo.png" alt="" />
        </div>
        <div class="nei">
          <h4>绑定我的邮箱</h4>
          <p>绑定邮箱后即可使用邮箱登录</p>
          <button>去绑定</button>
        </div>
      </div>
      <div class="shezhi1">
        <div class="imgbox">
          <img src="../../sucai/personphoto/phonelogo.png" alt="" />
        </div>
        <div class="nei">
          <h4>绑定我的手机</h4>
          <p>绑定手机后即可使用手机号登录</p>
          <button>去绑定</button>
        </div>
      </div>
      <div class="shezhi1">
        <div class="imgbox">
          <img src="../../sucai/personphoto/mibao.png" alt="" />
        </div>
        <div class="nei">
          <h4>设置密保</h4>
          <p>设置密保，账号更安全</p>
          <button>去设置</button>
        </div>
      </div>
      <div class="shezhi1">
        <div class="imgbox">
          <img src="../../sucai/personphoto/renzheng.png" alt="" />
        </div>
        <div class="nei">
          <h4>实名认证</h4>
          <p>实名认证后享更多福利</p>
          <button>去认证</button>
        </div>
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
      url: "/api/personcenter",
      method: "post",
      data: {
        user_id: sessionStorage.getItem("user_id"),
      },
    }).then((res) => {
      this.goods = res.data.data;
      console.log(res.data.data);
    });
  },
};
</script>

<style lang="scss" scoped>
.app {
  width: 910px;
  height: 648px;
  // border: 1px solid black;
  background-color: rgb(154, 193, 240, 0.6);
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  h3 {
    text-align: left;
    font-size: 25px;
    color: white;
    margin: 30px 0px 0px 20px;
  }
  .xinx {
    // border: 1px solid black;
    height:200px;
    table {
      border-collapse: collapse;
      width: 880px;
      margin: 0px auto;
      border-color: rgb(170, 168, 168);
      margin-top: 30px;
      tr:nth-of-type(1) {
        background-color: rgb(34, 161, 214);
        th {
          height: 60px;
          color: white;
          font-size: 25px;
        }
      }
      tr:nth-of-type(2) {
        th {
          height: 70px;
          color: black;
          font-size: 20px;
        }
        th:hover{
          cursor: pointer;
          color: white;
        }
      }
    }
  }
  .ti {
    height: 35px;
    display: flex;
    margin-top: 20px;
    i {
      width: 30px;
      height: 30px;
      font-size: 30px;
      margin-left: 20px;
      border-radius: 25%;
      background-color: rgb(154, 193, 240);
      color: white;
    }
    h4 {
      font-size: 22px;
      margin-left: 10px;
      color: black;
    }
  }
  .protect {
    // border: 1px solid black;
    height: 300px;
    display: flex;
    flex-wrap: wrap;
    .shezhi1 {
      // border: 1px solid black;
      height: 150px;
      width: 452px;
      display: flex;
      .imgbox {
        width: 100px;
        margin-left: 60px;
        height: 100px;
        border-radius: 50%;
        margin-top: 20px;
        display: flex;
        overflow: hidden;
      }
      .nei {
        width: 300px;
        display: flex;
        flex-direction: column;
        h4 {
          color: black;
          font-size: 20px;
          margin: 25px 0px 0px 20px;
          text-align: left;
        }
        p {
          text-align: left;
          font-size: 14px;
          margin: 10px 0px 0px 20px;
        }
        button {
          width: 70px;
          height: 25px;
          margin: 10px 0px 0px 20px;
          background-color: rgb(34, 161, 214);
          border: none;
          border-radius: 6px;
          color: white;
          font-weight: 600;
        }
        button:hover {
          cursor: pointer;
          background-color: rgb(0, 181, 229);
        }
      }
    }
  }
}
</style>