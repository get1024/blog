---
title: 博客美化：BackToTop-回到顶部按钮
createAt: 2025-10-28 07:43:21
updateAt: 2026-02-11 05:48:37
tags:
  - 博客
  - 博客美化
---

> [!tip]
> 这里提供两个方案，方案一采用 [Backtop 回到顶部 \| Element Plus](https://element-plus.org/zh-CN/component/backtop.html) ，方案二从零开始写一个组件。

## 方案一

### 效果展示

![](assets/博客美化：BackToTop-回到顶部按钮/博客美化：BackToTop-回到顶部按钮-20251204104702.gif)

### 安装 ElementPlus

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

要在 Vitepress 项目中新增一个使用 Element Plus 组件 `el-backtop` 的自定义组件，你需要按照以下步骤进行配置。以下是详细的步骤：

### 组件定义

新建 `📄:.vitepress/theme/components/BackToTop/BackToTop.vue` ，复制粘贴以下内容

```vue [BackToTop.vue]
<template>
    <el-backtop class="el-backtop">
        <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M512 0A512 512 0 1 1 0 512 512 512 0 0 1 512 0z" fill="var(--vp-c-brand-1)" />
            <path
                d="M675.57181 542.524952a30.378667 30.378667 0 0 1-20.016762-7.533714l-145.627429-127.097905-140.970667 126.829715a30.47619 30.47619 0 0 1-40.764952-45.348572l161.060571-144.847238a30.47619 30.47619 0 0 1 40.423619-0.292571l165.961143 144.871619a30.47619 30.47619 0 0 1-20.065523 53.418666z"
                fill="var(--custom-backtop-ring)" /> <!-- [!code warning] -->
            <path
                d="M512.073143 730.745905a30.47619 30.47619 0 0 1-30.476191-30.476191v-182.857143a30.47619 30.47619 0 0 1 60.952381 0v182.857143a30.47619 30.47619 0 0 1-30.47619 30.476191z"
                fill="var(--custom-backtop-ring)" /> <!-- [!code warning] -->
        </svg>
    </el-backtop>
</template>

<script>
export default {
    name: 'BackToTop'
}
</script>

<style scoped>
.el-backtop {
    background-color: transparent;
}
.el-backtop:hover {
    transform: scale(1) rotate(0deg);
    animation: scaleAndRotate 1.5s linear infinite;
}
@keyframes scaleAndRotate {
    0% {
        transform: scale(1) rotate(0deg);
    }
    50% {
        transform: scale(1.2) rotate(180deg);
    }
    100% {
        transform: scale(1) rotate(360deg);
    }
}
.icon {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 90%;
    height: 90%;
    transform: translate(-50%, -50%);
    will-change: transform;
}
</style>
```

::: details 高亮代码什么意思？

`var(--custom-backtop-ring);` 是自定义的一种颜色样式，为了自动跟随 `Vitepress` 两种主题进行切换。具体配置如下。

在 `📄:.vitepress/theme/style/colorCustom.css` 中添加下述内容

```css [colorCustom.css]
:root {
    --custom-backtop-ring: #f7a800; /* [!code ++] */
    --custom-bg: #f0f0f0;
    --custom-border: #dedede;
    --custom-text: #575d65;
    --vp-button-brand-text: #F6CEEC;
    --vp-button-brand-bg: #D939CD;
    --vp-button-brand-hover-text: #fff;
    --vp-button-brand-hover-bg: #fe64f1;
    --custom-shadow:0 10px 30px 0 rgb(0 0 0 / 40%);
    --custom-block-info-left: #cccccc;
    --custom-block-info-bg: #fafafa;
    --custom-block-tip-left: #009400;
    --custom-block-tip-bg: #e6f6e6;
    --custom-block-warning-left: #e6a700;
    --custom-block-warning-bg: #fff8e6;
    --custom-block-danger-left: #e13238;
    --custom-block-danger-bg: #ffebec;
    --custom-block-note-left: #4cb3d4;
    --custom-block-note-bg: #eef9fd;
    --custom-block-important-left: #a371f7;
    --custom-block-important-bg: #f4eefe;
    --custom-block-caution-left: #e0575b;
    --custom-block-caution-bg: #fde4e8;
    --main-page-bg: white;
    --main-page-text: #050505;
    --main-page-from: #222222;
    --main-page-to: #585858;
    --main-page-menu: #525861;
    --main-page-appearance: #e0e0e0;
    --custom-toast-bg: #00000020;
    --custom-toast-text: #000000;
}

.dark {
    --custom-backtop-ring: #3451B2; /* [!code ++] */
    --vp-c-brand-1: #f7a800;
    --vp-c-brand-2: #ffb300;
    --vp-c-brand-3: #f9d423;
    --custom-bg: #1f1f1f;
    --custom-border: #282828;
    --custom-text: #969ba6;
    --custom-shadow:0 10px 30px 0 rgb(255 255 255 / 40%);
    --custom-block-info-left: #cccccc;
    --custom-block-info-bg: #474748;
    --custom-block-tip-left: #009400;
    --custom-block-tip-bg: #003100;
    --custom-block-warning-left: #e6a700;
    --custom-block-warning-bg: #4d3800;
    --custom-block-danger-left: #e13238;
    --custom-block-danger-bg: #4b1113;
    --custom-block-note-left: #4cb3d4;
    --custom-block-note-bg: #193c47;
    --custom-block-important-left: #a371f7;
    --custom-block-important-bg: #230555;
    --custom-block-caution-left: #e0575b;
    --custom-block-caution-bg: #391c22;
    --main-page-bg: #050505;
    --main-page-text: #f0f0f0;
    --main-page-from: #f0f0f0;
    --main-page-to: #575757;
    --main-page-menu: #969ba6;
    --main-page-appearance: #222222;
    --custom-toast-bg: #ffffff20;
    --custom-toast-text: #ffffff;
}
```

:::

### 引入 ElementPlus 并使用组件

在 `Vitepress` 主题文件 `📄:.vitepress/theme/index.ts` 中引入

```ts [index.ts]
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
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
  enhanceApp = ({ app, router }: EnhanceAppContext) => {
  	app.component('BackToTop', BackToTop) // [!code ++]
  	app.component(ElBacktop.name!, ElBacktop) // [!code ++]
}
```

刷新项目，就能看到 `<el-backtop>` 按钮啦~