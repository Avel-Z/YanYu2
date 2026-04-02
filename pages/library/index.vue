<template>
  <view class="library-page">
    <!-- Stats Bar -->
    <view class="stats-bar">
      <view class="stat-item">
        <text class="stat-num">128</text>
        <text class="stat-label">语料总数</text>
      </view>
      <view class="stat-divider"></view>
      <view class="stat-item">
        <text class="stat-num">32</text>
        <text class="stat-label">已收藏</text>
      </view>
      <view class="stat-divider"></view>
      <view class="stat-item">
        <text class="stat-num">18</text>
        <text class="stat-label">AI声景</text>
      </view>
    </view>

    <!-- Tab Switcher -->
    <view class="tab-bar">
      <view
        class="tab-item"
        :class="{ active: activeTab === 0 }"
        @tap="activeTab = 0"
      >分类语料(现存)</view>
      <view
        class="tab-item"
        :class="{ active: activeTab === 1 }"
        @tap="activeTab = 1"
      >AI声音剧场(复原)</view>
    </view>

    <!-- Search -->
    <view class="search-wrap">
      <text class="search-icon">🔍</text>
      <input class="search-input" v-model="keyword" placeholder="搜索语料标题、标签..." placeholder-style="color:#bbb" />
    </view>

    <!-- Corpus List -->
    <view class="corpus-list">
      <view
        class="corpus-card"
        v-for="item in filteredList"
        :key="item.id"
        @tap="goDetail(item)"
      >
        <image class="corpus-cover" :src="item.cover" mode="aspectFill" />
        <view class="corpus-info">
          <view class="corpus-top">
            <view class="corpus-type-badge">{{ item.type }}</view>
            <view v-if="item.type === 'AI复原'" class="ai-badge">AI</view>
          </view>
          <text class="corpus-title">{{ item.title }}</text>
          <text class="corpus-summary">{{ item.summary }}</text>
          <view class="corpus-tags">
            <text class="tag" v-for="(tag, i) in item.tags" :key="i">{{ tag }}</text>
          </view>
          <view class="corpus-bottom">
            <text class="corpus-stat">👁 {{ item.views }}</text>
            <text class="corpus-stat">⭐ {{ item.favorites }}</text>
          </view>
        </view>
      </view>

      <view v-if="filteredList.length === 0" class="empty-tip">
        <text>暂无相关语料</text>
      </view>
    </view>
  </view>
</template>

<script>
import { corpusList } from '../../mock/index.js'

export default {
  name: 'LibraryPage',
  data() {
    return {
      activeTab: 0,
      keyword: '',
      corpusList
    }
  },
  computed: {
    filteredList() {
      const isAI = this.activeTab === 1
      return this.corpusList.filter(item => {
        const matchTab = isAI ? item.type === 'AI复原' : item.type !== 'AI复原'
        const matchKw = !this.keyword || item.title.includes(this.keyword) || item.tags.some(t => t.includes(this.keyword))
        return matchTab && matchKw
      })
    }
  },
  methods: {
    goDetail(item) {
      uni.navigateTo({ url: `/pages/library/detail?id=${item.id}` })
    }
  }
}
</script>

<style>
.library-page { background: #F5F7FA; min-height: 100vh; padding-bottom: 40rpx; }

.stats-bar {
  display: flex; background: #1AAD9E;
  padding: 30rpx 0 36rpx;
}
.stat-item {
  flex: 1; display: flex; flex-direction: column;
  align-items: center;
}
.stat-num { font-size: 48rpx; font-weight: bold; color: #fff; }
.stat-label { font-size: 22rpx; color: rgba(255,255,255,0.8); margin-top: 6rpx; }
.stat-divider { width: 1rpx; background: rgba(255,255,255,0.3); margin: 8rpx 0; }

.tab-bar {
  display: flex; background: #fff; padding: 0 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
}
.tab-item {
  flex: 1; text-align: center; font-size: 28rpx; color: #999;
  padding: 28rpx 0; position: relative;
}
.tab-item.active {
  color: #1AAD9E; font-weight: 600;
}
.tab-item.active::after {
  content: ''; position: absolute; bottom: 0; left: 20%; right: 20%;
  height: 4rpx; background: #1AAD9E; border-radius: 2rpx;
}

.search-wrap {
  display: flex; align-items: center; background: #fff;
  margin: 20rpx 30rpx; border-radius: 40rpx;
  padding: 0 24rpx; height: 72rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.06);
}
.search-icon { font-size: 30rpx; margin-right: 12rpx; }
.search-input { flex: 1; font-size: 28rpx; height: 72rpx; }

.corpus-list { padding: 0 30rpx; }
.corpus-card {
  background: #fff; border-radius: 16rpx; overflow: hidden;
  box-shadow: 0 2rpx 16rpx rgba(0,0,0,0.06); margin-bottom: 20rpx;
  display: flex;
}
.corpus-cover { width: 200rpx; height: 200rpx; flex-shrink: 0; }
.corpus-info { flex: 1; padding: 20rpx; display: flex; flex-direction: column; }
.corpus-top { display: flex; align-items: center; gap: 12rpx; margin-bottom: 10rpx; }
.corpus-type-badge {
  font-size: 20rpx; color: #1AAD9E; background: #E8F8F7;
  padding: 4rpx 12rpx; border-radius: 20rpx;
}
.ai-badge {
  font-size: 20rpx; color: #fff; background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 4rpx 12rpx; border-radius: 20rpx;
}
.corpus-title { font-size: 28rpx; font-weight: 600; color: #222; line-height: 1.3; }
.corpus-summary {
  font-size: 22rpx; color: #888; line-height: 1.5;
  margin-top: 8rpx; overflow: hidden;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
}
.corpus-tags { display: flex; flex-wrap: wrap; gap: 8rpx; margin-top: 10rpx; }
.tag { font-size: 18rpx; color: #1AAD9E; background: #E8F8F7; padding: 2rpx 10rpx; border-radius: 20rpx; }
.corpus-bottom { display: flex; gap: 20rpx; margin-top: auto; padding-top: 10rpx; }
.corpus-stat { font-size: 22rpx; color: #aaa; }

.empty-tip { text-align: center; padding: 80rpx 0; color: #ccc; font-size: 28rpx; }
</style>
