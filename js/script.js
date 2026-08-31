const weddingInfo = {
  title: 'Shannel & Randy',
  date: '2027-08-15T14:00:00',
  venue: 'The Emerald Garden Estate',
  description: 'Wedding ceremony and celebration',
  googleMapsLink: 'https://maps.google.com/?q=The+Emerald+Garden+Estate+Tagaytay+Philippines'
};

const galleryImages = [
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80'
];

const body = document.body;
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const musicToggle = document.getElementById('musicToggle');
const overlay = document.getElementById('invitationOverlay');
const openInvitationBtn = document.getElementById('openInvitationBtn');
const revealItems = document.querySelectorAll('.reveal');
const rsvpForm = document.getElementById('rsvpForm');
const successMessage = document.getElementById('successMessage');
const copyButtons = document.querySelectorAll('.copy-account');
const toast = document.getElementById('copyToast');
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const galleryModal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const closeModalButton = document.querySelector('.modal-close');
const prevButton = document.querySelector('.modal-control.prev');
const nextButton = document.querySelector('.modal-control.next');

const createCalendarEvent = () => {
  const startDate = new Date(weddingInfo.date);
  const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000);
  const formatDate = (date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(weddingInfo.title)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(weddingInfo.description)}&location=${encodeURIComponent(weddingInfo.venue)}`;
  window.open(calendarUrl, '_blank');
};

const downloadCalendarFile = () => {
  const startDate = new Date(weddingInfo.date);
  const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000);
  const formatIcs = (date) => new Date(date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const calendarContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@shannelrandy.com`,
    `DTSTAMP:${formatIcs(new Date())}`,
    `DTSTART:${formatIcs(startDate)}`,
    `DTEND:${formatIcs(endDate)}`,
    `SUMMARY:${weddingInfo.title}`,
    `DESCRIPTION:${weddingInfo.description}`,
    `LOCATION:${weddingInfo.venue}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\n');

  const blob = new Blob([calendarContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = 'shannel-randy-wedding.ics';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const setCountdown = () => {
  const countdownTarget = new Date(weddingInfo.date).getTime();
  const update = () => {
    const difference = countdownTarget - Date.now();
    if (difference <= 0) {
      document.querySelectorAll('[data-time-unit]').forEach((node) => {
        node.textContent = '00';
      });
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    document.querySelector('[data-time-unit="days"]').textContent = String(days).padStart(2, '0');
    document.querySelector('[data-time-unit="hours"]').textContent = String(hours).padStart(2, '0');
    document.querySelector('[data-time-unit="minutes"]').textContent = String(minutes).padStart(2, '0');
    document.querySelector('[data-time-unit="seconds"]').textContent = String(seconds).padStart(2, '0');
  };

  update();
  setInterval(update, 1000);
};

const initializeRevealObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
};

const initializeTypewriter = () => {
  const typewriterEls = document.querySelectorAll('.typewriter');

  typewriterEls.forEach((element) => {
    const text = element.dataset.text || element.textContent || '';
    element.textContent = '';

    let index = 0;
    const tick = () => {
      if (index <= text.length) {
        element.textContent = text.slice(0, index);
        index += 1;
        setTimeout(tick, 45);
      }
    };

    tick();
  });
};

const toggleMobileMenu = () => {
  if (!navToggle || !navMenu) return;
  const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isExpanded));
  navMenu.classList.toggle('is-open');
};

const closeMobileMenu = () => {
  if (!navToggle || !navMenu) return;
  navToggle.setAttribute('aria-expanded', 'false');
  navMenu.classList.remove('is-open');
};

const handleInvitationOpen = () => {
  if (!overlay) return;
  overlay.classList.add('hidden');
  document.body.classList.add('invitation-open');
};

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    if (toast) {
      toast.textContent = 'Copied!';
      toast.classList.add('visible');
      setTimeout(() => toast.classList.remove('visible'), 1600);
    }
  } catch (error) {
    if (toast) {
      toast.textContent = 'Copy failed';
      toast.classList.add('visible');
      setTimeout(() => toast.classList.remove('visible'), 1600);
    }
  }
};

const setupGalleryModal = () => {
  if (!galleryItems.length || !galleryModal || !modalImage) return;

  let currentIndex = 0;

  const openModal = (index) => {
    currentIndex = index;
    modalImage.src = galleryImages[currentIndex];
    galleryModal.classList.add('is-open');
    galleryModal.setAttribute('aria-hidden', 'false');
  };

  const closeModal = () => {
    galleryModal.classList.remove('is-open');
    galleryModal.setAttribute('aria-hidden', 'true');
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openModal(index));
  });

  closeModalButton?.addEventListener('click', closeModal);
  galleryModal.addEventListener('click', (event) => {
    if (event.target === galleryModal) closeModal();
  });

  prevButton?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    modalImage.src = galleryImages[currentIndex];
  });

  nextButton?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    modalImage.src = galleryImages[currentIndex];
  });

  document.addEventListener('keydown', (event) => {
    if (!galleryModal.classList.contains('is-open')) return;

    if (event.key === 'Escape') closeModal();
    if (event.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      modalImage.src = galleryImages[currentIndex];
    }
    if (event.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      modalImage.src = galleryImages[currentIndex];
    }
  });
};

const setUpCalendarButtons = () => {
  const googleButton = document.querySelector('[data-calendar-action="google"]');
  const downloadButton = document.querySelector('[data-calendar-action="download"]');
  googleButton?.addEventListener('click', createCalendarEvent);
  downloadButton?.addEventListener('click', downloadCalendarFile);
};

const setupAttendanceSelection = () => {
  const attendanceOptions = document.querySelectorAll('.attendance-option');
  const attendanceInputs = document.querySelectorAll('input[name="attendance"]');

  const syncSelection = () => {
    attendanceOptions.forEach((option) => {
      const input = option.querySelector('input');
      option.classList.toggle('is-selected', input && input.checked);
    });
  };

  attendanceInputs.forEach((input) => {
    input.addEventListener('change', syncSelection);
  });

  syncSelection();
};

const handleFormSubmit = () => {
  if (!rsvpForm) return;

  rsvpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!successMessage) return;
    successMessage.classList.add('visible');
    rsvpForm.reset();
    setupAttendanceSelection();
    setTimeout(() => {
      window.location.href = './thank-you.html';
    }, 1500);
  });
};

navToggle?.addEventListener('click', toggleMobileMenu);
navMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMobileMenu));
openInvitationBtn?.addEventListener('click', handleInvitationOpen);
copyButtons.forEach((button) => {
  button.addEventListener('click', () => copyToClipboard(button.dataset.copy || ''));
});

musicToggle?.addEventListener('click', () => {
  musicToggle.classList.toggle('is-muted');
});

if (document.querySelector('[data-time-unit]')) setCountdown();
initializeRevealObserver();
initializeTypewriter();
setupGalleryModal();
setUpCalendarButtons();
setupAttendanceSelection();
handleFormSubmit();
