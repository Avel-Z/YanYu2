<template>
  <view class="splash-page">
    <view class="splash-content">
      <view class="logo-wrap">
        <text class="logo-text">言</text>
      </view>
      <text class="app-name">言语</text>
      <text class="app-sub">YanYu</text>
      <text class="tagline">守护闽南语，传承文化根</text>
    </view>
    <view class="splash-footer">
      <text class="footer-text">闽南方言文化数字档案平台</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'SplashPage',
  onLoad() {
    setTimeout(() => {
      uni.switchTab({ url: '/pages/home/index' })
    }, 1800)
  }
}
</script>

<style>
.splash-page {
  width: 100%;
  height: 100vh;
  background: linear-gradient(160deg, #1AAD9E 0%, #0D8C7F 55%, #076D5E 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.splash-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo-wrap {
  width: 160rpx;
  height: 160rpx;
  border-radius: 40rpx;
  background: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32rpx;
  border: 4rpx solid rgba(255,255,255,0.4);
}
.logo-text {
  font-size: 88rpx;
  color: #fff;
  font-weight: bold;
  line-height: 1;
}
.app-name {
  font-size: 72rpx;
  font-weight: bold;
  color: #fff;
  letter-spacing: 8rpx;
}
.app-sub {
  font-size: 32rpx;
  color: rgba(255,255,255,0.75);
  letter-spacing: 12rpx;
  margin-top: 8rpx;
}
.tagline {
  font-size: 28rpx;
  color: rgba(255,255,255,0.85);
  margin-top: 40rpx;
  letter-spacing: 4rpx;
}
.splash-footer {
  position: fixed;
  bottom: 80rpx;
  left: 0;
  right: 0;
  text-align: center;
}
.footer-text {
  font-size: 22rpx;
  color: rgba(255,255,255,0.55);
  letter-spacing: 2rpx;
}
</style>
