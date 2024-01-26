<template>
  <div class="app">
    <div class="head">
      <img src="../sucai/footerlogo.png" @click="back" />
      <div class="inputbox">
        <input type="text" class="box-input" placeholder="口红" @click="sou" />
        <i class="el-icon-s-data" @click="back">热搜榜</i>
        <i class="el-icon-search"></i>
      </div>
      <button @click="goes">
        <i class="el-icon-shopping-cart-2">购物车</i>
      </button>
    </div>
    <Tou></Tou>
    <div class="left">
      <div class="ping">
        <span>商品分类</span>
        <div class="first">
          <span data-type="all" @click="showTpye($event)">全部商品</span>
          <span data-type="cloth" @click="showTpye($event)">服饰鞋包</span>
          <span data-type="sport" @click="showTpye($event)">户外运动</span>
          <span data-type="wuping" @click="showTpye($event)">家具生活</span>
          <span data-type="phone" @click="showTpye($event)">电子数码</span>
          <span data-type="food" @click="showTpye($event)">食品生鲜</span>
        </div>
        <span>商品价格</span>
        <div class="second">
          <ul>
            <li><input type="checkbox" /><span>0-299元</span></li>
            <li><input type="checkbox" /><span>299-599</span></li>
            <li><input type="checkbox" /><span>599-799</span></li>
            <li><input type="checkbox" /><span>799-999</span></li>
            <li><input type="checkbox" /><span>1000以上</span></li>
          </ul>
        </div>
        <span>商品折扣</span>
        <div class="third">
          <ul>
            <li><input type="checkbox" /><span>6折-7折</span></li>
            <li><input type="checkbox" /><span>7折-8折</span></li>
            <li><input type="checkbox" /><span>8折-9折</span></li>
          </ul>
        </div>
        <span>季节</span>
        <div class="fourth">
          <ul>
            <li><input type="checkbox" /><span>春季</span></li>
            <li><input type="checkbox" /><span>夏季</span></li>
            <li><input type="checkbox" /><span>秋季</span></li>
            <li><input type="checkbox" /><span>冬季</span></li>
          </ul>
        </div>
        <span>尺码</span>
        <div class="fifth">
          <span>37</span>
          <span>38</span>
          <span>39</span>
          <span>40</span>
          <span>41</span>
          <span>42</span>
          <span>43</span>
          <span>44</span>
        </div>
      </div>
    </div>

    <div class="rightbox">
      <div class="smallhead">
        <el-dropdown>
          <span class="el-dropdown-link">
            排序依据<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="text-align: right">
            <el-dropdown-item>精选排序</el-dropdown-item>
            <el-dropdown-item>最新</el-dropdown-item>
            <el-dropdown-item>价格:有高到低</el-dropdown-item>
            <el-dropdown-item>价格:由低到高</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="allproduct">
        <div
          class="chanping"
          v-for="(good, index) in type"
          :key="index"
          @click="gooddetail(good.productid)"
        >
          <div class="imgbox">
            <img :src="'/showproduct/' + good.img" />
          </div>
          <span>{{ good.jieshao }}</span>
          <div class="xiao">
            <span>￥{{ good.price }}</span>
            <span>包邮 送运费险</span>
          </div>
          <button><i class="el-icon-star-off"></i>查看详情</button>
        </div>
      </div>
    </div>
    <Daohang></Daohang>
  </div>
</template>

<script>
import axios from "axios";
import Daohang from "../components/daohang.vue";
export default {
  data() {
    return {
      goods: {},
      type: {},
    };
  },
  components: {
    Daohang,
  },
  mounted() {
    axios({
      url: "/api/allproduct",
      method: "get",
    }).then((res) => {
      this.goods = res.data.data;
      this.type = res.data.data;
      console.log(res.data.data);
    });
  },
  methods: {
    back() {
      this.$router.push({ path: "/shoppage" });
    },
    gooddetail(productid) {
      this.$router.push({
        path: "/detail",
        query: {
          productid: productid,
        },
      });
    },
    goes() {
      this.$router.push({ path: "/shopcart" });
    },
    sou() {
      this.$router.push({ path: "/search" });
    },
    showTpye(e) {
      console.log(e.target.dataset.type);
      let type = e.target.dataset.type;
      if (type == "all") {
        this.type = this.goods;
        return;
      }
      let cloth = [];
      this.goods.forEach((good) => {
        if (good.type == type) {
          cloth.push(good);
        }
      });
      this.type = cloth;
    },
  },
  props: ["productid"], //只接收
};
</script>
    
