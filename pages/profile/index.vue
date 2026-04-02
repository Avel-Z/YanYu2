<template>
  <scroll-view scroll-y class="profile-page">
    <!-- User Info Card -->
    <view class="user-card">
      <view class="user-avatar-wrap">
        <text class="user-avatar-text">闽</text>
      </view>
      <view class="user-info">
        <text class="user-name">闽南文化守护者</text>
        <view class="user-level">
          <text class="level-icon">⭐</text>
          <text class="level-text">Lv.5 文化探索家</text>
        </view>
      </view>
      <view class="settings-btn" @tap="goSettings">⚙️</view>
    </view>

    <!-- Stats Row -->
    <view class="stats-row">
      <view class="stat-item" v-for="s in userStats" :key="s.label">
        <text class="stat-num">{{ s.val }}</text>
        <text class="stat-label">{{ s.label }}</text>
      </view>
    </view>

    <!-- Quick Actions -->
    <view class="section">
      <view class="section-title">快捷功能</view>
      <view class="action-grid">
        <view class="action-item" v-for="act in quickActions" :key="act.id" @tap="act.handler()">
          <view class="action-icon-wrap" :style="{ background: act.bg }">
            <text class="action-icon">{{ act.icon }}</text>
          </view>
          <text class="action-name">{{ act.name }}</text>
        </view>
      </view>
    </view>

    <!-- District Filter -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">我的收藏</text>
      </view>
      <scroll-view scroll-x class="district-filter-scroll">
        <view
          class="district-chip"
          :class="{ active: filterDistrict === d }"
          v-for="d in districtOptions"
          :key="d"
          @tap="filterDistrict = d"
        >{{ d }}</view>
      </scroll-view>
      <view class="collect-list">
        <view class="collect-item" v-for="item in filteredCollects" :key="item.id">
          <image class="collect-cover" :src="item.cover" mode="aspectFill" />
          <view class="collect-info">
            <text class="collect-title">{{ item.title }}</text>
            <view class="collect-tags">
              <text class="tag" v-for="(t, i) in item.tags" :key="i">{{ t }}</text>
            </view>
            <text class="collect-district">{{ item.district }}</text>
          </view>
          <text class="collect-arrow">›</text>
        </view>
      </view>
    </view>

    <!-- Sub-page Links -->
    <view class="section">
      <view class="link-card" @tap="goCheckin">
        <view class="link-left">
          <text class="link-icon">📍</text>
          <view class="link-info">
            <text class="link-title">我的打卡</text>
            <text class="link-desc">查看打卡记录与成就徽章</text>
          </view>
        </view>
        <text class="link-arrow">›</text>
      </view>
      <view class="link-card" @tap="goShop">
        <view class="link-left">
          <text class="link-icon">🛍️</text>
          <view class="link-info">
            <text class="link-title">积分商城</text>
            <text class="link-desc">860积分可兑换文创好物</text>
          </view>
        </view>
        <text class="link-arrow">›</text>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import { hotSpots } from '../../mock/index.js'

export default {
  name: 'ProfilePage',
  data() {
    return {
      filterDistrict: '全部',
      districtOptions: ['全部', '思明', '湖里', '集美', '海沧', '同安', '翔安'],
      userStats: [
        { label: '收藏', val: 32 },
        { label: '投稿', val: 4 },
        { label: '打卡', val: 12 },
        { label: '解锁街区', val: 3 },
      ],
      collects: hotSpots,
    }
  },
  computed: {
    filteredCollects() {
      if (this.filterDistrict === '全部') return this.collects
      return this.collects.filter(c => c.district === this.filterDistrict)
    },
    quickActions() {
      return [
        { id: 1, name: '我的打卡', icon: '📍', bg: '#E0F7FA', handler: () => this.goCheckin() },
        { id: 2, name: '积分商城', icon: '🛍️', bg: '#FFF3E0', handler: () => this.goShop() },
        { id: 3, name: '我的投稿', icon: '📤', bg: '#F3E5F5', handler: () => uni.switchTab({ url: '/pages/contribute/index' }) },
        { id: 4, name: '收藏管理', icon: '⭐', bg: '#FFF8E1', handler: () => uni.showToast({ title: '功能开发中', icon: 'none' }) },
        { id: 5, name: '设置', icon: '⚙️', bg: '#F5F5F5', handler: () => this.goSettings() },
      ]
    }
  },
  methods: {
    goCheckin() {
      uni.navigateTo({ url: '/pages/profile/checkin' })
    },
    goShop() {
      uni.navigateTo({ url: '/pages/profile/shop' })
    },
    goSettings() {
      uni.showToast({ title: '设置功能开发中', icon: 'none' })
    }
  }
}
</script>

