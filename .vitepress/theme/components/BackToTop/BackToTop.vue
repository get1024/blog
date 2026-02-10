<template>
  <el-backtop :right="30" :bottom="30" class="custom-backtop-trigger">
    <div class="backtop-inner">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </div>
  </el-backtop>
</template>

<script>
export default {
  name: 'BackToTop'
}
</script>

<style scoped>
/* 重置 Element Plus 默认样式 */
/* 使用极高的优先级强制覆盖背景色和阴影 */
:deep(.el-backtop),
:global(.dark) :deep(.el-backtop) {
  background: transparent !important;
  background-color: transparent !important;
  box-shadow: none !important;
  width: auto !important;
  height: auto !important;
  padding: 0 !important;
  border: none !important;
  
  /* 覆盖相关 CSS 变量 */
  --el-backtop-bg-color: transparent !important;
  --el-backtop-hover-bg-color: transparent !important;
  --el-backtop-text-color: inherit !important;
  --el-box-shadow-lighter: none !important;
  --el-box-shadow: none !important;

  /* 将过渡动画应用在父容器上，确保父子同步移动 */
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.backtop-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  /* 强制正圆 */
  width: 44px;
  height: 44px;
  border-radius: 50%;
  flex-shrink: 0;
  
  /* 统一使用主题背景色，配合 color-mix 实现半透明玻璃效果 */
  /* srgb 模式下混合：使用 var(--vp-c-bg) 作为基色，混合 40% 的透明度（即 60% 不透明） */
  background-color: color-mix(in srgb, var(--vp-c-bg), transparent 40%);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  
  /* 边框也使用 divider 颜色混合，保证深浅模式自适应 */
  border: 1px solid color-mix(in srgb, var(--vp-c-divider), transparent 60%);
  
  /* 阴影与色彩 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  color: var(--vp-c-text-2);
  
  /* 内部样式变化的过渡 */
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* 深色模式下的微调（如果需要更深的阴影或不同的边框，可以在这里覆盖，但 color-mix 通常已足够） */
:global(.dark) .backtop-inner {
   /* 深色模式下可以稍微增加不透明度，防止太透显得杂乱 */
   background-color: color-mix(in srgb, var(--vp-c-bg), transparent 30%);
   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Hover 交互：父容器整体上浮 */
.custom-backtop-trigger:hover {
  transform: translateY(-4px);
}

/* Hover 时变为纯色背景，增强可见性 */
.custom-backtop-trigger:hover .backtop-inner {
  /* 使用纯色背景，遮挡下方内容 */
  background-color: var(--vp-c-bg);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

:global(.dark) .custom-backtop-trigger:hover .backtop-inner {
  background-color: var(--vp-c-bg);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

/* 点击反馈：整体缩放 */
.custom-backtop-trigger:active {
  transform: translateY(-2px) scale(0.96);
}

.custom-backtop-trigger:active .backtop-inner {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
</style>
