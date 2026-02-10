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
                    <div class="post-title-container">
                        <span class="post-title">{{ post.frontmatter.title }}</span>
                        <span class="post-tags" v-if="post.frontmatter.tags?.length">
                            <span class="tag-label">标签:</span>
                            <span
                                v-for="(tag, index) in post.frontmatter.tags"
                                :key="tag"
                                class="tag-item"
                            >
                                {{ tag }}{{ index < post.frontmatter.tags.length - 1 ? ', ' : '' }}
                            </span>
                        </span>
                    </div>
                    <div class="post-dates">
                        <span class="post-update">
                            更新于 {{ formatDate(post.frontmatter.updateAt) }}
                        </span>
                        <span class="post-date">
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
}   

.post-link {
    text-decoration: none;
    display: block;
}

.post-link:hover .post-title {
    text-decoration: underline;
}

.post-item {
    margin: 8px 0;
    padding: 1rem;
    transition: transform 0.16s ease, box-shadow 0s ease;
    border: 2px solid var(--custom-border);
    border-radius: 0.5rem;
    background-color: transparent;
}

.post-item:hover {
    transform: translateY(-5px);
    box-shadow: var(--custom-shadow);
}

.post-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.post-title-container {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.post-title {
    font-weight: bolder;
    text-decoration: none;
    word-break: break-word;
    flex-shrink: 0;
    font-size: 0.95em;
}

.post-tags {
    color: gray;
    font-weight: bolder;
    font-size: 0.72em;
    font-weight: bolder;
}

.tag-label {
    color: var(--custom-text);
}

.tag-item {
    color: var(--vp-c-brand-1);
    margin: 0 2px;
}

.post-dates {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
}

.post-update,
.post-date {
    color: var(--custom-text);
    font-weight: bolder;
    font-size: 0.72em;
}

/* 移动端适配 */
@media (max-width: 768px) {
    .post-content {
        gap: 0.8rem;
    }

    .post-title-container {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.4rem;
    }

    .post-dates {
        flex-direction: column;
        gap: 0.3rem;
    }

    .post-update,
    .post-date {
        white-space: normal;
        min-width: unset;
    }

    .post-item {
        padding: 0.8rem;
    }
}
</style>
