/* ============================================================
   个人求职主页 - JavaScript 动态效果
   功能：1) 当前页面导航高亮  2) 相册点击灯箱预览
        3) 联系表单校验      4) 回到顶部  5) 技能条动画
        6) 项目卡片详情弹窗  7) 打字机效果  8) 滚动显现动画
        9) 深浅色主题切换
   ============================================================ */

/* ---------- 0. 深浅色主题切换（放在最前，避免页面闪白） ---------- */
(function () {
  var savedTheme = localStorage.getItem('siteTheme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 0.5 主题切换按钮 ---------- */
  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    // 根据当前主题设置按钮图标：暗色显示太阳（点击回到亮色），亮色显示月亮
    function updateIcon() {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      themeToggle.textContent = isDark ? '\u2600' : '\u{1F319}';
    }
    updateIcon();

    themeToggle.addEventListener('click', function () {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('siteTheme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('siteTheme', 'dark');
      }
      updateIcon();
    });
  }

  /* ---------- 1. 当前页面导航高亮 ---------- */
  var links = document.querySelectorAll('.nav-menu a');
  var current = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === current) {
      link.classList.add('active');
    }
  });

  /* ---------- 2. 移动端菜单展开/收起 ---------- */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('open');
    });
  }

  /* ---------- 3. 相册灯箱预览 ---------- */
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lbImg = lightbox.querySelector('img');
    var lbCaption = lightbox.querySelector('.lightbox-caption');
    var items = document.querySelectorAll('.gallery-item');

    items.forEach(function (item) {
      item.addEventListener('click', function () {
        var img = item.querySelector('img');
        var cap = item.querySelector('.caption');
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lbCaption.textContent = cap ? cap.textContent : '';
        lightbox.classList.add('show');
      });
    });

    // 点击关闭按钮或遮罩空白处关闭
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.classList.contains('close')) {
        lightbox.classList.remove('show');
      }
    });

    // 按 ESC 键关闭
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        lightbox.classList.remove('show');
      }
    });
  }

  /* ---------- 3.5 项目卡片点击弹出详情 ---------- */
  var projectModal = document.getElementById('projectModal');
  if (projectModal) {
    var cards = document.querySelectorAll('.project-card');
    var mImg = projectModal.querySelector('.modal-img');
    var mTitle = projectModal.querySelector('.modal-title');
    var mMeta = projectModal.querySelector('.modal-meta');
    var mDesc = projectModal.querySelector('.modal-desc');
    var mDesc2 = projectModal.querySelector('.modal-desc2');
    var mDesc3 = projectModal.querySelector('.modal-desc3');
    var mTech = projectModal.querySelector('.modal-tech');
    var mLink = projectModal.querySelector('.modal-link');

    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        mImg.src = card.getAttribute('data-img');
        mImg.alt = card.getAttribute('data-title');
        mTitle.textContent = card.getAttribute('data-title');
        mMeta.textContent = card.getAttribute('data-meta');
        mDesc.textContent = card.getAttribute('data-detail');
        mDesc2.textContent = card.getAttribute('data-detail2');
        mDesc3.textContent = card.getAttribute('data-detail3');
        mTech.textContent = '技术栈：' + card.getAttribute('data-tech');
        mLink.textContent = card.getAttribute('data-url');
        mLink.href = card.getAttribute('data-url');
        projectModal.classList.add('show');
      });
    });

    // 点击关闭按钮或遮罩空白处关闭
    projectModal.addEventListener('click', function (e) {
      if (e.target === projectModal || e.target.classList.contains('close')) {
        projectModal.classList.remove('show');
      }
    });

    // 按 ESC 键关闭
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        projectModal.classList.remove('show');
      }
    });
  }

  /* ---------- 4. 联系表单校验 ---------- */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // 阻止真实提交，仅演示校验效果

      var name = form.elements['name'].value.trim();
      var email = form.elements['email'].value.trim();
      var message = form.elements['message'].value.trim();
      var tip = document.getElementById('formTip');
      var valid = true;

      if (!name) {
        document.getElementById('nameErr').textContent = '请填写您的姓名';
        valid = false;
      } else {
        document.getElementById('nameErr').textContent = '';
      }

      var emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailReg.test(email)) {
        document.getElementById('emailErr').textContent = '请输入正确的邮箱地址';
        valid = false;
      } else {
        document.getElementById('emailErr').textContent = '';
      }

      if (message.length < 5) {
        document.getElementById('messageErr').textContent = '留言至少 5 个字';
        valid = false;
      } else {
        document.getElementById('messageErr').textContent = '';
      }

      if (valid) {
        tip.style.color = '#27ae60';
        tip.textContent = '提交成功！感谢您的留言，我会尽快回复。';
        form.reset();
      } else {
        tip.style.color = '#e74c3c';
        tip.textContent = '请检查表单中标红的栏目。';
      }
    });
  }

  /* ---------- 5. 回到顶部按钮 ---------- */
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 6. 技能条进入视口时动画增长 ---------- */
  var skillBars = document.querySelectorAll('.skill-bar i');
  if (skillBars.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = entry.target.getAttribute('data-level');
          entry.target.style.width = target;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    skillBars.forEach(function (bar) {
      observer.observe(bar);
    });
  }

  /* ---------- 7. 打字机效果 ---------- */
  var typeEl = document.getElementById('typeText');
  if (typeEl) {
    var slogan = 'Hello, I am a Front-end Developer.';
    var index = 0;
    function typeNext() {
      if (index < slogan.length) {
        typeEl.textContent += slogan.charAt(index);
        index++;
        setTimeout(typeNext, 90); // 每 90 毫秒打出一个字符
      }
    }
    setTimeout(typeNext, 500); // 页面加载 0.5 秒后开始
  }

  /* ---------- 8. 滚动显现动画（Scroll Reveal） ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length > 0) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // 只播放一次
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }
});
