<template>
  <scroll-view scroll-y class="detail-page">
    <view v-if="item">
      <!-- Cover -->
      <image class="detail-cover" :src="item.cover" mode="aspectFill" />

      <!-- Basic Info -->
      <view class="section">
        <view class="info-header">
          <view class="info-type-badge">{{ item.type }}</view>
          <view v-if="item.type === 'AI复原'" class="ai-badge">AI复原</view>
        </view>
        <text class="detail-title">{{ item.title }}</text>
        <view class="meta-grid">
          <view class="meta-cell">
            <text class="meta-key">方言类型</text>
            <text class="meta-val">闽南语（厦门腔）</text>
          </view>
          <view class="meta-cell">
            <text class="meta-key">保护状态</text>
            <text class="meta-val protect">省级非遗</text>
          </view>
          <view class="meta-cell">
            <text class="meta-key">采集日期</text>
            <text class="meta-val">2023-11-15</text>
          </view>
          <view class="meta-cell">
            <text class="meta-key">数据来源</text>
            <text class="meta-val">厦门市文化局</text>
          </view>
        </view>
      </view>

      <!-- Introduction -->
      <view class="section card">
        <text class="card-title">📖 简介</text>
        <text class="card-text">{{ item.summary }}</text>
        <view class="culture-tags">
          <text class="culture-tag" v-for="(tag, i) in item.tags" :key="i">{{ tag }}</text>
        </view>
      </view>

      <!-- Audio Player -->
      <view class="section card">
        <text class="card-title">🎙️ 闽南语朗读</text>
        <view class="phonetic-text">
          <text class="phonetic-minnan">伊是咱兜个人，讲咱兜个话。</text>
          <text class="phonetic-zhuyin">i sī zán tau ê lâng, kóng zán tau ê uē.</text>
        </view>
        <view class="player-bar">
          <view class="player-btn" @tap="togglePlay">
            <text class="player-icon">{{ playing ? '⏸️' : '▶️' }}</text>
          </view>
          <view class="player-progress-wrap">
            <view class="player-progress">
              <view class="player-progress-fill" :style="{ width: playProgress + '%' }"></view>
            </view>
            <view class="player-time">
              <text>{{ currentTime }}</text>
              <text>{{ totalTime }}</text>
            </view>
          </view>
        </view>
        <text class="player-note">* 示例音频，点击体验语音朗读功能</text>
      </view>

      <!-- Archive Fields -->
      <view class="section card">
        <text class="card-title">🗂️ 档案信息</text>
        <view class="archive-row" v-for="f in archiveFields" :key="f.key">
          <text class="archive-key">{{ f.key }}</text>
          <text class="archive-val">{{ f.val }}</text>
        </view>
      </view>

      <!-- Collection Location -->
      <view class="section card">
        <text class="card-title">📍 采集地点</text>
        <view class="location-block">
          <view class="location-info">
            <text class="location-name">厦门市思明区中山路街道</text>
            <text class="location-coords">坐标：24.4498°N, 118.0819°E</text>
          </view>
          <view class="nav-btn" @tap="openNav">导航</view>
        </view>
      </view>

      <!-- Language Landscape Elements -->
      <view class="section card">
        <text class="card-title">🏮 语言景观要素</text>
        <view class="element-list">
          <view class="element-item" v-for="el in elements" :key="el.id">
            <text class="element-emoji">{{ el.emoji }}</text>
            <view class="element-info">
              <text class="element-name">{{ el.name }}</text>
              <text class="element-desc">{{ el.desc }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- Actions -->
      <view class="action-bar">
        <view class="action-btn" @tap="toggleFavorite">
          <text class="action-icon">{{ favorited ? '⭐' : '☆' }}</text>
          <text class="action-label">{{ favorited ? '已收藏' : '收藏' }}</text>
        </view>
        <view class="action-btn" @tap="shareItem">
          <text class="action-icon">📤</text>
          <text class="action-label">分享</text>
        </view>
        <view class="action-btn-primary" @tap="reportError">
          <text>纠错反馈</text>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import { corpusList } from '../../mock/index.js'

export default {
  name: 'LibraryDetail',
  data() {
    return {
      item: null,
      playing: false,
      playProgress: 0,
      currentTime: '00:00',
      totalTime: '02:34',
      favorited: false,
      playTimer: null,
      archiveFields: [
        { key: '档案编号', val: 'XM-2023-001245' },
        { key: '采集人员', val: '陈文彬、李晓燕' },
        { key: '整理机构', val: '厦门大学中文系' },
        { key: '版权状态', val: '公共领域' },
        { key: '文件格式', val: 'WAV / MP3' },
        { key: '文件大小', val: '12.4 MB' },
      ],
      elements: [
        { id: 1, emoji: '🏮', name: '招牌标语', desc: '骑楼沿街闽南语商号招牌' },
        { id: 2, emoji: '📜', name: '楹联题刻', desc: '门柱楹联，含闽南语传统格律' },
        { id: 3, emoji: '🗣️', name: '口头语言', desc: '商贩叫卖、居民日常对话' },
      ]
    }
  },
  onLoad(options) {
    const id = parseInt(options.id)
    this.item = corpusList.find(c => c.id === id) || corpusList[0]
  },
  onUnload() {
    if (this.playTimer) clearInterval(this.playTimer)
  },
  methods: {
    togglePlay() {
      this.playing = !this.playing
      if (this.playing) {
        this.playTimer = setInterval(() => {
          if (this.playProgress >= 100) {
            this.playing = false
            this.playProgress = 0
            this.currentTime = '00:00'
            clearInterval(this.playTimer)
          } else {
            this.playProgress += 1
            const secs = Math.floor(this.playProgress * 154 / 100)
            const m = String(Math.floor(secs / 60)).padStart(2, '0')
            const s = String(secs % 60).padStart(2, '0')
            this.currentTime = `${m}:${s}`
          }
        }, 300)
      } else {
        clearInterval(this.playTimer)
      }
    },
    toggleFavorite() {
      this.favorited = !this.favorited
      uni.showToast({ title: this.favorited ? '已收藏' : '已取消收藏', icon: 'none' })
    },
    shareItem() {
      uni.showToast({ title: '分享功能开发中', icon: 'none' })
    },
    reportError() {
      uni.showToast({ title: '感谢您的反馈', icon: 'none' })
    },
    openNav() {
      uni.showToast({ title: '导航功能开发中', icon: 'none' })
    }
  }
}
</script>

<style>
.detail-page { background: #F5F7FA; min-height: 100vh; }
.detail-cover { width: 100%; height: 400rpx; display: block; }

.section { padding: 24rpx 30rpx 0; }
.card {
  background: #fff; border-radius: 16rpx; padding: 28rpx 28rpx 20rpx;
  box-shadow: 0 2rpx 16rpx rgba(0,0,0,0.06); margin-bottom: 4rpx;
}
.card-title { font-size: 30rpx; font-weight: bold; color: #222; display: block; margin-bottom: 20rpx; }

.info-header { display: flex; gap: 12rpx; margin-bottom: 16rpx; }
.info-type-badge { font-size: 22rpx; color: #1AAD9E; background: #E8F8F7; padding: 4rpx 16rpx; border-radius: 20rpx; }
.ai-badge { font-size: 22rpx; color: #fff; background: linear-gradient(135deg, #667eea, #764ba2); padding: 4rpx 16rpx; border-radius: 20rpx; }
.detail-title { font-size: 40rpx; font-weight: bold; color: #222; line-height: 1.4; display: block; margin-bottom: 24rpx; }
.meta-grid { display: flex; flex-wrap: wrap; gap: 16rpx; }
.meta-cell { width: calc(50% - 8rpx); background: #f9f9f9; border-radius: 12rpx; padding: 16rpx; }
.meta-key { font-size: 22rpx; color: #999; display: block; }
.meta-val { font-size: 26rpx; color: #333; display: block; margin-top: 4rpx; }
.meta-val.protect { color: #1AAD9E; }

.card-text { font-size: 28rpx; color: #555; line-height: 1.7; display: block; margin-bottom: 16rpx; }
.culture-tags { display: flex; flex-wrap: wrap; gap: 10rpx; }
.culture-tag { font-size: 22rpx; color: #1AAD9E; background: #E8F8F7; padding: 6rpx 16rpx; border-radius: 20rpx; }

.phonetic-text { background: #f9f9f9; border-radius: 12rpx; padding: 20rpx; margin-bottom: 20rpx; }
.phonetic-minnan { font-size: 30rpx; color: #222; display: block; margin-bottom: 8rpx; }
.phonetic-zhuyin { font-size: 22rpx; color: #888; display: block; font-style: italic; }
.player-bar { display: flex; align-items: center; gap: 20rpx; }
.player-btn {
  width: 80rpx; height: 80rpx; background: #1AAD9E; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.player-icon { font-size: 36rpx; }
.player-progress-wrap { flex: 1; }
.player-progress { height: 8rpx; background: #eee; border-radius: 4rpx; overflow: hidden; }
.player-progress-fill { height: 100%; background: #1AAD9E; transition: width 0.3s; }
.player-time { display: flex; justify-content: space-between; font-size: 20rpx; color: #aaa; margin-top: 8rpx; }
.player-note { font-size: 20rpx; color: #ccc; display: block; margin-top: 16rpx; }

.archive-row {
  display: flex; justify-content: space-between; padding: 16rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
}
.archive-row:last-child { border-bottom: none; }
.archive-key { font-size: 26rpx; color: #888; }
.archive-val { font-size: 26rpx; color: #333; }

.location-block { display: flex; align-items: center; justify-content: space-between; }
.location-info { flex: 1; }
.location-name { font-size: 28rpx; color: #333; display: block; }
.location-coords { font-size: 22rpx; color: #aaa; display: block; margin-top: 6rpx; }
.nav-btn {
  background: #1AAD9E; color: #fff; padding: 16rpx 32rpx;
  border-radius: 40rpx; font-size: 26rpx;
}

.element-list { }
.element-item { display: flex; align-items: flex-start; padding: 16rpx 0; border-bottom: 1rpx solid #f5f5f5; }
.element-item:last-child { border-bottom: none; }
.element-emoji { font-size: 40rpx; margin-right: 20rpx; }
.element-name { font-size: 28rpx; color: #333; font-weight: 500; display: block; }
.element-desc { font-size: 22rpx; color: #888; display: block; margin-top: 4rpx; }

.action-bar {
  display: flex; align-items: center; gap: 20rpx;
  padding: 30rpx; background: #fff; margin-top: 24rpx;
}
.action-btn {
  display: flex; flex-direction: column; align-items: center;
  background: #f5f5f5; border-radius: 12rpx; padding: 16rpx 24rpx;
}
.action-icon { font-size: 36rpx; }
.action-label { font-size: 22rpx; color: #666; margin-top: 4rpx; }
.action-btn-primary {
  flex: 1; background: #1AAD9E; color: #fff; text-align: center;
  padding: 28rpx; border-radius: 40rpx; font-size: 28rpx;
}
</style>
