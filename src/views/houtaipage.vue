<template>
  <div class="app">
    <div class="leftbox">
      <div class="imgbox">
        <img src="../sucai/loginsucai/loginlogo.svg" alt="" />
      </div>
      <div class="xiala">
        <el-col :span="12">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#9ac1f0"
            text-color="#000000"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-tickets"></i>
                <span>数据概览</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="all">数据统计</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="user"
                  >用户账号管理</el-menu-item
                >
                <el-menu-item index="1-2" @click="mark"
                  >用户评论管理</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-order"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="message"
                  >订单信息管理</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-sold-out"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="product"
                  >商品信息修改</el-menu-item
                >
                <el-menu-item index="1-2" @click="addproduct"
                  >添加商品信息</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </div>
    </div>
    <div class="topbox">
      <span>Hello!</span>
      <span>管理员</span>
      <div class="righter">
        <i class="el-icon-search"></i>
        <el-button
          @click="drawer = true"
          type="primary"
          style="margin-left: 16px"
        >
          <i class="el-icon-bell"></i>
        </el-button>
        <el-badge :value="tiao" class="item">
        <el-drawer
          title="您的消息"
          :visible.sync="drawer"
          :direction="direction"
          :before-close="HandleClose"
        >
        <div class="message">
          <ul v-for="(mess,index) in messages" :key="index">
            <li>客户<span class="yang">{{mess.username}}</span>催促订单id为<span class="yang">{{mess.order_id}}</span>的订单商品发货
            <button @click="shoudao(index)">收到</button>
            </li>
          </ul>
        </div>
        </el-drawer>
        </el-badge>
        <i class="el-icon-switch-button" @click="back" id="hui"></i>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      drawer: false,
      direction: "rtl",
      messages:{},
      tiao:null
    };
  },
  methods: {
    all() {
      this.$router.push({ path: "/alldata" });
    },
    back() {
      this.$router.push({ path: "/shoppage" });
    },
    user() {
      this.$router.push({ path: "/usercount" });
    },
    message() {
      this.$router.push({ path: "/goodmessage" });
    },
    product() {
      this.$router.push({ path: "/upproduct" });
    },
    addproduct() {
      this.$router.push({ path: "/addproduct" });
    },
    mark() {
      this.$router.push({ path: "/markpage" });
    },
    HandleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    shoudao(index){
      axios({
        url:'/api/deletemessage',
        method:'post',
        data:{
          message_id:this.messages[index].message_id
        }
      }).then((res)=>{
        this.$router.go(0);
      })
    }
  },
  mounted(){
    axios({
      url:'/api/allcui',
      method:'get',
    }).then((res)=>{
      this.messages=res.data.data
      console.log('所有消息'+JSON.stringify(this.messages));
    })

    // 计算多少条
    axios({
      url:'/api/jisuancui',
      method:'get',
    }).then((res)=>{
      this.tiao=res.data.data
      console.log('一共有'+this.tiao);
    })
  }
};
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  background-color: white;
  .leftbox {
    // border: 1px solid black;
    width: 250px;
    height: 790px;
    display: flex;
    flex-direction: column;
    background-color: #9ac1f0;
    .imgbox {
      border: 1px solid #000000;
      height: 150px;
      width: 230px;
      margin: 0px auto;
      display: flex;
      border: none;
      border-bottom: 2px solid rgb(56, 118, 236);
    }
    .xiala {
      margin-top: 10px;
      width: 250px;
      .el-menu {
        width: 250px;
        border: none;
        i {
          color: white;
        }
        span {
          font-weight: 600;
        }
      }
    }
  }
  .topbox {
    background-color: #9ac1f0;
    width: 1450px;
    height: 80px;
    margin-left: 30px;
    border-bottom-left-radius: 20px;
    display: flex;
    span:nth-of-type(1) {
      margin: 25px 0px 0px 40px;
      color: white;
      font-size: 20px;
    }
    span:nth-of-type(2) {
      margin: 20px 0px 0px 10px;
      color: white;
      font-size: 20px;
    }
    .righter {
      margin-left: auto;
      width: 200px;
      .el-button {
        width: 20px;
        height: 10px;
        text-indent: -25px;
        border: none;
        background-color: rgb(154,193,240);
      }
      .el-badge{
        position: relative;
        right: 50px;
        top: -15px;
      }
      .el-drawer{
        .message{
          // border: 1px solid black;
          display: flex;
          height: 99%;
          overflow: auto;
          flex-direction: column;
          text-align: left;
          ul{
            list-style: none;
            li{
              color: black;
              margin-left: 20px;
              margin-top: 10px;
              button{
                margin-left: 30px;
                background-color: #9ac1f0;
                border: #9ac1f0;
                border-radius: 5px;
                color: white;
                width: 80px;
                height: 30px;
              }
              button:hover{
                background-color: rgb(156,207,247);
                cursor: pointer;
              }
              .yang{
                color: red;
                margin: 0px 0px;
              }
            }
          }
        }
      }
      i {
        color: white;
        font-size: 25px;
        margin: 25px 30px 0px 0px;
      }
      #hui{
        text-indent: -30px;
      }
      i:hover {
        cursor: pointer;
      }
    }
  }
}
</style>