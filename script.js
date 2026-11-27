// Icons (Lucide)
window.addEventListener('load', () => lucide.createIcons())

// Mobile menu
const hamburger = document.getElementById('hamburger')
const mobileLinks = document.getElementById('mobile-links')
let menuOpen = false

function setMenu(open) {
  menuOpen = open
  mobileLinks.style.maxHeight = open ? mobileLinks.scrollHeight + 16 + 'px' : '0px'
  mobileLinks.classList.toggle('mt-3', open)
  const bars = hamburger.querySelectorAll('span')
  bars[0].style.transform = open ? 'translateY(8px) rotate(45deg)' : ''
  bars[1].style.opacity = open ? '0' : '1'
  bars[2].style.transform = open ? 'translateY(-8px) rotate(-45deg)' : ''
}
hamburger.addEventListener('click', () => setMenu(!menuOpen))
mobileLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)))

// Scroll-spy (highlights the current section in the nav)
const navAnchors = document.querySelectorAll('#desktop-links a, #mobile-links a')
const spy = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return
    navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`))
  })
}, { rootMargin: '-40% 0px -55% 0px' })
document.querySelectorAll('section[id]').forEach(s => spy.observe(s))

// Scroll reveal (runs once per element)
document.querySelectorAll('[data-reveal]').forEach((el, i) => {
  el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out')
  el.style.transitionDelay = `${(i % 3) * 90}ms`
})
const reveal = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return
    const el = entry.target
    el.classList.remove('opacity-0', 'translate-y-8')
    reveal.unobserve(el)
    // After the reveal finishes, hand transitions back to the component's own hover styles
    setTimeout(() => {
      el.classList.remove('transition-all', 'duration-700', 'ease-out')
      el.style.transitionDelay = ''
    }, 900)
  })
}, { threshold: 0.12 })
document.querySelectorAll('[data-reveal]').forEach(el => reveal.observe(el))

// Typing effect
const roles = ['Software Developer', 'Full-Stack Engineer', 'REST API Builder', 'Cloud Enthusiast']
const typed = document.getElementById('typed')
let roleIdx = 0, charIdx = 0, deleting = false

function type() {
  const word = roles[roleIdx]
  typed.textContent = word.slice(0, charIdx)
  if (!deleting && charIdx < word.length) { charIdx++; return setTimeout(type, 70) }
  if (!deleting) { deleting = true; return setTimeout(type, 1600) }
  if (charIdx > 0) { charIdx--; return setTimeout(type, 35) }
  deleting = false
  roleIdx = (roleIdx + 1) % roles.length
  setTimeout(type, 300)
}
type()

// Tech marquee (content duplicated for a seamless loop)
const techs = ['React', 'Angular', 'TypeScript', 'Tailwind', 'Node.js', 'Express', 'FastAPI', 'Spring Boot',
               'PostgreSQL', 'Firestore', 'Docker', 'Kubernetes', 'AWS S3', 'Java', 'Python', 'Git']
const marquee = document.getElementById('marquee')
marquee.innerHTML = [...techs, ...techs]
  .map(t => `<span class="flex items-center gap-12">${t}<span class="text-sage">/</span></span>`)
  .join('')

// Carousels (skills, experience and projects share this code)
document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const track = carousel.querySelector('[data-track]')
  const dots = carousel.querySelector('[data-dots]')
  const slides = [...track.children]
  const withAdd = carousel.hasAttribute('data-add-contact')

  track.classList.add('relative') // makes slide.offsetLeft relative to the track

  const perView = () => Math.max(1, Math.round(track.clientWidth / slides[0].offsetWidth))
  const pageCount = () => Math.ceil(slides.length / perView())
  const step = () => slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth

  const currentPage = () => {
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2
    if (atEnd) return pageCount() - 1
    return Math.min(pageCount() - 1, Math.floor(Math.round(track.scrollLeft / step()) / perView()))
  }

  const goTo = page => {
    const target = slides[Math.min(page * perView(), slides.length - 1)]
    track.scrollTo({ left: target.offsetLeft, behavior: 'smooth' })
  }

  const update = () => {
    const c = currentPage()
    dots.querySelectorAll('.carousel-dot:not(.carousel-dot-add)')
      .forEach((d, i) => d.classList.toggle('active', i === c))
  }

  const build = () => {
    dots.innerHTML = ''
    for (let i = 0; i < pageCount(); i++) {
      const b = document.createElement('button')
      b.className = 'carousel-dot'
      b.textContent = i + 1
      b.setAttribute('aria-label', `Go to page ${i + 1}`)
      b.addEventListener('click', () => goTo(i))
      dots.appendChild(b)
    }

    if (withAdd) {
      const add = document.createElement('button')
      add.className = 'carousel-dot carousel-dot-add'
      add.textContent = '+'
      add.title = 'Want to add another project? Contact me!'
      add.setAttribute('aria-label', 'Want to add another project? Go to contact section')
      add.addEventListener('click', () => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }))
      dots.appendChild(add)
    }
    update()
  }

  let scrollTimer, resizeTimer
  track.addEventListener('scroll', () => { clearTimeout(scrollTimer); scrollTimer = setTimeout(update, 80) })
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(build, 150) })
  build()
})