
# Prometheus-repo

一个基于大仓库的 monorepo 项目

## 入口

- `pnpm -F @repo/launcher dev` 启动应用aws全家桶相关应用的项目 例如、s3、serverless...
- `pnpm -F @repo/ai dev` 启动应用ai相关的项目 例如、通过接入openai接口实现图像生成、视频生成、文本生成等

## 介绍

项目使用 monorepos 的组织方式，包管理器使用 pnpm，pnpm 内置对 monorepos 的支持。

### 环境要求

- Node.js： v18 以上
- Pnpm： 8.9.0 以上

## 安装&运行

```sh
# 依赖安装
pnpm run bootstrap
# or
corepack pnpm install
# or
pnpm install
```

### 启动or开发ai的NestJS应用服务

```sh
pnpm -F @repo/launcher dev
# or
pnpm dev:ai
```

### 特性

- Tailwind design
- Tailwind animations and effects
- Full responsiveness
- Clerk Authentication (Email, Google, 9+ - Social Logins)
- Client form validation and handling using - react-hook-form
- Server error handling using react-toast
- Image Generation Tool (Open AI)
- Video Generation Tool (Replicate AI)
- Conversation Generation Tool (Open AI)
- Music Generation Tool (Replicate AI)
- Page loading state
- Stripe monthly subscription
- Free tier with API limiting
- How to write POST, DELETE, and GET routes in - route handlers (app/api)
- How to fetch data in server react components - by directly accessing database (WITHOUT API! - like Magic!)
- How to handle relations between Server and - Child components!
- How to reuse layouts
- Folder structure in Next 14 App Router
