<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import PostList from './PostList.vue'
import { data as tags } from './tags.data.ts'
import { Post } from './dateUtils'

// 当前选中的标签
const selectedTag = ref('')

// 获取选中标签的文章列表
const selectedPosts = computed<Post[]>(() => {
    if (!selectedTag.value) return []
    return tags.find(t => t.name === selectedTag.value)?.posts || []
})

// 标签点击处理函数
const selectTag = (tag: string) => {
    selectedTag.value = selectedTag.value === tag ? '' : tag
}

// 组件挂载时检查URL参数
onMounted(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tagParam = urlParams.get('tag')
    if (tagParam) {
        selectedTag.value = decodeURIComponent(tagParam)
    }
})
</script>

<template>
  <div class="tag-section">
    <!-- 标签云部分 -->
    <div class="tag-cloud">
      <div class="tags-container">
        <span
          v-for="tag in tags"
          :key="tag.name"
          class="tag-item"
          :class="{ active: selectedTag === tag.name }"
          :style="{ fontSize: `${tag.size}rem` }"
          @click="selectTag(tag.name)"
        >
          <span class="tag-text">{{ tag.name }}</span>
          <span class="tag-count">({{ tag.count }})</span>
        </span>
      </div>
    </div>

    <!-- 文章列表部分 -->
    <transition name="fade">
      <div v-if="selectedTag && selectedPosts.length" class="posts-list">
        <h3 class="tag-list-title">
          <span class="highlight">{{ selectedTag }}</span> 
          <span class="meta-info">相关文章 · {{ selectedPosts.length }} 篇</span>
        </h3>
        <PostList :posts="selectedPosts" />
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* 标签云容器布局 */
.tag-section {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.tag-cloud {
    background-color: var(--vp-c-bg-soft);
    border-radius: 12px;
    padding: 24px;
    box-shadow: var(--custom-shadow);
    border: 1px solid var(--vp-c-divider);
}

.tags-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 12px; /* Add explicit gap */
}

/* 单个标签样式 */
.tag-item {
    display: inline-flex;
    align-items: center;
    padding: 6px 12px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    color: var(--vp-c-text-2);
    background-color: var(--vp-c-bg-mute);
    border: 1px solid transparent;
    line-height: 1.2;
}

.tag-item:hover {
    color: var(--vp-c-brand-1);
    background-color: var(--vp-c-bg);
    border-color: var(--vp-c-brand-1);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

/* 激活状态样式 */
.tag-item.active {
    background-color: var(--vp-c-brand-1);
    color: white;
    box-shadow: 0 4px 10px rgba(var(--vp-c-brand-1), 0.3);
}

.tag-count {
    margin-left: 6px;
    opacity: 0.7;
    font-size: 0.85em;
    font-weight: normal;
}

.tag-item.active .tag-count {
    color: rgba(255,255,255,0.8);
}

/* 列表部分样式 */
.posts-list {
    margin-top: 1rem;
}

.tag-list-title {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 24px;
    display: flex;
    align-items: baseline;
    gap: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--vp-c-divider);
}

.tag-list-title .highlight {
    color: var(--vp-c-brand-1);
}

.tag-list-title .meta-info {
    font-size: 1rem;
    font-weight: normal;
    color: var(--vp-c-text-3);
}

/* 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
