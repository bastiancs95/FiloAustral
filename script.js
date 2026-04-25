// ===== AOS INIT =====
AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60
});

// ===== NAVBAR: solid on scroll + active link =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveLink();
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-links a[href^="#"]');
    let current = '';

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 120) {
            current = section.getAttribute('id');
        }
    });

    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// ===== TESTIMONIOS CAROUSEL =====
let currentTestimonio = 0;
const track = document.getElementById('testimoniosTrack');
const dots = document.querySelectorAll('.nav-dot');

function goToTestimonio(index) {
    currentTestimonio = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}

// Auto-advance
setInterval(() => {
    const next = (currentTestimonio + 1) % dots.length;
    goToTestimonio(next);
}, 5000);

// ===== FORM VALIDATION =====
const form = document.getElementById('reservaForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;

    const fields = [
        { id: 'nombre', errId: 'err-nombre', msg: 'El nombre es requerido' },
        { id: 'email', errId: 'err-email', msg: 'El email es requerido', type: 'email' },
        { id: 'telefono', errId: 'err-telefono', msg: 'El teléfono es requerido' },
        { id: 'expedicion', errId: 'err-expedicion', msg: 'Selecciona una expedición' },
    ];

    fields.forEach(({ id, errId, msg, type }) => {
        const input = document.getElementById(id);
        const errEl = document.getElementById(errId);
        const value = input.value.trim();

        if (!value) {
            showError(input, errEl, msg);
            valid = false;
        } else if (type === 'email' && !isValidEmail(value)) {
            showError(input, errEl, 'Ingresa un email válido');
            valid = false;
        } else {
            clearError(input, errEl);
        }
    });

    if (valid) {
        const btn = document.getElementById('submitBtn');
        btn.textContent = 'Enviando…';
        btn.disabled = true;

        setTimeout(() => {
            form.reset();
            btn.textContent = 'Enviar solicitud de reserva';
            btn.disabled = false;
            document.getElementById('formSuccess').style.display = 'block';
            setTimeout(() => {
                document.getElementById('formSuccess').style.display = 'none';
            }, 5000);
        }, 1200);
    }
});

function showError(input, errEl, msg) {
    input.classList.add('error');
    errEl.textContent = msg;
}

function clearError(input, errEl) {
    input.classList.remove('error');
    errEl.textContent = '';
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Clear errors on input
form.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('input', () => {
        input.classList.remove('error');
        const errEl = document.getElementById('err-' + input.id);
        if (errEl) errEl.textContent = '';
    });
});
