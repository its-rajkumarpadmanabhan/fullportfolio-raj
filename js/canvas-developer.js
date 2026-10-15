/**
 * DEVELOPER CANVAS: INTERCONNECTED CYBER-NEURAL MATRIX & POST-AWARE ARCHITECTURE
 * Background animation that reacts dynamically to:
 * 1. Window scroll position (Hero -> Experience -> Projects -> Skills -> Contact)
 * 2. Active hovered post / card (nodes draw interconnected links toward active posts)
 * 3. Mouse pointer coordinates & velocity
 */

(function initDeveloperCanvas() {
  const canvas = document.getElementById('neural-matrix-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouse = {
    x: width / 2,
    y: height / 2,
    radius: 180,
    isActive: false
  };

  // Track active post element for interconnected post-linking
  let activePostRect = null;
  let activeSectionIndex = 0; // 0: hero, 1: exp, 2: projects, 3: skills, 4: contact

  // Responsive resize
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initNodes();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.isActive = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.isActive = false;
  });

  // Observe active sections for background mode modulation
  const sectionIds = ['hero', 'experience', 'projects', 'skills', 'contact'];
  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;

    sections.forEach((sec, idx) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= windowH * 0.45 && rect.bottom >= windowH * 0.25) {
        activeSectionIndex = idx;
      }
    });
  }, { passive: true });

  // Connect active card / post to canvas
  function attachPostInterconnections() {
    const cards = document.querySelectorAll('.project-card, .timeline-card, .skill-category-card');
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        const r = card.getBoundingClientRect();
        activePostRect = {
          x: r.left + r.width / 2,
          y: r.top + r.height / 2,
          width: r.width,
          height: r.height
        };
      });
      card.addEventListener('mouseleave', () => {
        activePostRect = null;
      });
    });
  }

  // Node particle system
  const nodeCount = Math.min(65, Math.floor((window.innerWidth * window.innerHeight) / 22000));
  let nodes = [];

  class CyberNode {
    constructor() {
      this.reset();
      this.x = Math.random() * width;
      this.y = Math.random() * height;
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.9;
      this.vy = (Math.random() - 0.5) * 0.9;
      this.radius = Math.random() * 2.2 + 1.2;
      this.baseColor = Math.random() > 0.4 ? 'rgba(6, 182, 212,' : 'rgba(16, 185, 129,';
      this.alpha = Math.random() * 0.5 + 0.3;
      this.pulseSpeed = Math.random() * 0.03 + 0.01;
      this.pulseOffset = Math.random() * Math.PI * 2;
    }

    update(time) {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse attraction
      if (mouse.isActive) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x += dx * force * 0.035;
          this.y += dy * force * 0.035;
        }
      }

      // Gravitate slightly toward active hovered post/card
      if (activePostRect) {
        const dx = activePostRect.x - this.x;
        const dy = activePostRect.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 450) {
          this.x += dx * 0.015;
          this.y += dy * 0.015;
        }
      }
    }

    draw(ctx, time) {
      const pulse = Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.2 + 0.8;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * pulse, 0, Math.PI * 2);
      ctx.fillStyle = `${this.baseColor} ${this.alpha * pulse})`;
      ctx.shadowColor = 'rgba(6, 182, 212, 0.5)';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function initNodes() {
    nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new CyberNode());
    }
  }
  initNodes();

  // Traveling data packets along interconnect lines
  const packets = [];
  for (let i = 0; i < 12; i++) {
    packets.push({
      nodeA: Math.floor(Math.random() * nodeCount),
      nodeB: Math.floor(Math.random() * nodeCount),
      t: Math.random(),
      speed: Math.random() * 0.012 + 0.006,
      color: Math.random() > 0.5 ? '#10b981' : '#38bdf8'
    });
  }

  let time = 0;
  function animate() {
    time += 1;
    ctx.clearRect(0, 0, width, height);

    // Section 3 (Skills & Security) Radar sweep or subtle grid matrix
    if (activeSectionIndex === 3) {
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.035)';
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }

    // Update and draw nodes
    nodes.forEach((node) => {
      node.update(time);
      node.draw(ctx, time);
    });

    // Draw interconnecting links between close nodes
    const maxDist = 135;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.28;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Interconnect lines to active hovered post/card
    if (activePostRect) {
      nodes.forEach((node) => {
        const dx = activePostRect.x - node.x;
        const dy = activePostRect.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 320) {
          const alpha = (1 - dist / 320) * 0.45;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(activePostRect.x, activePostRect.y);
          ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      });
    }

    // Draw traveling data packets
    packets.forEach((p) => {
      p.t += p.speed;
      if (p.t > 1) {
        p.t = 0;
        p.nodeA = Math.floor(Math.random() * nodes.length);
        p.nodeB = Math.floor(Math.random() * nodes.length);
      }
      const nA = nodes[p.nodeA];
      const nB = nodes[p.nodeB];
      if (nA && nB) {
        const px = nA.x + (nB.x - nA.x) * p.t;
        const py = nA.y + (nB.y - nA.y) * p.t;

        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    // Interconnect with mouse cursor
    if (mouse.isActive) {
      nodes.forEach((node) => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.4;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    }

    requestAnimationFrame(animate);
  }

  animate();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachPostInterconnections);
  } else {
    attachPostInterconnections();
  }
})();
