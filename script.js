// ===== 粒子背景 =====
(function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - .5) * .3;
      this.vy = (Math.random() - .5) * .3;
      this.r = Math.random() * 2 + .5;
      this.alpha = Math.random() * .5 + .1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(124,92,252,${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function loop() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });

    // 连线
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124,92,252,${.08 * (1 - dist / 120)})`;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(loop);
  }
  loop();
})();

// ===== 导航栏滚动 =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== 移动端菜单 =====
document.getElementById('navToggle').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.querySelector('.nav-links').classList.remove('open'));
});

// ===== 文件上传 & 画廊 =====
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const galleryGrid = document.getElementById('galleryGrid');
const galleryEmpty = document.getElementById('galleryEmpty');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

// 从 localStorage 加载已有文件
let files = JSON.parse(localStorage.getItem('gallery_files') || '[]');

function saveFiles() {
  localStorage.setItem('gallery_files', JSON.stringify(files));
}

function getFileCategory(type) {
  if (type.startsWith('image/')) return 'image';
  if (type.startsWith('video/')) return 'video';
  if (type.startsWith('audio/')) return 'audio';
  if (type === 'application/pdf') return 'pdf';
  return 'other';
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function renderGallery(filter = 'all') {
  galleryGrid.innerHTML = '';
  const filtered = filter === 'all' ? files : files.filter(f => f.category === filter);
  galleryEmpty.style.display = filtered.length ? 'none' : 'block';

  filtered.forEach((file, idx) => {
    const realIdx = files.indexOf(file);
    const item = document.createElement('div');
    item.className = 'gallery-item';

    let previewHTML = '';
    if (file.category === 'image') {
      previewHTML = `<img class="preview" src="${file.data}" alt="${file.name}" onclick="openLightbox('${file.data}')" />`;
    } else if (file.category === 'video') {
      previewHTML = `<video class="preview" src="${file.data}" controls></video>`;
    } else if (file.category === 'audio') {
      previewHTML = `<div class="file-icon">🎵</div>`;
    } else if (file.category === 'pdf') {
      previewHTML = `<div class="file-icon">📄</div>`;
    } else {
      previewHTML = `<div class="file-icon">📁</div>`;
    }

    item.innerHTML = `
      ${previewHTML}
      <button class="delete-btn" onclick="deleteFile(${realIdx})" title="删除">×</button>
      <div class="info">
        <div class="name">${file.name}</div>
        <div class="meta"><span>${file.category}</span><span>${file.size}</span></div>
      </div>
      ${file.category === 'audio' ? `<audio src="${file.data}" controls style="width:calc(100% - 2rem);margin:0 1rem 1rem;"></audio>` : ''}
    `;
    galleryGrid.appendChild(item);
  });
}

function handleFiles(fileList) {
  Array.from(fileList).forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      files.push({
        name: file.name,
        type: file.type,
        category: getFileCategory(file.type),
        size: formatSize(file.size),
        data: e.target.result,
        date: new Date().toLocaleDateString('zh-CN')
      });
      saveFiles();
      renderGallery(currentFilter);
    };
    reader.readAsDataURL(file);
  });
}

// 拖拽
uploadZone.addEventListener('dragover', (e) => { e.preventDefault(); uploadZone.classList.add('dragover'); });
uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('dragover'));
uploadZone.addEventListener('drop', (e) => {
  e.preventDefault(); uploadZone.classList.remove('dragover');
  handleFiles(e.dataTransfer.files);
});

// 点击上传
uploadZone.addEventListener('click', (e) => {
  if (e.target.tagName !== 'LABEL') fileInput.click();
});
fileInput.addEventListener('change', () => handleFiles(fileInput.files));

// 删除
window.deleteFile = function(idx) {
  files.splice(idx, 1);
  saveFiles();
  renderGallery(currentFilter);
};

// 灯箱
window.openLightbox = function(src) {
  lightboxImg.src = src;
  lightbox.classList.add('active');
};
lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('active'); });

// 筛选
let currentFilter = 'all';
document.getElementById('galleryFilters').addEventListener('click', (e) => {
  if (!e.target.classList.contains('filter-btn')) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  currentFilter = e.target.dataset.filter;
  renderGallery(currentFilter);
});

// 初始渲染
renderGallery();

// ===== 滚动动画 =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .project-card, .contact-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  observer.observe(el);
});
