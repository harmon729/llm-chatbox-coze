# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-09-20

### 🎉 Initial Release

#### ✨ Features
- **智能聊天框组件**: 提供内联模式(InlineBox)和独立模式(StandaloneBox)两种聊天界面
- **响应式设计**: 完美适配桌面和移动设备，支持多种屏幕尺寸
- **主题系统**: 支持明暗主题切换，提供用户个性化体验
- **Markdown渲染**: 完整支持Markdown格式，包括代码高亮显示
- **键盘快捷键**: Ctrl+K快速唤起内联聊天框，提升用户操作效率
- **Coze AI集成**: 内置Coze AI服务集成，提供智能对话能力

#### 🛠️ Technical Stack
- **Next.js 15**: 基于最新React 19的全栈应用框架
- **TypeScript**: 完整的类型安全支持
- **TailwindCSS + DaisyUI**: 现代化UI设计系统
- **Jest + Testing Library**: 完整的单元测试覆盖
- **ESLint + Prettier**: 代码质量和格式化工具

#### 🚀 DevOps & Deployment
- **GitHub Actions CI/CD**: 自动化测试、构建和部署流程
- **Vercel部署**: 全球CDN加速，一键部署到生产环境
- **Semantic Release**: 自动化版本管理和发布流程
- **代码覆盖率**: Codecov集成，确保测试质量

#### 📦 Project Structure
- **组件化架构**: 模块化的React组件设计
- **服务层抽象**: 可扩展的AI服务集成架构  
- **响应式布局**: 完整的移动端和桌面端适配
- **无障碍支持**: 符合WCAG标准的可访问性设计

#### 🎯 Key Components
- `InlineBox`: 快速唤起的悬浮聊天框
- `StandaloneBox`: 全屏独立聊天界面
- `Navbar`: 响应式导航栏，支持主题切换
- `CodeBlock`: 代码高亮显示组件

### 🔧 Configuration
- 支持环境变量配置
- 可自定义AI服务端点
- 灵活的主题定制选项

### 🧪 Testing
- 单元测试覆盖率 > 80%
- 组件交互测试
- 端到端功能验证

---

> **开发团队**: 许海轩 | **项目**: 字节跳动青训营前端方向项目一  
> **技术支持**: 中国科学技术大学 | **开源协议**: MIT License