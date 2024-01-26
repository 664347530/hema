<template>
  <div>
    <div v-if="!showLoading" ref="qrcode" class="qrcode-container"></div>
    <div v-if="showLoading" class="loading-spinner"></div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2';
export default {
  data() {
    return {
      showLoading: false,
    };
  },
  mounted() {
    this.generateQRCode('https://your-payment-url.com'); // 替换为实际的支付链接
  },
  methods: {
    generateQRCode(url) {
      const qrcode = new QRCode(this.$refs.qrcode, {
        text: url,
        width: 128,
        height: 128,
      });

      // 监听二维码点击事件
      this.$refs.qrcode.addEventListener('click', () => {
        // 在点击事件中，切换为加载状态，模拟用户扫描后的效果
        this.showLoading = true;
        // 可以在此处触发支付逻辑或其他操作
        // ...

        // 模拟支付成功后切换回二维码状态
        setTimeout(() => {
          this.showLoading = false;
        }, 3000); // 3秒后切换回二维码状态，你可以根据实际情况调整时间
      });
    },
  },
};
</script>

<style scoped>
.qrcode-container {
  text-align: center;
  cursor: pointer;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

</style>



