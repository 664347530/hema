<template>
  <div class="app">
    <div class="leftbox">
      <div class="top">
        <span>分店信息，我们一直在您身边</span>
        <div class="dizhi">
      <el-cascader size="large" :options="pcaTextArr" v-model="selectedOptions" style="width:100%">
      </el-cascader>
        </div>
      </div>
      <div class="foot">
          <div class="neirong" v-for="(item,index) in postion" :key="index">
              <h4>{{item.title}}</h4>
              <span>地址 :{{item.zhi}}</span>
          </div>
      </div>
    </div>
    <div class="rightbox">
        <div id="container"></div>
    </div>
  </div>
</template>

<script>
import { pcaTextArr } from 'element-china-area-data';
import AMapLoader from '@amap/amap-jsapi-loader';
export default {
  name: "gaode",
  data() {
    return {
        pcaTextArr,
        map: null,
        selectedOptions: [],
        postion:[
            {title:'株洲攸县新市镇店',zhi:'湖南省株洲市攸县 新市镇桐树村桐上组012号'},
            {title:'长沙万科金域滨江店',zhi:'湖南省长沙市岳麓区 观沙岭街道潇湘北路三段959号万科金域滨江苑第二期7栋102号房'},
            {title:'株洲攸县交通路店',zhi:'湖南省株洲市攸县 联星街道联星社区攸衡路6号'},
            {title:'长沙恒大雅苑店',zhi:'湖南省长沙市开福区 洪山街道万家丽北路699号恒大雅苑商业1栋114号'},
            {title:'河南驻马店汝南天龙花园店',zhi:'河南省驻马店市汝南县 汝宁镇汝宁大道南侧、西园路西侧天龙花园第9幢1-2层商铺'},
            {title:'盒马鲜生长沙南门口店',zhi:'长沙市天心区黄兴南路步行商业街E3段南门口1662主题购物中心'}
        ]
    };
  },
  methods: {
      initMap() {
        AMapLoader.load({
          key: "ed2ea36f8564541569c370254845d93d", //此处填入我们注册账号后获取的Key
          version: '1.4.15', //指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
          // plugins: [''], //需要使用的的插件列表，如比例尺'AMap.Scale'等
        }).then((AMap) => {
          this.map = new AMap.Map("container", { //设置地图容器id
            viewMode: "3D", //是否为3D地图模式
            zoom: 10, //初始化地图级别
            center: [112.98983, 28.11426], //初始化地图中心点位置
          });
        }).catch(e => {
          console.log(e);
        })
      },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style lang="scss" scoped>
.app {
  // border: 1px solid black;
  height: 600px;
  display: flex;
  margin-top: 20px;
  flex: 1;
  .leftbox {
    flex: 0.5;
    .top {
      height: 155px;
      width: 90%;
      margin-left: auto;
      background-color: rgb(4, 63, 126);
      display: flex;
      flex-direction: column;
      span {
        color: white;
        font-size: 20px;
        margin: 20px auto;
        height: 30px;
      }
      .dizhi {
        height: 40px;
        width: 50%;
        margin: 0px auto;
      }
    }
    .foot{
        // border: 1px solid black;
        width: 90%;
        margin-left: auto;
        height: 74%;
        overflow: auto;
        display: flex;
        flex-direction: column;
        .neirong{
            border-bottom: 1px solid rgb(209, 206, 206);
            height: 120px;
            display: flex;
            flex-direction: column;
            h4{
                color: black;
                text-align: left;
                font-size: 20px;
                margin: 30px 0px 0px 40px;
            }
            span{
                color: rgb(170, 170, 165);
                text-align: left;
                font-size: 15px;
                margin: 20px 0px 0px 40px;
            }
        }
    }
  }
  .rightbox{
    flex: 0.5;
    #container{
      // border: 1px solid black;
      height: 100%;
      width: 90%;
    }
  }
}
</style>