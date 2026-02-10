<script lang="ts" setup>
import { useData, useRouter } from 'vitepress'
import { computed, ref, onMounted } from 'vue'
import { getArticleStats, type ArticleStats } from './functions'
import { splitDate } from '../PostList/dateUtils'

const { page } = useData()
const router = useRouter()

const date = computed(() => page.value.frontmatter.createAt)
const updateDate = computed(() => {
    const val = page.value.lastUpdated || page.value.frontmatter.updateAt
    if (typeof val === 'number') return new Date(val)
    return val
})
const formattedDate = computed(() => date.value ? splitDate(date.value) : null)
const formattedUpdateDate = computed(() => updateDate.value ? splitDate(updateDate.value) : null)
const tags = computed(() => page.value.frontmatter.tags || [])

const articleStats = ref<ArticleStats>({
    wordCount: 0,
    imageCount: 0,
    readTimeMinutes: 0
})

function analyze() {
    // Clean up any existing meta description elements
    document.querySelectorAll('.meta-des').forEach(v => v.remove())
    
    // Analyze content from the DOM after mounting
    const docDomContainer = window.document.querySelector('#VPContent')
    const imgs = docDomContainer?.querySelectorAll<HTMLImageElement>(
        '.content-container .main img'
    )
    const words = docDomContainer?.querySelector('.content-container .main')?.textContent || ''

    articleStats.value = getArticleStats(words, imgs?.length || 0)
}

onMounted(() => {
    analyze()
})

const handleTagClick = (tag: string) => {
    router.go(`/otherDocs/tagCloud.html?tag=${encodeURIComponent(tag)}`)
}
</script>


<template>
    <div class="article-metadata-container">
        
        <!-- Created At -->
        <div class="meta-row" v-if="formattedDate">
            <div class="meta-label">
                <span class="meta-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </span>
                <span class="label-text">Created Time</span>
            </div>
            <div class="meta-value">
                {{ formattedDate.year }}-{{ formattedDate.month }}-{{ formattedDate.day }} {{ formattedDate.hour }}:{{ formattedDate.minute }}
            </div>
        </div>

        <!-- Updated At -->
        <div class="meta-row" v-if="formattedUpdateDate">
            <div class="meta-label">
                <span class="meta-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </span>
                <span class="label-text">Last Updated</span>
            </div>
            <div class="meta-value">
                {{ formattedUpdateDate.year }}-{{ formattedUpdateDate.month }}-{{ formattedUpdateDate.day }} {{ formattedUpdateDate.hour }}:{{ formattedUpdateDate.minute }}
            </div>
        </div>

        <!-- Tags -->
        <div class="meta-row" v-if="tags.length > 0">
            <div class="meta-label">
                <span class="meta-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                </span>
                <span class="label-text">Tags</span>
            </div>
            <div class="meta-value tags-wrapper">
                <span class="tag-pill" 
                      v-for="tag in tags" 
                      :key="tag" 
                      @click="handleTagClick(tag)">
                    {{ tag }}
                </span>
            </div>
        </div>

        <!-- Word Count & Read Time (Combined or Separate) -->
        <div class="meta-row">
            <div class="meta-label">
                <span class="meta-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </span>
                <span class="label-text">Word Count</span>
            </div>
            <div class="meta-value">{{ articleStats.wordCount }} words</div>
        </div>
        
         <div class="meta-row">
            <div class="meta-label">
                <span class="meta-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </span>
                <span class="label-text">Read Time</span>
            </div>
            <div class="meta-value">{{ articleStats.readTimeMinutes }} min</div>
        </div>

    </div>
</template>


<style scoped>
.article-metadata-container {
    display: flex;
    flex-direction: column;
    gap: 0px; /* Notion rows are tight */
    margin-top: 24px;
    margin-bottom: 32px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: var(--vp-c-text-1);
}

.meta-row {
    display: flex;
    align-items: flex-start; /* Align top for multiline values */
    padding: 6px 0;
    min-height: 32px;
}

.meta-label {
    display: flex;
    align-items: center;
    width: 160px; /* Fixed width for labels */
    flex-shrink: 0;
    color: var(--vp-c-text-2);
    gap: 8px;
}

.meta-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--vp-c-text-2);
    opacity: 0.8;
}

.label-text {
    font-size: 14px;
    font-weight: 400;
}

.meta-value {
    flex-grow: 1;
    color: var(--vp-c-text-1);
    font-weight: 400;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    line-height: 1.5; /* Better reading for text */
}

.tags-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.tag-pill {
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    border-radius: 4px;
    background-color: rgba(120, 119, 116, 0.15); /* Notion-like gray pill */
    color: var(--vp-c-text-1);
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s ease;
    line-height: 1.4;
}

.tag-pill:hover {
    background-color: rgba(120, 119, 116, 0.25);
}

/* Dark mode adjustment for pills if needed, but rgba works well */
:root.dark .tag-pill {
    background-color: rgba(255, 255, 255, 0.1);
}
:root.dark .tag-pill:hover {
    background-color: rgba(255, 255, 255, 0.15);
}
</style>