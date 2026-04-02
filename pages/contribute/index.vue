<template>
  <view class="contribute-page">
    <!-- Top Tabs -->
    <view class="top-tabs">
      <view class="top-tab" :class="{ active: activeTab === 0 }" @tap="activeTab = 0">投稿入口</view>
      <view class="top-tab" :class="{ active: activeTab === 1 }" @tap="activeTab = 1">我的投稿</view>
    </view>

    <!-- 投稿入口 Tab -->
    <view v-if="activeTab === 0">
      <view class="form-section">
        <text class="form-title">📝 新增投稿</text>

        <view class="form-item">
          <text class="form-label">标题 *</text>
          <input class="form-input" v-model="form.title" placeholder="请输入投稿标题" placeholder-style="color:#ccc" />
        </view>

        <view class="form-item">
          <text class="form-label">分类 *</text>
          <view class="form-select" @tap="showCatPicker = true">
            <text :class="form.category ? 'select-val' : 'select-placeholder'">
              {{ form.category || '请选择分类' }}
            </text>
            <text class="select-arrow">›</text>
          </view>
        </view>

        <view class="form-item">
          <text class="form-label">所在地点</text>
          <input class="form-input" v-model="form.location" placeholder="如：思明区中山路88号" placeholder-style="color:#ccc" />
        </view>

        <view class="form-item">
          <text class="form-label">内容描述 *</text>
          <textarea
            class="form-textarea"
            v-model="form.description"
            placeholder="详细描述该语言景观的特征、背景、文化意义..."
            placeholder-style="color:#ccc"
          />
        </view>

        <view class="form-item">
          <text class="form-label">上传附件</text>
          <view class="upload-grid">
            <view class="upload-btn" @tap="upload('image')">
              <text class="upload-icon">🖼️</text>
              <text class="upload-label">图片</text>
            </view>
            <view class="upload-btn" @tap="upload('audio')">
              <text class="upload-icon">🎙️</text>
              <text class="upload-label">音频</text>
            </view>
            <view class="upload-btn" @tap="upload('video')">
              <text class="upload-icon">🎬</text>
              <text class="upload-label">视频</text>
            </view>
            <view class="upload-btn" @tap="upload('doc')">
              <text class="upload-icon">📄</text>
              <text class="upload-label">文档</text>
            </view>
          </view>
        </view>

        <view class="submit-btn" @tap="submitForm">
          <text class="submit-text">提交投稿</text>
        </view>
      </view>

      <!-- Featured Contributions -->
      <view class="section">
        <view class="section-header">
          <text class="section-title">精选投稿</text>
        </view>
        <view class="featured-list">
          <view class="featured-item" v-for="sub in featuredSubs" :key="sub.id">
            <view class="featured-left">
              <view class="featured-cat-badge">{{ sub.category }}</view>
              <text class="featured-title">{{ sub.title }}</text>
              <text class="featured-meta">{{ sub.district }} · {{ sub.date }}</text>
            </view>
            <view class="featured-right">
              <text class="featured-views">👁 {{ sub.views }}</text>
              <view class="status-badge status-已上线">已上线</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 我的投稿 Tab -->
    <view v-if="activeTab === 1">
      <!-- Filter Bar -->
      <view class="filter-bar">
        <view class="district-filter">
          <text class="filter-label">街区：</text>
          <scroll-view scroll-x class="district-scroll">
            <view
              class="district-chip"
              :class="{ active: selectedDistrict === d }"
              v-for="d in districtOptions"
              :key="d"
              @tap="selectedDistrict = d"
            >{{ d }}</view>
          </scroll-view>
        </view>
        <view class="status-filter">
          <view
            class="status-tab"
            :class="{ active: selectedStatus === s }"
            v-for="s in statusOptions"
            :key="s"
            @tap="selectedStatus = s"
          >{{ s }}</view>
        </view>
      </view>

      <!-- Submission Records -->
      <view class="submission-list">
        <view class="submission-card" v-for="sub in filteredSubmissions" :key="sub.id">
          <view class="sub-header">
            <text class="sub-title">{{ sub.title }}</text>
            <view class="status-badge" :class="'status-' + sub.status">{{ sub.status }}</view>
          </view>
          <view class="sub-meta">
            <text class="sub-meta-item">📁 {{ sub.category }}</text>
            <text class="sub-meta-item">📍 {{ sub.district }}</text>
            <text class="sub-meta-item">📅 {{ sub.date }}</text>
          </view>
          <view v-if="sub.views > 0" class="sub-views">👁 {{ sub.views }} 次浏览</view>
        </view>
        <view v-if="filteredSubmissions.length === 0" class="empty-tip">
          <text>暂无相关投稿记录</text>
        </view>
      </view>
    </view>

    <!-- Category Picker -->
    <view class="picker-overlay" v-if="showCatPicker" @tap="showCatPicker = false">
      <view class="picker-sheet" @tap.stop>
        <text class="picker-title">选择分类</text>
        <view class="picker-list">
          <view class="picker-item" v-for="cat in categoryOptions" :key="cat" @tap="selectCat(cat)">
            <text>{{ cat }}</text>
            <text v-if="form.category === cat" style="color:#1AAD9E">✓</text>
          </view>
        </view>
        <view class="picker-cancel" @tap="showCatPicker = false">取消</view>
      </view>
    </view>
  </view>
