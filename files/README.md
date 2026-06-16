# 📁 文件上传目录

将你的文件放在这个文件夹中，然后在 `index.html` 中修改对应的下载链接。

## 支持的文件类型

- 📄 **文档类**: PDF, Word (.doc/.docx), Excel (.xls/.xlsx), PowerPoint (.ppt/.pptx)
- 📚 **学习资料**: 笔记、课件、实验报告、作业
- 💻 **代码类**: 源代码压缩包 (.zip/.rar/.7z)
- 🏆 **证书类**: 奖状、证书扫描件 (PDF/图片)
- 🖼️ **图片类**: JPG, PNG, GIF 等

## 文件命名建议

✅ **推荐**: `高等数学笔记.pdf`, `resume.pdf`, `project-source.zip`

❌ **避免**: 中文空格、特殊字符、过长的文件名

## 如何添加到主页

在 `index.html` 的"文件下载"部分，添加或修改链接：

```html
<a href="files/你的文件名.pdf" class="file-item" download>
    <span class="file-icon">📄</span>
    <span class="file-name">显示的文件名.pdf</span>
    <span class="file-size">点击下载</span>
</a>
```

## 文件图标参考

- 📄 - 一般文档
- 📚 - 学习资料
- 💻 - 项目/代码
- 📦 - 压缩包
- 🏆 - 证书/奖状
- 🖼️ - 图片/照片
