const openButton = document.getElementById('open-sidebar-button');
const navbar = document.getElementById('navbar');

const media = window.matchMedia('(width < 700px)');

media.addEventListener('change', (e) => updateNavbar(e));

function updateNavbar(e) {
    const isMobile = e.matches;
    console.log(isMobile);
    if (isMobile) {
        navbar.setAttribute('inert', '');
    } else {
        navbar.removeAttribute('inert');
    }
}

function openSidebar() {
    navbar.classList.add('show');
    openButton.setAttribute('aria-expanded', 'true');
    navbar.removeAttribute('inert');
    document.body.classList.add('sidebar-open')
}

function closeSidebar() {
    navbar.classList.remove('show');
    openButton.setAttribute('aria-expanded', 'false');
    navbar.setAttribute('inert', '');
    document.body.classList.remove('sidebar-open')
}

const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(element => {
    element.addEventListener('click', () => {
        closeSidebar();
    });
});

updateNavbar(media);


const scriptURL ='https://script.google.com/macros/s/AKfycbxe07GdPBhKnLlWsSWg4FEQ0GKFhKrG3EmUuXgINZHFh_lK7jPk2XwXfSV_rd0mYtVgdA/exec'

const form = document.forms['Waitlist-form']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            alert("Thank you! your form has been submitted successfully.");
            window.location.reload();
        } else {
            console.error('Form submission failed:', data);
            alert("Something went wrong. Please try again.");
        }
    })

    .then(() => {window.location.reload(); })
    .catch(error => console.error('error!', error.message))
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.8});

  document.querySelectorAll('.our-platform').forEach(el => observer.observe(el));

const listObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
    }, { threshold: 0.1});

  document.querySelectorAll('.scroll-list li').forEach(li => {
    observer.observe(li);
  });