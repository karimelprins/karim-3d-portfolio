import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Experience } from './components/Experience.jsx'
import { projects, skills } from './data/projects.js'

gsap.registerPlugin(ScrollTrigger)

const heroInitial = { opacity: 0, y: 30 }
const heroAnimate = { opacity: 1, y: 0 }
const heroTransition = { duration: 0.8 }
const canvasCamera = { position: [0, 2.4, 8], fov: 45 }
const canvasDpr = [1, 2]

function Header() {
  const [open, setOpen] = useState(false)
  const links = ['home', 'about', 'projects', 'stack', 'contact']
  return (
    <header className="header">
      <a className="brand" href="#home" aria-label="Karim Ehab home">
        <span className="brand-orb avatar-logo"><img src="/images/profile-face.png" alt="Karim Ehab" /></span>
        <span><b>Karim Ehab</b></span>
      </a>
      <button className="menu" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? 'Close' : 'Menu'}</button>
      <nav className={open ? 'nav open' : 'nav'}>
        {links.map((link) => <a key={link} href={`#${link}`} onClick={() => setOpen(false)}>{link}</a>)}
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="home">
      <motion.div className="hero-copy" initial={heroInitial} animate={heroAnimate} transition={heroTransition}>
        <h1><span>Hi, I’m Karim Ehab</span></h1>
        <p className="lead"> a Frontend / Next.js Developer building responsive business websites, dashboards, booking flows, API integrations, and production-ready web experiences.</p>
        <div className="hero-actions">
          <a className="button primary" href="#projects">Explore Projects</a>
          <a className="button ghost" href="#contact">Contact Me</a>
        </div>
      </motion.div>
    </section>
  )
}

