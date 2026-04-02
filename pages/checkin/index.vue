<template>
  <scroll-view scroll-y class="checkin-page">
    <!-- Stats Cards -->
    <view class="stats-row">
      <view class="stat-card">
        <text class="stat-num">{{ stats.spots }}</text>
        <text class="stat-label">已探地点</text>
      </view>
      <view class="stat-card">
        <text class="stat-num">{{ stats.districts }}</text>
        <text class="stat-label">覆盖街区</text>
      </view>
      <view class="stat-card">
        <text class="stat-num">{{ stats.points }}</text>
        <text class="stat-label">获得积分</text>
      </view>
    </view>

    <!-- Category Grid -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">文化探索分类</text>
      </view>
      <view class="cat-grid">
        <view class="cat-item" v-for="cat in categories" :key="cat.id" @tap="selectCat(cat)">
          <view class="cat-icon-wrap" :style="{ background: cat.bg }">
            <text class="cat-icon">{{ cat.icon }}</text>
          </view>
          <text class="cat-name">{{ cat.name }}</text>
        </view>
      </view>
    </view>

    <!-- District Progress -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">我的足迹地图</text>
        <text class="section-sub">已解锁 {{ unlockedCount }}/6 个街区</text>
      </view>
      <view class="district-list">
        <view class="district-row" v-for="d in districts" :key="d.name">
          <view class="district-info">
            <text class="district-name">{{ d.name }}</text>
            <text class="district-count">{{ d.checked }}/{{ d.total }}</text>
          </view>
          <view class="progress-bar">
            <view class="progress-fill" :style="{ width: (d.total > 0 ? d.checked/d.total*100 : 0) + '%' }"></view>
          </view>
          <view v-if="d.checked >= d.total" class="district-badge">✓</view>
        </view>
      </view>
    </view>

    <!-- Checkin Records -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">打卡记录</text>
        <text class="section-more" @tap="goProfileCheckin">全部 ›</text>
      </view>
      <view class="checkin-list">
        <view class="checkin-item" v-for="item in myCheckins" :key="item.id">
          <view class="checkin-icon-wrap">
            <text class="checkin-icon">📍</text>
          </view>
          <view class="checkin-content">
            <text class="checkin-loc">{{ item.location }}</text>
            <text class="checkin-time">{{ item.time }}</text>
          </view>
          <view class="checkin-status" :class="'status-' + item.status">{{ item.status }}</view>
        </view>
      </view>
    </view>

    <!-- Generate Report Button -->
    <view class="section">
      <view class="report-btn" @tap="showReport = true">
        <text class="report-btn-icon">📊</text>
        <text class="report-btn-text">生成街区探索报告</text>
      </view>
    </view>

    <!-- Report Popup -->
    <view class="popup-overlay" v-if="showReport" @tap="showReport = false">
      <view class="report-popup" @tap.stop>
        <text class="report-title">📊 我的探索报告</text>
        <view class="report-divider"></view>
        <view class="report-row" v-for="item in reportItems" :key="item.label">
          <text class="report-label">{{ item.label }}</text>
          <text class="report-value">{{ item.value }}</text>
        </view>
        <view class="report-share">
          <view class="report-share-btn" @tap="showReport = false">关闭</view>
          <view class="report-share-btn primary" @tap="shareReport">分享报告</view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import { myCheckins } from '../../mock/index.js'

export default {
  name: 'CheckinPage',
  data() {
    return {
      myCheckins,
      showReport: false,
      stats: { spots: 12, districts: 3, points: 860 },
      categories: [
        { id: 1, name: '闽南民俗', icon: '🎭', bg: '#FFF3E0' },
        { id: 2, name: '人物志', icon: '👤', bg: '#E3F2FD' },
        { id: 3, name: '美食文化', icon: '🍜', bg: '#FFF8E1' },
        { id: 4, name: '方言学堂', icon: '🎙️', bg: '#E8F5E9' },
        { id: 5, name: '古建筑', icon: '🏯', bg: '#FCE4EC' },
        { id: 6, name: '非遗技艺', icon: '🎨', bg: '#EDE7F6' },
        { id: 7, name: '渔村文化', icon: '⚓', bg: '#E0F7FA' },
        { id: 8, name: '南音戏曲', icon: '🎵', bg: '#F3E5F5' },
      ],
      districts: [
        { name: '思明区', checked: 5, total: 8 },
        { name: '湖里区', checked: 3, total: 6 },
        { name: '集美区', checked: 2, total: 7 },
        { name: '海沧区', checked: 1, total: 5 },
        { name: '同安区', checked: 1, total: 9 },
        { name: '翔安区', checked: 0, total: 6 },
      ],
      reportItems: [
        { label: '累计打卡次数', value: '12次' },
        { label: '覆盖街区', value: '3个' },
        { label: '获得积分', value: '860分' },
        { label: '完整解锁街区', value: '0个' },
        { label: '获得徽章', value: '4枚' },
        { label: '解锁路线', value: '2条' },
      ]
    }
  },
  computed: {
    unlockedCount() {
      return this.districts.filter(d => d.checked >= d.total).length
    }
  },
  methods: {
    selectCat(cat) {
      uni.showToast({ title: `探索${cat.name}`, icon: 'none' })
    },
    goProfileCheckin() {
      uni.navigateTo({ url: '/pages/profile/checkin' })
    },
    shareReport() {
      uni.showToast({ title: '分享功能开发中', icon: 'none' })
    }
  }
}
</script>

