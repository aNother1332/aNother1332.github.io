# 🎓 学生个人主页 - GitHub Pages

一个简洁、现代的学生个人主页模板，专为南方科技大学学生设计。可以轻松编辑个人信息、上传文件，通过 GitHub Pages 免费托管。

## ✨ 功能特点

- 📝 **易于编辑** - 纯 HTML/CSS，无需复杂框架
- 📁 **文件上传** - 支持上传简历、笔记、项目文件等
- 📱 **响应式设计** - 完美适配手机、平板、电脑
- 🎨 **现代美观** - 渐变配色、平滑动画、卡片式布局
- 🔄 **一键部署** - 直接推送到 GitHub 即可上线

## 🚀 快速开始

### 第一步：创建 GitHub 仓库

1. 登录你的 GitHub 账号
2. 新建仓库，命名为 `你的用户名.github.io`
   - 例如：`aNother1332.github.io`
3. 选择 **Public**（公开）
4. 勾选 **Add a README file**
5. 点击 **Create repository**

### 第二步：上传文件

将以下文件上传到你的仓库中：
- `index.html` - 主页文件
- `styles.css` - 样式文件
- `files/` 文件夹（用于存放你的文件）

### 第三步：启用 GitHub Pages

1. 进入仓库的 **Settings**（设置）
2. 在左侧菜单找到 **Pages**
3. 在 **Source** 下选择：
   - Branch: `main` 或 `master`
   - Folder: `/ (root)`
4. 点击 **Save**
5. 等待几分钟，你的网站就会上线！

访问地址：`https://你的用户名.github.io`

## 📝 如何编辑个人信息

### 修改基本信息

打开 `index.html` 文件，找到以下部分进行修改：

#### 1. 姓名和学校
```html
<h1 class="hero-title">你好，我是<span class="highlight">[你的名字]</span></h1>
<p class="hero-subtitle">南方科技大学 · 致新书院 · 大一学生</p>
```

#### 2. 关于我介绍
```html
<div class="about-text">
    <p>大家好！我是一名来自南方科技大学的大一学生...</p>
    <!-- 修改这里的内容 -->
</div>
```

#### 3. 教育背景
```html
<div class="timeline-content">
    <h3>南方科技大学</h3>
    <p class="timeline-date">2025年9月 - 至今</p>
    <p>致新书院 · 本科一年级</p>
    <p>主修方向：数理/化生</p>
</div>
```

#### 4. 联系方式
```html
<div class="contact-item">
    <div class="contact-icon">📧</div>
    <h3>电子邮箱</h3>
    <p>your-email@mail.sustech.edu.cn</p>  <!-- 修改为你的邮箱 -->
</div>
```

### 添加头像

1. 将你的头像图片命名为 `avatar.jpg` 或 `avatar.png`
2. 上传到仓库根目录
3. 修改 `index.html` 中的头像部分：

```html
<!-- 替换这部分 -->
<div class="avatar-placeholder">👤</div>

<!-- 改为（使用你的头像图片） -->
<img src="avatar.jpg" alt="头像" class="avatar-image">
```

## 📁 如何上传和分享文件

### 1. 准备文件
将你的 PDF、Word、Zip、图片等文件放入 `files/` 文件夹中

### 2. 修改下载链接
在 `index.html` 的"文件下载"部分，修改文件名：

```html
<a href="files/你的文件名.pdf" class="file-item" download>
    <span class="file-icon">📄</span>
    <span class="file-name">显示的文件名.pdf</span>
    <span class="file-size">点击下载</span>
</a>
```

### 3. 支持的文件类型
- 📄 文档：PDF、Word、Excel、PPT
- 📚 学习资料：笔记、课件、实验报告
- 💻 代码：源代码压缩包
- 🏆 证书：奖状、证书扫描件
- 🖼️ 图片：照片、作品集

## 🎨 自定义配色

打开 `styles.css` 文件，修改以下颜色值：

```css
/* 主色调渐变 - Hero区域 */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* 强调色 */
color: #667eea;
```

推荐配色方案：
- 🔵 蓝色系：`#3b82f6` → `#1d4ed8`
- 🟢 绿色系：`#10b981` → `#059669`
- 🟣 紫色系：`#8b5cf6` → `#6d28d9`
- 🔴 红色系：`#ef4444` → `#dc2626`

## 📂 文件结构

```
你的用户名.github.io/
├── index.html          # 主页（必须）
├── styles.css          # 样式文件（必须）
├── README.md           # 说明文档
├── avatar.jpg          # 头像（可选）
└── files/              # 文件下载目录
    ├── 简历.pdf
    ├── 高数笔记.pdf
    ├── 物理实验报告.pdf
    └── ...
```

## 💡 使用技巧

### 1. 实时预览
编辑时可以在浏览器中打开 `index.html` 直接查看效果

### 2. 添加新的页面
创建新的 `.html` 文件，然后在导航栏添加链接：
```html
<li><a href="新页面.html">新页面</a></li>
```

### 3. 嵌入社交媒体
在联系方式部分添加你的社交媒体链接：
- GitHub
- 知乎
- B站
- 个人博客

## 🔧 常见问题

### Q: 网站不显示？
A: 
1. 检查仓库名是否正确：`用户名.github.io`
2. 确认 GitHub Pages 已启用
3. 等待 5-10 分钟让 GitHub 部署完成

### Q: 文件下载失败？
A:
1. 检查文件名和路径是否正确
2. 文件名不要用中文空格，建议用英文或下划线
3. 确认文件已上传到 `files/` 文件夹

### Q: 手机显示不正常？
A: 模板已做响应式适配，如果还有问题，请检查是否修改了 CSS 样式

## 📞 获取帮助

如果遇到问题：
1. 查看 GitHub Pages 官方文档
2. 检查浏览器控制台的错误信息
3. 对比原始模板文件

---

🎉 **祝你拥有一个漂亮的个人主页！**

> Made with ❤️ for SUSTech students