<style>
.profile-page { background: #F5F7FA; min-height: 100vh; padding-bottom: 40rpx; }

.user-card {
  display: flex; align-items: center;
  background: linear-gradient(135deg, #1AAD9E, #0D8C7F);
  padding: 40rpx 30rpx 60rpx;
}
.user-avatar-wrap {
  width: 120rpx; height: 120rpx; border-radius: 50%;
  background: rgba(255,255,255,0.3); border: 4rpx solid rgba(255,255,255,0.5);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.user-avatar-text { font-size: 52rpx; color: #fff; font-weight: bold; }
.user-info { flex: 1; margin-left: 24rpx; }
.user-name { font-size: 36rpx; font-weight: bold; color: #fff; display: block; }
.user-level { display: flex; align-items: center; margin-top: 10rpx; }
.level-icon { font-size: 24rpx; margin-right: 6rpx; }
.level-text { font-size: 24rpx; color: rgba(255,255,255,0.85); }
.settings-btn { font-size: 44rpx; }

.stats-row {
  display: flex; background: #fff;
  margin: -30rpx 30rpx 0; border-radius: 16rpx;
  box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.1);
  padding: 28rpx 0; position: relative; z-index: 10;
}
.stat-item { flex: 1; display: flex; flex-direction: column; align-items: center; }
.stat-num { font-size: 44rpx; font-weight: bold; color: #1AAD9E; }
.stat-label { font-size: 22rpx; color: #999; margin-top: 6rpx; }

.section { padding: 24rpx 30rpx 0; }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16rpx; }
.section-title { font-size: 32rpx; font-weight: bold; color: #222; margin-bottom: 20rpx; display: block; }

/* Actions */
.action-grid { display: flex; flex-wrap: wrap; gap: 20rpx; }
.action-item {
  width: calc(20% - 16rpx); display: flex; flex-direction: column;
  align-items: center;
}
.action-icon-wrap {
  width: 96rpx; height: 96rpx; border-radius: 28rpx;
  display: flex; align-items: center; justify-content: center; margin-bottom: 10rpx;
}
.action-icon { font-size: 46rpx; }
.action-name { font-size: 22rpx; color: #555; text-align: center; }

/* District Filter */
.district-filter-scroll { white-space: nowrap; margin-bottom: 20rpx; }
.district-chip {
  display: inline-block; font-size: 24rpx; color: #666;
  background: #fff; padding: 10rpx 24rpx; border-radius: 30rpx;
  margin-right: 12rpx; box-shadow: 0 1rpx 6rpx rgba(0,0,0,0.06);
}
.district-chip.active { background: #1AAD9E; color: #fff; }

/* Collect List */
.collect-list { background: #fff; border-radius: 16rpx; overflow: hidden; box-shadow: 0 2rpx 16rpx rgba(0,0,0,0.06); }
.collect-item {
  display: flex; align-items: center; padding: 20rpx;
  border-bottom: 1rpx solid #f5f5f5;
}
.collect-item:last-child { border-bottom: none; }
.collect-cover { width: 100rpx; height: 100rpx; border-radius: 12rpx; flex-shrink: 0; }
.collect-info { flex: 1; margin: 0 16rpx; }
.collect-title { font-size: 28rpx; color: #333; font-weight: 500; display: block; }
.collect-tags { display: flex; flex-wrap: wrap; gap: 6rpx; margin: 8rpx 0; }
.tag { font-size: 18rpx; color: #1AAD9E; background: #E8F8F7; padding: 2rpx 10rpx; border-radius: 20rpx; }
.collect-district { font-size: 22rpx; color: #aaa; }
.collect-arrow { font-size: 36rpx; color: #ccc; }

/* Sub-page Links */
.link-card {
  background: #fff; border-radius: 16rpx; padding: 28rpx;
  box-shadow: 0 2rpx 16rpx rgba(0,0,0,0.06); margin-bottom: 16rpx;
  display: flex; align-items: center; justify-content: space-between;
}
.link-left { display: flex; align-items: center; }
.link-icon { font-size: 48rpx; margin-right: 20rpx; }
.link-title { font-size: 30rpx; font-weight: 600; color: #222; display: block; }
.link-desc { font-size: 22rpx; color: #999; display: block; margin-top: 4rpx; }
.link-arrow { font-size: 36rpx; color: #ccc; }
</style>
