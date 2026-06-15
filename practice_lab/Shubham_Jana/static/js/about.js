const tabs = document.querySelectorAll('.tab-item');
const panes = document.querySelectorAll('.content-pane');
const gtkuImg = document.getElementById('gtku-img');
const tags = ['The Marketplace', 'The Explorer', 'The Gateway'];
const images = [
    'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80'
];

tabs.forEach(tab => {
tab.addEventListener('click', () => {
    const idx = tab.dataset.tab;
    tabs.forEach(t => t.classList.remove('active'));
    panes.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.querySelector(`.content-pane[data-pane="${idx}"]`).classList.add('active');
    if (gtkuImg) {
      gtkuImg.style.opacity = '0';
      setTimeout(() => {
        gtkuImg.src = images[idx];
        gtkuImg.alt = tags[idx];
        gtkuImg.style.opacity = '1';
      }, 300);
    }
});
});

const data = {
    board: [
      {
        name: 'Anand Kripalu',
        role: 'Chairman, Independent Director',
        identity: "The visionary who steered UrbanMart's founding compass.",
        philosophy: "Governance is service — every decision is a commitment to trust.",
        initials: 'AK',
        category: 'Board of Directors'
      },
      {
        name: 'Sriharsha Majety',
        role: 'Managing Director & Group CEO',
        identity: 'The builder who turned urban convenience into a category.',
        philosophy: 'Scale fast, but never lose the human behind the order.',
        initials: 'SM',
        category: 'Board of Directors'
      },
      {
        name: 'Shailesh Haribhakti',
        role: 'Independent Director',
        identity: 'The financial architect behind our integrity.',
        philosophy: 'Numbers tell stories — read them honestly.',
        initials: 'SH',
        category: 'Board of Directors'
      },
      {
        name: 'Suparna Mitra',
        role: 'Independent Director',
        identity: 'The strategist shaping how UrbanMart earns loyalty.',
        philosophy: 'Customer trust is built in seconds and lost in milliseconds.',
        initials: 'SP',
        category: 'Board of Directors'
      },
      {
        name: 'Rajesh Kumar',
        role: 'Non-Executive Director',
        identity: 'The operator who keeps every cog turning on time.',
        philosophy: 'Execution is the only strategy that matters at scale.',
        initials: 'RK',
        category: 'Board of Directors'
      }
    ],
    management: [
      {
        name: 'Priya Nair',
        role: 'Lead Developer',
        identity: 'The guy who made UrbanPay secure.',
        philosophy: 'Simple code, better life.',
        initials: 'PN',
        category: 'Management Team'
      },
      {
        name: 'Arjun Mehta',
        role: 'UX Strategist',
        identity: 'The curator behind our travel deals.',
        philosophy: 'Design is the silence between two interactions.',
        initials: 'AM',
        category: 'Management Team'
      },
      {
        name: 'Divya Sharma',
        role: 'Head of Growth',
        identity: "The mind mapping UrbanShop's next million users.",
        philosophy: "Growth without retention is just noise.",
        initials: 'DS',
        category: 'Management Team'
      },
      {
        name: 'Karan Bose',
        role: 'Security Architect',
        identity: 'The engineer who sleeps so you can shop safely.',
        philosophy: 'Every vulnerability patched is a promise kept.',
        initials: 'KB',
        category: 'Management Team'
      }
    ]
  };

  let currentFilter = 'board';
  let offset = 0;
  const visibleCount = () => window.innerWidth < 576 ? 1 : window.innerWidth < 992 ? 2 : 4;

  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  function buildCards(filter) {
    currentFilter = filter;
    offset = 0;
    track.innerHTML = '';

    data[filter].forEach((member, i) => {
      const card = document.createElement('div');
      card.className = 'member-card';
      card.innerHTML = `
        <div class="member-photo">
          <div class="photo-placeholder"><span class="initials">${member.initials}</span></div>
        </div>
        <div class="member-info">
          <div class="member-text">
            <div class="member-name">${member.name}</div>
            <div class="member-role">${member.role}</div>
            <div class="member-identity">${member.identity}</div>
          </div>
          <button class="member-arrow" data-index="${i}" aria-label="View bio for ${member.name}">
            <svg viewBox="0 0 14 14"><line x1="1" y1="7" x2="13" y2="7"/><polyline points="7 1 13 7 7 13"/></svg>
          </button>
        </div>
      `;
      track.appendChild(card);
    });

    updateNav();
    // Wait for the DOM to render the new cards to get an accurate offsetWidth
    requestAnimationFrame(() => {
      applyOffset();
    });

    track.querySelectorAll('.member-arrow').forEach(btn => {
      btn.addEventListener('click', () => openBio(currentFilter, parseInt(btn.dataset.index)));
    });
  }

  function applyOffset() {
    const cardWidth = track.querySelector('.member-card')?.offsetWidth || 0;
    const gap = 28;
    track.style.transform = `translateX(-${offset * (cardWidth + gap)}px)`;
  }

  function updateNav() {
    const total = data[currentFilter].length;
    const vc = visibleCount();
    prevBtn.disabled = offset <= 0;
    nextBtn.disabled = offset >= total - vc;
  }

  prevBtn.addEventListener('click', () => {
    if (offset > 0) { offset--; applyOffset(); updateNav(); }
  });

  nextBtn.addEventListener('click', () => {
    const total = data[currentFilter].length;
    if (offset < total - visibleCount()) { offset++; applyOffset(); updateNav(); }
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      buildCards(btn.dataset.filter);
    });
  });

  window.addEventListener('resize', () => {
    applyOffset();
    updateNav();
  });

  // Bio modal
  function openBio(filter, index) {
    const m = data[filter][index];
    document.getElementById('bioCategory').textContent = m.category;
    document.getElementById('bioName').textContent = m.name;
    document.getElementById('bioRole').textContent = m.role;
    document.getElementById('bioIdentity').textContent = `"${m.identity}"`;
    document.getElementById('bioPhilosophy').textContent = `"${m.philosophy}"`;
    document.getElementById('bioOverlay').classList.add('open');
  }

  document.getElementById('bioClose').addEventListener('click', () => {
    document.getElementById('bioOverlay').classList.remove('open');
  });

  document.getElementById('bioOverlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('bioOverlay')) {
      document.getElementById('bioOverlay').classList.remove('open');
    }
  });

  buildCards('board');

  let countersStarted = false;

  function startCounters() {
    if (countersStarted) return;
    countersStarted = true;
    const speed = 200;
    document.querySelectorAll('.counter').forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const isDecimal = counter.hasAttribute('data-decimal');
      let count = 0;
      const inc = target / speed;
      const update = () => {
        count += inc;
        if (count < target) {
          counter.textContent = isDecimal ? count.toFixed(1) : Math.ceil(count);
          setTimeout(update, 1);
        } else {
          counter.textContent = isDecimal ? target.toFixed(1) : target;
        }
      };
      update();
    });
  }

  const statsObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { startCounters(); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.4 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) statsObserver.observe(statsSection);