<style lang="scss" scoped>
.app {
  .head {
    // border: 1px solid black;
    background-color: rgb(4, 63, 126);
    display: flex;
    img {
      margin-left: 430px;
    }
    .inputbox {
      border: 1px solid rgb(8, 8, 8);
      height: 40px;
      margin-top: 15px;
      margin-left: 200px;
      width: 500px;
      border-radius: 5px;
      background-color: rgb(227, 230, 234);
      font-weight: 600;
      text-indent: 10px;
      display: flex;
      i {
        margin-top: 15px;
        font-size: 15px;
        font-weight: 600;
      }
      i:hover:nth-of-type(2) {
        cursor: pointer;
      }
      .box-input {
        height: 40px;
        width: 380px;
        border-radius: 5px;
        border: none;
        background-color: rgb(227, 230, 234);
        font-weight: 600;
        text-indent: 10px;
        outline: none;
      }
      .box-input:hover {
        background-color: rgb(255, 255, 255);
      }
      .inputbox:hover {
        background-color: rgb(255, 255, 255);
      }
    }
    .inputbox i:hover:nth-of-type(1) {
      color: red;
      cursor: pointer;
    }
    button {
      height: 45px;
      margin-top: 15px;
      margin-left: 100px;
      width: 120px;
      border-radius: 25px;
      border-color: blue;
      i {
        font-size: 18px;
        color: rgb(36, 197, 197);
      }
    }
    button:hover {
      cursor: pointer;
    }
  }
  .rightbox {
    // border: 1px solid black;
    width: 1400px;
    display: flex;
    margin-left: auto;
    flex-direction: column;
    flex-wrap: wrap;
    .smallhead {
      // border: 1px solid black;
      height: 25px;
      width: 1400px;
      text-align: right;
      .el-dropdown-link {
        font-size: 20px;
      }
    }
    .allproduct {
      // border: 1px solid black;
      display: flex;
      flex-wrap: wrap;
      .chanping {
        height: 400px;
        display: flex;
        width: 300px;
        flex-direction: column;
        // border: 2px solid black;
        border-radius: 10px;
        margin-left: 30px;
        margin-top: 10px;
        .imgbox {
          display: flex;
          width: 300px;
          height: 300px;
          margin: 0px auto;
          // border: 1px solid rgb(26, 226, 53);
          img {
            margin: 0px auto;
            width: 200px;
          }
        }
        span {
          font-size: 20px;
          color: black;
        }
        .xiao {
          display: flex;
          flex: 1;
          span:nth-of-type(1) {
            font-size: 25px;
            color: red;
            text-align: left;
            flex: 0.5;
          }
          span:nth-of-type(2) {
            font-size: 15px;
            flex: 0.5;
            margin: 10px 0px 0px 10px;
            color: rgb(182, 189, 189);
          }
        }

        button {
          height: 40px;
          font-weight: 600;
          font-size: 20px;
          border: none;
          i {
            font-size: 25px;
          }
        }
        button:hover {
          cursor: pointer;
          background-color: red;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
        }
      }
      .chanping:hover {
        box-shadow: 3px 1px 0px 0px hsl(0, 0%, 67%, 0.5);
      }
    }
  }
}

.left {
  width: 300px;
  // border: 1px solid black;
  height: 700px;
  overflow: auto;
  position: fixed;
  display: flex;
  z-index: 1;
  .ping {
    // border: 1px solid black;
    width: 300px;
    span {
      font-size: 20px;
      color: black;
      font-weight: 600;
    }
    .first {
      display: flex;
      flex-direction: column;
      border-bottom: dashed 1px;
      span {
        text-align: left;
        margin-left: 20px;
        font-weight: 400;
        margin-top: 10px;
      }
      span:hover {
        cursor: pointer;
        color: aquamarine;
      }
    }
    .second {
      display: flex;
      flex-direction: column;
      border-bottom: dashed 1px;
      ul {
        text-align: left;
        margin-top: 10px;
        li {
          margin-left: 20px;
          list-style: none;
          input {
            width: 20px;
            height: 20px;
          }
          span {
            margin-left: 10px;
            font-weight: 400;
            margin-top: 10px;
          }
        }
      }
    }
    .third {
      display: flex;
      flex-direction: column;
      border-bottom: dashed 1px;
      ul {
        text-align: left;
        margin-top: 10px;
        li {
          margin-left: 20px;
          list-style: none;
          input {
            width: 20px;
            height: 20px;
          }
          span {
            margin-left: 10px;
            font-weight: 400;
            margin-top: 10px;
          }
        }
      }
    }
    .fourth {
      display: flex;
      flex-direction: column;
      border-bottom: dashed 1px;
      ul {
        text-align: left;
        margin-top: 10px;
        li {
          margin-left: 20px;
          list-style: none;
          input {
            width: 20px;
            height: 20px;
          }
          span {
            margin-left: 10px;
            font-weight: 400;
            margin-top: 10px;
          }
        }
      }
    }
    .fifth {
      display: flex;
      flex-direction: column;
      span {
        margin-left: 60px;
        font-weight: 400;
        margin-top: 10px;
        text-align: left;
      }
      span:hover {
        color: aquamarine;
        cursor: pointer;
      }
    }
  }
}
</style>