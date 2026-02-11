# RyanJoy's Blog

<p>
	<img src="https://img.shields.io/badge/Obsidian-purple?style=plastic&logo=obsidian&logoColor=white" style="display:inline-block;">&nbsp;
	<img src="https://img.shields.io/badge/Vitepress-5C73E7?style=plastic&logo=vitepress&logoColor=white" style="display:inline-block;">&nbsp;
	<img src="https://img.shields.io/badge/Nodejs-5FA04E?style=plastic&logo=nodedotjs&logoColor=white" style="display:inline-block;">&nbsp;
	<img src="https://img.shields.io/badge/Vue-4FC08D?style=plastic&logo=vuedotjs&logoColor=white" style="display:inline-block;">&nbsp;
	<img src="https://img.shields.io/badge/TypeScript-3178C6?style=plastic&logo=typescript&logoColor=white" style="display:inline-block;">&nbsp;
	<img src="https://img.shields.io/badge/Git-F05032?style=plastic&logo=git&logoColor=white" style="display:inline-block;">&nbsp;
	<img src="https://img.shields.io/badge/Markdown-000000?style=plastic&logo=markdown&logoColor=white" style="display:inline-block;">
</p>

这是一个基于 `VitePress` 搭建的个人博客系统。目前使用 [Obsidian](https://obsidian.md/) 进行文档编写、 [Visual Studio Code](https://code.visualstudio.com/) 进行配置编写、主题调整以及插件开发。

## 🌐 部署

<p>
	<img src="https://img.shields.io/badge/CloudFlare-%E5%A4%87%E7%94%A8%E7%AB%99%E7%82%B9-red?style=plastic&logo=cloudflare&logoColor=white&labelColor=F38020" style="display:inline-block;">
</p>

目前托管在 [Cloudflare](https://www.cloudflare.com/zh-cn/) 上，托管都是从 [本仓库](https://github.com/get1024/blog) 自动拉取代码，自动构建并部署，最终可以通过 `CloudFlare Pages` 提供的地址访问：<https://blog.ryanjoy.top/>

## 🌟 特性

- 📝 基于 Markdown 的文档编写
- 🔍 全文搜索功能
- 🎨 美化的代码块和代码组展示、 `<table>` 样式……等众多美化样式，高效提升阅读体验！
- 🎯 SEO 优化

## 📦 项目结构

```sh
~
|—— docs/              # 文章目录
|—— .vitepress/          # VitePress 配置目录
|	|—— dist/             # 构建输出目录
|	|—— theme/            # 主题配置
|	|—— config.mts        # 主配置文件
|—— public/              # 静态资源目录
|—— package.json         # 项目依赖配置
|...
```

## 🚀 快速开始

1. 克隆项目

```bash
git clone https://github.com/get1024/blog.git
```

2. 安装依赖

```bash
pnpm install
```

3. 本地开发

```bash
pnpm dev
```

4. 构建部署

```bash
pnpm build
```

## 📝 最佳实践

### 文档规范

所有文档需要包含以下 `frontmatter` ：

```markdown
---
title: 文章标题
createAt: YYYY-MM-DD HH:mm:ss
updateAt: YYYY-MM-DD HH:mm:ss
tags:
---
```

### 资源处理

所有图片、音频、视频等页内直接引入资源一律放入 `📂:assets/` 中， `📂:assets/` 与当前 `.md` 文档的位置关系如下：

```sh
fatherFolder
|——📂childFoler
|	|——📄file1
|	|——📄file1
|	|——📂assets
|	|	|——📂file1
|	|	|	|——image1.png
|	|	|	|——image2.jepg
|	|	|	|——music.mp3
|	|	|	|——video.mp4
|	|	|	|——...
|	|	|——📂file2/...
|...
```

所有 `PDF` 、 `.xml` 或者一些组件使用的图片、音频、视频等不被直接渲染的资源，放入 **`📂:[root]/public/`**

## 🤝 贡献指南

1. `Fork` [本仓库](https://github.com/get1024/blog)
2. 创建您的特性分支 ( `git checkout -b [name]` )
3. 提交您的更改 ( `git commit -m '[message]'` )
4. 推送到分支 ( `git push origin [name]` )
5. 开启一个 `Pull Request`

## 👨‍💻 作者

RyanJoy - [个人主页](https://github.com/get1024)

## 🙏 致谢

- [VitePress](https://vitepress.dev/)
- [Vue.js](https://vuejs.org/)
- [Node.js](https://nodejs.org/)