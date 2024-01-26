<template>
  <div class="app">
    <div class="gundong">
      <div class="topgun">
        <div class="scroll-container">
          <!-- 初始图片 -->
          <div class="smallbox" v-for="(item, index) in images" :key="index">
            <img
              :src="require(`../sucai/cityphoto/${item.url}`)"
              class="slide-image"
            />
          </div>
          <!-- 复制图片以实现无限滚动 -->
          <div class="smallbox" v-for="(item, index) in images" :key="index">
            <img
              :src="require(`../sucai/cityphoto/${item.url}`)"
              class="slide-image"
            />
          </div>
        </div>
      </div>
      <div class="bottomgun">
        <div class="yougun">
          <!-- 初始图片 -->
          <div class="smallbox2" v-for="(item, index) in tu" :key="index">
            <img
              :src="require(`../sucai/cityphoto/${item.url}`)"
              class="slide-image"
            />
          </div>
          <!-- 向右滚动 -->
          <div class="smallbox2" v-for="(item, index) in tu" :key="index">
            <img
              :src="require(`../sucai/cityphoto/${item.url}`)"
              class="slide-image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { url: "beijing.png" },
        { url: "chongqing.png" },
        { url: "guangzhou.png" },
        { url: "hangzhou.png" },
      ],
      tu: [
        { url: "shanghai.png" },
        { url: "shenzheng.png" },
        { url: "suzhou.png" },
        { url: "xingjiapo.png" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.app {
  margin-top: 20px;
  .gundong {
    width: 70%;
    margin: 0 auto;
    height: 600px;
    display: flex;
    flex-direction: column;
    .topgun {
      height: 300px;
      display: flex;
      overflow: hidden;
      .scroll-container {
        display: flex;
        animation: slide 20s linear infinite; //linear表示动画匀速进行，infinite表示动画无限循环
        .smallbox {
          width: 25%;
          display: flex;
          img.slide-image {
            display: flex;
          }
        }
      }
    }
    .scroll-container:hover{
      cursor: pointer;
    }
    .bottomgun {
      height: 300px;
      display: flex;
      overflow: hidden;
      .yougun {
        display: flex;
        animation: moves 20s linear infinite;//无限滚动
        .smallbox2 {
          width: 25%;
          display: flex;
          img.slide-image {
            display: flex;
          }
        }
      }
    }
    .bottomgun:hover{
      cursor: pointer;
    }
  }
  @keyframes slide {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-50%); // 滚动一个小框的宽度
    }
  }
  @keyframes moves {
    0% {
      transform: translateX(-50%);
    }
    100% {
      transform: translateX(0%); // 滚动一个小框的宽度
    }
  }
}
</style>