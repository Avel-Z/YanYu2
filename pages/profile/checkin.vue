<template>
  <scroll-view scroll-y class="checkin-profile-page">
    <!-- Cumulative Stats -->
    <view class="stats-banner">
      <view class="banner-stat" v-for="s in cumulativeStats" :key="s.label">
        <text class="banner-num">{{ s.val }}</text>
        <text class="banner-label">{{ s.label }}</text>
      </view>
    </view>

    <!-- Achievement Badges -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">成就徽章</text>
        <text class="badge-count">{{ unlockedCount }}/{{ achievements.length }}</text>
      </view>
      <view class="badges-grid">
        <view
          class="badge-item"
          v-for="badge in achievements"
          :key="badge.id"
          :class="{ locked: !badge.unlocked }"
          @tap="showBadge(badge)"
        >
          <view class="badge-icon-wrap" :class="{ 'badge-unlocked': badge.unlocked }">
            <text class="badge-icon">{{ badge.icon }}</text>
            <text v-if="!badge.unlocked" class="lock-icon">🔒</text>
          </view>
          <text class="badge-name">{{ badge.name }}</text>
        </view>
      </view>
    </view>

    <!-- Checkin History -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">打卡历史</text>
      </view>
      <view class="history-list">
        <view class="history-item" v-for="item in myCheckins" :key="item.id">
          <view class="timeline-dot" :class="{ active: item.status === '已审核' }"></view>
          <view class="history-content">
            <text class="history-loc">{{ item.location }}</text>
            <text class="history-time">{{ item.time }}</text>
            <view class="history-footer">
              <view class="history-district">{{ item.district }}区</view>
              <view class="history-status" :class="'status-' + item.status">{{ item.status }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- Badge Detail Popup -->
    <view class="popup-overlay" v-if="selectedBadge" @tap="selectedBadge = null">
      <view class="badge-popup" @tap.stop>
        <text class="popup-badge-icon">{{ selectedBadge.icon }}</text>
        <text class="popup-badge-name">{{ selectedBadge.name }}</text>
        <text class="popup-badge-desc">{{ selectedBadge.desc }}</text>
        <view class="popup-badge-status" :class="selectedBadge.unlocked ? 'unlocked' : 'locked-status'">
          {{ selectedBadge.unlocked ? '✅ 已解锁' : '🔒 未解锁' }}
        </view>
        <view class="popup-close" @tap="selectedBadge = null">关闭</view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import { myCheckins, achievements } from '../../mock/index.js'

export default {
  name: 'ProfileCheckin',
  data() {
    return {
      myCheckins,
      achievements,
      selectedBadge: null,
      cumulativeStats: [
        { label: '累计打卡', val: '12次' },
        { label: '探索路线', val: '2条' },
        { label: '声音勋章', val: '3枚' },
        { label: '足迹海报', val: '1张' },
      ]
    }
  },
  computed: {
    unlockedCount() {
      return this.achievements.filter(a => a.unlocked).length
    }
  },
  methods: {
    showBadge(badge) {
      this.selectedBadge = badge
    }
  }
}
</script>

<style>
.checkin-profile-page { background: #F5F7FA; min-height: 100vh; padding-bottom: 40rpx; }

.stats-banner {
  display: flex; background: linear-gradient(135deg, #1AAD9E, #0D8C7F);
  padding: 40rpx 0;
}
.banner-stat { flex: 1; display: flex; flex-direction: column; align-items: center; }
.banner-num { font-size: 40rpx; font-weight: bold; color: #fff; }
.banner-label { font-size: 22rpx; color: rgba(255,255,255,0.8); margin-top: 6rpx; }

.section { padding: 24rpx 30rpx 0; }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20rpx; }
.section-title { font-size: 32rpx; font-weight: bold; color: #222; }
.badge-count { font-size: 26rpx; color: #1AAD9E; }

/* Badges */
.badges-grid { display: flex; flex-wrap: wrap; gap: 20rpx; }
.badge-item {
  width: calc(25% - 15rpx); display: flex; flex-direction: column;
  align-items: center; padding: 20rpx 0;
}
.badge-item.locked { opacity: 0.5; }
.badge-icon-wrap {
  position: relative; width: 96rpx; height: 96rpx; border-radius: 50%;
  background: #f0f0f0; display: flex; align-items: center; justify-content: center;
  margin-bottom: 10rpx;
}
.badge-icon-wrap.badge-unlocked { background: linear-gradient(135deg, #E8F8F7, #c3ecea); }
.badge-icon { font-size: 44rpx; }
.lock-icon {
  position: absolute; bottom: -4rpx; right: -4rpx; font-size: 22rpx;
  background: #fff; border-radius: 50%; padding: 2rpx;
}
.badge-name { font-size: 22rpx; color: #444; text-align: center; }

/* History */
.history-list { background: #fff; border-radius: 16rpx; padding: 8rpx 24rpx; box-shadow: 0 2rpx 16rpx rgba(0,0,0,0.06); }
.history-item {
  display: flex; align-items: flex-start; padding: 24rpx 0;
  border-bottom: 1rpx solid #f5f5f5; position: relative;
}
.history-item:last-child { border-bottom: none; }
.timeline-dot {
  width: 20rpx; height: 20rpx; border-radius: 50%;
  background: #ddd; margin-top: 10rpx; margin-right: 24rpx; flex-shrink: 0;
}
.timeline-dot.active { background: #1AAD9E; }
.history-content { flex: 1; }
.history-loc { font-size: 28rpx; color: #333; font-weight: 500; display: block; }
.history-time { font-size: 22rpx; color: #aaa; display: block; margin-top: 6rpx; }
.history-footer { display: flex; align-items: center; gap: 12rpx; margin-top: 10rpx; }
.history-district {
  font-size: 20rpx; color: #888; background: #f5f5f5;
  padding: 2rpx 12rpx; border-radius: 20rpx;
}
.history-status { font-size: 20rpx; padding: 2rpx 12rpx; border-radius: 20rpx; }
.status-已审核 { background: #E8F8F7; color: #1AAD9E; }
.status-待审核 { background: #FFF8E1; color: #f0ad4e; }

/* Badge Popup */
.popup-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5); z-index: 100;
  display: flex; align-items: center; justify-content: center;
}
.badge-popup {
  background: #fff; border-radius: 24rpx; padding: 50rpx 40rpx;
  width: 600rpx; box-sizing: border-box; text-align: center;
}
.popup-badge-icon { font-size: 100rpx; display: block; margin-bottom: 20rpx; }
.popup-badge-name { font-size: 40rpx; font-weight: bold; color: #222; display: block; margin-bottom: 16rpx; }
.popup-badge-desc { font-size: 28rpx; color: #666; display: block; margin-bottom: 24rpx; }
.popup-badge-status { font-size: 26rpx; padding: 8rpx 32rpx; border-radius: 30rpx; display: inline-block; margin-bottom: 32rpx; }
.unlocked { background: #E8F8F7; color: #1AAD9E; }
.locked-status { background: #f5f5f5; color: #999; }
.popup-close {
  background: #1AAD9E; color: #fff; border-radius: 40rpx;
  padding: 24rpx 80rpx; font-size: 28rpx; display: inline-block;
}
</style>
