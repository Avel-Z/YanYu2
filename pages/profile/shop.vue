<template>
  <scroll-view scroll-y class="shop-page">
    <!-- Points Display -->
    <view class="points-banner">
      <view class="points-main">
        <text class="points-label">当前积分</text>
        <text class="points-num">860</text>
      </view>
      <view class="points-sources">
        <view class="source-item" v-for="s in pointSources" :key="s.label">
          <text class="source-icon">{{ s.icon }}</text>
          <text class="source-label">{{ s.label }}</text>
          <text class="source-val">+{{ s.val }}</text>
        </view>
      </view>
    </view>

    <!-- Category Filter -->
    <view class="cat-filter">
      <view
        class="cat-chip"
        :class="{ active: selectedCat === c }"
        v-for="c in categories"
        :key="c"
        @tap="selectedCat = c"
      >{{ c }}</view>
    </view>

    <!-- Product Grid -->
    <view class="product-grid">
      <view
        class="product-card"
        v-for="item in filteredItems"
        :key="item.id"
        @tap="redeemItem(item)"
      >
        <image class="product-cover" :src="item.cover" mode="aspectFill" />
        <view class="product-info">
          <view class="product-cat-badge">{{ item.category }}</view>
          <text class="product-name">{{ item.name }}</text>
          <view class="product-bottom">
            <view class="product-points">
              <text class="points-icon">🔥</text>
              <text class="points-cost">{{ item.points }}积分</text>
            </view>
            <text class="product-stock">库存{{ item.stock }}</text>
          </view>
          <view
            class="redeem-btn"
            :class="{ disabled: item.points > 860 }"
            @tap.stop="redeemItem(item)"
          >
            {{ item.points > 860 ? '积分不足' : '立即兑换' }}
          </view>
        </view>
      </view>
    </view>

    <!-- Confirm Popup -->
    <view class="popup-overlay" v-if="confirmItem" @tap="confirmItem = null">
      <view class="confirm-popup" @tap.stop>
        <text class="confirm-title">确认兑换</text>
        <image class="confirm-cover" :src="confirmItem.cover" mode="aspectFill" />
        <text class="confirm-name">{{ confirmItem.name }}</text>
        <text class="confirm-cost">消耗 {{ confirmItem.points }} 积分</text>
        <text class="confirm-remain">兑换后剩余：{{ 860 - confirmItem.points }} 积分</text>
        <view class="confirm-actions">
          <view class="confirm-cancel" @tap="confirmItem = null">取消</view>
          <view class="confirm-ok" @tap="doRedeem">确认兑换</view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import { shopItems } from '../../mock/index.js'

export default {
  name: 'ProfileShop',
  data() {
    return {
      shopItems,
      selectedCat: '全部',
      confirmItem: null,
      categories: ['全部', '文创', '书籍', '合作商家'],
      pointSources: [
        { icon: '📍', label: '打卡', val: 120 },
        { icon: '📤', label: '投稿', val: 500 },
        { icon: '⭐', label: '收藏', val: 240 },
      ]
    }
  },
  computed: {
    filteredItems() {
      if (this.selectedCat === '全部') return this.shopItems
      return this.shopItems.filter(i => i.category === this.selectedCat)
    }
  },
  methods: {
    redeemItem(item) {
      if (item.points > 860) {
        uni.showToast({ title: '积分不足，继续探索吧！', icon: 'none' })
        return
      }
      this.confirmItem = item
    },
    doRedeem() {
      uni.showToast({ title: '兑换成功！', icon: 'success' })
      this.confirmItem = null
    }
  }
}
</script>

<style>
.shop-page { background: #F5F7FA; min-height: 100vh; padding-bottom: 40rpx; }

.points-banner {
  background: linear-gradient(135deg, #1AAD9E, #0D8C7F);
  padding: 40rpx 30rpx 48rpx;
}
.points-main { display: flex; align-items: baseline; gap: 16rpx; margin-bottom: 28rpx; }
.points-label { font-size: 28rpx; color: rgba(255,255,255,0.8); }
.points-num { font-size: 72rpx; font-weight: bold; color: #fff; }
.points-sources { display: flex; gap: 32rpx; }
.source-item { display: flex; align-items: center; gap: 8rpx; }
.source-icon { font-size: 24rpx; }
.source-label { font-size: 22rpx; color: rgba(255,255,255,0.75); }
.source-val { font-size: 22rpx; color: rgba(255,255,255,0.95); font-weight: 600; }

.cat-filter {
  display: flex; gap: 16rpx; padding: 24rpx 30rpx;
  background: #fff; border-bottom: 1rpx solid #f0f0f0;
}
.cat-chip {
  font-size: 26rpx; color: #666; background: #f5f5f5;
  padding: 10rpx 28rpx; border-radius: 30rpx;
}
.cat-chip.active { background: #E8F8F7; color: #1AAD9E; font-weight: 500; }

.product-grid {
  display: flex; flex-wrap: wrap; gap: 20rpx;
  padding: 24rpx 30rpx 0;
}
.product-card {
  width: calc(50% - 10rpx); background: #fff; border-radius: 16rpx;
  overflow: hidden; box-shadow: 0 2rpx 16rpx rgba(0,0,0,0.06);
}
.product-cover { width: 100%; height: 240rpx; display: block; }
.product-info { padding: 20rpx; }
.product-cat-badge {
  display: inline-block; font-size: 20rpx; color: #1AAD9E;
  background: #E8F8F7; padding: 4rpx 12rpx; border-radius: 20rpx; margin-bottom: 10rpx;
}
.product-name { font-size: 28rpx; font-weight: 600; color: #222; display: block; line-height: 1.4; }
.product-bottom { display: flex; justify-content: space-between; align-items: center; margin: 12rpx 0; }
.product-points { display: flex; align-items: center; gap: 4rpx; }
.points-icon { font-size: 22rpx; }
.points-cost { font-size: 28rpx; color: #ff6b35; font-weight: bold; }
.product-stock { font-size: 22rpx; color: #aaa; }
.redeem-btn {
  background: #1AAD9E; color: #fff; border-radius: 30rpx;
  text-align: center; padding: 16rpx; font-size: 26rpx;
}
.redeem-btn.disabled { background: #ddd; color: #aaa; }

/* Popup */
.popup-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5); z-index: 100;
  display: flex; align-items: center; justify-content: center;
}
.confirm-popup {
  background: #fff; border-radius: 24rpx; padding: 40rpx;
  width: 600rpx; box-sizing: border-box; text-align: center;
}
.confirm-title { font-size: 36rpx; font-weight: bold; color: #222; display: block; margin-bottom: 24rpx; }
.confirm-cover { width: 200rpx; height: 200rpx; border-radius: 16rpx; }
.confirm-name { font-size: 30rpx; color: #333; display: block; margin: 16rpx 0 8rpx; }
.confirm-cost { font-size: 32rpx; color: #ff6b35; font-weight: bold; display: block; }
.confirm-remain { font-size: 24rpx; color: #aaa; display: block; margin-top: 8rpx; margin-bottom: 32rpx; }
.confirm-actions { display: flex; gap: 20rpx; }
.confirm-cancel {
  flex: 1; text-align: center; padding: 24rpx; border-radius: 40rpx;
  background: #f5f5f5; color: #666; font-size: 28rpx;
}
.confirm-ok {
  flex: 1; text-align: center; padding: 24rpx; border-radius: 40rpx;
  background: #1AAD9E; color: #fff; font-size: 28rpx;
}
</style>
