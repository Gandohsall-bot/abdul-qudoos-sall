/**
 * ABDUL QUDOOS SALL — PROFESSIONAL CIVIL ENGINEER PORTFOLIO
 * Vanilla JavaScript (ES6+) — Core Interactive Features
 * 
 * Features:
 * 1. Sticky Header & Scroll Elevation
 * 2. Mobile Navigation Drawer & Accessibility
 * 3. Active Link State Automation
 * 4. Project Category Filtering System
 * 5. Animated Number Counters for Statistics
 * 6. Scroll Reveal Observer for Elements
 * 7. Case Study Modal Viewer
 * 8. Contact Form Live Validation & Accessible Submission Alerts
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     0. Ambient Animated Engineering Background Canvas (Lightweight & Smooth)
     ========================================================================== */
  const initEngineeringBackground = () => {
    const canvas = document.getElementById('engineering-bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId = null;
    let isTabActive = true;
    let pointerX = -9999;
    let pointerY = -9999;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // High DPI Canvas resizing
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resize, { passive: true });
    resize();

    // Track mouse coordinates for gentle proximity attraction
    window.addEventListener('mousemove', (e) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      pointerX = -9999;
      pointerY = -9999;
    }, { passive: true });

    // Subtle technical grid nodes representing structural engineering nodes
    const nodeCount = Math.min(34, Math.max(18, Math.floor((width * height) / 42000)));
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        originX: 0,
        originY: 0,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.5 + 1.2,
        alpha: Math.random() * 0.22 + 0.16,
        pulseOffset: Math.random() * Math.PI * 2
      });
      nodes[i].originX = nodes[i].x;
      nodes[i].originY = nodes[i].y;
    }

    let lastTime = performance.now();

    const draw = (currentTime) => {
      if (!isTabActive) return;

      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      // Connective structural engineering truss lines
      const maxDistance = 150;

      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];

        if (!prefersReducedMotion) {
          nodeA.x += nodeA.vx * (dt * 60);
          nodeA.y += nodeA.vy * (dt * 60);

          // Subtle pointer proximity interaction
          const pDx = pointerX - nodeA.x;
          const pDy = pointerY - nodeA.y;
          const pDist = Math.sqrt(pDx * pDx + pDy * pDy);
          if (pDist < 160 && pDist > 0) {
            const force = (1 - pDist / 160) * 0.45;
            nodeA.x += (pDx / pDist) * force;
            nodeA.y += (pDy / pDist) * force;
          }

          if (nodeA.x < 0) { nodeA.x = 0; nodeA.vx *= -1; }
          else if (nodeA.x > width) { nodeA.x = width; nodeA.vx *= -1; }
          if (nodeA.y < 0) { nodeA.y = 0; nodeA.vy *= -1; }
          else if (nodeA.y > height) { nodeA.y = height; nodeA.vy *= -1; }
        }

        // Draw connective structural engineering lines
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `rgba(47, 93, 126, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Draw node
        const pulse = prefersReducedMotion ? 1 : Math.sin(currentTime * 0.0016 + nodeA.pulseOffset) * 0.14 + 0.86;
        ctx.beginPath();
        ctx.arc(nodeA.x, nodeA.y, nodeA.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(11, 31, 51, ${nodeA.alpha * pulse})`;
        ctx.fill();

        // Technical coordinate crosshair ticks on select nodes
        if (i % 4 === 0) {
          ctx.beginPath();
          ctx.arc(nodeA.x, nodeA.y, nodeA.radius + 3.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(201, 151, 43, ${nodeA.alpha * 0.65})`;
          ctx.lineWidth = 0.65;
          ctx.stroke();
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    draw(performance.now());

    // Tab visibility handling
    document.addEventListener('visibilitychange', () => {
      isTabActive = !document.hidden;
      if (isTabActive && !prefersReducedMotion) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(draw);
      } else if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    });
  };

  initEngineeringBackground();

  /* ==========================================================================
     0b. Interactive 3D Tilt & Cursor Spotlight System (IDFlow-Inspired Interaction)
     ========================================================================== */
  const initInteractiveCards = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const interactiveCards = document.querySelectorAll('.service-card, .pillar-chip, .principle-card, .project-card');
    if (interactiveCards.length === 0) return;

    interactiveCards.forEach(card => {
      let isHovered = false;
      let rafId = null;
      let targetTiltX = 0;
      let targetTiltY = 0;
      let currentTiltX = 0;
      let currentTiltY = 0;

      const updateCardTransform = () => {
        if (!isHovered) {
          currentTiltX += (0 - currentTiltX) * 0.12;
          currentTiltY += (0 - currentTiltY) * 0.12;

          if (Math.abs(currentTiltX) < 0.04 && Math.abs(currentTiltY) < 0.04) {
            card.style.setProperty('--tilt-x', '0deg');
            card.style.setProperty('--tilt-y', '0deg');
            card.style.setProperty('--mouse-active', '0');
            cancelAnimationFrame(rafId);
            rafId = null;
            return;
          }
        } else {
          currentTiltX += (targetTiltX - currentTiltX) * 0.16;
          currentTiltY += (targetTiltY - currentTiltY) * 0.16;
        }

        card.style.setProperty('--tilt-x', `${currentTiltX.toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${currentTiltY.toFixed(2)}deg`);

        rafId = requestAnimationFrame(updateCardTransform);
      };

      card.addEventListener('mouseenter', () => {
        isHovered = true;
        card.style.setProperty('--mouse-active', '1');
        if (!rafId) rafId = requestAnimationFrame(updateCardTransform);
      });

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set spotlight coordinates for dynamic glow
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Compute 3D tilt angles (max ~6.5 degrees)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const maxTilt = 6.5;

        targetTiltY = ((x - centerX) / centerX) * maxTilt;
        targetTiltX = -((y - centerY) / centerY) * maxTilt;

        if (!rafId) rafId = requestAnimationFrame(updateCardTransform);
      });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        targetTiltX = 0;
        targetTiltY = 0;
        if (!rafId) rafId = requestAnimationFrame(updateCardTransform);
      });
    });
  };

  initInteractiveCards();

  /* ==========================================================================
     0c. AQS Branded Page Transition Controller (Fluid ~1.2s Sequence)
     ========================================================================== */
  const initAQSTransition = () => {
    let transitionOverlay = document.getElementById('aqs-page-transition');

    // If not already in DOM, create dynamically so any page is protected
    if (!transitionOverlay) {
      transitionOverlay = document.createElement('div');
      transitionOverlay.id = 'aqs-page-transition';
      transitionOverlay.className = 'aqs-page-transition';
      transitionOverlay.setAttribute('aria-hidden', 'true');
      transitionOverlay.innerHTML = `
        <div class="aqs-transition-curtain"></div>
        <div class="aqs-transition-grid"></div>
        <div class="aqs-transition-content">
          <div class="aqs-transition-glow"></div>
          <div class="aqs-transition-emblem">
            <div class="aqs-logo-badge-wrap">
              <img src="images/favicon.png" alt="AQS Logo — Abdul Qudoos Sall" class="aqs-transition-logo-img" width="112" height="112">
            </div>
            <div class="aqs-transition-line"></div>
            <span class="aqs-logo-tagline">Civil Engineering</span>
          </div>
        </div>
      `;
      document.body.prepend(transitionOverlay);
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Smooth reveal on page entry
    const revealIncomingPage = () => {
      if (!transitionOverlay) return;
      if (transitionOverlay.classList.contains('is-active')) {
        const revealDelay = prefersReducedMotion ? 40 : 340;
        setTimeout(() => {
          transitionOverlay.classList.add('is-exiting');
          setTimeout(() => {
            transitionOverlay.classList.remove('is-active', 'is-exiting');
          }, prefersReducedMotion ? 80 : 450);
        }, revealDelay);
      }
    };

    // Trigger on initial page display
    revealIncomingPage();

    // Critical: Handle bfcache / browser back and forward navigation
    window.addEventListener('pageshow', (event) => {
      isNavigating = false;
      if (transitionOverlay) {
        transitionOverlay.classList.remove('is-active', 'is-exiting');
      }
    });

    // Intercept internal page navigation links
    let isNavigating = false;

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Ignore anchor jumps on same page, mailto, tel, javascript, new tab, download
      if (
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        link.getAttribute('target') === '_blank' ||
        link.hasAttribute('download') ||
        e.ctrlKey || e.metaKey || e.shiftKey || e.altKey
      ) {
        return;
      }

      // Resolve URL
      const currentUrl = new URL(window.location.href);
      let targetUrl;
      try {
        targetUrl = new URL(href, currentUrl);
      } catch (err) {
        return;
      }

      // Check same origin
      if (targetUrl.origin === currentUrl.origin) {
        // If clicking anchor on current page, allow default scroll
        if (targetUrl.pathname === currentUrl.pathname && targetUrl.hash) {
          return;
        }

        // If clicking exact current page URL
        if (targetUrl.href === currentUrl.href) {
          return;
        }

        // Internal page navigation intercepted
        e.preventDefault();
        if (isNavigating) return;
        isNavigating = true;

        if (prefersReducedMotion) {
          window.location.href = targetUrl.href;
          return;
        }

        // Trigger branded transition overlay
        transitionOverlay.classList.remove('is-exiting');
        transitionOverlay.classList.add('is-active');

        // Sequence timing: ~520ms for emblem registration, then navigate
        setTimeout(() => {
          window.location.href = targetUrl.href;
        }, 520);

        // Safety fallback timeout
        setTimeout(() => {
          isNavigating = false;
          if (transitionOverlay) transitionOverlay.classList.remove('is-active', 'is-exiting');
        }, 2500);
      }
    });
  };

  initAQSTransition();

  /* ==========================================================================
     1. Sticky Header & Elevation
     ========================================================================== */
  const siteHeader = document.querySelector('.site-header');

  const handleHeaderScroll = () => {
    if (!siteHeader) return;
    if (window.scrollY > 20) {
      siteHeader.classList.add('nav-scrolled');
    } else {
      siteHeader.classList.remove('nav-scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* ==========================================================================
     2. Mobile Navigation Drawer & Hamburger Toggle
     ========================================================================== */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (mobileToggle && mainNav) {
    const toggleMenu = (forceClose = false) => {
      const isOpen = forceClose ? false : !mainNav.classList.contains('is-open');
      
      if (isOpen) {
        mainNav.classList.add('is-open');
        mobileToggle.setAttribute('aria-expanded', 'true');
        mobileToggle.setAttribute('aria-label', 'Close navigation menu');
        // Render Close (X) SVG
        mobileToggle.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        `;
        document.body.style.overflow = 'hidden';
      } else {
        mainNav.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-label', 'Open navigation menu');
        // Render Hamburger SVG
        mobileToggle.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        `;
        document.body.style.overflow = '';
      }
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close when clicking on any nav link
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          toggleMenu(true);
        }
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (mainNav.classList.contains('is-open') && !mainNav.contains(e.target) && !mobileToggle.contains(e.target)) {
        toggleMenu(true);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        toggleMenu(true);
        mobileToggle.focus();
      }
    });
  }

  /* ==========================================================================
     3. Active Navigation Link Highlighting
     ========================================================================== */
  const highlightActiveLink = () => {
    let currentPath = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPath === '') currentPath = 'index.html';

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        const linkPath = href.split('/').pop();
        if (linkPath === currentPath) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        } else {
          link.classList.remove('active');
          link.removeAttribute('aria-current');
        }
      }
    });
  };

  highlightActiveLink();

  /* ==========================================================================
     4. Project Category Filtering System
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  if (filterButtons.length > 0 && projectItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter') || 'all';

        // Update active filter button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter projects
        projectItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.classList.remove('is-hidden');
            item.style.opacity = '0';
            item.style.transform = 'translateY(12px)';
            setTimeout(() => {
              item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 30);
          } else {
            item.classList.add('is-hidden');
          }
        });
      });
    });
  }

  /* ==========================================================================
     5. Animated Number Counters for Statistics
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-number');

  if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
    const animateCounter = (el) => {
      const targetStr = el.getAttribute('data-target');
      if (!targetStr) return;

      const target = parseInt(targetStr, 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      const padZero = el.hasAttribute('data-pad-zero');

      let current = 0;
      const duration = 1400; // ms
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out quadratic
        const easeProgress = 1 - (1 - progress) * (1 - progress);
        current = Math.floor(easeProgress * target);

        let formatted = current.toString();
        if (padZero && current < 10) {
          formatted = '0' + formatted;
        }

        el.innerHTML = `${prefix}${formatted}<span class="stat-accent">${suffix}</span>`;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          let finalFormatted = target.toString();
          if (padZero && target < 10) {
            finalFormatted = '0' + finalFormatted;
          }
          el.innerHTML = `${prefix}${finalFormatted}<span class="stat-accent">${suffix}</span>`;
        }
      };

      requestAnimationFrame(updateCounter);
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    statNumbers.forEach(stat => {
      statsObserver.observe(stat);
    });
  }

  /* ==========================================================================
     6. Scroll Reveal Observer for Elements
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-fade');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  /* ==========================================================================
     6b. Three Services & Principles Showcase Staggered Entrance Observer
     ========================================================================== */
  const animatedCards = document.querySelectorAll('.service-card, .principle-card');

  if (animatedCards.length > 0 && 'IntersectionObserver' in window) {
    const cardsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.15
    });

    animatedCards.forEach(card => cardsObserver.observe(card));
  } else {
    animatedCards.forEach(card => card.classList.add('is-visible'));
  }

  /* ==========================================================================
     7. Case Study Modal Viewer
     ========================================================================== */
  const caseStudyData = {
    'riverside-commercial': {
      title: 'Riverside Commercial Complex',
      category: 'Structural Engineering',
      year: '2025',
      location: 'Freetown, Sierra Leone',
      image: 'images/projects/project-commercial.jpg',
      tools: ['AutoCAD', 'ETABS', 'SAP2000', 'Revit'],
      overview: 'A multi-storey commercial development requiring comprehensive structural analysis, frame modeling, and design coordination. The engineering scope included reinforced concrete framed systems, multi-bay lateral stability analysis, and deep foundation detailing.',
      role: 'Structural Design Support — assisted senior engineers with computational structural modeling, dead and live load assessments, shear wall placement, and construction drawing production.',
      challenge: 'The coastal urban site featured variable soil bearing capacity and adjacent existing structures, mandating strict settlement tolerances and optimized column sizing for commercial tenant flexibility.',
      approach: 'Conducted rigorous load combinations under BS 8110 / Eurocode 2 standards, created full 3D finite element structural frames in ETABS, coordinated geotechnical borehole data with mat and isolated footing designs, and issued clash-checked CAD drawings.',
      solution: 'Engineered a ductile reinforced concrete moment frame combined with strategically positioned elevator shear cores to mitigate lateral wind shears, reducing structural concrete volume while maintaining safety margins.',
      outcome: 'Successfully produced permit-ready structural documentation and reinforcement bar bending schedules, facilitating timely regulatory approval and efficient construction layout.'
    },
    'urban-road': {
      title: 'Urban Road Rehabilitation',
      category: 'Transportation Engineering',
      year: '2024',
      location: 'Freetown, Sierra Leone',
      image: 'images/projects/project-transportation.jpg',
      tools: ['AutoCAD', 'Civil 3D', 'SketchUp'],
      overview: 'An urban road renewal initiative addressing heavy pavement degradation, poor roadside drainage, and severe erosion along a major urban commuter corridor during tropical rainy seasons.',
      role: 'Engineering Assistant — assisted with field topography surveys, cross-sectional roadway alignments, stormwater runoff calculations, and quantity take-offs.',
      challenge: 'High tropical rainfall intensity caused recurring roadway flooding and base failure, while heavy traffic volumes required a phased construction strategy to prevent complete corridor shutdown.',
      approach: 'Mapped catchment hydrology, evaluated existing culvert capacities, designed trapezoidal stone-pitched stormwater side drains, and prepared horizontal and vertical roadway geometric alignments in Civil 3D.',
      solution: 'Specified an upgraded crushed stone base course with asphaltic concrete surfacing, supplemented by precast concrete culvert crossings and energy-dissipating outfall structures.',
      outcome: 'Delivered an executable rehabilitation drawing set with clear construction staging notes, significantly reducing projected localized flood risks and enhancing vehicular transit safety.'
    },
    'modern-residential': {
      title: 'Modern Residential Development',
      category: 'Structural Design',
      year: '2024',
      location: 'Sierra Leone',
      image: 'images/projects/project-residential.jpg',
      tools: ['AutoCAD', 'STAAD.Pro', 'Revit', 'SketchUp'],
      overview: 'Structural design and technical detailing for an upscale multi-unit residential housing community, emphasizing architectural elegance, open-span living spaces, and natural ventilation integration.',
      role: 'Structural Documentation — modeled framing systems, analyzed two-way slab deflection criteria, detailed reinforced concrete staircases, and prepared comprehensive structural layouts.',
      challenge: 'Achieving expansive column-free living areas while maintaining cost-effective concrete member dimensions and complying with local seismic and wind exposure guidelines.',
      approach: 'Employed high-performance continuous beam designs and two-way reinforced concrete slab systems, ensuring that structural depths aligned flush with interior architectural ceiling drops.',
      solution: 'Developed standardized reinforcement schedules and modular beam-column connection details that simplified rebar fabrication on-site and accelerated formwork cycling.',
      outcome: 'Full structural submission drawings approved with zero contractor RFIs regarding rebar congestion, enabling smooth on-schedule structural framing.'
    },
    'stormwater-drainage': {
      title: 'Municipal Stormwater & Drainage Upgrade',
      category: 'Water & Environmental Engineering',
      year: '2024',
      location: 'Freetown, Sierra Leone',
      image: 'images/projects/project-drainage.jpg',
      tools: ['Civil 3D', 'AutoCAD', 'EPA SWMM', 'Hydraulic Modeling'],
      overview: 'Comprehensive stormwater management project designed to eliminate flash-flood hazards in a dense municipal sector, including retention basins, channel grading, and culvert resizing.',
      role: 'Technical Contributor — performed watershed runoff estimations using the Rational Method, prepared longitudinal drain profiles, and drafted culvert structural reinforcements.',
      challenge: 'High sediment transport during peak monsoon storms threatened to silt up drainage channels, demanding self-cleansing hydraulic gradients within a confined public right-of-way.',
      approach: 'Calculated 10-year and 25-year flood return hydrographs, graded channel bed slopes for optimum velocity, and designed silt-trap sediment catchpits at critical confluence points.',
      solution: 'Engineered reinforced concrete U-box culverts with removable maintenance covers and rip-rap protected outfall dissipators.',
      outcome: 'Provided municipal authorities with a comprehensive drainage master plan that effectively mitigates downstream community flooding.'
    },
    'geotechnical-slope': {
      title: 'Hillside Foundation & Slope Stabilization',
      category: 'Geotechnical Engineering',
      year: '2023',
      location: 'Western Area, Sierra Leone',
      image: 'images/projects/project-geotechnical.jpg',
      tools: ['GEO5', 'AutoCAD', 'Soil Mechanics Analysis', 'MS Excel'],
      overview: 'Geotechnical site investigation and slope stabilization design for hillside infrastructure constructed on weathered granitic terrain prone to slope creep and rainfall saturation.',
      role: 'Site Support & Analysis — collected soil sample data, plotted borehole logs, evaluated soil shear parameters (c and phi), and prepared slope reinforcement cross-sections.',
      challenge: 'Steep natural grades and deep tropical weathering profiles presented severe slip-circle failure risks under heavy monsoon soil saturation.',
      approach: 'Calculated factor-of-safety margins under dry and fully saturated conditions, evaluated gravity vs. stepped reinforced concrete retaining wall configurations, and specified subsurface weep drainage.',
      solution: 'Designed a tiered reinforced concrete retaining wall system anchored with sub-horizontal perforated PVC drain pipes to relieve hydrostatic pressure behind the wall face.',
      outcome: 'Eliminated landslide vulnerability, protecting adjacent building foundations and establishing a stable platform for subsequent civil development.'
    },
    'cad-drafting-bim': {
      title: 'High-Precision Structural CAD Drafting & Detailing',
      category: 'Engineering Design & CAD',
      year: '2023',
      location: 'Freetown, Sierra Leone',
      image: 'images/projects/project-drafting.jpg',
      tools: ['AutoCAD', 'Revit', 'BIM 360', 'Standard CAD Layers'],
      overview: 'Multi-disciplinary technical drafting and BIM modeling package for complex civil structures, establishing standardized layer hierarchies, drawing templates, and bar bending schedules.',
      role: 'Lead CAD Drafter / Modeler — authored 2D production drawings, 3D structural wireframes, rebar callouts, and coordinated MEP penetrations through concrete structural elements.',
      challenge: 'Multiple design revisions from architectural and mechanical disciplines required strict version control and zero tolerance for structural drawing discrepancies.',
      approach: 'Implemented standard ISO/BS CAD layering protocols, automated dynamic rebar blocks, and developed cross-sectional details with explicit dimensioning.',
      solution: 'Delivered an integrated set of general arrangement (GA) drawings, foundation layouts, rebar schedules, and structural framing plans with standardized title blocks.',
      outcome: 'Achieved complete clarity for on-site construction trades, drastically cutting fabrication errors and verifying 100% drawing compliance.'
    }
  };

  const modalBackdrop = document.querySelector('#case-study-modal');
  const modalContainer = modalBackdrop ? modalBackdrop.querySelector('.modal-container') : null;
  const modalBody = modalBackdrop ? modalBackdrop.querySelector('.modal-body') : null;
  const modalCloseBtn = modalBackdrop ? modalBackdrop.querySelector('.modal-close-btn') : null;

  const openCaseStudy = (projectId) => {
    const data = caseStudyData[projectId];
    if (!data || !modalBody || !modalBackdrop) return;

    modalBody.innerHTML = `
      <div class="case-study-header-modal">
        <span class="label-technical gold-text">${data.category}</span>
        <h2 style="font-size: clamp(1.6rem, 3vw, 2.2rem); margin: 0.5rem 0 1.25rem 0;">${data.title}</h2>
        <div class="case-study-meta-bar" style="margin-top: 0; margin-bottom: 2rem;">
          <div class="meta-bar-item">
            <span class="meta-bar-label">Discipline</span>
            <span class="meta-bar-val">${data.category}</span>
          </div>
          <div class="meta-bar-item">
            <span class="meta-bar-label">Year</span>
            <span class="meta-bar-val">${data.year}</span>
          </div>
          <div class="meta-bar-item">
            <span class="meta-bar-label">Location</span>
            <span class="meta-bar-val">${data.location}</span>
          </div>
          <div class="meta-bar-item">
            <span class="meta-bar-label">Status</span>
            <span class="meta-bar-val" style="color: var(--color-success); font-weight: 700;">Completed & Verified</span>
          </div>
        </div>
      </div>

      <div class="case-study-main-image" style="margin: 1.5rem 0 2rem 0; max-height: 380px;">
        <img src="${data.image}" alt="${data.title}" style="height: 360px; object-fit: cover; width: 100%; border-radius: var(--radius-md);">
      </div>

      <div class="case-study-content-grid">
        <div class="case-study-main-text">
          <div class="case-study-section-block">
            <h3>Project Overview</h3>
            <p>${data.overview}</p>
          </div>

          <div class="case-study-section-block">
            <h3>Engineering Role & Scope</h3>
            <p>${data.role}</p>
          </div>

          <div class="case-study-section-block">
            <h3>Key Technical Challenge</h3>
            <p>${data.challenge}</p>
          </div>

          <div class="case-study-section-block">
            <h3>Engineering Approach & Methodology</h3>
            <p>${data.approach}</p>
          </div>

          <div class="case-study-section-block">
            <h3>Technical Solution</h3>
            <p>${data.solution}</p>
          </div>

          <div class="case-study-section-block">
            <h3>Deliverables & Verified Outcome</h3>
            <p>${data.outcome}</p>
          </div>
        </div>

        <div class="case-study-sidebar">
          <div class="sidebar-box">
            <h4>Engineering Software & Tools</h4>
            <div class="tools-pill-list">
              ${data.tools.map(t => `<span class="tool-pill">${t}</span>`).join('')}
            </div>
          </div>

          <div class="sidebar-box" style="background-color: var(--color-bg-offwhite);">
            <h4>Standards & Codes</h4>
            <ul style="padding-left: 1.25rem; font-size: 0.88rem; color: var(--color-text-muted); line-height: 1.6;">
              <li>BS 8110 / Eurocode 2 (Structures)</li>
              <li>AASHTO / Local Highway Standards</li>
              <li>British Standard BS 5930 (Site Investigation)</li>
              <li>OSHA Health & Site Safety Codes</li>
            </ul>
          </div>

          <div class="sidebar-box">
            <h4>Inquiries Regarding This Project</h4>
            <p style="font-size: 0.88rem; color: var(--color-text-muted); margin-bottom: 1rem;">Interested in technical documentation or drawings for similar work?</p>
            <a href="contact.html" class="btn btn-primary btn-sm" style="width: 100%;">Discuss Project Requirements</a>
          </div>
        </div>
      </div>
    `;

    modalBackdrop.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    modalBackdrop.focus();
  };

  const closeCaseStudy = () => {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  // Attach modal trigger listeners
  const caseStudyTriggers = document.querySelectorAll('[data-case-study-trigger]');
  caseStudyTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-case-study-trigger');
      openCaseStudy(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeCaseStudy);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeCaseStudy();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('is-active')) {
        closeCaseStudy();
      }
    });
  }

  /* ==========================================================================
     8. Contact Form Live Validation & Accessible Submission Alerts
     ========================================================================== */
  const contactForm = document.querySelector('#contact-form');

  if (contactForm) {
    const nameInput = document.querySelector('#contact-name');
    const emailInput = document.querySelector('#contact-email');
    const subjectInput = document.querySelector('#contact-subject');
    const messageInput = document.querySelector('#contact-message');
    const statusAlert = document.querySelector('#form-status-alert');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    // Validation patterns & rules
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateField = (field, isValid) => {
      if (isValid) {
        field.classList.remove('is-invalid');
        field.setAttribute('aria-invalid', 'false');
      } else {
        field.classList.add('is-invalid');
        field.setAttribute('aria-invalid', 'true');
      }
      return isValid;
    };

    const checkName = () => {
      if (!nameInput) return true;
      const isValid = nameInput.value.trim().length >= 2;
      return validateField(nameInput, isValid);
    };

    const checkEmail = () => {
      if (!emailInput) return true;
      const val = emailInput.value.trim();
      const isValid = val.length > 0 && emailRegex.test(val);
      return validateField(emailInput, isValid);
    };

    const checkSubject = () => {
      if (!subjectInput) return true;
      const isValid = subjectInput.value.trim().length >= 3;
      return validateField(subjectInput, isValid);
    };

    const checkMessage = () => {
      if (!messageInput) return true;
      const isValid = messageInput.value.trim().length >= 10;
      return validateField(messageInput, isValid);
    };

    // Live validation on blur
    if (nameInput) nameInput.addEventListener('blur', checkName);
    if (emailInput) emailInput.addEventListener('blur', checkEmail);
    if (subjectInput) subjectInput.addEventListener('blur', checkSubject);
    if (messageInput) messageInput.addEventListener('blur', checkMessage);

    // Form submit handler
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = checkName();
      const isEmailValid = checkEmail();
      const isSubjectValid = checkSubject();
      const isMessageValid = checkMessage();

      const isFormValid = isNameValid && isEmailValid && isSubjectValid && isMessageValid;

      if (!isFormValid) {
        if (statusAlert) {
          statusAlert.className = 'form-status-alert error';
          statusAlert.innerHTML = `
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink:0;">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <div>
              <strong>Validation Error:</strong> Please review and correct the marked fields before submitting.
            </div>
          `;
          statusAlert.style.display = 'flex';
          statusAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Focus first invalid element
        if (!isNameValid && nameInput) nameInput.focus();
        else if (!isEmailValid && emailInput) emailInput.focus();
        else if (!isSubjectValid && subjectInput) subjectInput.focus();
        else if (!isMessageValid && messageInput) messageInput.focus();

        return;
      }

      // Valid state: simulate transmission feedback
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;">
          <line x1="12" y1="2" x2="12" y2="6"></line>
          <line x1="12" y1="18" x2="12" y2="22"></line>
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
          <line x1="2" y1="12" x2="6" y2="12"></line>
          <line x1="18" y1="12" x2="22" y2="12"></line>
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
        </svg>
        Transmitting Message...
      `;

      setTimeout(() => {
        const clientName = nameInput.value.trim();
        contactForm.reset();

        // Remove invalid classes
        [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
          if (inp) inp.classList.remove('is-invalid');
        });

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        if (statusAlert) {
          statusAlert.className = 'form-status-alert success';
          statusAlert.innerHTML = `
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink:0;">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <div>
              <strong>Message Sent Successfully!</strong> Thank you, ${clientName}. Your inquiry has been documented. Abdul Qudoos Sall will review your project details and reply promptly.
            </div>
          `;
          statusAlert.style.display = 'flex';
          statusAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 750);
    });
  }
});
