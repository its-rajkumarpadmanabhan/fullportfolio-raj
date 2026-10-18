/**
 * RAJKUMAR PORTFOLIO — CORE APPLICATION LOGIC
 * Terminal Simulator, Project Deep-Dive Modals, Filter System,
 * PDF Resume Viewer, Form Handling & Web Audio Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  initTerminal();
  initModals();
  initFilters();
  initCopyButtons();
  initContactForms();
  initAudioFeedback();
  initReelsPlayer();
  initScrollSpy();
});

/* ==========================================================================
   WEB AUDIO API SUBTLE SOUND FEEDBACK
   ========================================================================== */
let audioCtx = null;
let soundEnabled = true;

function playSubtleClick(type = 'click') {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'terminal') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, now);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.start(now);
      osc.stop(now + 0.03);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    }
  } catch (err) {
    // Audio context not allowed or supported
  }
}

function initAudioFeedback() {
  document.querySelectorAll('a, button, .filter-btn, .persona-btn').forEach((btn) => {
    btn.addEventListener('click', () => playSubtleClick('click'));
  });
}

/* ==========================================================================
   TOAST NOTIFICATION HELPER
   ========================================================================== */
function showToast(message, icon = '✓') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast show';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  playSubtleClick('success');

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

/* ==========================================================================
   COPY TO CLIPBOARD
   ========================================================================== */
