/**
 * GitHub 个人主页 - 主脚本
 * 南方科技大学 · 学生个人主页
 */

// ============================================================
// 文件列表数据 - 在此处配置你的可下载文件
// 只需在此数组中添加/修改文件信息即可
// ============================================================
const fileData = [
    // 示例文件 - 请替换为你自己的文件
    {
        name: '个人简历.pdf',
        path: 'files/resume.pdf',
        type: 'pdf',
        category: 'resume',
        size: '245 KB',
        date: '2024-06-15',
        description: '我的个人简历'
    },
    {
        name: '学术CV.pdf',
        path: 'files/academic-cv.pdf',
        type: 'pdf',
        category: 'resume',
        size: '180 KB',
        date: '2024-05-20',
        description: '学术简历（英文版）'
    },
    {
        name: '数据结构课程笔记.pdf',
        path: 'files/ds-notes.pdf',
        type: 'pdf',
        category: 'course',
        size: '1.2 MB',
        date: '2024-04-10',
        description: '数据结构课程学习笔记'
    },
    {
        name: '机器学习期末项目报告.pdf',
        path: 'files/ml-project-report.pdf',
        type: 'pdf',
        category: 'project',
        size: '3.5 MB',
        date: '2024-06-01',
        description: '机器学习课程期末项目完整报告'
    },
    {
        name: '操作系统实验代码.zip',
        path: 'files/os-lab.zip',
        type: 'archive',
        category: 'course',
        size: '850 KB',
        date: '2024-03-28',
        description: '操作系统课程实验代码合集'
    },
    {
        name: '项目演示PPT.pptx',
        path: 'files/project-slides.pptx',
        type: 'doc',
        category: 'project',
        size: '4.8 MB',
        date: '2024-05-30',
        description: '项目答辩演示文稿'
    },
    {
        name: '算法竞赛解题报告.pdf',
        path: 'files/algorithm-solutions.pdf',
        type: 'pdf',
        category: 'other',
        size: '520 KB',
        date: '2024-02-15',
        description: '参加算法竞赛的解题思路与代码'
    }
];

// ============================================================
// 文件图标映射
// ============================================================
const iconMap = {
    'pdf':     { icon: 'fa-file-pdf',     cls: 'pdf' },
    'doc':     { icon: 'fa-file-word',    cls: 'doc' },
    'docx':    { icon: 'fa-file-word',    cls: 'doc' },
    'ppt':     { icon: 'fa-file-powerpoint', cls: 'doc' },
    'pptx':    { icon: 'fa-file-powerpoint', cls: 'doc' },
    'xls':     { icon: 'fa-file-excel',   cls: 'doc' },
    'xlsx':    { icon: 'fa-file-excel',   cls: 'doc' },
    'jpg':     { icon: 'fa-file-image',   cls: 'img' },
    'jpeg':    { icon: 'fa-file-image',   cls: 'img' },
    'png':     { icon: 'fa-file-image',   cls: 'img' },
    'gif':     { icon: 'fa-file-image',   cls: 'img' },
    'svg':     { icon: 'fa-file-image',   cls: 'img' },
    'zip':     { icon: 'fa-file-zipper',  cls: 'archive' },
    'rar':     { icon: 'fa-file-zipper',  cls: 'archive' },
    '7z':      { icon: 'fa-file-zipper',  cls: 'archive' },
    'tar':     { icon: 'fa-file-zipper',  cls: 'archive' },
    'gz':      { icon: 'fa-file-zipper',  cls: 'archive' },
    'py':      { icon: 'fa-file-code',    cls: 'code' },
    'js':      { icon: 'fa-file-code',    cls: 'code' },
    'ts':      { icon: 'fa-file-code',    cls: 'code' },
    'java':    { icon: 'fa-file-code',    cls: 'code' },
    'c':       { icon: 'fa-file-code',    cls: 'code' },
    'cpp':     { icon: 'fa-file-code',    cls: 'code' },
    'html':    { icon: 'fa-file-code',    cls: 'code' },
    'css':     { icon: 'fa-file-code',    cls: 'code' },
    'json':    { icon: 'fa-file-code',    cls: 'code' },
    'md':      { icon: 'fa-file-lines',   cls: 'code' },
    'txt':     { icon: 'fa-file-lines',   cls: 'other' },
};

// ============================================================
// 获取文件扩展名
// ============================================================
function getFileExtension(filename) {
    return filename.split('.').pop().toLowerCase();
}

// ============================================================
// 获取文件图标信息
// ============================================================
function getFileIcon(filename, type) {
    if (type && iconMap[type]) return iconMap[type];
    const ext = getFileExtension(filename);
    return iconMap[ext] || { icon: 'fa-file', cls: 'other' };
}