<style>
.checkin-page { background: #F5F7FA; min-height: 100vh; }

.stats-row {
  display: flex; background: #1AAD9E;
  padding: 30rpx 30rpx 40rpx;
}
.stat-card {
  flex: 1; display: flex; flex-direction: column; align-items: center;
}
.stat-num { font-size: 52rpx; font-weight: bold; color: #fff; line-height: 1; }
.stat-label { font-size: 22rpx; color: rgba(255,255,255,0.8); margin-top: 8rpx; }

.section { padding: 24rpx 30rpx 0; }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20rpx; }
.section-title { font-size: 32rpx; font-weight: bold; color: #222; }
.section-sub { font-size: 24rpx; color: #999; }
.section-more { font-size: 26rpx; color: #1AAD9E; }

/* Category */
.cat-grid { display: flex; flex-wrap: wrap; gap: 20rpx; }
.cat-item {
  width: calc(25% - 15rpx); display: flex; flex-direction: column;
  align-items: center; background: #fff; border-radius: 16rpx;
  padding: 24rpx 0; box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
}
.cat-icon-wrap {
  width: 80rpx; height: 80rpx; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; margin-bottom: 12rpx;
}
.cat-icon { font-size: 40rpx; }
.cat-name { font-size: 22rpx; color: #444; }

/* District Progress */
.district-list { background: #fff; border-radius: 16rpx; padding: 8rpx 24rpx; box-shadow: 0 2rpx 16rpx rgba(0,0,0,0.06); }
.district-row {
  display: flex; align-items: center; padding: 20rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
}
.district-row:last-child { border-bottom: none; }
.district-info { width: 140rpx; }
.district-name { font-size: 28rpx; color: #333; display: block; }
.district-count { font-size: 22rpx; color: #aaa; }
.progress-bar {
  flex: 1; height: 12rpx; background: #f0f0f0;
  border-radius: 6rpx; margin: 0 20rpx; overflow: hidden;
}
.progress-fill { height: 100%; background: #1AAD9E; border-radius: 6rpx; transition: width 0.4s; }
.district-badge {
  width: 40rpx; height: 40rpx; background: #1AAD9E; color: #fff;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 22rpx; font-weight: bold;
}

/* Checkin Items */
.checkin-list { background: #fff; border-radius: 16rpx; overflow: hidden; box-shadow: 0 2rpx 16rpx rgba(0,0,0,0.06); }
.checkin-item {
  display: flex; align-items: center; padding: 24rpx;
  border-bottom: 1rpx solid #f5f5f5;
}
.checkin-item:last-child { border-bottom: none; }
.checkin-icon-wrap {
  width: 72rpx; height: 72rpx; background: #E8F8F7; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; margin-right: 20rpx; flex-shrink: 0;
}
.checkin-icon { font-size: 34rpx; }
.checkin-content { flex: 1; }
.checkin-loc { font-size: 28rpx; color: #333; font-weight: 500; display: block; }
.checkin-time { font-size: 22rpx; color: #aaa; margin-top: 6rpx; display: block; }
.checkin-status {
  font-size: 22rpx; padding: 4rpx 16rpx; border-radius: 20rpx;
}
.status-已审核 { background: #E8F8F7; color: #1AAD9E; }
.status-待审核 { background: #FFF8E1; color: #f0ad4e; }
.status-审核中 { background: #E3F2FD; color: #007aff; }

/* Report Button */
.report-btn {
  display: flex; align-items: center; justify-content: center;
  background: #1AAD9E; border-radius: 16rpx; padding: 32rpx;
  margin-bottom: 40rpx; box-shadow: 0 4rpx 20rpx rgba(26,173,158,0.35);
}
.report-btn-icon { font-size: 40rpx; margin-right: 16rpx; }
.report-btn-text { font-size: 32rpx; color: #fff; font-weight: bold; }

/* Popup */
.popup-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5); z-index: 100;
  display: flex; align-items: center; justify-content: center;
}
.report-popup {
  background: #fff; border-radius: 24rpx; padding: 40rpx;
  width: 680rpx; box-sizing: border-box;
}
.report-title { font-size: 36rpx; font-weight: bold; color: #222; display: block; text-align: center; }
.report-divider { height: 1rpx; background: #eee; margin: 24rpx 0; }
.report-row { display: flex; justify-content: space-between; padding: 16rpx 0; border-bottom: 1rpx solid #f8f8f8; }
.report-label { font-size: 28rpx; color: #666; }
.report-value { font-size: 28rpx; color: #1AAD9E; font-weight: 600; }
.report-share { display: flex; gap: 20rpx; margin-top: 32rpx; }
.report-share-btn {
  flex: 1; text-align: center; padding: 24rpx; border-radius: 40rpx;
  font-size: 28rpx; background: #f5f5f5; color: #666;
}
.report-share-btn.primary { background: #1AAD9E; color: #fff; }
</style>