function About() {
  return (
    <section className="section about" id="about">
      <p className="eyebrow">About</p>
      <h2>Selected work focused on real products, client needs, and production-ready web experiences.</h2>
      <div className="about-grid">
        <article><b>Frontend Developer</b><p>I build responsive web applications with React, Next.js, and TypeScript, with a focus on clear UX, API integration, maintainable structure, and real business requirements.</p></article>
        <article><b>My Passion for Coding</b><p>I enjoy turning requirements into working products: dashboards, admin tools, booking flows, bilingual interfaces, authentication, and data-backed user experiences.</p></article>
        <article><b>Location</b><p>I’m very flexible with time zone communications & locations. I'm based in Cairo, Egypt and open to remote work worldwide.</p></article>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section className="section projects" id="projects">
      <p className="eyebrow">Selected work</p>
      <p className="section-intro">A mix of client work, full-stack products, and public projects. Private commercial code is clearly marked, while public projects include live demos and source links.</p>
      <div className="project-grid">
        {projects.map((project) => {
          const projectStyle = { '--accent': project.color }
          return (
            <article className="project-card" key={project.id} style={projectStyle}>
              {project.image ? (
                <div className="project-shot">
                  <img src={project.image} alt={`${project.title} screenshot`} />
                </div>
              ) : (
                <div className="project-shot project-shot-private" aria-label={`${project.title} private project`}>
                  <span>{project.type}</span>
                </div>
              )}
              <p className="project-type">{project.type}</p>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              {project.note && <p className="project-note">{project.note}</p>}
              <div className="tag-row">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="project-links">
                {project.live && <a href={project.live} target="_blank" rel="noreferrer">Live ↗</a>}
                {project.github && <a href={project.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
                {!project.live && !project.github && <span>Private project</span>}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function Stack() {
  return (
    <section className="section stack" id="stack">
      <p className="eyebrow">Stack</p>
      <div className="skills-grid">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
    </section>
  )
}

function ContactIcon({ type }) {
  if (type === 'gmail') return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#EA4335" d="M3 6.5 12 13l9-6.5V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6.5Z"/><path fill="#fff" d="M5 6h14v2.2L12 13.2 5 8.2V6Z"/><path fill="#FBBC05" d="M3 6.5 12 13v2L3 8.5v-2Z"/><path fill="#34A853" d="M21 6.5 12 13v2l9-6.5v-2Z"/></svg>
  )
  if (type === 'linkedin') return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="5" fill="#0A66C2"/><path fill="#fff" d="M6.7 9.7h3.1V18H6.7V9.7Zm1.55-4A1.8 1.8 0 1 1 8.2 9.3a1.8 1.8 0 0 1 .05-3.6ZM11.2 9.7h3v1.15h.04c.42-.8 1.45-1.35 2.62-1.35 2.8 0 3.32 1.84 3.32 4.23V18h-3.1v-3.78c0-.9-.02-2.06-1.25-2.06-1.26 0-1.45.98-1.45 2V18h-3.18V9.7Z"/></svg>
  )
  if (type === 'github') return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#fff"/><path fill="#111" d="M12 .7A11.3 11.3 0 0 0 8.43 22.72c.57.1.78-.25.78-.55v-2.1c-3.18.69-3.85-1.36-3.85-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.95.1-.74.4-1.25.72-1.54-2.54-.29-5.2-1.27-5.2-5.64 0-1.25.44-2.27 1.17-3.07-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.13 1.17a10.8 10.8 0 0 1 5.7 0c2.17-1.48 3.12-1.17 3.12-1.17.63 1.58.24 2.74.12 3.03.73.8 1.17 1.82 1.17 3.07 0 4.38-2.67 5.35-5.22 5.63.41.36.78 1.06.78 2.13v3.16c0 .3.2.66.79.55A11.3 11.3 0 0 0 12 .7Z"/></svg>
  )
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#25D366"/><path fill="#fff" d="M17.5 14.2c-.3-.15-1.72-.85-1.98-.95-.27-.1-.46-.15-.65.15-.2.3-.75.94-.92 1.13-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.74-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.65-1.56-.9-2.14-.24-.57-.48-.49-.65-.5h-.56c-.2 0-.52.08-.8.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.72-.7 1.96-1.38.24-.68.24-1.27.17-1.39-.07-.12-.27-.2-.57-.35Z"/></svg>
  )
}

function Contact() {
  const contacts = [
    { type: 'gmail', label: 'Gmail', value: 'karimehabmohamedmohamed@gmail.com', href: 'mailto:karimehabmohamedmohamed@gmail.com' },
    { type: 'linkedin', label: 'LinkedIn', value: 'karim-ehab-4a10902a6', href: 'https://www.linkedin.com/in/karim-ehab-4a10902a6' },
    { type: 'github', label: 'GitHub', value: '@karimelprins', href: 'https://github.com/karimelprins' },
    { type: 'whatsapp', label: 'WhatsApp', value: '01019788919', href: 'https://wa.me/201019788919' },
  ]

  return (
    <section className="section contact" id="contact">
      <p className="eyebrow contact-eyebrow">Contact</p>
      <div className="contact-card">
        <div className="contact-grid">
          {contacts.map((item) => (
            <a className="contact-item" key={item.type} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined}>
              <span className="contact-icon"><ContactIcon type={item.type} /></span>
              <span className="contact-text"><b>{item.label}</b><small>{item.value}</small></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function App() {
  useEffect(() => {
    gsap.utils.toArray('.section').forEach((section) => {
      gsap.fromTo(section, { opacity: 0, y: 60 }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 72%' },
      })
    })
    gsap.to('.canvas-wrap', {
      yPercent: 18,
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: true },
    })
  }, [])

  return (
    <>
      <Header />
      <div className="canvas-wrap">
        <Canvas camera={canvasCamera} shadows dpr={canvasDpr}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </Canvas>
      </div>
      <main>
        <Hero />
        <About />
        <Projects />
        <Stack />
        <Contact />
      </main>
      <footer>© {new Date().getFullYear()} Karim Ehab</footer>
    </>
  )
}
