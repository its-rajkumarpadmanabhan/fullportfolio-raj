/**
 * RAJKUMAR PORTFOLIO — CREATOR STUDIO INTERACTIVE SUITE
 * 
 * 1. Hero Camera Viewfinder (Real-time Focus Reticle, Dual Audio VU Meters, 4K Shutter Snap)
 * 2. Instagram Reels Phone Simulator (4 Vertical Reels, Like Bursts, Comment Drawer, Sound Toggle)
 * 3. Cinematic Color Grading Slider (LOG vs Rec.709 Master, 4 LUT Profiles, Animated RGB Parade)
 * 4. Hardware Speed Console / Stream Deck (6 Tactile Macro Pads, Web Audio Synthesis, Confetti)
 * 5. 2D Sketch Art Layer Mode Switcher (Rough Pencil, Clean Inks, Studio Render)
 */

(function () {
  'use strict';

  // ==========================================
  // 1. WEB AUDIO SYNTHESIZER ENGINE
  // ==========================================
  let studioAudioCtx = null;

  function getAudioCtx() {
    if (!studioAudioCtx) {
      studioAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (studioAudioCtx.state === 'suspended') {
      studioAudioCtx.resume();
    }
    return studioAudioCtx;
  }

  const StudioFX = {
    // Mechanical camera shutter (mirror click + shutter close)
    shutter() {
      try {
        const ctx = getAudioCtx();
        const now = ctx.currentTime;

        // Click 1 (mirror slap)
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(2400, now);
        osc1.frequency.exponentialRampToValueAtTime(120, now + 0.03);
        gain1.gain.setValueAtTime(0.08, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.03);

        // Click 2 (curtain release)
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'square';
        osc2.frequency.setValueAtTime(1400, now + 0.05);
        osc2.frequency.exponentialRampToValueAtTime(60, now + 0.12);
        gain2.gain.setValueAtTime(0.06, now + 0.05);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.05);
        osc2.stop(now + 0.12);
      } catch (e) {}
    },

    // 808 Sub Bass Drop (120Hz -> 36Hz)
    bassDrop() {
      try {
        const ctx = getAudioCtx();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(130, now);
        osc.frequency.exponentialRampToValueAtTime(38, now + 0.85);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.14, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.9);
      } catch (e) {}
    },

    // Beat cut snare transient
    beatCut() {
      try {
        const ctx = getAudioCtx();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(650, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      } catch (e) {}
    },

    // Speed ramp whoosh frequency sweep
    whoosh() {
      try {
        const ctx = getAudioCtx();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(1400, now + 0.15);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.35);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.07, now + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } catch (e) {}
    },

    // Sweet ascending chime for heart likes
    chime() {
      try {
        const ctx = getAudioCtx();
        const now = ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.04);
          gain.gain.setValueAtTime(0.04, now + i * 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.04);
          osc.stop(now + i * 0.04 + 0.25);
        });
      } catch (e) {}
    },

    // Macro Pad key click
    padClick(freq = 440) {
      try {
        const ctx = getAudioCtx();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + 0.06);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
      } catch (e) {}
    }
  };

  // ==========================================
  // 2. HERO CAMERA VIEWFINDER HUD & SHUTTER
  // ==========================================
  function initHeroCamera() {
    const frame = document.getElementById('cameraViewfinder');
    if (!frame) return;

    const reticle = document.getElementById('cameraFocusReticle');
    const flash = document.getElementById('cameraShutterFlash');
    const snapBtn = document.getElementById('btnSnapPhoto');
    const tcElem = document.getElementById('heroCameraTc');

    let snapCount = 0;

    // Smooth focus reticle mouse tracking inside viewfinder
    frame.addEventListener('mousemove', (e) => {
      if (!reticle) return;
      const rect = frame.getBoundingClientRect();
      const x = Math.max(25, Math.min(rect.width - 25, e.clientX - rect.left));
      const y = Math.max(25, Math.min(rect.height - 25, e.clientY - rect.top));
      reticle.style.left = `${x}px`;
      reticle.style.top = `${y}px`;
      reticle.style.opacity = '1';
    });

    frame.addEventListener('mouseleave', () => {
      if (!reticle) return;
      reticle.style.opacity = '0.4';
      reticle.style.left = '50%';
      reticle.style.top = '50%';
    });

    // Shutter Trigger action
    function triggerShutterSnap(e) {
      if (e) e.stopPropagation();
      snapCount++;
      StudioFX.shutter();

      // Trigger white flash
      if (flash) {
        flash.classList.remove('active');
        void flash.offsetWidth; // Reflow
        flash.classList.add('active');
      }

      // Shutter bounce on image
      const img = document.getElementById('cameraSubjectImg');
      if (img) {
        img.style.transform = 'scale(0.97)';
        setTimeout(() => {
          img.style.transform = '';
        }, 180);
      }

      if (window.showToast) {
        window.showToast(`📸 4K RAW Frame #${String(snapCount).padStart(2, '0')} Captured! (Saved to Studio Archive)`, '📷');
      }
    }

    if (snapBtn) {
      snapBtn.addEventListener('click', triggerShutterSnap);
    }
    frame.addEventListener('click', (e) => {
      // If click was not on a link or button
      if (!e.target.closest('a') && !e.target.closest('button')) {
        triggerShutterSnap(e);
      }
    });

    // Animate VU Audio Meters
    const vuL = document.querySelector('.vu-level.l');
    const vuR = document.querySelector('.vu-level.r');
    if (vuL && vuR) {
      function animateVU() {
        const randL = Math.floor(Math.random() * 55) + 35;
        const randR = Math.floor(Math.random() * 55) + 30;
        vuL.style.height = `${randL}%`;
        vuR.style.height = `${randR}%`;
        setTimeout(animateVU, 120);
      }
      animateVU();
    }
  }

  // ==========================================
  // 3. INTERACTIVE REELS SIMULATOR
  // ==========================================
  const reelLibrary = [
    {
      id: 'coding',
      tag: '01 · Coding Course',
      title: 'Complete Coding Blueprint',
      caption: 'The exact 3-second kinetic hook formula that transformed complex code into 3.8M+ views. 🚀',
      tags: '#CodingMastery #VideoEditing #TechStorytelling',
      poster: 'thumbnail/Green%20and%20White%20Modern%20Coding%20Course%20Mobile%20Video.jpg',
      likes: '48.2K',
      likeRaw: 48210,
      comments: '1,420',
      shares: '9.8K',
      audio: 'Rajkumar PR • Original Audio — Tech Lo-Fi Pacing'
    },
    {
      id: 'security',
      tag: '02 · Cyber Security',
      title: 'Threat Hunting Live Demo',
      caption: 'Breaking down zero-egress LLM security in 30 seconds with punchy kinetic captions and sound design. 🛡️',
      tags: '#CyberSecurity #SOC #DeveloperCraft',
      poster: 'thumbnail/Red%20Tech%20Modern%20Cyber%20Security%20Mobile%20Video.jpg',
      likes: '36.4K',
      likeRaw: 36450,
      comments: '890',
      shares: '7.1K',
      audio: 'Cyber Pulse • High-Voltage Synth Wave'
    },
    {
      id: 'growth',
      tag: '03 · Creator Growth',
      title: 'Monetizing Dev Skills',
      caption: 'From junior coder to 90,000+ tech audience: how to structure educational videos that convert. 📈',
      tags: '#CreatorEconomy #SoftwareEngineering #ViralHooks',
      poster: 'thumbnail/Orange%20and%20White%20Modern%20Make%20Money%20From%20Home%20Instagram%20Reel%20Cover.png',
      likes: '52.8K',
      likeRaw: 52830,
      comments: '1,840',
      shares: '14.2K',
      audio: 'Studio Vibe • Organic Reach Beats'
    },
    {
      id: 'cinema',
      tag: '04 · Retro Cinema',
      title: 'Vintage Motion Graphics',
      caption: 'Handcrafted halftone textures, film grain overlays, and beat-locked cutaways cut in DaVinci. 🎬',
      tags: '#DaVinciResolve #FilmColoring #CapCutPro',
      poster: 'thumbnail/Red%20Retro%20Illustration%20Cinema%20Ticket%20Promo%20Tiktok%20Video.jpg',
      likes: '29.1K',
      likeRaw: 29140,
      comments: '640',
      shares: '5.4K',
      audio: 'Vintage Vinyl • Cinematic 24fps Beat'
    }
  ];

  let currentReelIndex = 0;
  let reelLiked = false;

  function initReelsPlayerSimulator() {
    const reelImg = document.getElementById('reelActiveImg');
    if (!reelImg) return;

    const likeBtn = document.getElementById('reelLikeBtn');
    const likeCountSpan = document.getElementById('reelLikeCount');
    const commentBtn = document.getElementById('reelCommentBtn');
    const shareBtn = document.getElementById('reelShareBtn');
    const soundToggle = document.getElementById('reelSoundToggle');
    const captionText = document.getElementById('reelCaptionText');
    const audioTicker = document.getElementById('reelAudioTicker');
    const videoSurface = document.getElementById('reelVideoSurface');
    const bigHeart = document.getElementById('reelBigHeart');
    const particlesContainer = document.getElementById('reelFloatingHearts');

    // Switch Reel Function
    window.switchReel = function (index, buttonEl) {
      if (index < 0 || index >= reelLibrary.length) return;
      currentReelIndex = index;
      reelLiked = false;

      const reel = reelLibrary[index];

      // Update switcher button active state
      document.querySelectorAll('.reel-switch-pill').forEach((b) => b.classList.remove('active'));
      if (buttonEl) buttonEl.classList.add('active');

      // Subtle fade out then in
      reelImg.style.opacity = '0.3';
      reelImg.style.transform = 'scale(0.96)';

      setTimeout(() => {
        reelImg.src = reel.poster;
        reelImg.alt = reel.title;
        reelImg.style.opacity = '1';
        reelImg.style.transform = 'scale(1)';

        if (likeCountSpan) likeCountSpan.textContent = reel.likes;
        if (likeBtn) likeBtn.classList.remove('liked');
        if (captionText) {
          captionText.innerHTML = `<strong>${reel.title}</strong> — ${reel.caption} <span style="color:var(--creator-primary); display:block; margin-top:0.25rem;">${reel.tags}</span>`;
        }
        if (audioTicker) audioTicker.textContent = reel.audio;

        StudioFX.whoosh();
      }, 150);
    };

    // Heart Like Trigger
    function triggerLike(popBig = false) {
      reelLiked = !reelLiked;
      const reel = reelLibrary[currentReelIndex];
      const count = reelLiked ? reel.likeRaw + 1 : reel.likeRaw;

      if (likeBtn) likeBtn.classList.toggle('liked', reelLiked);
      if (likeCountSpan) {
        likeCountSpan.textContent = reelLiked ? `${(count / 1000).toFixed(1)}K` : reel.likes;
      }

      if (reelLiked) {
        StudioFX.chime();
        spawnFloatingHearts();
        if (popBig && bigHeart) {
          bigHeart.classList.remove('pop');
          void bigHeart.offsetWidth;
          bigHeart.classList.add('pop');
        }
      }
    }

    if (likeBtn) {
      likeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        triggerLike(false);
      });
    }

    // Double tap on video screen to like
    let lastTap = 0;
    if (videoSurface) {
      videoSurface.addEventListener('click', (e) => {
        const now = Date.now();
        if (now - lastTap < 300) {
          triggerLike(true);
        }
        lastTap = now;
      });
    }

    // Floating heart particle animation
    function spawnFloatingHearts() {
      if (!particlesContainer) return;
      for (let i = 0; i < 7; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart-particle';
        heart.innerHTML = '❤️';
        const startX = 220 + (Math.random() * 40 - 20);
        const randX = (Math.random() - 0.5) * 80;
        heart.style.left = `${startX}px`;
        heart.style.setProperty('--dx', `${randX}px`);
        heart.style.animationDelay = `${i * 0.08}s`;
        particlesContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 1600);
      }
    }

    // Comment Popover / Drawer
    const sampleComments = [
      '🔥 "That 0:03 hook was insane! Stopped my scroll immediately."',
      '🤯 "What software did you use for the 3D typography? Super clean cut!"',
      '⚡ "The kinetic subtitles and sound design are top tier!"',
      '👏 "Best tech video format on Instagram right now."'
    ];
    let commentIndex = 0;

    if (commentBtn) {
      commentBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        StudioFX.padClick(620);
        const msg = sampleComments[commentIndex % sampleComments.length];
        commentIndex++;
        if (window.showToast) {
          window.showToast(`💬 Audience: ${msg}`, '💬');
        }
      });
    }

    // Share Button
    if (shareBtn) {
      shareBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText('https://www.instagram.com/i.rajkumar__/').then(() => {
          if (window.showToast) {
            window.showToast('📋 Copied Instagram Link! Share with your team.', '🚀');
          }
        });
      });
    }

    // Sound toggle
    let isMuted = true;
    if (soundToggle) {
      soundToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        isMuted = !isMuted;
        soundToggle.innerHTML = isMuted ? '🔇' : '🔊';
        if (!isMuted) {
          StudioFX.beatCut();
          if (window.showToast) window.showToast('Audio preview unmuted · Tech Lo-Fi active', '🎵');
        }
      });
    }
  }

  // ==========================================
  // 4. COLOR GRADING BEFORE / AFTER SLIDER
  // ==========================================
  function initColorGradingSlider() {
    const container = document.getElementById('gradingSlider');
    if (!container) return;

    const rawLayer = document.getElementById('gradingLayerRaw');
    const handle = document.getElementById('gradingHandle');

    let isDragging = false;

    function setSliderPosition(x) {
      const rect = container.getBoundingClientRect();
      let pos = (x - rect.left) / rect.width;
      pos = Math.max(0.05, Math.min(0.95, pos));
      const pct = (pos * 100).toFixed(2);

      if (rawLayer) {
        // Reveal raw layer on the left side
        rawLayer.style.clipPath = `polygon(0 0, ${pct}% 0, ${pct}% 100%, 0 100%)`;
      }
      if (handle) {
        handle.style.left = `${pct}%`;
      }
    }

    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch events for mobile
    container.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches[0]) setSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches[0]) setSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Initial 50% split
    setSliderPosition(container.getBoundingClientRect().left + container.offsetWidth * 0.5);

    // Apply LUT Profile Presets
    const gradedLayer = document.getElementById('gradingLayerGraded');
    window.applyLutPreset = function (lutName, btn) {
      document.querySelectorAll('.btn-lut-preset').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');

      if (!gradedLayer) return;
      const img = gradedLayer.querySelector('img');
      if (!img) return;

      StudioFX.whoosh();

      switch (lutName) {
        case 'kodak':
          img.style.filter = 'contrast(1.22) saturate(1.28) sepia(0.18) hue-rotate(-8deg)';
          break;
        case 'teal-orange':
          img.style.filter = 'contrast(1.35) saturate(1.4) hue-rotate(15deg) brightness(1.05)';
          break;
        case 'cyberpunk':
          img.style.filter = 'contrast(1.4) saturate(1.65) hue-rotate(240deg) brightness(1.1)';
          break;
        case 'commercial':
          img.style.filter = 'contrast(1.15) saturate(1.18) brightness(1.08)';
          break;
        default:
          img.style.filter = 'none';
      }

      if (window.showToast) {
        window.showToast(`🎨 3D LUT Applied: ${lutName.toUpperCase()} Profile Active`, '🎨');
      }
    };
  }

  // ==========================================
  // 5. HARDWARE SPEED CONSOLE & MACRO DECK
  // ==========================================
  function initCreatorMacroDeck() {
    const deck = document.querySelector('.creator-macro-deck');
    const readout = document.getElementById('deckReadout');
    if (!deck) return;

    const pads = deck.querySelectorAll('.macro-pad');
    pads.forEach((pad) => {
      pad.addEventListener('click', () => {
        const macro = pad.getAttribute('data-macro');

        // Tactile press state
        pad.classList.add('active');
        setTimeout(() => pad.classList.remove('active'), 250);

        handleMacroAction(macro);
      });
    });

    function setReadout(text) {
      if (!readout) return;
      readout.textContent = `// ${text}`;
      readout.style.color = 'var(--creator-primary)';
      setTimeout(() => {
        readout.style.color = '';
      }, 1800);
    }

    function handleMacroAction(macro) {
      switch (macro) {
        case 'cut':
          StudioFX.beatCut();
          setReadout('EXECUTE: BEAT CUT ▹ JUMP TO HOOK (00:03.12)');
          document.body.classList.add('screen-cut-pulse');
          setTimeout(() => document.body.classList.remove('screen-cut-pulse'), 350);
          if (window.showToast) window.showToast('✂️ Beat Cut applied! 3-second hook sync.', '✂️');
          break;

        case 'lut':
          StudioFX.whoosh();
          setReadout('EXECUTE: 3D LUT ▹ TEAL & ORANGE COMPLEMENTARY');
          const heroImg = document.getElementById('cameraSubjectImg');
          if (heroImg) {
            heroImg.style.filter = heroImg.style.filter ? '' : 'contrast(1.2) saturate(1.3) sepia(0.15)';
          }
          if (window.showToast) window.showToast('🎨 Studio 3D LUT toggled across preview displays.', '🎨');
          break;

        case 'speed':
          StudioFX.whoosh();
          setReadout('EXECUTE: SPEED RAMP ▹ 200% VELOCITY BURST');
          document.body.classList.add('speed-ramp-motion');
          setTimeout(() => document.body.classList.remove('speed-ramp-motion'), 1200);
          if (window.showToast) window.showToast('⚡ Speed ramp 200% burst engaged!', '⚡');
          break;

        case 'captions':
          StudioFX.padClick(880);
          setReadout('EXECUTE: KINETIC CAPTION ▹ STOP THE SCROLL');
          spawnKineticCaption();
          break;

        case 'bass':
          StudioFX.bassDrop();
          setReadout('EXECUTE: 808 SUB BASS DROP ▹ -12dB MASTER');
          document.body.classList.add('sub-bass-shake');
          setTimeout(() => document.body.classList.remove('sub-bass-shake'), 600);
          if (window.showToast) window.showToast('🔊 808 Sub-Bass Drop Synthesized!', '🔊');
          break;

        case 'confetti':
          StudioFX.chime();
          setReadout('EXECUTE: 90K TRIBE CELEBRATION ▹ 3.8M VIEWS');
          spawnCreatorConfetti();
          if (window.showToast) window.showToast('🚀 90,000+ Community Celebration!', '🎉');
          break;
      }
    }

    function spawnKineticCaption() {
      const bubble = document.createElement('div');
      bubble.className = 'kinetic-caption-bubble';
      bubble.innerHTML = '🔥 "STOP THE SCROLL · HOOK \'EM IN 3 SECONDS!"';
      document.body.appendChild(bubble);
      setTimeout(() => bubble.remove(), 2600);
    }

    function spawnCreatorConfetti() {
      const emojis = ['🔥', '✨', '🎬', '🚀', '⭐', '❤️', '🎨'];
      for (let i = 0; i < 24; i++) {
        const conf = document.createElement('div');
        conf.className = 'creator-confetti-particle';
        conf.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        conf.style.left = `${Math.random() * 90 + 5}vw`;
        conf.style.top = `${window.scrollY + Math.random() * 300 + 100}px`;
        conf.style.fontSize = `${Math.random() * 20 + 18}px`;
        conf.style.animationDuration = `${Math.random() * 1.5 + 1.2}s`;
        document.body.appendChild(conf);
        setTimeout(() => conf.remove(), 2500);
      }
    }
  }

  // ==========================================
  // 6. ART LAYER MODE SWITCHER
  // ==========================================
  window.setArtLayerMode = function (mode, btn) {
    document.querySelectorAll('.art-layer-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const showcaseImg = document.querySelector('.art-showcase-card .art-image-wrap img');
    if (!showcaseImg) return;

    StudioFX.padClick(520);

    switch (mode) {
      case 'pencil':
        showcaseImg.style.filter = 'grayscale(1) contrast(1.7) brightness(1.15)';
        if (window.showToast) window.showToast('✏️ Layer: Graphite Pencil Concept Roughs', '✏️');
        break;
      case 'ink':
        showcaseImg.style.filter = 'grayscale(1) contrast(2.4) brightness(0.95)';
        if (window.showToast) window.showToast('🖋️ Layer: Clean Indian Ink & Contour Hatching', '🖋️');
        break;
      case 'render':
      default:
        showcaseImg.style.filter = 'none';
        if (window.showToast) window.showToast('🎨 Layer: Studio Watercolor & Digital Color Wash', '🎨');
        break;
    }
  };

  // ==========================================
  // DOMContentLoaded INITIALIZATION
  // ==========================================
  document.addEventListener('DOMContentLoaded', () => {
    initHeroCamera();
    initReelsPlayerSimulator();
    initColorGradingSlider();
    initCreatorMacroDeck();
  });
})();
