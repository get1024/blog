<script setup lang="ts">
import { formatDate, Post } from './dateUtils'

defineProps<{
    posts: Post[]
}>()
</script>

<template>
    <ul class="post-list-ul">
        <a class="post-link" v-for="post of posts" :key="post.url" :href="post.url">
            <li class="post-item">
                <div class="post-content">
                    <div class="post-header">
                        <span class="post-title">{{ post.frontmatter.title }}</span>
                        <div class="post-tags" v-if="post.frontmatter.tags?.length">
                            <span
                                v-for="(tag, index) in post.frontmatter.tags"
                                :key="tag"
                                class="tag-item"
                            >
                                {{ tag }}
                            </span>
                        </div>
                    </div>
                    <div class="post-meta">
                        <span class="meta-item">
                            更新于 {{ formatDate(post.frontmatter.updateAt) }}
                        </span>
                        <span class="meta-separator">·</span>
                        <span class="meta-item">
                            创建于 {{ formatDate(post.frontmatter.createAt) }}
                        </span>
                    </div>
                </div>
            </li>
        </a>
    </ul>
</template>

<style scoped>
.post-list-ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.post-link {
    text-decoration: none;
    display: block;
    color: inherit;
}

/* macOS / Notion Card Style */
.post-item {
    padding: 16px 20px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 12px;
    background-color: var(--vp-c-bg-soft);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;
}

.post-item:hover {
    background-color: var(--vp-c-bg-alt);
    border-color: var(--vp-c-brand-1);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px -6px rgba(0, 0, 0, 0.1);
}

/* Flex Column Layout */
.post-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.post-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
}

.post-title {
    font-size: 1.1rem;
    font-weight: 600;
    line-height: 1.5;
    color: var(--vp-c-text-1);
    transition: color 0.2s ease;
}

.post-link:hover .post-title {
    color: var(--vp-c-brand-1);
}

/* Tag Pills */
.post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    flex-shrink: 0;
}

.tag-item {
    font-size: 0.75rem;
    padding: 2px 8px;
    border-radius: 6px;
    background-color: var(--vp-c-bg-mute);
    color: var(--vp-c-text-2);
    border: 1px solid transparent;
    transition: all 0.2s ease;
}

.post-item:hover .tag-item {
    background-color: var(--vp-c-bg);
    border-color: var(--vp-c-divider);
}

/* Metadata */
.post-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    color: var(--vp-c-text-3);
    font-family: var(--vp-font-family-mono);
}

.meta-separator {
    opacity: 0.5;
}

/* Mobile Responsiveness */
@media (max-width: 640px) {
    .post-header {
        flex-direction: column;
        gap: 8px;
    }
    
    .post-tags {
        width: 100%;
    }
    
    .post-meta {
        flex-wrap: wrap;
        gap: 6px;
        font-size: 0.8rem;
    }
    
    .meta-separator {
        display: none;
    }
    
    .meta-item {
        display: block;
        width: 100%;
    }
}
</style>
