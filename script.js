document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initScrollProgress();
  initMagneticHover();
  initCursorTracking();
  initCardGlow();
  initRippleEffect();
  initNavigation();
  initThemeToggle();
  initParticles();
  initScrollReveal();
  initCounter();
  initCharacterCounter();
  initTodoApp();
  initAccordion();
  initToasts();
  initGallery();
  initKeyboardEvents();
});

function initLoader() {
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
      setTimeout(() => loader.classList.add('fade-out'), 500);
    }
  });
}

function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

function initMagneticHover() {
  const magnets = document.querySelectorAll('.magnetic');
  magnets.forEach(magnet => {
    magnet.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const h = rect.width / 2;
      const x = e.clientX - rect.left - h;
      const y = e.clientY - rect.top - h;
      this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
    });
    magnet.addEventListener('mouseout', function() {
      this.style.transform = 'translate(0px, 0px) scale(1)';
    });
  });
}

function initCursorTracking() {
  const cursorGlow = document.getElementById('cursor-glow');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.style.opacity = '1';
  });

  window.addEventListener('mouseout', () => {
    cursorGlow.style.opacity = '0';
  });

  function animateCursor() {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;
    cursorGlow.style.left = currentX + 'px';
    cursorGlow.style.top = currentY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}

function initCardGlow() {
  const cards = document.querySelectorAll('.premium-glass-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

function initRippleEffect() {
  const buttons = document.querySelectorAll('.btn-ripple');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

function initNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const links = navLinks.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('is-active');
    hamburger.classList.toggle('is-active');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-active');
      hamburger.classList.remove('is-active');
      
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const iconSpan = themeToggle.querySelector('.icon');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.remove('dark-theme');
    iconSpan.textContent = '🌙';
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
      iconSpan.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      iconSpan.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  });
}

function initCounter() {
  let count = 0;
  const valueEl = document.getElementById('counter-value');
  const btnIncrease = document.getElementById('btn-increase');
  const btnDecrease = document.getElementById('btn-decrease');
  const btnReset = document.getElementById('btn-reset');

  function updateDisplay() {
    valueEl.textContent = count;
    valueEl.classList.remove('scale-up');
    void valueEl.offsetWidth; 
    valueEl.classList.add('scale-up');
    
    setTimeout(() => {
      valueEl.classList.remove('scale-up');
    }, 400);
  }

  btnIncrease.addEventListener('click', () => { count++; updateDisplay(); });
  btnDecrease.addEventListener('click', () => { if (count > 0) { count--; updateDisplay(); } });
  btnReset.addEventListener('click', () => { count = 0; updateDisplay(); });
}

function initCharacterCounter() {
  const textInput = document.getElementById('text-input');
  const charCount = document.getElementById('char-count');
  const wordCount = document.getElementById('word-count');
  const warning = document.getElementById('char-warning');
  const progressBar = document.getElementById('char-progress');
  const MAX_CHARS = 200;

  textInput.addEventListener('input', () => {
    const text = textInput.value;
    const currentLength = text.length;
    
    charCount.textContent = currentLength;
    
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    wordCount.textContent = words.length;

    const percentage = Math.min((currentLength / MAX_CHARS) * 100, 100);
    progressBar.style.width = `${percentage}%`;

    if (currentLength >= MAX_CHARS) {
      warning.classList.remove('hidden');
      charCount.style.color = 'var(--error)';
      progressBar.style.background = 'var(--error)';
      textInput.value = text.substring(0, MAX_CHARS);
      charCount.textContent = MAX_CHARS;
    } else if (currentLength > MAX_CHARS * 0.8) {
      warning.classList.add('hidden');
      charCount.style.color = '#f59e0b';
      progressBar.style.background = '#f59e0b';
    } else {
      warning.classList.add('hidden');
      charCount.style.color = 'var(--text-color)';
      progressBar.style.background = 'linear-gradient(90deg, var(--primary), var(--accent))';
    }
  });
}

