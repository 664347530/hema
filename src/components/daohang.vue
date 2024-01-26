<template>
  <div class="app">
    <div class="left" v-show="showRightBox">
      <ul>
        <li><i class="el-icon-chat-line-square"></i></li>
        <li><a href="#">消息</a></li>
        <li @click="goes"><i class="el-icon-shopping-cart-2"></i></li>
        <li><a href="#">购物车</a></li>
        <li>
          <el-button type="text" @click="dialogVisible = true"
            ><i class="el-icon-edit-outline"></i
          ></el-button>
        </li>
        <li><a href="#">反馈</a></li>
        <li><i class="el-icon-warning-outline"></i></li>
        <li><a href="#">举报</a></li>
      </ul>
    </div>
    <div class="xian">
      <el-dialog
        title="评论"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入您要评价的内容"
          v-model="textarea"
        >
        </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false,dia()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      showRightBox: true,
      dialogVisible: false,
      textarea: "",
      goods: {},
    };
  },
  methods: {
    goes() {
      this.$router.push({ path: "/shopcart" });
    },
    handleScroll() {
      const triggerOffset = 250; // 触发隐藏的滚动距离
      if (window.scrollY > triggerOffset) {
        this.showRightBox = false;
      } else {
        this.showRightBox = true;
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    dia() {
      axios({
        url: "/api/personmarks",
        method: "post",
        data: {
          user_id: sessionStorage.getItem("user_id"),
          name: this.goods.username,
          remark: this.textarea,
          productid: this.productid,
        },
      }).then((res) => {
        this.$message({
          showClose: true,
          message: "评论成功",
          type: "success",
        });
        this.$router.go(0);
      });
    },
  },
  mounted() {
    axios({
      url: "/api/selectcount",
      method: "get",
      params: {
        user_id: sessionStorage.getItem("user_id"),
      },
    }).then((res) => {
      this.goods = res.data.data;
    });
    window.addEventListener("scroll", this.handleScroll);  
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  props:['productid']
};
</script>

<style lang="scss" scoped>
.left {
  // border: 1px solid black;
  width: 70px;
  height: 420px;
  position: fixed;
  bottom: 230px;
  left: 1620px;
  display: flex;
  flex-direction: column;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: white;
  box-shadow: -1.5px 1.5px;

  li {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    list-style: none;
    i {
      font-size: 50px;
      margin-left: 5px;
      color: black;
    }
    i:hover {
      cursor: pointer;
    }
    a {
      text-decoration: none;
      color: black;
      font-size: 13px;
    }
  }
  li:nth-of-type(2n + 1) {
    margin-top: 30px;
  }
}
</style>