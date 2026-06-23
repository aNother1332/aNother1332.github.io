/**
 * 个人主页 - 交互脚本
 * 南方科技大学学生主页
 *
 * ============================================
 * 📂 文件列表 — 在这里添加你要分享的文件
 * ============================================
 * 每一项包含以下字段：
 *   name        — 文件显示名称
 *   path        — 文件路径 (放在 files/ 文件夹里)
 *   type        — 图标类型: pdf / doc / ppt / img / zip / txt / other
 *   category    — 分类:    note / exam / book / other
 *   size        — 文件大小 (比如 "1.2 MB")
 *   date        — 日期     (比如 "2024-06-21")
 *   description — 简短描述 (可选)
 *
 * 把实际文件放进 files/ 文件夹，
 * 然后在这个列表里添加对应的条目即可。
 */
const fileData = [
    {
        name: '大学物理笔记.pdf',
        path: 'files/physics.pdf',
        type: 'pdf',
        category: 'note',
        size: '93882 KB',
        date: '2026-06-22',
        description: '大学物理笔记'
    }
    {
        name: '单摆的设计与研究实验.pdf',
        path: 'files/单摆的设计与研究实验 12510103 彭博.pdf',
        type: 'pdf',
        category: 'report',
        size: '153 KB',
        date: '2026-06-23',
        description: '基础物理实验报告'
    }
 {
        name: '时间测量中随机误差的分布规律.pdf',
        path: 'files/时间测量中随机误差的分布规律 12510103 彭博.pdf',
        type: 'pdf',
        category: 'report',
        size: '250 KB',
        date: '2026-06-23',
        description: '基础物理实验报告'
    }
{
        name: '直线运动规律的研究.pdf',
        path: 'files/直线运动规律的研究 12510103 彭博.pdf',
        type: 'pdf',
        category: 'report',
        size: '240 KB',
        date: '2026-06-23',
        description: '基础物理实验报告'
    }
{
        name: '热敏电阻温度特性研究.pdf',
        path: 'files/热敏电阻温度特性研究 12510103 彭博.pdf',
        type: 'pdf',
        category: 'report',
        size: '439 KB',
        date: '2026-06-23',
        description: '基础物理实验报告'
    }
{
        name: '迈克尔逊干涉仪.pdf',
        path: 'files/迈克尔逊干涉仪 12510103 彭博.pdf',
        type: 'pdf',
        category: 'report',
        size: '256 KB',
        date: '2026-06-23',
        description: '基础物理实验报告'
    }
{
        name: '热电偶性质及其应用.pdf',
        path: 'files/热电偶性质及其应用 12510103 彭博.pdf',
        type: 'pdf',
        category: 'report',
        size: '254 KB',
        date: '2026-06-23',
        description: '基础物理实验报告'
    }
{
        name: '液体粘度的测定.pdf',
        path: 'files/液体粘度的测定 12510103 彭博.pdf',
        type: 'pdf',
        category: 'report',
        size: '324 KB',
        date: '2026-06-23',
        description: '基础物理实验报告'
    }

];

// ============================================================
// ⚙️ 下面的代码不需要修改
// ============================================================

// 文件类型 → 图标映射
const iconMap = {
    pdf:   { icon: 'fa-file-pdf',     cls: 'pdf' },
    doc:   { icon: 'fa-file-word',    cls: 'doc' },
    docx:  { icon: 'fa-file-word',    cls: 'doc' },
    xls:   { icon: 'fa-file-excel',   cls: 'doc' },
    xlsx:  { icon: 'fa-file-excel',   cls: 'doc' },
    ppt:   { icon: 'fa-file-powerpoint', cls: 'ppt' },
    pptx:  { icon: 'fa-file-powerpoint', cls: 'ppt' },
    jpg:   { icon: 'fa-file-image',   cls: 'img' },
    jpeg:  { icon: 'fa-file-image',   cls: 'img' },
    png:   { icon: 'fa-file-image',   cls: 'img' },
    gif:   { icon: 'fa-file-image',   cls: 'img' },
    zip:   { icon: 'fa-file-zipper',  cls: 'zip' },
    rar:   { icon: 'fa-file-zipper',  cls: 'zip' },
    '7z':  { icon: 'fa-file-zipper',  cls: 'zip' },
    txt:   { icon: 'fa-file-lines',   cls: 'txt' },
    md:    { icon: 'fa-file-lines',   cls: 'txt' },
};

function getIcon(type, name) {
    if (type && iconMap[type]) return iconMap[type];
    const ext = name.split('.').pop().toLowerCase();
    return iconMap[ext] || { icon: 'fa-file', cls: 'other' };
}

// 渲染文件列表
let currentCat = 'all';
let searchText = '';

function renderFiles() {
    const list = document.getElementById('fileList');
    const empty = document.getElementById('fileEmpty');

    let files = fileData;
    if (currentCat !== 'all') files = files.filter(f => f.category === currentCat);
    if (searchText.trim()) {
        const q = searchText.toLowerCase();
        files = files.filter(f => f.name.toLowerCase().includes(q) || (f.description || '').toLowerCase().includes(q));
    }

    if (files.length === 0) {
        list.innerHTML = '';
        empty.style.display = 'block';
        return;
    }
    empty.style.display = 'none';

    list.innerHTML = files.map(f => {
        const ico = getIcon(f.type, f.name);
        return `
        <div class="file-item" onclick="downloadFile('${f.path}', '${f.name}')">
            <div class="file-icon ${ico.cls}"><i class="fas ${ico.icon}"></i></div>
            <div class="file-info">
                <div class="file-name" title="${f.name}">${f.name}</div>
                <div class="file-meta">
                    ${f.size ? `<span>${f.size}</span>` : ''}
                    ${f.date ? `<span>${f.date}</span>` : ''}
                    ${f.description ? `<span>${f.description}</span>` : ''}
                </div>
            </div>
            <div class="file-dl"><i class="fas fa-download"></i></div>
        </div>`;
    }).join('');
}

// 下载
function downloadFile(path, name) {
    const a = document.createElement('a');
    a.href = path; a.download = name; a.target = '_blank';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    toast(`开始下载: ${name}`);
}

// 提示
function toast(msg) {
    const old = document.querySelector('.download-toast');
    if (old) old.remove();
    const t = document.createElement('div');
    t.className = 'download-toast';
    t.textContent = '✅ ' + msg;
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity 0.3s'; setTimeout(() => t.remove(), 300); }, 2200);
}

// 分类按钮
document.querySelectorAll('.file-cat').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.file-cat').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCat = btn.dataset.cat;
        renderFiles();
    });
});

// 搜索
document.getElementById('fileSearch').addEventListener('input', e => {
    searchText = e.target.value;
    renderFiles();
});

// 导航栏滚动效果
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    backToTop.classList.toggle('visible', window.scrollY > 500);

    // 导航高亮
    let current = '';
    document.querySelectorAll('section[id]').forEach(sec => {
        if (window.scrollY + 120 >= sec.offsetTop) current = sec.id;
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
});

// 回到顶部
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// 移动端菜单
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('navMenu');
toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        toggle.classList.remove('active');
        menu.classList.remove('active');
    });
});

// 平滑跳转
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
});

// 初始化
renderFiles();
