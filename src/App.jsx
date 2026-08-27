import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from './data/projects';

const stackItems = [
  { emoji: '☕', label: 'Java' },
  { emoji: '🍃', label: 'Spring Boot' },
  { emoji: '🔗', label: 'JPA / Hibernate' },
  { emoji: '🔐', label: 'Spring Security' },
  { emoji: '🐘', label: 'PostgreSQL' },
  { emoji: '🔴', label: 'Redis' },
  { emoji: '🐳', label: 'Docker' },
  { emoji: '☁️', label: 'Oracle Cloud' },
  { emoji: '🔀', label: 'Git / GitHub' },
  { emoji: '⚛️', label: 'React / Next.js' },
];

const focusItems = [
  {
    title: 'Payment Integrity',
    description:
      'PG 장애/중복 요청 상황에서도 결제 상태가 일관되게 수렴하도록 상태 모델과 트랜잭션 경계를 설계합니다.',
  },
  {
    title: 'Auth & Security',
    description:
      '세션/JWT/OAuth2 예외 케이스를 사전에 정의하고, 권한 변경이 즉시 반영되는 인증 체계를 구축합니다.',
  },
  {
    title: 'Performance Diagnosis',
    description:
      '부하 테스트로 병목을 재현하고, 실행 계획과 지표로 원인을 특정해 수치 기반으로 개선합니다.',
  },
  {
    title: 'Operational Safety',
    description:
      '이벤트 유실·다중 인스턴스 중복 실행 등 운영 환경의 실패 경로를 미리 막는 안전장치를 설계합니다.',
  },
];

const statusLines = [
  'designing payment pipelines that survive failures',
  'building auth systems that close every edge case',
  'currently available for backend opportunities',
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
            <p className="terminal-output hero-copy hero-about">
              백엔드 개발자 송경용입니다.
            </p>
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
            <a href="mailto:kysong525@gmail.com">Email ↗</a>
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
              <Link
                className="project-card"
                to={`/projects/${project.id}`}
                key={project.id}
              >
                <div className="project-top">
                  <div>
                    <span className="project-name">{project.name}</span>
                    <span className="project-subtitle"> — {project.subtitle}</span>
                  </div>
                  <span className="project-arrow">↗</span>
                </div>
                <p className="project-desc">{project.summary}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

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