// ============================================================
// 格式化文件大小（备用）
// ============================================================
function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// ============================================================
// 渲染文件列表
// ============================================================
let currentCategory = 'all';
let currentSearch = '';

function renderFiles() {
    const fileList = document.getElementById('fileList');
    const fileEmpty = document.getElementById('fileEmpty');

    // 筛选文件
    let filtered = fileData;

    if (currentCategory !== 'all') {
        filtered = filtered.filter(f => f.category === currentCategory);
    }

    if (currentSearch.trim()) {
        const query = currentSearch.toLowerCase().trim();
        filtered = filtered.filter(f =>
            f.name.toLowerCase().includes(query) ||
            (f.description && f.description.toLowerCase().includes(query))
        );
    }

    // 显示空状态
    if (filtered.length === 0) {
        fileList.innerHTML = '';
        fileEmpty.style.display = 'block';
        return;
    }

    fileEmpty.style.display = 'none';

    // 渲染文件卡片
    fileList.innerHTML = filtered.map(file => {
        const iconInfo = getFileIcon(file.name, file.type);
        return `
            <div class="file-item" onclick="downloadFile('${file.path}', '${file.name}')">
                <div class="file-item-icon ${iconInfo.cls}">
                    <i class="fas ${iconInfo.icon}"></i>
                </div>
                <div class="file-item-info">
                    <div class="file-item-name" title="${file.name}">${file.name}</div>
                    <div class="file-item-meta">
                        ${file.size ? `<span><i class="fas fa-weight-hanging"></i> ${file.size}</span>` : ''}
                        ${file.date ? `<span><i class="fas fa-calendar"></i> ${file.date}</span>` : ''}
                        ${file.description ? `<span><i class="fas fa-tag"></i> ${file.description}</span>` : ''}
                    </div>
                </div>
                <div class="file-item-download" title="下载">
                    <i class="fas fa-download"></i>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================================
// 下载文件
// ============================================================
function downloadFile(path, name) {
    const link = document.createElement('a');
    link.href = path;
    link.download = name;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 下载计数动画（可选）
    showDownloadToast(name);
}

// ============================================================
// 下载提示
// ============================================================
function showDownloadToast(filename) {
    // 如果存在旧提示则移除
    const oldToast = document.querySelector('.download-toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.className = 'download-toast';
    toast.innerHTML = `<i class="fas fa-check-circle"></i> 开始下载: ${filename}`;
    document.body.appendChild(toast);

    // 添加样式
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '90px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '12px 24px',
        background: '#10b981',
        color: '#fff',
        borderRadius: '50px',
        fontSize: '0.9rem',
        fontWeight: '500',
        boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
        zIndex: '9999',
        animation: 'fadeInUp 0.3s ease-out',
    });

    // 2.5秒后移除
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ============================================================
// 文件分类筛选事件
// ============================================================
document.querySelectorAll('.file-cat').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.file-cat').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.cat;
        renderFiles();
    });
});

// ============================================================
// 文件搜索事件
// ============================================================
const fileSearch = document.getElementById('fileSearch');
if (fileSearch) {
    fileSearch.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        renderFiles();
    });
}

// ============================================================
// 导航栏滚动效果
// ============================================================
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // 导航栏阴影
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // 回到顶部按钮
    if (scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // 更新当前导航高亮
    updateActiveNav();
});

// ============================================================
// 回到顶部
// ============================================================
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================================
// 更新导航高亮
// ============================================================
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollY = window.scrollY + 100;

    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ============================================================
// 移动端菜单
// ============================================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 点击导航链接关闭菜单
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================================
// 暗色模式切换 (可选 - 可根据系统偏好自动切换)
// ============================================================
// 检测系统偏好
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
}

// 初始设置
setTheme(prefersDark.matches);

// 监听系统主题变化
prefersDark.addEventListener('change', (e) => {
    setTheme(e.matches);
});

// ============================================================
// 语言切换 (简单示例)
// ============================================================
const langToggle = document.getElementById('langToggle');
let currentLang = 'zh';

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    langToggle.textContent = currentLang === 'zh' ? 'EN' : '中';
    // 可以在这里扩展完整的 i18n 切换逻辑
});

// ============================================================
// 滚动显示动画
// ============================================================
const revealElements = document.querySelectorAll(
    '.section-title, .section-line, .about-content, .timeline-item, ' +
    '.skill-category, .project-card, .contact-card, .file-item'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal', 'visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// ============================================================
// 平滑滚动（兼容不支持 smooth 的浏览器）
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================================
// 初始化
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    renderFiles();
    updateActiveNav();
});
