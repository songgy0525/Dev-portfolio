import { useEffect, useRef, useState } from 'react';

const stackItems = [
  { emoji: '☕', label: 'Java' },
  { emoji: '🗄️', label: 'SQL' },
  { emoji: '🔌', label: 'JDBC' },
  { emoji: '🗺️', label: 'MyBatis' },
  { emoji: '🍃', label: 'Spring Boot' },
  { emoji: '🎨', label: 'HTML / CSS' },
  { emoji: '🐙', label: 'Git' },
  { emoji: '⚡', label: 'Supabase' },
];

const projects = [
  {
    href: 'https://songgy0525.github.io/neeeeun',
    name: '예은의 시선',
    description: '사진 아카이브 웹사이트.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Supabase'],
  },
];

const gitEntries = [
  { hash: 'a3f92c1', message: 'Spring Boot 첫 서버 오픈, 마이크로서비스 연결 시도', day: 'Day 23' },
  { hash: '7d1e048', message: 'Supabase 연동, 방문자 카운터 구현', day: 'Day 23' },
  { hash: 'c892bb3', message: '예은의 시선 배포, GitHub Pages 연결', day: 'Day 22' },
  { hash: 'f410da2', message: 'HTML / CSS 학습 시작', day: 'Day 18' },
  { hash: '2b7a19e', message: 'MyBatis, 디자인패턴 완료', day: 'Day 14' },
  { hash: 'e501fc0', message: 'Java, DB, JDBC, SQL 학습', day: 'Day 01' },
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
            <p className="terminal-output">
              송경용
              {' '}
              <span className="muted">/ Kyeongyong Song</span>
            </p>
            <p className="terminal-line">
              <span className="prompt">$</span>
              {' '}
              cat about.txt
            </p>
            <p className="terminal-output">개발과 예술 사이를 탐구 중입니다.</p>
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

        <section className="section fade-section" id="log">
          <p className="section-title">
            <span className="prompt">$</span>
            {' '}
            git log --oneline
          </p>
          <div className="git-log">
            {gitEntries.map((entry) => (
              <div className="git-entry" key={`${entry.hash}-${entry.day}`}>
                <span className="git-hash">{entry.hash}</span>
                <span className="git-msg">{entry.message}</span>
                <span className="git-day">{entry.day}</span>
              </div>
            ))}
          </div>
          <a className="log-link" href="https://instagram.com/songkyeongyong.be" target="_blank" rel="noreferrer">
            @songkyeongyong.be ↗
          </a>
        </section>
      </main>

      <footer>
        <p>
          송경용 · 2026 · <span className="muted">built with react</span>
        </p>
      </footer>
    </>
  );
}

export default App;
