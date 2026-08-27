import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { projects } from './data/projects';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <main style={{ padding: '120px 10vw' }}>
        <p style={{ color: 'var(--muted)', fontSize: '13px' }}>프로젝트를 찾을 수 없습니다.</p>
        <Link to="/" className="back-link">← 홈으로</Link>
      </main>
    );
  }

  return (
    <>
      <header className="site-header">
        <Link to="/" className="site-name" style={{ textDecoration: 'none' }}>
          songkyeongyong
        </Link>
        <span className="site-status">
          <span className="dot" />
          available
        </span>
      </header>

      <main>
        <section className="detail-hero">
          <p className="detail-breadcrumb">
            <span className="prompt">$</span>
            {' '}
            cat ./projects/{id}.md
          </p>

          <h1 className="detail-title">
            {project.name}
            <span className="detail-subtitle"> — {project.subtitle}</span>
          </h1>

          <div className="detail-meta">
            <span className="detail-period">{project.period}</span>
            <span className="detail-sep">·</span>
            <span className="detail-role">{project.role}</span>
          </div>

          <p className="detail-summary">{project.summary}</p>

          <div className="detail-tags">
            {project.tags.map((tag) => (
              <span className="detail-tag" key={tag}>{tag}</span>
            ))}
          </div>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="detail-github-link"
            >
              GitHub ↗
            </a>
          )}
        </section>

        {project.sections.map((section) => (
          <section className="detail-section" key={section.title}>
            <p className="section-title">
              <span className="prompt">$</span>
              {' '}
              {section.title}
            </p>
            <ul className="detail-list">
              {section.items.map((item, i) => (
                <li className="detail-list-item" key={i}>
                  <span className="detail-bullet">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="detail-section">
          <Link to="/" className="back-link">← 돌아가기</Link>
        </section>
      </main>

      <footer>
        <p>송경용 · 2026</p>
      </footer>
    </>
  );
}
