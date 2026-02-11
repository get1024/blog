---
title: 博客美化：BackToTop-回到顶部按钮
createAt: 2025-10-28 07:43:21
updateAt: 2026-02-11 22:09:39
tags:
  - 博客
  - 博客美化
---

# 博客美化：BackToTop-回到顶部按钮

> [!tip]
> 本方案基于 [Backtop 回到顶部 | Element Plus](https://element-plus.org/zh-CN/component/backtop.html) 进行深度定制，实现了类似 macOS 的磨砂玻璃效果，并完美适配深色/浅色模式。

## 效果展示

![](assets/博客美化：BackToTop-回到顶部按钮/BacktoTop.gif)

## 核心功能

*   **磨砂玻璃质感**：使用 `backdrop-filter` 和 `color-mix` 技术，实现高级的半透明模糊背景效果，让页面内容隐约可见。
*   **深色模式完美适配**：利用 CSS 变量和 `color-mix` 动态计算颜色，无论是亮色还是深色主题，都能呈现最佳视觉效果。
*   **平滑交互动画**：
    *   **Hover**：轻微上浮并变为纯色背景，增强可点击感。
    *   **Click**：细腻的缩放反馈，模拟真实按压触感。
*   **非侵入式设计**：默认隐藏，仅在页面向下滚动一定距离后优雅淡入。

## 安装 ElementPlus

如果你的项目中尚未安装 Element Plus，请执行以下命令：

::: code-group

```sh [pnpm]
pnpm add -D element-plus
```

```sh [npm]
npm install element-plus --save
```

```sh [yarn]
yarn add element-plus
```

:::

## 组件实现

### 1. 新建组件文件

新建 `📄:.vitepress/theme/components/BackToTop/BackToTop.vue` ，复制粘贴以下完整代码：

```vue [BackToTop.vue]
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

/* 深色模式下的微调 */
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
```

### 2. 引入与注册

在 `Vitepress` 主题入口文件 `📄:.vitepress/theme/index.ts` 中注册并调用组件：

```ts [index.ts]
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue' // 确保引入 h 函数
import { ElBacktop } from 'element-plus' // [!code ++]
import 'element-plus/dist/index.css' // [!code ++]
import BackToTop from './components/BackToTop/BackToTop.vue' // [!code ++]

export const Theme: ThemeConfig = {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(BackToTop) // [!code ++]
    })
  },
  enhanceApp({ app }) { // [!code warning] 注意这里解构参数的变化
    app.component('BackToTop', BackToTop) // [!code ++]
    app.component(ElBacktop.name!, ElBacktop) // [!code ++]
  }
}

export default Theme
```

## 配置参数

当前组件通过封装 `el-backtop` 实现。若需调整位置或显示逻辑，可直接修改 `BackToTop.vue` 的 template 部分：

```html
<el-backtop :right="30" :bottom="30" :visibility-height="200" ...>
```

| 参数属性 | 类型 | 默认值 | 作用说明 |
| :--- | :--- | :--- | :--- |
| `right` | `Number` | `30` | 按钮距离页面右侧的距离 (px)。 |
| `bottom` | `Number` | `30` | 按钮距离页面底部的距离 (px)。 |
| `visibility-height` | `Number` | `200` | 滚动条向下滚动多少像素后显示按钮 (Element Plus 默认值)。 |
| `target` | `String` | - | 触发滚动的对象选择器，通常不需要设置，默认监听 window。 |

## 样式定制

本组件采用了 **CSS 变量** + **深度选择器** 的方式进行样式控制，你可以根据需要在 `BackToTop.vue` 的 `<style>` 标签内进行调整。

### 1. 修改尺寸
默认是一个 `44px` 的正圆。要修改大小，请调整 `.backtop-inner` 类：

```css
.backtop-inner {
  width: 50px; /* 修改宽度 */
  height: 50px; /* 修改高度 */
  border-radius: 12px; /* 修改为圆角矩形 */
}
```

### 2. 修改图标
组件使用了内联 SVG 图标。你可以去 [Lucide Icons](https://lucide.dev/) 或 [Remix Icon](https://remixicon.com/) 复制你喜欢的 SVG 代码，替换 `<svg>...</svg>` 标签内的内容。

### 3. 修改颜色与透明度
背景色使用了 `color-mix` 混合 `var(--vp-c-bg)` (背景色) 和 `transparent` (透明)。

*   **调整透明度**：修改 `transparent 40%` 中的百分比。数值越大越透明。
*   **调整模糊度**：修改 `backdrop-filter: blur(12px)` 中的像素值。

## 兼容性声明

*   **VitePress 版本**：推荐 1.0.0 及以上版本。
*   **浏览器兼容性**：由于使用了 CSS `color-mix` 和 `backdrop-filter` 属性，建议使用以下版本的现代浏览器：
    *   Chrome 111+
    *   Edge 111+
    *   Safari 16.2+
    *   Firefox 111+
*   **降级策略**：在不支持 `color-mix` 的旧版浏览器中，背景可能无法正确显示半透明效果，建议在样式中增加回退背景色声明。

## 更新日志

### 2026-02-11
*   🎨 **UI 重构**：全面升级为磨砂玻璃拟态风格 (Glassmorphism)，移除旧版旋转动画。
*   🛠 **架构优化**：
    *   移除对 `colorCustom.css` 中自定义变量的强依赖，改用 VitePress 原生变量 `var(--vp-c-bg)` 配合 `color-mix`，实现零配置自适应。
    *   简化 SVG 图标为极简箭头风格。
*   🐛 **Bug 修复**：
    *   使用 `!important` 彻底覆盖 Element Plus 默认的白色背景和阴影，解决样式冲突。
    *   修复了 Hover 状态下背景色闪烁的问题。

### 2025-10-28
*   🚀 **初版发布**：基于 Element Plus `el-backtop` 实现基础回到顶部功能。
*   ✨ **特性**：支持简单的旋转动画和自定义主题色环。
