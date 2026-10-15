/**
 * DUAL-MODE DYNAMIC CURSOR
 * Software Developer: Cyber Crosshair Reticle & Telemetry Coordinates
 * Content Creator: Fluid Lens Aperture & Chromatic Particle Trail
 */

(function initCustomCursor() {
  // Check if touch device
  if (window.matchMedia('(pointer: coarse)').matches) {
    return;
  }

  // Create cursor elements if not present
  let dot = document.querySelector('.custom-cursor-dot');
  let follower = document.querySelector('.custom-cursor-follower');
  let crosshair = document.querySelector('.custom-cursor-crosshair');

  if (!dot) {
    dot = document.createElement('div');
    dot.className = 'custom-cursor-dot';
    document.body.appendChild(dot);
  }
  if (!follower) {
    follower = document.createElement('div');
    follower.className = 'custom-cursor-follower';
    document.body.appendChild(follower);
  }
  if (!crosshair) {
    crosshair = document.createElement('div');
    crosshair.className = 'custom-cursor-crosshair';
    document.body.appendChild(crosshair);
  }

  let mouseX = -100;
  let mouseY = -100;
  let followerX = -100;
  let followerY = -100;
  let isHovering = false;
  let isMediaHover = false;
  let isArtHover = false;

  const isCreator = () => document.body.classList.contains('creator-theme');

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

    if (isCreator()) {
      crosshair.textContent = `CR·${Math.round(mouseX)}:${Math.round(mouseY)}`;
    } else {
      crosshair.textContent = `[X:${Math.round(mouseX)} Y:${Math.round(mouseY)}]`;
    }
    crosshair.style.transform = `translate(${mouseX + 16}px, ${mouseY + 16}px)`;
  });

  // Smooth lerp follower loop
  function renderCursor() {
    followerX += (mouseX - followerX) * 0.18;
    followerY += (mouseY - followerY) * 0.18;

    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Click pulse animation
  window.addEventListener('mousedown', () => {
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(1.8)`;
    follower.style.transform = `translate(-50%, -50%) scale(0.85)`;
  });

  window.addEventListener('mouseup', () => {
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(1)`;
    follower.style.transform = `translate(-50%, -50%) scale(1)`;
  });

  // Attach hover triggers
  function attachHoverListeners() {
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .persona-btn, .filter-btn, .project-card, .pillar-card, .metric-card, .creator-metric-box, .btn-project-detail');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover-active');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover-active');
      });
    });

    const mediaElements = document.querySelectorAll('.reels-showcase-container, .phone-mockup-frame, .thumb-gallery-card, .photo-item');
    mediaElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-media-active');
        if (crosshair) crosshair.textContent = '▶ PLAY / ZOOM';
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-media-active');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachHoverListeners);
  } else {
    attachHoverListeners();
  }

  // Re-attach if DOM changes dynamically
  window.refreshCursorListeners = attachHoverListeners;
})();
