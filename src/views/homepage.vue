<!-- 首页 -->
<template>
  <div>
    <Head></Head>
    <div class="app">
      <div class="videobox">
        <video autoplay loop muted>
          <source src="../sucai/homesucai/hemashiping.mp4" type="video/mp4" />
        </video>
      </div>
      <div class="bodybox">
        <img src="../sucai/homesucai/背景.jpg" class="img1" />
      </div>
      <div class="neirong">
        <div class="titlehead">
          <span>新闻资讯</span>
          <span>查看全部<i class="el-icon-arrow-right"></i></span>
        </div>
        <div class="imgcard">
          <div class="bigbox">
            <div class="nei1">
              <img src="../sucai/homesucai/neirong1.png" alt="" />
            </div>
            <span>联手深耕有机食品市场 迪士尼中国与盒马达成深度合作</span>
            <span>2023年8月3日</span>
          </div>
          <div class="bigbox1">
            <div class="nei2">
              <img src="../sucai/homesucai/neirong2.png" alt="" />
            </div>
            <span class="neispan">盒马上海供应链中心投产单日可分拣280万份订单</span>
            <span class="neispan2">2023年7月11日</span>
          </div>
          <div class="xiasanbox" id="xi">
            <div class="xiamian">
              <img src="../sucai/homesucai/neirong3.png" alt="" />
            </div>
            <span>二季度零售持续恢复向好盒马八城同开新店</span>
            <span>2023年6月30日</span>
          </div>
          <div class="xiasanbox">
            <div class="xiamian">
              <img src="../sucai/homesucai/neirong4.png" alt="" />
            </div>
            <span>盒马启动"全球供应链"战略33家零售商,加入盒马海外</span>
            <span>2023年5月17日</span>
          </div>
          <div class="xiasanbox">
            <div class="xiamian">
              <img src="../sucai/homesucai/neirong5.png" alt="" />
            </div>
            <span>盒马预制菜全面升级头部央厨，供应链企业，高校等牵手扩展蓝海市场</span>
            <span>2023年5月9日</span>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Head from "../components/head.vue";
import Footer from '../components/footer.vue'
export default {
  data() {
    return {
    };
  },
  components: {
    Head,
    Footer
  },
};
</script>

<style lang="scss" scoped>
.videobox {
  margin-bottom: 0px;
  video {
    width: 100%;
    height: 80%;
  }
}
.bodybox {
  display: flex;
  width: 100%;
  margin: 0px;
  position: relative;
  bottom: 5px;
  .img1 {
    width: 100%;
  }
}
.neirong {
  .titlehead {
    display: flex;
    justify-content: space-between;
    margin: 50px 140px;
    height: 10px;
    span:nth-of-type(1) {
      font-size: 35px;
    }
    span:nth-of-type(2) {
      font-size: 30px;
      margin-top: 6px;
      color: rgb(102, 102, 125);
    }
    span:nth-of-type(2):hover {
      cursor: pointer;
    }
  }
  .imgcard {
    // border: 1px solid black;
    display: flex;
    flex-wrap: wrap;
    .bigbox {
      // border: 1px solid black;
      height: 450px;
      display: flex;
      flex-direction: column;
      margin-left: 150px;
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
    }
    .bigbox1 {
      // border: 1px solid black;
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
      display: flex;
      flex-direction: column;
      margin-left: 40px;
      width: 430px;
      height: 450px;
      // 第二个
      .nei2 {
        // border: 1px solid black;
        height: 300px;
        overflow: hidden;
        border-top-left-radius: 25px;
        border-top-right-radius: 25px;
        display: flex;
        img {
          width: 100%;
        }
      }
      .neispan {
        display: flex;
        justify-content: flex-start;
        text-align: left;
        color: black;
      }
      .neispan2 {
        margin-top: 40px;
      }
    }
    .bigbox1:hover {
      box-shadow: 3px 1px 0px 0px hsl(0, 0%, 67%, 0.5);
    }
    .bigbox1:hover img {
      animation: move 0.1s linear forwards;
    }
    @keyframes move {
      0% {
        //定义 3D 缩放
        transform: scale(1);
      }
      100% {
        transform: scale(1.05);
      }
    }
    // 第一个
    .nei1 {
      // border: 1px solid black;
      height: 300px;
      overflow: hidden;
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
      display: flex;
      img {
        width: 900px;
        height: 600px;
        position: relative;
        bottom: 130px;
      }
    }
    span {
      font-size: 25px;
      margin-top: 10px;
      margin-left: 20px;
      justify-content: flex-start;
      display: flex;
      background-color: white;
      color: black;
    }
    span:nth-of-type(2) {
      margin-top: 70px;
      color: #aaaaaa;
    }
    .bigbox:hover {
      box-shadow: 3px 1px 0px 0px hsl(0, 0%, 67%, 0.5);
    }
    .bigbox:hover img {
      animation: move 0.1s linear forwards;
    }
    @keyframes move {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(1.05);
      }
    }
  }
  // 最下排三个
  #xi {
    margin-left: 150px;
  }
  .xiasanbox {
    // border: 1px solid black;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    display: flex;
    flex-direction: column;
    margin-left: 40px;
    width: 430px;
    height: 430px;
    margin-top: 10px;
    .xiamian {
      // border: 1px solid black;
      height: 300px;
      overflow: hidden;
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
      display: flex;
      img {
        width: 100%;
      }
    }
    .neispan {
      display: flex;
      justify-content: flex-start;
      text-align: left;
      color: black;
    }
    .neispan2 {
      margin-top: 40px;
    }
    span {
      text-align: left;
      color: black;
    }
    span:nth-of-type(2) {
      font-size: 17px;
      margin-top: 10px;
    }
  }
  .xiasanbox:hover {
    box-shadow: 3px 1px 0px 0px hsl(0, 0%, 67%, 0.5);
  }
  .xiasanbox:hover img {
    animation: move 0.1s linear forwards;
  }
  @keyframes move {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.05);
    }
  }
}
</style>