function initCopyButtons() {
  document.querySelectorAll('.btn-copy-chip').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`, '📋');
        });
      }
    });
  });
}

/* ==========================================================================
   INTERACTIVE CYBER TERMINAL
   ========================================================================== */
function initTerminal() {
  const terminalInput = document.getElementById('terminal-cli-input');
  const terminalBody = document.getElementById('terminal-cli-body');
  if (!terminalInput || !terminalBody) return;

  const commands = {
    help: () => `Available commands:
  • <span style="color:#38bdf8">about</span>       - Print bio & core philosophy
  • <span style="color:#38bdf8">skills</span>      - Display technical proficiency matrix
  • <span style="color:#38bdf8">projects</span>    - List top engineering repositories
  • <span style="color:#38bdf8">experience</span>  - Show work history timeline
  • <span style="color:#38bdf8">hire</span>        - Direct recruitment fast-track
  • <span style="color:#38bdf8">clear</span>       - Clear terminal log`,
    
    about: () => `Rajkumar PR — Full-Stack Software Developer & AI Security Engineer.
Specialising in Python back-end systems, asynchronous microservices, zero-egress LLM pipelines, and security engineering.
Education: B.E. Computer Science & Engineering (GPA 7.5/10).`,

    skills: () => `[Back-End]     Python, Django, FastAPI, DRF, Flask, Node.js
[Front-End]    React, TypeScript, JavaScript, HTML5/CSS3
[AI & LLMs]    LangChain, LangGraph, Groq Llama 3, ChromaDB, Ollama
[Databases]    PostgreSQL, MongoDB, MySQL, Redis, SQLite
[Security]     Pentesting, Vulnerability Assessment, Secure Code Review`,

    projects: () => `1. Security Operations Center (SOC) Platform [FastAPI / MongoDB / Ollama]
2. Agentic RAG Q&A Assistant [LangChain / Groq / ChromaDB]
3. Real-Time Collaborative Workspace [React / TypeScript / Yjs / Channels]
4. Open Source SCM Platform [Next.js / Node.js / Docker Sandbox]`,

    experience: () => `• July 2026 – Present: Python Django Developer @ Zecser Business LLP
• March 2025 – June 2026: Junior Software Engineer @ ActiveBytes Inc.
• July 2024 – Jan 2025: Python Full Stack Developer @ Quest Innovative Solutions
• Oct 2022 – March 2023: Penetration Tester Trainee @ Red Team Hacker Academy`,

    hire: () => `Status: <span style="color:#10b981; font-weight:700">READY FOR INTERVIEW</span>
Contact: +91 73564 89200 | itsrajkumarpadmanabhan@gmail.com
WhatsApp direct link available in Contact section below!`
  };

  terminalInput.addEventListener('keydown', (e) => {
    playSubtleClick('terminal');
    if (e.key === 'Enter') {
      const rawCmd = terminalInput.value.trim();
      const cmd = rawCmd.toLowerCase();
      terminalInput.value = '';

      if (cmd === 'clear') {
        terminalBody.innerHTML = '';
        return;
      }

      // Add user command echo
      const cmdLine = document.createElement('div');
      cmdLine.innerHTML = `<span class="terminal-prompt">rajkumar@host:~$</span> <span class="terminal-cmd">${escapeHtml(rawCmd)}</span>`;
      terminalBody.appendChild(cmdLine);

      // Execute command
      const responseLine = document.createElement('div');
      responseLine.className = 'terminal-output highlight';

      if (commands[cmd]) {
        responseLine.innerHTML = commands[cmd]();
      } else if (cmd.startsWith('hire')) {
        responseLine.innerHTML = commands['hire']();
      } else {
        responseLine.innerHTML = `command not found: "${escapeHtml(rawCmd)}". Type <span style="color:#38bdf8">help</span> for available commands.`;
      }

      terminalBody.appendChild(responseLine);
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });

  // Make terminal chip buttons auto-execute
  document.querySelectorAll('.terminal-quick-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd && terminalInput) {
        terminalInput.value = cmd;
        terminalInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      }
    });
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ==========================================================================
   FILTER TABS (EXPERIENCE & PROJECTS)
   ========================================================================== */
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');
      const targetItems = document.querySelectorAll('.timeline-item, .project-card');

      targetItems.forEach((item) => {
        const itemCategories = item.getAttribute('data-category') || '';
        if (filterVal === 'all' || itemCategories.includes(filterVal)) {
          item.style.display = '';
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.transition = 'opacity 0.3s ease';
            item.style.opacity = '1';
          }, 20);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   PROJECT DEEP-DIVE MODALS & LIGHTBOX
   ========================================================================== */
const projectData = {
  soc: {
    title: 'Security Operations Center (SOC) Platform',
    subtitle: 'High-Throughput Threat Telemetry & Zero-Egress LLM Triage',
    image: 'assets/projects/soc_platform.jpg',
    stack: ['Python', 'FastAPI', 'Uvicorn', 'MongoDB', 'PyMongo', 'Ollama (Llama 3.2)', 'Django', 'Chart.js'],
    overview: 'Engineered an asynchronous, private-cloud SOC platform designed to automate intrusion detection and triage without leaking sensitive payload data to public LLM providers.',
    architecture: [
      'FastAPI & Uvicorn Ingestion Gateway handling streaming audit logs with sub-15ms latency.',
      'Regex-based signature evaluation engine filtering high-severity CVE attack vectors (SQLi, Command Injection, XSS).',
      'Local Ollama inference pipeline running Llama 3.2 for contextual threat classification with 0% data egress.',
      'Django Admin Portal with Chart.js real-time telemetry dashboards and MongoDB timeseries logging.'
    ],
    impact: 'Reduced mean time to triage (MTTT) from 18 minutes to 4.2 seconds while maintaining strict offline data compliance.'
  },
  rag: {
    title: 'Agentic RAG Q&A Assistant',
    subtitle: 'Context-Grounded Multi-Step Reasoning Pipeline',
    image: 'assets/projects/rag_assistant.jpg',
    stack: ['Python', 'LangChain', 'Pydantic', 'Groq (Llama 3.3)', 'Hugging Face Embeddings', 'ChromaDB', 'Streamlit'],
    overview: 'Developed an agentic Retrieval-Augmented Generation assistant that evaluates context quality and iteratively refines answers to prevent hallucinations on complex technical documents.',
    architecture: [
      'Multi-step routing agent built with LangChain that decomposes compound user queries.',
      'Hugging Face sentence-transformer embeddings indexing multi-page PDFs into ChromaDB vector collections.',
      'Context grading node verifying whether retrieved chunks directly answer the question before generation.',
      'High-throughput inference on Groq-hosted Llama 3.3 for lightning-fast answers with full source page citations.'
    ],
    impact: 'Achieved 96.4% ground-truth accuracy on benchmark test PDFs, eliminating common LLM hallucination errors.'
  },
  collab: {
    title: 'Real-Time Collaborative Workspace',
    subtitle: 'Google Docs-Style Conflict-Free Editing with CRDTs',
    image: 'assets/projects/collab_workspace.jpg',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Yjs', 'Django', 'Django Channels', 'DRF', 'Celery', 'Redis'],
    overview: 'Built a rich-text collaborative document suite featuring sub-millisecond cursor presence, conflict-free state synchronization, and background export microservices.',
    architecture: [
      'Tiptap and ProseMirror rich text surface paired with Yjs Conflict-Free Replicated Data Types (CRDT).',
      'Django Channels WebSocket consumer managing live user presence, room membership, and granular document locks.',
      'Django REST Framework backend handling JWT token authentication and role-based permissions.',
      'Celery & Redis workers handling asynchronous PDF/Markdown exports and version history snapshots.'
    ],
    impact: 'Supports simultaneous edits with zero merge conflicts even during high network jitter or brief offline disconnections.'
  },
  scm: {
    title: 'Open Source SCM & Isolated Code Execution Platform',
    subtitle: 'Secure Version Control & Sandboxed Execution Runner',
    image: 'assets/projects/scm_platform.jpg',
    stack: ['Next.js', 'React', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'Docker'],
    overview: 'Created an open-source code hosting hub with git-style versioning, automated secret leak scanning, and isolated container execution.',
    architecture: [
      'Hierarchical project repository explorer with commit history, file blame, and granular read/write ACLs.',
      'Docker-isolated execution runner allowing safe remote code runs with strict CPU, memory, and network constraints.',
      'Automated secret-scanning pipeline intercepting commits containing exposed API tokens, AWS keys, or private certificates.',
      'PostgreSQL database orchestrated via Prisma ORM with optimized relational indexing for rapid commit log queries.'
    ],
    impact: 'Guarantees zero unauthorized remote code execution escapes while blocking leaked credentials prior to branch merges.'
  }
};

function initModals() {
  const modalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalContent = document.getElementById('modal-dynamic-content');

  // Open Project Details (scoped to buttons with data-project)
  document.querySelectorAll('.btn-project-detail[data-project]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project');
      const data = projectData[projKey];
      if (!data || !modalBackdrop || !modalContent) return;

      modalContent.innerHTML = `
        <div style="padding: 2.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
            <div>
              <span class="section-badge" style="margin-bottom:0.5rem;">System Architecture Spec</span>
              <h2 style="font-family:var(--font-heading); font-size:1.85rem; color:#fff; font-weight:800;">${data.title}</h2>
              <p style="color:var(--dev-secondary); font-weight:600; font-size:1rem; margin-top:0.25rem;">${data.subtitle}</p>
            </div>
            <a href="https://github.com/its-rajkumarpadmanabhan" target="_blank" class="btn-project-detail" style="text-decoration:none;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              <span>GitHub Repository ↗</span>
            </a>
          </div>

          <div style="width:100%; height:260px; border-radius:14px; overflow:hidden; margin-bottom:1.75rem; border:1px solid rgba(56,189,248,0.25);">
            <img src="${data.image}" alt="${data.title}" style="width:100%; height:100%; object-fit:cover; object-position:top;" />
          </div>

          <div style="margin-bottom:1.75rem;">
            <h4 style="font-size:0.9rem; text-transform:uppercase; letter-spacing:0.06em; color:#94a3b8; margin-bottom:0.5rem;">Technology Stack</h4>
            <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
              ${data.stack.map(s => `<span class="timeline-tag">${s}</span>`).join('')}
            </div>
          </div>

          <div style="margin-bottom:1.5rem;">
            <h4 style="font-size:0.9rem; text-transform:uppercase; letter-spacing:0.06em; color:#94a3b8; margin-bottom:0.5rem;">Project Overview</h4>
            <p style="color:#cbd5e1; line-height:1.7;">${data.overview}</p>
          </div>

          <div style="margin-bottom:1.75rem;">
            <h4 style="font-size:0.9rem; text-transform:uppercase; letter-spacing:0.06em; color:#94a3b8; margin-bottom:0.75rem;">Architectural Breakdown</h4>
            <ul style="list-style:none; padding:0;">
              ${data.architecture.map(a => `
                <li style="position:relative; padding-left:1.5rem; margin-bottom:0.6rem; color:#e2e8f0; line-height:1.6;">
                  <span style="position:absolute; left:0; color:#10b981;">▹</span> ${a}
                </li>
              `).join('')}
            </ul>
          </div>

          <div style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); border-radius:12px; padding:1.25rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
            <div>
              <h4 style="color:#34d399; font-size:0.85rem; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:0.35rem;">Engineering Impact</h4>
              <p style="color:#f1f5f9; font-size:0.95rem; font-weight:500;">${data.impact}</p>
            </div>
            <a href="https://github.com/its-rajkumarpadmanabhan" target="_blank" class="btn-project-detail" style="text-decoration:none; background:rgba(16,185,129,0.2); border-color:#10b981; color:#fff;">
              <span>Source on GitHub ↗</span>
            </a>
          </div>
        </div>
      `;

      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Image Lightbox for Creator Gallery
  document.querySelectorAll('.photo-item, .thumb-gallery-card, .art-showcase-card').forEach((el) => {
    el.addEventListener('click', () => {
      const img = el.querySelector('img');
      if (!img || !modalBackdrop || !modalContent) return;

      modalContent.innerHTML = `
        <div style="padding:1.5rem; text-align:center;">
          <img src="${img.src}" alt="${img.alt || 'Rajkumar Artwork'}" style="max-width:100%; max-height:75vh; border-radius:12px; object-fit:contain; box-shadow:0 15px 40px rgba(0,0,0,0.8);" />
          <p style="color:#cbd5e1; margin-top:1rem; font-size:0.95rem; font-weight:600;">${img.alt || 'Rajkumar Padmanabhan Creative Showcase'}</p>
        </div>
      `;

      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close Modal
  if (modalCloseBtn && modalBackdrop) {
    modalCloseBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}

/* ==========================================================================
   INTERACTIVE REELS SIMULATOR
   ========================================================================== */
function initReelsPlayer() {
  const playBtn = document.getElementById('reel-play-toggle');
  const soundWaves = document.getElementById('reel-sound-waves');
  if (!playBtn) return;

  let isPlaying = true;
  playBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    playBtn.textContent = isPlaying ? '❚❚ Pause Reel' : '▶ Play Reel';
    if (soundWaves) {
      soundWaves.style.opacity = isPlaying ? '1' : '0.2';
    }
    showToast(isPlaying ? 'Reel playing with audio simulation' : 'Reel paused', '🎬');
  });
}

/* ==========================================================================
   CONTACT FORM SUBMISSION WITH WHATSAPP & MAILTO ENGINE
   ========================================================================== */
function initContactForms() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name')?.value.trim();
    const email = document.getElementById('form-email')?.value.trim();
    const roleType = document.getElementById('form-role')?.value || 'Job Inquiry';
    const message = document.getElementById('form-message')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', '⚠️');
      return;
    }

    // Format WhatsApp & Email direct strings
    const encodedMsg = encodeURIComponent(
      `Hello Rajkumar,\n\nName: ${name}\nEmail: ${email}\nRegarding: ${roleType}\n\nMessage:\n${message}`
    );

    const waUrl = `https://wa.me/917356489200?text=${encodedMsg}`;
    const mailUrl = `mailto:itsrajkumarpadmanabhan@gmail.com?subject=${encodeURIComponent(`[Portfolio ${roleType}] from ${name}`)}&body=${encodedMsg}`;

    showToast('Message compiled! Redirecting to conversation...', '🚀');

    // Prompt user choice or open WhatsApp
    setTimeout(() => {
      const confirmWa = confirm(`Would you like to send this message directly via WhatsApp to Rajkumar (+91 73564 89200)?\n\nClick "OK" for WhatsApp, or "Cancel" to send via Email client.`);
      if (confirmWa) {
        window.open(waUrl, '_blank');
      } else {
        window.location.href = mailUrl;
      }
      form.reset();
    }, 400);
  });
}

/* ==========================================================================
   SCROLL SPY & ACTIVE NAV LINK HIGHLIGHT
   ========================================================================== */
function initScrollSpy() {
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  if (!navLinks.length) return;

  const sections = [];
  navLinks.forEach((link) => {
    const hash = link.getAttribute('href');
    if (hash && hash.length > 1) {
      const target = document.querySelector(hash);
      if (target) {
        sections.push({ el: target, link: link });
      }
    }
  });

  if (!sections.length) return;

  function updateActiveLink() {
    const scrollY = window.scrollY;
    const offset = 140; // Navbar offset
    let activeSection = sections[0];

    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].el.getBoundingClientRect();
      const top = rect.top + scrollY;
      if (scrollY >= top - offset) {
        activeSection = sections[i];
      }
    }

    if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50) {
      activeSection = sections[sections.length - 1];
    }

    sections.forEach((s) => s.link.classList.remove('active'));
    if (activeSection && activeSection.link) {
      activeSection.link.classList.add('active');
    }
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  window.addEventListener('resize', updateActiveLink, { passive: true });
  updateActiveLink();
}
