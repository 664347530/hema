<template>
  <div class="app">
    <ShopHead></ShopHead>
    <div class="bigbox">
      <div class="imgbox">
        <img src="../sucai/searchlogo.png" alt="" />
      </div>
      <div class="neirong">
        <!-- 实时查询，每输入一个字符就触发事件 -->
        <input
          type="text"
          placeholder="请输入要搜索的内容"
          @input="searchkey"
          v-model="input1"
        /> 
        <button @click="suo">搜索一下</button>
      </div>
    </div>
    <div class="jieguo">
      <i class="el-icon-dessert">搜索结果</i>
      <div class="zhu">
        <div
          class="images"
          v-for="(good, index) in goods"
          :key="index"
          @click="gooddetail(good.productid)"
        >
          <img :src="'/showproduct/' + good.img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ShopHead from "../components/shophead.vue";
export default {
  data() {
    return {
      input1: "",
      goods: {},
    };
  },
  components: {
    ShopHead,
  },
  methods: {
    searchkey() {
      axios({
        url: "/api/searchgood",
        method: "post",
        data: {
          searchkey: this.input1,
        },
      }).then((res) => {
        this.goods = res.data.data;
        console.log(res.data.data);
      });
    },
    suo() {
      axios({
        url: "/api/searchgood",
        method: "post",
        data: {
          searchkey: this.input1,
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
    gooddetail(productid) {
      this.$router.push({
        path: "/detail",
        query: {
          productid: productid,
        },
      });
    },
  },
  props: ["productid"],
};
</script>

<style lang="scss" scoped>
.app {
  .bigbox {
    // border: 0.5px solid black;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    .imgbox {
      width: 500px;
      height: 145px;
      margin: 0px auto;
      img {
        display: flex;
        margin: 20px auto;
      }
    }
    .neirong {
      border: 2px solid rgb(161, 156, 156);
      height: 50px;
      width: 60%;
      margin: 10px auto;
      display: flex;
      border-radius: 15px;
      input {
        width: 80%;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        border: none;
        font-size: 25px;
        text-indent: 20px;
      }
      button {
        width: 20%;
        font-size: 20px;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        border: 0.5px solid rgb(161, 156, 156);
        color: white;
        font-weight: 600;
        background-color: rgb(28, 188, 221);
      }
      button:hover {
        cursor: pointer;
      }
    }
  }
  .jieguo {
    display: flex;
    margin-top: 15px;
    flex-direction: column;
    i {
      margin-left: 230px;
      text-align: left;
      color: black;
      font-size: 25px;
      font-weight: 600;
    }
    .zhu {
      width: 75%;
      margin: 10px auto;
      display: flex;
      flex-wrap: wrap;
      .images {
        width: 180px;
        height: 230px;
        border: 1px solid rgb(221, 218, 218);
        margin-left: 20px;
        display: flex;
        margin-top: 15px;
        img {
          width: 180px;
          height: 230px;
        }
      }
      .images:hover img {
        cursor: pointer;
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
  }
}
</style>