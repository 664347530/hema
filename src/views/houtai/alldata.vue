<template>
  <div class="app">
    <div class="datapage">
      <div class="top">
        <div class="xiaobiao">
          <div class="xiao">
            <i class="el-icon-chat-dot-round"></i>
            <span>68531条</span>
          </div>
          <span id="sp1">用户商品评价</span>
        </div>
        <div class="xiaobiao">
          <div class="xiao">
            <i class="el-icon-mouse"></i>
            <span>26261条</span>
          </div>
          <span id="sp1">网页浏览数量</span>
        </div>
        <div class="xiaobiao">
          <div class="xiao">
            <i class="el-icon-shopping-cart-full"></i>
            <span>48531个</span>
          </div>
          <span id="sp1">今日购买数量</span>
        </div>
        <div class="xiaobiao">
          <div class="xiao">
            <i class="el-icon-medal"></i>
            <span>18531元</span>
          </div>
          <span id="sp1">今日成交金额</span>
        </div>
      </div>
      <div class="content">
        <div class="leftecharts" id="main"></div>
        <div class="rightecharts" id="main2"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    draw() {
      let myChart = this.$echarts.init(document.getElementById("main"));
      let option = {
        title: {
          text: "商品购买比例",
        },
        tooltip: {},
        legend: {
          data: ["比例"],
        },
        xAxis: {
          data: ["手机", "连帽卫衣", "运动物品", "裤子", "食物", "家具"],
        },
        yAxis: {},
        series: [
          {
            name: "比例",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };
      myChart.setOption(option);
    },
    draws() {
      let myChart1 = this.$echarts.init(document.getElementById("main2"));
      let option = {
        dataset: {
          source: [
            ["score", "amount", "product"],
            [89.3, 58212, "篮球"],
            [57.1, 78254, "饮料"],
            [74.4, 41032, "NIKE卫衣"],
            [50.1, 12755, "球裤"],
            [89.7, 20145, "家具"],
            [68.1, 79146, "水果"],
            [19.6, 91852, "iphone"],
            [10.6, 101852, "首饰"],
          ],
        },
        grid: { containLabel: true },
        xAxis: { name: "amount" },
        yAxis: { type: "category" },
        visualMap: {
          orient: "horizontal",
          left: "center",
          min: 10,
          max: 100,
          text: ["高分", "低分"],
          // Map the score column to color
          dimension: 0,
          inRange: {
            color: ["#885ffa", "#00beed"],
          },
        },
        series: [
          {
            type: "bar",
            encode: {
              x: "amount",
              y: "product",
            },
          },
        ],
      };
      myChart1.setOption(option);
    },
  },
  mounted() {
    this.draw();
    this.draws()
  },
};
</script>

<style lang="scss" scoped>
.app {
  display: flex;
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
    .top {
      // border: 1px solid white;
      display: flex;
      height: 140px;
      .xiaobiao {
        // border: 1px solid white;
        height: 120px;
        width: 250px;
        margin: 10px 0px 0px 75px;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        background-color: rgb(255, 98, 85);
        .xiao {
          // border: 1px solid white;
          height: 80px;
          display: flex;
          i {
            color: white;
            font-size: 60px;
            text-align: left;
            margin: 15px 0px 0px 20px;
          }
          span {
            color: black;
            margin: 30px 0px 0px 50px;
            font-size: 20px;
            font-weight: 600;
          }
        }
        #sp1 {
          font-weight: 600;
          text-align: right;
          margin-right: 30px;
          margin-top: 5px;
          font-size: 20px;
          color: white;
        }
      }
      .xiaobiao:nth-of-type(2) {
        background-color: rgb(56, 118, 236);
      }
      .xiaobiao:nth-of-type(3) {
        background-color: #885ffa;
      }
      .xiaobiao:nth-of-type(4) {
        background-color: #00beed;
      }
      .xiaobiao:hover {
        cursor: pointer;
      }
    }
    .content {
      // border: 1px solid white;
      height: 600px;
      display: flex;
      .leftecharts {
        width: 900px;
        height: 500px;
        margin: 30px 0px 0px 80px;
        background-color: white;
        border-radius: 15px;
      }
      .rightecharts {
        // border: 1px solid black;
        width: 400px;
        margin-left: 20px;
        height: 500px;
        margin-top: 20px;
        border-radius: 15px;
      }
    }
  }
}
</style>