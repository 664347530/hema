<template>
  <div class="app">
    <div class="datapage">
      <div class="addbox">
        <span>添加商品信息</span>
        <div class="neirong">
          <div style="margin: 20px"></div>
          <el-form
            :label-position="labelPosition"
            label-width="80px"
            :model="formLabelAlign"
          >
            <el-form-item label="商品ID号">
              <el-input v-model="formLabelAlign.productid"></el-input>
            </el-form-item>
            <el-form-item label="商品类型">
              <el-select v-model="type" placeholder="请选择">
                <el-option
                  v-for="item in types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input v-model="formLabelAlign.price"></el-input>
            </el-form-item>
            <el-form-item label="商品名字">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="商品状态">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品图片">
              <div class="wenjian">
                <el-upload
                  class="avatar-uploader"
                  action="/api/addproduct"
                  :show-file-list="true"
                  :on-success="handleAvatarSuccess"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </el-form-item>
          </el-form>
          <button @click="adds">添加</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        productid: "",
        price: "",
        name: "",
      },
      options: [
        {
          value: "在售",
        },
        {
          value: "售罄",
        },
      ],
      value: "",
      types: [
        { value: "cloth" },
        { value: "food" },
        { value: "sport" },
        { value: "phone" },
        { value: "wuping" },
      ],
      type: "",
      imageUrl: "",
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.fileName = file.name;
    },
    adds(){
      axios({
        url:'/api/addproduct',
        method:'post',
        data:{
          productid:this.formLabelAlign.productid,
          price:this.formLabelAlign.price,
          jieshao:this.formLabelAlign.name,
          type:this.type,
          img:this.fileName,
          stute:this.value
        }
      }).then((res)=>{
        alert('新添成功')
        this.$router.go(0);
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.app {
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
    overflow: auto;
    .addbox {
      // border: 1px solid black;
      height: 660px;
      width: 1350px;
      margin: 20px auto;
      display: flex;
      flex-direction: column;
      span {
        font-size: 25px;
        color: black;
      }
      .neirong {
        // border: 1px solid black;
        width: 500px;
        margin: 0px auto;
        button{
          width: 300px;
          height: 50px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 20px;
        }
        button:hover{
          cursor: pointer;
          background-color: red;
          color: white;
        }
      }
    }
  }
}
.wenjian {
  background-color: white;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>