</template>

<script>
import { mySubmissions } from '../../mock/index.js'

export default {
  name: 'ContributePage',
  data() {
    return {
      activeTab: 0,
      showCatPicker: false,
      form: {
        title: '',
        category: '',
        location: '',
        description: ''
      },
      mySubmissions,
      selectedDistrict: '全部',
      selectedStatus: '全部',
      districtOptions: ['全部', '思明', '湖里', '集美', '海沧', '同安', '翔安'],
      statusOptions: ['全部', '已上线', '审核中', '待审核'],
      categoryOptions: ['方言景观', '口述历史', '民间文学', '历史文献', '非遗技艺', '美食文化', '建筑文化', '音乐戏曲'],
      featuredSubs: [
        { id: 1, title: '中山路商铺闽南语招牌调查', category: '方言景观', district: '思明', date: '2024-03-01', views: 234 },
        { id: 4, title: '鼓浪屿老洋行多语标牌', category: '历史文献', district: '思明', date: '2024-02-15', views: 512 },
      ]
    }
  },
  computed: {
    filteredSubmissions() {
      return this.mySubmissions.filter(s => {
        const matchDistrict = this.selectedDistrict === '全部' || s.district === this.selectedDistrict
        const matchStatus = this.selectedStatus === '全部' || s.status === this.selectedStatus
        return matchDistrict && matchStatus
      })
    }
  },
  methods: {
    selectCat(cat) {
      this.form.category = cat
      this.showCatPicker = false
    },
    upload(type) {
      const labels = { image: '图片', audio: '音频', video: '视频', doc: '文档' }
      uni.showToast({ title: `上传${labels[type]}功能开发中`, icon: 'none' })
    },
    submitForm() {
      if (!this.form.title || !this.form.category || !this.form.description) {
        uni.showToast({ title: '请填写必填项', icon: 'none' })
        return
      }
      uni.showModal({
        title: '提交成功',
        content: '您的投稿已提交，将在3个工作日内完成审核',
        showCancel: false,
        success: () => {
          this.form = { title: '', category: '', location: '', description: '' }
          this.activeTab = 1
        }
      })
    }
  }
}
</script>

