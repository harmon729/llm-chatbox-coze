# LLM 聊天框组件

这是一个基于 Next.js 构建的现代化 LLM 聊天框组件，支持多种主题和自定义配置。

## 功能特点

- 响应式设计，适配各种设备
- 支持明暗主题切换
- Markdown 渲染支持
- 可自定义的聊天界面
- 完整的 CI/CD 流程

## 技术栈

- **框架**: Next.js 15
- **UI**: React 19 + TailwindCSS + DaisyUI
- **测试**: Jest + React Testing Library
- **部署**: Vercel
- **CI/CD**: GitHub Actions

## 开发指南

### 安装依赖

```bash
npm install
```

### 开发服务器

```bash
npm run dev
```

### 构建项目

```bash
npm run build
```

### 运行测试

```bash
npm test
```

## CI/CD 流程

项目使用 GitHub Actions 实现完整的 CI/CD 流程:

1. **代码提交**: 使用 Commitlint 确保提交消息符合规范
2. **自动测试**: 提交后自动运行 ESLint, TypeScript 检查和 Jest 测试
3. **预览部署**: Pull Request 时自动部署到 Vercel 预览环境
4. **生产部署**: 合并到 main 分支后自动部署到 Vercel 生产环境
5. **自动发布**: 使用 Semantic Release 实现自动化版本管理和发布

### 提交规范

项目使用 Angular 的提交规范：

- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档更新
- `style`: 代码风格调整
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具变动

提交示例：

```
feat(chat): 添加用户输入验证功能
```

## 部署指南

项目配置为使用 Vercel 自动部署。要手动部署，请确保：

1. 设置以下环境变量:

   - `NEXT_PUBLIC_API_URL`: API 地址
   - `NEXT_PUBLIC_APP_ENV`: 环境标识 (`development`/`production`)

2. 然后执行部署命令:

```bash
vercel
```

## 版本发布

项目使用 Semantic Release 进行自动化版本管理：

1. 合并到 main 分支的代码会自动触发版本更新
2. 版本号基于提交信息自动确定
3. 发布时自动生成更新日志和 GitHub Release

## 许可证

MIT