function initTodoApp() {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');
  const emptyState = document.getElementById('empty-state');
  const filterBtns = document.querySelectorAll('.filter-btn');

  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  let currentFilter = 'all';

  function saveTodos() { localStorage.setItem('todos', JSON.stringify(todos)); }

  function renderTodos() {
    list.innerHTML = '';
    
    let filteredTodos = todos;
    if (currentFilter === 'pending') { filteredTodos = todos.filter(t => !t.completed); } 
    else if (currentFilter === 'completed') { filteredTodos = todos.filter(t => t.completed); }

    if (filteredTodos.length === 0) {
      emptyState.style.display = 'block';
    } else {
      emptyState.style.display = 'none';
      
      filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'is-completed' : ''}`;
        li.innerHTML = `
          <span class="todo-text">${todo.text}</span>
          <div class="todo-actions">
            <button class="btn-icon check btn-ripple" data-id="${todo.id}" aria-label="Toggle Complete">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><polyline points="20 6 9 17 4 12"/></svg>
            </button>
            <button class="btn-icon delete btn-ripple" data-id="${todo.id}" aria-label="Delete">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        `;
        list.appendChild(li);
      });
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
      todos.push({ id: Date.now().toString(), text: text, completed: false });
      input.value = '';
      saveTodos();
      renderTodos();
    }
  });

  list.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-icon');
    if (!btn) return;
    
    const id = btn.getAttribute('data-id');
    
    if (btn.classList.contains('check')) {
      const todo = todos.find(t => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
      }
    }
    if (btn.classList.contains('delete')) {
      const li = btn.closest('.todo-item');
      li.style.transform = 'translateX(100px)';
      li.style.opacity = '0';
      setTimeout(() => {
        todos = todos.filter(t => t.id !== id);
        saveTodos();
        renderTodos();
      }, 300);
    }
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      currentFilter = btn.getAttribute('data-filter');
      renderTodos();
    });
  });

  renderTodos();
}

function initAccordion() {
  const items = document.querySelectorAll('.accordion-item');

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
      const currentlyActive = document.querySelector('.accordion-item.is-active');
      
      if (currentlyActive && currentlyActive !== item) {
        currentlyActive.classList.remove('is-active');
        currentlyActive.querySelector('.accordion-content').style.maxHeight = null;
      }
      
      item.classList.toggle('is-active');
      const content = item.querySelector('.accordion-content');
      
      if (item.classList.contains('is-active')) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = null;
      }
    });
  });
}

function initToasts() {
  const btnSuccess = document.getElementById('btn-toast-success');
  const btnError = document.getElementById('btn-toast-error');
  const btnInfo = document.getElementById('btn-toast-info');
  const container = document.getElementById('toast-container');

  function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = '';
    if (type === 'success') icon = '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>';
    if (type === 'error') icon = '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
    if (type === 'info') icon = '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';

    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-message">${message}</div>
      <div class="toast-progress"></div>
    `;
    
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('closing');
      setTimeout(() => {
        if(container.contains(toast)) container.removeChild(toast);
      }, 400);
    }, 3000);
  }

  btnSuccess.addEventListener('click', () => showToast('Operation completed successfully!', 'success'));
  btnError.addEventListener('click', () => showToast('An error occurred during process.', 'error'));
  btnInfo.addEventListener('click', () => showToast('New updates are available.', 'info'));
}

function initGallery() {
  const items = document.querySelectorAll('.masonry-item');
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const closeBtn = document.getElementById('modal-close');
  const backdrop = modal.querySelector('.modal-backdrop');
  const btnPrev = document.getElementById('modal-prev');
  const btnNext = document.getElementById('modal-next');

  let currentImageIndex = 0;
  let imagesArray = Array.from(items).map(item => item.querySelector('img').src);

  function openModal(index) {
    currentImageIndex = index;
    modalImg.src = imagesArray[currentImageIndex];
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  
  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function showNext() {
    currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
    modalImg.style.opacity = '0';
    setTimeout(() => {
      modalImg.src = imagesArray[currentImageIndex];
      modalImg.style.opacity = '1';
    }, 200);
  }

  function showPrev() {
    currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
    modalImg.style.opacity = '0';
    setTimeout(() => {
      modalImg.src = imagesArray[currentImageIndex];
      modalImg.style.opacity = '1';
    }, 200);
  }

  items.forEach((item, index) => {
    item.addEventListener('click', () => openModal(index));
    item.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') openModal(index);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  if (btnNext) btnNext.addEventListener('click', showNext);
  if (btnPrev) btnPrev.addEventListener('click', showPrev);

  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

function initKeyboardEvents() {
  const keyName = document.getElementById('key-name');
  const keyCodeEl = document.getElementById('key-code');
  const keyBoxes = document.querySelectorAll('.key-box');

  window.addEventListener('keydown', (e) => {
    if(["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }

    keyName.textContent = e.key === ' ' ? 'Space' : e.key;
    keyCodeEl.textContent = e.code;

    keyBoxes.forEach(box => {
      box.classList.remove('is-active');
      void box.offsetWidth;
      box.classList.add('is-active');
      
      setTimeout(() => {
        box.classList.remove('is-active');
      }, 300);
    });
  });
}

function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let particlesArray;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });

  class Particle {
    constructor(x, y, directionX, directionY, size) {
      this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = document.body.classList.contains('dark-theme') ? 'rgba(255,255,255,0.1)' : 'rgba(99, 102, 241, 0.2)';
      ctx.fill();
    }
    update() {
      if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
      if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
      this.x += this.directionX; this.y += this.directionY;
      this.draw();
    }
  }

  function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 10000;
    for (let i = 0; i < numberOfParticles; i++) {
      let size = (Math.random() * 2) + 0.5;
      let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
      let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
      let directionX = (Math.random() * 1) - 0.5;
      let directionY = (Math.random() * 1) - 0.5;
      particlesArray.push(new Particle(x, y, directionX, directionY, size));
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }
  }

  init();
  animate();

  document.getElementById('theme-toggle').addEventListener('click', () => {
    setTimeout(init, 50);
  });
}

function initScrollReveal() {
  const elements = document.querySelectorAll('.scroll-reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  elements.forEach(element => observer.observe(element));
}
