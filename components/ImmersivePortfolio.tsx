'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  CONTACT_FIELDS,
  DOCS_LINK,
  EDUCATION,
  EXPERIENCE,
  PROJECTS,
} from '@/lib/data';

const ImmersiveScene = dynamic(() => import('./ImmersiveScene'), { ssr: false });

const RESUME_LINK = CONTACT_FIELDS.find((field) => field.label === 'Résumé')?.href ?? '#';

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function ImmersivePortfolio() {
  const progress = useRef(0);
  const target = useRef(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const updateTarget = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target.current = max > 0 ? window.scrollY / max : 0;
    };

    updateTarget();
    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', updateTarget, { passive: true });

    let frame = 0;
    const tick = () => {
      progress.current +=
        (target.current - progress.current) * (reducedMotion ? 1 : 0.055);
      frame = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', updateTarget);
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <div className="portfolio">
      <div className="scene" aria-hidden="true">
        {reducedMotion ? <div className="scene-static" /> : <ImmersiveScene progress={progress} />}
      </div>

      <header className="site-header">
        <nav aria-label="Portfolio navigation">
          <button type="button" onClick={() => jumpTo('home')}>Home</button>
          <button type="button" onClick={() => jumpTo('about')}>About</button>
          <button type="button" onClick={() => jumpTo('work')}>Experience</button>
          <button type="button" onClick={() => jumpTo('projects')}>Projects</button>
          <button type="button" onClick={() => jumpTo('contact')}>Contact</button>
        </nav>
        <a className="header-resume" href={RESUME_LINK} target="_blank" rel="noreferrer">
          Résumé <Arrow />
        </a>
      </header>

      <main>
        <section className="section hero" id="home">
          <motion.div
            className="hero-inner"
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="location">Sydney, Australia</p>
            <h1>
              <span>Parth</span>
              <em>Athalye</em>
            </h1>
            <p className="hero-intro">
              I&apos;m an AI engineer who likes taking ideas all the way to a
              product people can actually use.
            </p>
            <p className="journey-theme">
              From raw signals to working systems.
            </p>
            <div className="hero-meta">
              <span>Computer vision</span>
              <span>Intelligent systems</span>
              <span>Full-stack products</span>
            </div>
          </motion.div>
          <button className="continue" type="button" onClick={() => jumpTo('about')}>
            Follow the journey
            <span aria-hidden="true">↓</span>
          </button>
        </section>

        <section className="section about" id="about">
          <motion.div
            className="story-copy"
            initial={{ opacity: 0, y: 38 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="phase-label">Signal · Structure · System</p>
              <p>
                Whether it is a vision system reading activity from CCTV, a
                retrieval pipeline making sense of enterprise documents, or a
              multilingual app for a shopkeeper in India, I enjoy the same
              part of the work: understanding a messy problem and building the
              complete system around it.
            </p>
            <p>
              I&apos;m currently pursuing a Master of IT in Artificial
              Intelligence at UNSW while working with Machine Vision AI. Before
              moving to Sydney, I worked across semantic search at Deloitte and
              predictive maintenance research at Edgelytics.
            </p>
            <div className="education-line">
              {EDUCATION.map((item) => (
                <div key={item.school}>
                  <strong>{item.school}</strong>
                  <span>{item.deg}</span>
                  <small>{item.year}</small>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="work-section" id="work">
          {EXPERIENCE.map((experience) => (
            <motion.article
              className="work-entry"
              key={experience.co}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="work-title">
                <p className="phase-label">{experience.phase}</p>
                <h3>{experience.co}</h3>
                <p>{experience.role}</p>
              </div>
              <div className="work-detail">
                <div className="work-meta">
                  <span>{experience.period}</span>
                  <span>{experience.loc}</span>
                </div>
                <p className="work-summary">{experience.summary}</p>
                <p className="work-description">{experience.desc}</p>
                <small>{experience.discipline}</small>
              </div>
            </motion.article>
          ))}
        </section>

        <section className="projects-section" id="projects">
          {PROJECTS.map((project) => (
            <motion.article
              className="project"
              key={project.title}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                className="project-image"
                href={`https://www.youtube.com/watch?v=${project.ytId}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`Watch the ${project.title} demo`}
              >
                <img
                  src={`https://img.youtube.com/vi/${project.ytId}/hqdefault.jpg`}
                  alt=""
                />
                <span className="play-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M9 7.5v9l7-4.5-7-4.5Z" />
                  </svg>
                </span>
              </a>
              <div className="project-copy">
                <div className="project-title">
                  <span className="phase-label">{project.phase}</span>
                  <p>{project.year}</p>
                </div>
                <h3>{project.title}</h3>
                <h4>{project.sub}</h4>
                <p className="project-summary">{project.summary}</p>
                <p className="project-description">{project.desc}</p>
                <div className="project-stack">
                  {project.stack.map((item) => <span key={item}>{item}</span>)}
                </div>
                <a href={project.link} target="_blank" rel="noreferrer">
                  View repository <Arrow />
                </a>
              </div>
            </motion.article>
          ))}
        </section>

        <section className="section contact" id="contact">
          <div className="contact-inner">
            <p className="contact-intro">
              I&apos;m looking for engineering teams where ambitious AI work
              meets thoughtful product decisions.
            </p>
            <a className="email-link" href="mailto:athalyeparth@gmail.com">
              athalyeparth@gmail.com
              <Arrow />
            </a>
            <div className="contact-links">
              <a href="https://github.com/parthathalye17" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/parthathalye" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={RESUME_LINK} target="_blank" rel="noreferrer">Résumé</a>
              <a href={DOCS_LINK} target="_blank" rel="noreferrer">Documents</a>
            </div>
          </div>
          <footer>
            <span>Parth Athalye</span>
            <span>Sydney · 2026</span>
          </footer>
        </section>
      </main>
    </div>
  );
}