<style>
.contribute-page { background: #F5F7FA; min-height: 100vh; padding-bottom: 40rpx; }

.top-tabs {
  display: flex; background: #fff;
  border-bottom: 1rpx solid #f0f0f0;
}
.top-tab {
  flex: 1; text-align: center; font-size: 30rpx; color: #999;
  padding: 28rpx 0; position: relative;
}
.top-tab.active { color: #1AAD9E; font-weight: 600; }
.top-tab.active::after {
  content: ''; position: absolute; bottom: 0; left: 25%; right: 25%;
  height: 4rpx; background: #1AAD9E; border-radius: 2rpx;
}

/* Form */
.form-section {
  background: #fff; margin: 20rpx 30rpx; border-radius: 16rpx;
  padding: 30rpx; box-shadow: 0 2rpx 16rpx rgba(0,0,0,0.06);
}
.form-title { font-size: 32rpx; font-weight: bold; color: #222; display: block; margin-bottom: 24rpx; }
.form-item { margin-bottom: 28rpx; }
.form-label { font-size: 26rpx; color: #555; display: block; margin-bottom: 12rpx; }
.form-input {
  width: 100%; background: #f9f9f9; border-radius: 12rpx;
  padding: 20rpx 24rpx; font-size: 28rpx; color: #333;
  box-sizing: border-box; border: 1rpx solid #eee;
}
.form-textarea {
  width: 100%; background: #f9f9f9; border-radius: 12rpx;
  padding: 20rpx 24rpx; font-size: 28rpx; color: #333;
  box-sizing: border-box; border: 1rpx solid #eee;
  height: 200rpx;
}
.form-select {
  background: #f9f9f9; border-radius: 12rpx; padding: 20rpx 24rpx;
  display: flex; justify-content: space-between; align-items: center;
  border: 1rpx solid #eee;
}
.select-val { font-size: 28rpx; color: #333; }
.select-placeholder { font-size: 28rpx; color: #ccc; }
.select-arrow { font-size: 32rpx; color: #ccc; }
.upload-grid { display: flex; gap: 20rpx; }
.upload-btn {
  flex: 1; display: flex; flex-direction: column; align-items: center;
  background: #f9f9f9; border-radius: 12rpx; padding: 24rpx 0;
  border: 1rpx dashed #ddd;
}
.upload-icon { font-size: 40rpx; }
.upload-label { font-size: 22rpx; color: #888; margin-top: 8rpx; }
.submit-btn {
  background: #1AAD9E; border-radius: 40rpx; padding: 30rpx;
  text-align: center; margin-top: 8rpx;
  box-shadow: 0 4rpx 20rpx rgba(26,173,158,0.35);
}
.submit-text { font-size: 32rpx; color: #fff; font-weight: bold; }

/* Featured */
.section { padding: 20rpx 30rpx 0; }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16rpx; }
.section-title { font-size: 32rpx; font-weight: bold; color: #222; }
.featured-list { background: #fff; border-radius: 16rpx; overflow: hidden; box-shadow: 0 2rpx 16rpx rgba(0,0,0,0.06); }
.featured-item {
  display: flex; align-items: center; padding: 24rpx;
  border-bottom: 1rpx solid #f5f5f5;
}
.featured-item:last-child { border-bottom: none; }
.featured-left { flex: 1; }
.featured-cat-badge {
  display: inline-block; font-size: 20rpx; color: #1AAD9E;
  background: #E8F8F7; padding: 2rpx 12rpx; border-radius: 20rpx; margin-bottom: 8rpx;
}
.featured-title { font-size: 28rpx; color: #333; font-weight: 500; display: block; }
.featured-meta { font-size: 22rpx; color: #aaa; display: block; margin-top: 6rpx; }
.featured-right { display: flex; flex-direction: column; align-items: flex-end; gap: 8rpx; }
.featured-views { font-size: 22rpx; color: #aaa; }

/* Filter Bar */
.filter-bar { background: #fff; padding: 20rpx 30rpx; margin-bottom: 4rpx; }
.district-filter { display: flex; align-items: center; margin-bottom: 16rpx; }
.filter-label { font-size: 26rpx; color: #888; flex-shrink: 0; }
.district-scroll { flex: 1; white-space: nowrap; }
.district-chip {
  display: inline-block; font-size: 24rpx; color: #666;
  background: #f5f5f5; padding: 8rpx 20rpx; border-radius: 30rpx;
  margin-right: 12rpx;
}
.district-chip.active { background: #E8F8F7; color: #1AAD9E; }
.status-filter { display: flex; gap: 16rpx; }
.status-tab {
  font-size: 26rpx; color: #999; padding: 8rpx 24rpx;
  border-radius: 30rpx; background: #f5f5f5;
}
.status-tab.active { background: #E8F8F7; color: #1AAD9E; font-weight: 500; }

/* Submission List */
.submission-list { padding: 0 30rpx; }
.submission-card {
  background: #fff; border-radius: 16rpx; padding: 24rpx;
  box-shadow: 0 2rpx 16rpx rgba(0,0,0,0.06); margin-bottom: 16rpx;
}
.sub-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16rpx; }
.sub-title { font-size: 30rpx; font-weight: 600; color: #222; flex: 1; margin-right: 16rpx; }
.sub-meta { display: flex; flex-wrap: wrap; gap: 16rpx; }
.sub-meta-item { font-size: 22rpx; color: #888; }
.sub-views { font-size: 22rpx; color: #aaa; margin-top: 10rpx; }

/* Status Badges */
.status-badge { font-size: 20rpx; padding: 4rpx 16rpx; border-radius: 20rpx; flex-shrink: 0; }
.status-已上线 { background: #E8F8F7; color: #1AAD9E; }
.status-审核中 { background: #E3F2FD; color: #007aff; }
.status-待审核 { background: #FFF8E1; color: #f0ad4e; }

/* Category Picker */
.picker-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.45); z-index: 100;
  display: flex; align-items: flex-end;
}
.picker-sheet {
  background: #fff; border-radius: 24rpx 24rpx 0 0;
  width: 100%; padding-bottom: 60rpx;
}
.picker-title {
  font-size: 28rpx; color: #999; text-align: center;
  padding: 28rpx; border-bottom: 1rpx solid #f0f0f0; display: block;
}
.picker-list { max-height: 600rpx; overflow-y: auto; }
.picker-item {
  display: flex; justify-content: space-between; align-items: center;
  padding: 32rpx 40rpx; border-bottom: 1rpx solid #f8f8f8;
  font-size: 32rpx; color: #333;
}
.picker-cancel {
  text-align: center; padding: 32rpx; font-size: 32rpx;
  color: #999; border-top: 16rpx solid #f5f5f5;
}

.empty-tip { text-align: center; padding: 80rpx 0; color: #ccc; font-size: 28rpx; }
</style>
