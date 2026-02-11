<script setup>
import { data as posts } from './note.data.ts'
import PostList from './PostList.vue'

// 计算文章总数
const totalPosts = Object.values(posts).reduce((sum, yearPosts) => sum + yearPosts.length, 0)

const groupedPosts = Object.entries(posts)
  .map(([year, yearPosts]) => ({
    year,
    posts: yearPosts // note.data.ts 已经对 posts 进行了排序
  }))
  .sort((a, b) => Number(b.year) - Number(a.year)); // 按年份降序排序
</script>

<template>
  <div class="note-index">
    <p class="total-posts marker-fakeTitle">共计 {{ totalPosts }} 篇文章</p>
    <div v-for="group in groupedPosts" :key="group.year" class="year-group">
      <h2 class="noteIndex-h2">{{ group.year }}年</h2>
      <PostList :posts="group.posts" />
    </div>
  </div>
</template>

<style scoped>
.note-index {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.total-posts {
  margin-bottom: 1rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.year-group {
  display: flex;
  flex-direction: column;
}

h2.noteIndex-h2 {
  font-weight: 600;
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 24px;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
}
</style>
