<template>
  <div class="app">
    <img src="../sucai/logo.png" />
    <div class="ulbox">
      <ul>
        <li @click="hui">首页</li>
        <li>关于盒马</li>
        <li>新闻咨询</li>
        <li>环保与社会责任</li>
        <li @click="pu">店铺信息</li>
        <li>合作招商</li>
        <li>加入我们</li>
        <li @click="login">开始购物</li>
      </ul>
      <button class="xialabox" @mouseenter="show=true" @mouseleave="show=false">
        简体<i class="el-icon-arrow-down el-icon--right"></i>
        <div class="content" v-if="show">
          <button>简体</button>
          <button>繁體</button>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      show:false
    }
  },
  methods:{
    login(){
      this.$router.push({path:'/shoppage'})
    },
    pu(){
      this.$router.push({path:'/dianpu'})
    },
    hui(){
      this.$router.push({path:'/'})
    }
  },
  computed: {

  },
};
</script>

<style lang="scss" scoped>
.app {
  background-color: rgba(7, 7, 0, 0.671);
  height: 60px;
  display: flex;
  position: fixed;
  z-index: 1;
  width: 100%;
  margin: 0 !important;
  padding: 0 !important;
  img {
    width: 65px;
    height: 40px;
    margin: 10px 0px 0px 150px;
  }

  .ulbox {
    background-color: rgba(7, 7, 0, 0);
    line-height: 3.5;
    ul {
      display: flex;
      margin: 0 100px;
      li {
        list-style: none;
        justify-content: center;
        width: 130px;
        color: white;
      }
      li:hover {
        font-weight: 600;
        cursor: default;
      }
      li:nth-of-type(1) {
        font-weight: 600;
      }
    }
    .xialabox {
      border: 1px solid white;
      padding: 0px 0px 0px 0px;
      width: 120px;
      position: absolute;
      left: 1450px;
      top: 1px;
      margin-top: 15px;
      width: 80px;
      background-color: transparent;
      color: white;
      height: 30px;
      line-height: 2;
      border-radius: 5px;
      .content {
        display: flex;
        border: 1px solid white;
        flex-direction: column;
        margin-top: 20px;
        button {
          line-height: 50px;
          background-color: transparent;
          border: none;
          color: white;
          background-color: rgba(7, 7, 0, 0.671);
          cursor: pointer;
        }
      }
    }
    .xialabox:hover{
      cursor: pointer;
    }
  }
}
</style>