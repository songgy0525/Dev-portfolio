import { useEffect, useRef, useState } from 'react';

const stackItems = [
  { emoji: '☕', label: 'Java' },
  { emoji: '🍃', label: 'Spring Boot' },
  { emoji: '🗺️', label: 'MyBatis' },
  { emoji: '🔗', label: 'JPA' },
  { emoji: '🗄️', label: 'MySQL' },
  { emoji: '🔌', label: 'JDBC' },
  { emoji: '🔄', label: 'REST API' },
  { emoji: '🔌', label: 'WebSocket' },
  { emoji: '🎨', label: 'HTML / CSS' },
  { emoji: '⚡', label: 'JavaScript' },
  { emoji: '🐙', label: 'Git' },
];

const projects = [
  {
    href: 'https://songgy0525.github.io/neeeeun',
    name: '예은의 시선',
    description: '사진 아카이브 웹사이트.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Supabase'],
  },
];

const focusItems = [
  {
    title: 'API Design',
    description: '쓰는 사람 입장에서 읽기 쉬운 요청과 응답 구조를 만드는 데 집중합니다.',
  },
  {
    title: 'Exception Handling',
    description: '예외를 숨기지 않고, 어디서 왜 실패했는지 드러나는 구조를 선호합니다.',
  },
  {
    title: 'Database Flow',
    description: '기능 구현만 보지 않고 SQL, 데이터 흐름, 성능까지 같이 확인하려고 합니다.',
  },
  {
    title: 'Small Iterations',
    description: '작게 만들고, 기록하고, 다시 개선하는 방식으로 백엔드를 쌓아가고 있습니다.',
  },
];

const statusLines = [
  'building interfaces with intent',
  'learning in public, shipping in small steps',
  'currently available for collaboration',
];

function useTypingText(lines, typingSpeed = 70, pauseMs = 1500) {
  const [text, setText] = useState('');
  const lineIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const deletingRef = useRef(false);

  useEffect(() => {
    const currentLine = lines[lineIndexRef.current];
    const timeout = window.setTimeout(() => {
      if (!deletingRef.current) {
        const nextLength = charIndexRef.current + 1;
        charIndexRef.current = nextLength;
        setText(currentLine.slice(0, nextLength));

        if (nextLength === currentLine.length) {
          deletingRef.current = true;
        }
      } else {
        const nextLength = Math.max(charIndexRef.current - 1, 0);
        charIndexRef.current = nextLength;
        setText(currentLine.slice(0, nextLength));

        if (nextLength === 0) {
          deletingRef.current = false;
          lineIndexRef.current = (lineIndexRef.current + 1) % lines.length;
        }
      }
    }, deletingRef.current && charIndexRef.current === currentLine.length ? pauseMs : deletingRef.current ? 28 : typingSpeed);

    return () => window.clearTimeout(timeout);
  }, [lines, pauseMs, text, typingSpeed]);

  return text;
}

function useRevealSections() {
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}

function App() {
  const typingText = useTypingText(statusLines);

  useRevealSections();

  return (
    <>
      <header className="site-header">
        <span className="site-name">songkyeongyong</span>
        <span className="site-status">
          <span className="dot" />
          available
        </span>
      </header>

      <main>
        <section className="hero">
          <div className="terminal-block">
            <p className="terminal-line">
              <span className="prompt">$</span>
              {' '}
              whoami
            </p>
            <p className="terminal-output hero-copy hero-name">
              송경용
              {' '}
              <span className="muted">/ Kyeongyong Song</span>
            </p>
            <p className="terminal-line">
              <span className="prompt">$</span>
              {' '}
              cat about.txt
            </p>
            <p className="terminal-output hero-copy hero-about">개발과 예술 사이를 탐구 중입니다. 🚀</p>
            <p className="terminal-line">
              <span className="prompt">$</span>
              {' '}
              echo $STATUS
            </p>
            <p className="terminal-output typing">
              {typingText}
              <span className="typing-cursor">▋</span>
            </p>
            <p className="terminal-line active">
              <span className="prompt">$</span>
              {' '}
              <span className="cursor-blink">▋</span>
            </p>
          </div>

          <div className="links">
            <a href="https://github.com/songgy0525" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a href="mailto:morning0525@naver.com">Email ↗</a>
            <a href="https://instagram.com/songkyeongyong.be" target="_blank" rel="noreferrer">
              Instagram ↗
            </a>
          </div>
        </section>

        <section className="section fade-section" id="stack">
          <p className="section-title">
            <span className="prompt">$</span>
            {' '}
            ls ./stack
          </p>
          <div className="stack-grid">
            {stackItems.map((item) => (
              <div className="stack-item" key={item.label}>
                <span className="emoji">{item.emoji}</span>
                {item.label}
              </div>
            ))}
          </div>
        </section>

        {/* 프로젝트 섹션 - 추후 추가 예정
        <section className="section fade-section" id="projects">
          <p className="section-title">
            <span className="prompt">$</span>
            {' '}
            ls ./projects
          </p>
          <div className="project-list">
            {projects.map((project) => (
              <a className="project-card" href={project.href} key={project.name} target="_blank" rel="noreferrer">
                <div className="project-top">
                  <span className="project-name">{project.name}</span>
                  <span className="project-arrow">↗</span>
                </div>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>
        */}

        <section className="section fade-section" id="focus">
          <p className="section-title">
            <span className="prompt">$</span>
            {' '}
            cat ./what-i-focus-on.md
          </p>
          <div className="focus-list">
            {focusItems.map((item, index) => (
              <div className="focus-item" key={item.title}>
                <div className="focus-heading">
                  <span className="focus-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="focus-title">{item.title}</span>
                </div>
                <p className="focus-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p>송경용 · 2026</p>
      </footer>
    </>
  );
}

export default App;
