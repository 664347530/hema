<template>
  <div class="app">
    <Head></Head>
    <div class="imgbox">
      <img src="../sucai/shoppagesucai/background3.avif" alt="" />
    </div>
    <h2>门店分布</h2>
    <Gundong></Gundong>
    <h2>门店查询</h2>
    <Map></Map>
    <Footer></Footer>
  </div>
</template>

<script>
import Head from "../components/head.vue";
import Gundong from '../components/gundong.vue'
import Map from '../components/mapsearch.vue'
import Footer from '../components/footer.vue'
export default {
  data() {
    return {

    };
  },
  components: {
    Head,
    Gundong,
    Map,
    Footer
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.app {
  .imgbox {
    display: flex;
    img {
      width: 1688px;
      height: 700px;
    }
  }
  h2 {
    color: black;
    font-size: 45px;
    margin-top: 50px;
  }
}

</style>
