# 🌐 个人主页 - GitHub Pages

一个现代化、响应式的个人主页模板，专为**南方科技大学**学生设计。包含文件下载、个人介绍、项目展示等功能。

## ✨ 功能特点

- 🎨 **现代设计** — 简洁优雅的 UI，支持暗色模式
- 📱 **完全响应式** — 完美适配手机、平板和桌面端
- 📂 **文件下载** — 支持多种格式文件展示和下载
- 🔍 **文件搜索** — 内置搜索和分类筛选功能
- 📝 **易于自定义** — 只需修改数据和文本即可
- 🌍 **中英文支持** — 内置语言切换按钮
- ⚡ **高性能** — 纯静态页面，加载速度快
- 🎭 **滚动动画** — 页面滚动时有精美的渐入动画

## 🚀 快速开始

### 1. 克隆或下载此项目

```bash
git clone https://github.com/你的用户名/你的用户名.github.io.git
cd 你的用户名.github.io
```

### 2. 自定义内容

按照下方 [自定义指南](#-自定义指南) 修改内容。

### 3. 预览

直接在浏览器中打开 `index.html` 即可预览，或使用本地服务器：

```bash
# Python 3
python -m http.server 8000

# Node.js (需要安装 http-server)
npx http-server
```

然后访问 `http://localhost:8000`

### 4. 部署到 GitHub Pages

```bash
git add .
git commit -m "初始化个人主页"
git push origin main
```

在 GitHub 仓库的 **Settings → Pages** 中，选择 `main` 分支作为源，保存后等待几分钟即可访问。

## 🛠 自定义指南

### 修改个人信息

打开 `index.html`，搜索并替换以下内容：

| 搜索内容 | 替换为 |
|---------|--------|
| `你的名字` | 你的真实姓名 |
| `南方科技大学 · 计算机科学与工程系` | 你的学校和院系 |
| `your.email@example.com` | 你的邮箱地址 |
| `github.com/你的用户名` | 你的 GitHub 链接 |
| `linkedin.com/in/你的用户名` | 你的 LinkedIn 链接 |

### 修改头像

将你的头像图片放到 `images/` 目录，命名为 `avatar.jpg`（或修改 `index.html` 中第 47 行的图片路径）。

### 修改技能标签

在 `index.html` 的 `<!-- ========== 技能 ========== -->` 部分，编辑或添加 `<span class="skill-tag">你的技能</span>`。

### 添加可下载文件

1. 将文件放入 `files/` 目录
2. 编辑 `js/main.js` 中的 `fileData` 数组：

```javascript
const fileData = [
    {
        name: '我的文件.pdf',        // 显示名称
        path: 'files/my-file.pdf',    // 文件路径（相对于网站根目录）
        type: 'pdf',                  // 文件类型 (pdf/doc/img/code/archive/other)
        category: 'course',           // 分类 (course/project/resume/other)
        size: '1.5 MB',              // 文件大小
        date: '2024-06-21',          // 日期
        description: '文件描述'       // 简短描述
    },
    // 添加更多文件...
];
```

### 修改项目经历

在 `index.html` 的 `<!-- ========== 项目经历 ========== -->` 部分，编辑项目卡片。你可以复制已有的卡片结构来添加新项目。

### 修改教育经历时间线

在 `index.html` 的 `<!-- ========== 教育经历 ========== -->` 部分，修改对应的时间、学校和描述。

### 修改配色方案

打开 `css/style.css`，修改 `:root` 中的 CSS 变量：

```css
:root {
    --primary: #2563eb;      /* 主色调 */
    --accent: #06b6d4;       /* 强调色 */
    /* ... 更多变量 */
}
```

## 📁 项目结构

```
.
├── index.html              # 主页面
├── css/
│   └── style.css           # 样式表
├── js/
│   └── main.js             # 交互脚本 + 文件列表配置
├── files/                  # 可下载文件存放目录
│   └── .gitkeep
├── images/                 # 图片资源
│   └── avatar.jpg          # 个人头像
├── README.md               # 项目说明
└── CNAME                   # 可选：自定义域名
```

## 📋 文件下载支持的类型

| 类型标识 | 图标颜色 | 适用扩展名 |
|---------|---------|-----------|
| `pdf` | 🔴 红色 | .pdf |
| `doc` | 🔵 蓝色 | .doc, .docx, .ppt, .pptx, .xls, .xlsx |
| `img` | 🟢 绿色 | .jpg, .jpeg, .png, .gif, .svg |
| `code` | 🟣 紫色 | .py, .js, .ts, .java, .c, .cpp, .html, .css, .json |
| `archive` | 🟠 橙色 | .zip, .rar, .7z, .tar, .gz |
| `other` | ⚪ 灰色 | .txt, .md 及其他 |

## 🌐 使用自定义域名

如果你的仓库名不是 `用户名.github.io`，或想使用自定义域名：

1. 在项目根目录创建 `CNAME` 文件，写入你的域名
2. 在 DNS 服务商处添加 CNAME 记录指向 `你的用户名.github.io`

```
# CNAME 文件内容示例
example.com
```

## 💡 提示

- **文件大小限制**：GitHub 建议单个文件不超过 100MB。大文件请使用 Git LFS。
- **头像优化**：建议使用 400×400 像素的方形图片，格式为 JPG/PNG。
- **SEO**：可以修改 `index.html` 中的 `<title>` 和 `<meta>` 标签来优化搜索引擎排名。
- **Google Analytics**：如需访问统计，在 `index.html` 的 `<head>` 中添加 Google Analytics 代码。

## 📄 许可

MIT License — 自由使用、修改和分发。

---

**祝你使用愉快！🎓**
