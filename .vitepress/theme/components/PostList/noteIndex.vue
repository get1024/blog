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
    <div v-for="group in groupedPosts" :key="group.year">
      <h2 class="noteIndex-h2">{{ group.year }}年</h2>
      <PostList :posts="group.posts" />
    </div>
  </div>
</template>

<style scoped>
.total-posts {
  margin-bottom: 1rem;
}

h2.noteIndex-h2 {
  font-weight: bold;
  font-size: 1.5em;
  margin-top: 20px;
}
</style>
