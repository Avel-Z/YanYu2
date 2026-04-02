<template>
  <view class="home-page">
    <!-- Search Bar -->
    <view class="search-wrap">
      <view class="search-bar">
        <text class="search-icon">🔍</text>
        <input class="search-input" placeholder="搜索语料、地点、活动..." placeholder-style="color:#aaa" />
      </view>
      <view class="search-notify">
        <text class="notify-icon">🔔</text>
      </view>
    </view>

    <!-- Mock GIS Map -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">厦门语言景观地图</text>
        <text class="section-more" @tap="goCheckin">探索 ›</text>
      </view>
      <view class="map-container">
        <view class="map-mock">
          <!-- District blocks -->
          <view class="district-block district-siming" @tap="selectDistrict('思明')">
            <text class="district-name">思明</text>
          </view>
          <view class="district-block district-huli" @tap="selectDistrict('湖里')">
            <text class="district-name">湖里</text>
          </view>
          <view class="district-block district-jimei" @tap="selectDistrict('集美')">
            <text class="district-name">集美</text>
          </view>
          <view class="district-block district-haicang" @tap="selectDistrict('海沧')">
            <text class="district-name">海沧</text>
          </view>
          <view class="district-block district-tongan" @tap="selectDistrict('同安')">
            <text class="district-name">同安</text>
          </view>
          <view class="district-block district-xiangan" @tap="selectDistrict('翔安')">
            <text class="district-name">翔安</text>
          </view>
          <!-- Map Points -->
          <view v-for="pt in mapPoints" :key="pt.id" class="map-point" :style="getPointStyle(pt)" @tap="showPoint(pt)">
            <text class="map-dot">{{ getPointEmoji(pt.type) }}</text>
          </view>
        </view>
        <!-- Legend -->
        <view class="map-legend">
          <view class="legend-item" v-for="t in pointTypes" :key="t.type">
            <text class="legend-emoji">{{ t.emoji }}</text>
            <text class="legend-label">{{ t.type }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- Featured Activities -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">近期活动</text>
        <text class="section-more">更多 ›</text>
      </view>
      <scroll-view scroll-x class="activities-scroll">
        <view class="activity-card" v-for="act in activities" :key="act.id">
          <image class="activity-cover" :src="act.coverImg" mode="aspectFill" />
          <view class="activity-tag">{{ act.type }}</view>
          <view class="activity-info">
            <text class="activity-title">{{ act.title }}</text>
            <view class="activity-meta">
              <text class="meta-item">📍 {{ act.location }}</text>
              <text class="meta-item">🕐 {{ act.date }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- Hot Spots -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">热门语言景观地</text>
        <text class="section-more">更多 ›</text>
      </view>
      <view class="hot-grid">
        <view class="hot-card" v-for="spot in hotSpots" :key="spot.id" @tap="goLibrary">
          <image class="hot-cover" :src="spot.cover" mode="aspectFill" />
          <view class="hot-info">
            <text class="hot-name">{{ spot.name }}</text>
            <view class="hot-tags">
              <text class="tag" v-for="(tag, i) in spot.tags" :key="i">{{ tag }}</text>
            </view>
            <view class="hot-bottom">
              <text class="hot-district">{{ spot.district }}</text>
              <text class="hot-views">👁 {{ spot.views }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- Activity Feed -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">最新动态</text>
      </view>
      <view class="feed-list">
        <view class="feed-item" v-for="item in activityFeed" :key="item.id">
          <view class="feed-dot" :class="'dot-' + item.type"></view>
          <view class="feed-content">
            <text class="feed-text">{{ item.content }}</text>
            <text class="feed-time">{{ item.time }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- Point Detail Popup -->
    <view class="popup-overlay" v-if="selectedPoint" @tap="selectedPoint = null">
      <view class="popup-card" @tap.stop>
        <text class="popup-title">{{ selectedPoint.name }}</text>
        <text class="popup-type">{{ getPointEmoji(selectedPoint.type) }} {{ selectedPoint.type }}</text>
        <text class="popup-district">📍 {{ selectedPoint.district }}区</text>
        <text class="popup-desc">{{ selectedPoint.description }}</text>
        <view class="popup-btn" @tap="selectedPoint = null">关闭</view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapPoints, activities, hotSpots, activityFeed } from '../../mock/index.js'

export default {
  name: 'HomePage',
  data() {
    return {
      mapPoints,
      activities,
      hotSpots,
      activityFeed,
      selectedPoint: null,
      pointTypes: [
        { type: '招牌', emoji: '🏮' },
        { type: '古厝', emoji: '🏯' },
        { type: '老照片', emoji: '📷' },
      ]
    }
  },
  methods: {
    getPointEmoji(type) {
      const map = { '招牌': '🏮', '古厝': '🏯', '老照片': '📷' }
      return map[type] || '📍'
    },
    getPointStyle(pt) {
      const posMap = {
        1: { left: '30%', top: '58%' },
        2: { left: '35%', top: '65%' },
        3: { left: '20%', top: '55%' },
        4: { left: '50%', top: '30%' },
        5: { left: '60%', top: '15%' },
        6: { left: '80%', top: '40%' },
        7: { left: '10%', top: '42%' },
        8: { left: '48%', top: '48%' },
      }
      return posMap[pt.id] || { left: '50%', top: '50%' }
    },
    selectDistrict(name) {
      uni.showToast({ title: `${name}区`, icon: 'none' })
    },
    showPoint(pt) {
      this.selectedPoint = pt
    },
    goCheckin() {
      uni.switchTab({ url: '/pages/checkin/index' })
    },
    goLibrary() {
      uni.switchTab({ url: '/pages/library/index' })
    }
  }
}
</script>

<style>
.home-page { background: #F5F7FA; min-height: 100vh; padding-bottom: 40rpx; }

.search-wrap {
  display: flex; align-items: center; padding: 20rpx 30rpx;
  background: #1AAD9E;
}
.search-bar {
  flex: 1; display: flex; align-items: center;
  background: rgba(255,255,255,0.95); border-radius: 40rpx;
  padding: 0 24rpx; height: 72rpx;
}
.search-icon { font-size: 32rpx; margin-right: 12rpx; }
.search-input { flex: 1; font-size: 28rpx; color: #333; height: 72rpx; }
.search-notify {
  width: 72rpx; height: 72rpx; display: flex; align-items: center;
  justify-content: center; margin-left: 16rpx;
}
.notify-icon { font-size: 44rpx; }

.section { margin: 24rpx 0 0; padding: 0 30rpx; }
.section-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 20rpx;
}
.section-title { font-size: 32rpx; font-weight: bold; color: #222; }
.section-more { font-size: 26rpx; color: #1AAD9E; }

/* Map */
.map-container { background: #fff; border-radius: 16rpx; overflow: hidden; box-shadow: 0 2rpx 16rpx rgba(0,0,0,0.06); }
.map-mock {
  position: relative; height: 380rpx;
  background: linear-gradient(135deg, #d4edda 0%, #c8e6e3 50%, #b8ddd9 100%);
  overflow: hidden;
}
.district-block {
  position: absolute; border-radius: 8rpx;
  display: flex; align-items: center; justify-content: center;
  border: 2rpx solid rgba(255,255,255,0.6);
}
.district-siming { left: 22%; top: 44%; width: 22%; height: 30%; background: rgba(26,173,158,0.35); }
.district-huli { left: 44%; top: 36%; width: 18%; height: 26%; background: rgba(26,173,158,0.25); }
.district-jimei { left: 42%; top: 18%; width: 22%; height: 26%; background: rgba(26,173,158,0.20); }
.district-haicang { left: 6%; top: 30%; width: 20%; height: 26%; background: rgba(26,173,158,0.20); }
.district-tongan { left: 52%; top: 4%; width: 26%; height: 28%; background: rgba(26,173,158,0.15); }
.district-xiangan { left: 68%; top: 30%; width: 24%; height: 28%; background: rgba(26,173,158,0.18); }
.district-name { font-size: 22rpx; color: #0D8C7F; font-weight: 600; }
.map-point {
  position: absolute; transform: translate(-50%, -50%);
  z-index: 10; cursor: pointer;
}
.map-dot { font-size: 34rpx; line-height: 1; }
.map-legend {
  display: flex; padding: 16rpx 24rpx; background: #f9f9f9;
  border-top: 1rpx solid #eee;
}
.legend-item { display: flex; align-items: center; margin-right: 32rpx; }
.legend-emoji { font-size: 24rpx; margin-right: 6rpx; }
.legend-label { font-size: 22rpx; color: #666; }

/* Activities */
.activities-scroll { white-space: nowrap; }
.activity-card {
  display: inline-block; width: 340rpx; margin-right: 20rpx;
  background: #fff; border-radius: 16rpx;
  box-shadow: 0 2rpx 16rpx rgba(0,0,0,0.06); overflow: hidden;
  vertical-align: top; white-space: normal;
}
.activity-cover { width: 340rpx; height: 200rpx; display: block; }
.activity-tag {
  display: inline-block; margin: 16rpx 16rpx 0;
  background: #E8F8F7; color: #1AAD9E;
  font-size: 20rpx; padding: 4rpx 12rpx; border-radius: 20rpx;
}
.activity-info { padding: 12rpx 16rpx 20rpx; }
.activity-title { font-size: 28rpx; font-weight: 600; color: #222; line-height: 1.4; display: block; }
.activity-meta { margin-top: 12rpx; }
.meta-item { font-size: 22rpx; color: #888; display: block; margin-bottom: 4rpx; }

/* Hot Spots */
.hot-grid { display: flex; flex-wrap: wrap; gap: 20rpx; }
.hot-card {
  width: calc(50% - 10rpx); background: #fff; border-radius: 16rpx;
  box-shadow: 0 2rpx 16rpx rgba(0,0,0,0.06); overflow: hidden;
}
.hot-cover { width: 100%; height: 160rpx; display: block; }
.hot-info { padding: 16rpx; }
.hot-name { font-size: 26rpx; font-weight: 600; color: #222; line-height: 1.3; display: block; }
.hot-tags { display: flex; flex-wrap: wrap; gap: 8rpx; margin: 10rpx 0; }
.tag {
  font-size: 18rpx; color: #1AAD9E; background: #E8F8F7;
  padding: 2rpx 10rpx; border-radius: 20rpx;
}
.hot-bottom { display: flex; justify-content: space-between; align-items: center; }
.hot-district { font-size: 22rpx; color: #999; }
.hot-views { font-size: 22rpx; color: #aaa; }

/* Feed */
.feed-list { background: #fff; border-radius: 16rpx; padding: 8rpx 24rpx; box-shadow: 0 2rpx 16rpx rgba(0,0,0,0.06); }
.feed-item {
  display: flex; align-items: flex-start; padding: 20rpx 0;
  border-bottom: 1rpx solid #f2f2f2;
}
.feed-item:last-child { border-bottom: none; }
.feed-dot {
  width: 16rpx; height: 16rpx; border-radius: 50%;
  margin-top: 8rpx; margin-right: 20rpx; flex-shrink: 0;
}
.dot-投稿 { background: #1AAD9E; }
.dot-打卡 { background: #f0ad4e; }
.dot-收藏 { background: #dd524d; }
.dot-活动 { background: #007aff; }
.feed-content { flex: 1; }
.feed-text { font-size: 26rpx; color: #333; line-height: 1.5; display: block; }
.feed-time { font-size: 22rpx; color: #aaa; margin-top: 6rpx; display: block; }

/* Popup */
.popup-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.45); z-index: 100;
  display: flex; align-items: flex-end; justify-content: center;
}
.popup-card {
  background: #fff; border-radius: 24rpx 24rpx 0 0;
  padding: 40rpx 40rpx 60rpx;
  width: 100%; box-sizing: border-box;
}
.popup-title { font-size: 36rpx; font-weight: bold; color: #222; display: block; margin-bottom: 16rpx; }
.popup-type { font-size: 26rpx; color: #1AAD9E; display: block; margin-bottom: 8rpx; }
.popup-district { font-size: 26rpx; color: #888; display: block; margin-bottom: 16rpx; }
.popup-desc { font-size: 28rpx; color: #555; line-height: 1.6; display: block; margin-bottom: 32rpx; }
.popup-btn {
  background: #1AAD9E; color: #fff; border-radius: 40rpx;
  text-align: center; padding: 24rpx; font-size: 30rpx;
}
</style>
