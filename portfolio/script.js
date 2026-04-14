// 커스텀 커서
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX - 4 + 'px';
  cursor.style.top  = e.clientY - 4 + 'px';
});

document.querySelectorAll('a, .stack-item').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(3)');
  el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
});

// 스크롤 페이드인
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(el => {
  el.classList.add('fade-section');
  observer.observe(el);
});
