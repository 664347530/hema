<template>
  <div class="app">
    <div class="footbox">
      <img src="../sucai/footerlogo.png" class="img1" />
      <div class="jie">
        <a href="#">客服热线</a>
        <a href="#">客服/举报热线电话:9510217</a>
        <a href="#">客服服务时间:08:00-23:00</a>
      </div>
      <div class="erweima">
       <img src="../sucai/hemama.png" class="img2"> 
       <div class="ma">
       <span>APP产品下载</span>
       <span>公众号二维码</span>         
       </div>
      </div>
    </div>
    <div class="shang">
      <a href="#">规则中心</a>
      <a href="#">隐私政策</a>
      <a href="#">知识产权</a>
      <a href="#">廉正举报</a>
      <a href="#">网络安全举报</a>
      <a href="#">推进绿色发展，落实减塑降碳 ——《固定废物污染防治法》《加强塑料污染治理意见》</a>
      <a href="#">上海盒新智造食品科技有限公司企业标准公布</a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.app {
  height: 320px;
  border: 1px solid black;
  background-color: rgb(4, 63, 126);
  // margin-top: 30px;
  .footbox {
    display: flex;
    // border: 1px solid black;
    margin-top: 40px;
    .img1 {
      margin: 10px 0px 0px 150px;
      width: 145px;
    }
    .jie {
      display: flex;
      flex-direction: column;
      text-align: left;
      width: 950px;
      // border: 1px solid black;
      a {
        color: white;
        text-decoration: none;
        margin: 20px 0px 0px 50px;
        font-size: 13px;
      }
      a:nth-of-type(1){
        font-size: 17px;
      }
    }
    .erweima{
      // border: 1px solid black;
      display: flex;
      flex-direction: column;
    .img2{
      width: 200px;
      height: 90px;
      margin-left: 20px;
    }
    .ma{
      display: flex;
    span{
      color: white;
      font-size: 10px;
    }
    span:nth-of-type(1){
      margin-left: 30px;
    }  
    span:nth-of-type(2){
      margin-left: 53px;
    }       
    }
    }
  }
  .shang{
    display: flex;
    justify-content: center;
    margin: 10px 0px 0px 10px;
    a{
      color: rgb(115,148,183);
      text-decoration: none;
      font-size: 13px;
      margin: 40px 0px 0px 30px;
    }
  }
}
</style>