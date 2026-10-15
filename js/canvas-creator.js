/**
 * CREATOR CANVAS: KINETIC FLUID ORBS & INTERCONNECTED CREATIVE SPLINES
 * Background animation that reacts dynamically to:
 * 1. Window scroll position (Reels -> Experience -> Thumbnails -> Art -> Contact)
 * 2. Active hovered creator post / card (creative glowing threads link to post centers)
 * 3. Liquid cursor interaction & trailing organic energy
 */

(function initCreatorCanvas() {
  const canvas = document.getElementById('creator-fluid-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouse = {
    x: width / 2,
    y: height / 2,
    radius: 200,
    isActive: false
  };

  let activePostRect = null;
  let activeSectionIndex = 0;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initCreativeParticles();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.isActive = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.isActive = false;
  });

  // Track active post hover for dynamic spline linkage
  function attachCreatorPostInterconnections() {
    const postCards = document.querySelectorAll('.pillar-card, .reels-showcase-container, .thumb-gallery-card, .art-showcase-card, .photo-item, .tool-card');
    postCards.forEach((card) => {
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

  // Creative Particle definition
  const particleCount = Math.min(50, Math.floor((window.innerWidth * window.innerHeight) / 25000));
  let particles = [];

  const creatorPalettes = [
    'rgba(251, 113, 133,',  // Rose / Coral
    'rgba(245, 158, 11,',   // Sunset Amber
    'rgba(192, 132, 252,',  // Lavender / Violet
    'rgba(244, 63, 94,'     // Crimson
  ];

  class CreativeParticle {
    constructor() {
      this.reset();
      this.x = Math.random() * width;
      this.y = Math.random() * height;
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.75;
      this.vy = (Math.random() - 0.5) * 0.75;
      this.baseRadius = Math.random() * 3.5 + 1.5;
      this.color = creatorPalettes[Math.floor(Math.random() * creatorPalettes.length)];
      this.alpha = Math.random() * 0.45 + 0.25;
      this.type = Math.random() > 0.7 ? 'ring' : 'dot';
      this.oscillationSpeed = Math.random() * 0.025 + 0.01;
      this.oscillationOffset = Math.random() * Math.PI * 2;
    }

    update(time) {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse inertia push
      if (mouse.isActive) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= dx * force * 0.03;
          this.y -= dy * force * 0.03;
        }
      }

      // Gravitate toward active post/card
      if (activePostRect) {
        const dx = activePostRect.x - this.x;
        const dy = activePostRect.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 400) {
          this.x += dx * 0.012;
          this.y += dy * 0.012;
        }
      }
    }

    draw(ctx, time) {
      const radius = this.baseRadius + Math.sin(time * this.oscillationSpeed + this.oscillationOffset) * 1;
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.max(1, radius), 0, Math.PI * 2);

      if (this.type === 'ring') {
        ctx.strokeStyle = `${this.color} ${this.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      } else {
        ctx.fillStyle = `${this.color} ${this.alpha})`;
        ctx.shadowColor = 'rgba(251, 113, 133, 0.4)';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
  }

  function initCreativeParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new CreativeParticle());
    }
  }
  initCreativeParticles();

  // Floating background wave ribbing
  let time = 0;
  function animate() {
    time += 1;
    ctx.clearRect(0, 0, width, height);

    // Draw ambient organic flowing spline curve across canvas
    ctx.beginPath();
    const splineOffset = Math.sin(time * 0.008) * 40;
    ctx.moveTo(0, height * 0.4 + splineOffset);
    ctx.bezierCurveTo(
      width * 0.35, height * 0.2 + splineOffset,
      width * 0.65, height * 0.65 - splineOffset,
      width, height * 0.45 + splineOffset
    );
    ctx.strokeStyle = 'rgba(251, 113, 133, 0.06)';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Update and draw particles
    particles.forEach((p) => {
      p.update(time);
      p.draw(ctx, time);
    });

    // Draw interconnecting harmonic links
    const maxDist = 140;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(251, 113, 133, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Dynamic interconnected glowing ribbons to active post
    if (activePostRect) {
      particles.forEach((p) => {
        const dx = activePostRect.x - p.x;
        const dy = activePostRect.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 340) {
          const alpha = (1 - dist / 340) * 0.4;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          // quadratic curve toward post
          const cx = (p.x + activePostRect.x) / 2 + Math.sin(time * 0.05) * 20;
          const cy = (p.y + activePostRect.y) / 2 + Math.cos(time * 0.05) * 20;
          ctx.quadraticCurveTo(cx, cy, activePostRect.x, activePostRect.y);
          ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      });
    }

    // Cursor interactive spline trail
    if (mouse.isActive) {
      particles.forEach((p) => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.35;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(192, 132, 252, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    }

    requestAnimationFrame(animate);
  }

  animate();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachCreatorPostInterconnections);
  } else {
    attachCreatorPostInterconnections();
  }
})();
