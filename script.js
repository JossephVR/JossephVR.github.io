const sections = document.querySelectorAll('section[id]')
const navLinks = document.querySelectorAll('.nav-links a')

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'))
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`)
      if (active) active.classList.add('active')
    }
  })
}, {
  threshold: 0.3
})

sections.forEach(section => observer.observe(section))

const revealElements = document.querySelectorAll('.reveal')

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
    } else {
      entry.target.classList.remove('visible')
    }
  })
}, {
  threshold: 0.15
})

revealElements.forEach(el => revealObserver.observe(el))

const hamburger = document.getElementById('hamburger')
const navLinksMenu = document.getElementById('nav-links')

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open')
  navLinksMenu.classList.toggle('open')
})

// Close menu when a link is clicked
navLinksMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open')
    navLinksMenu.classList.remove('open')
  })
})

// Skills carousel
const skillsTrack = document.getElementById('skillsTrack')
const skillsDots = document.getElementById('skillsDots')
const skillCards = skillsTrack.querySelectorAll('.skill-card')

function getCardsPerView() {
  if (window.matchMedia('(max-width: 768px)').matches) return 1
  if (window.matchMedia('(max-width: 1024px)').matches) return 2
  return 3
}
function getTotalPages() {
  return Math.ceil(skillCards.length / getCardsPerView())
}

function buildDots() {
  skillsDots.innerHTML = ''
  const totalPages = getTotalPages()
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('button')
    dot.classList.add('carousel-dot')
    dot.textContent = i + 1
    dot.setAttribute('aria-label', `Go to skills page ${i + 1}`)
    dot.addEventListener('click', () => goToPage(i))
    skillsDots.appendChild(dot)
  }
  updateActiveDot()
}

function getCurrentPage() {
  const pageWidth = skillsTrack.clientWidth
  return Math.round(skillsTrack.scrollLeft / pageWidth)
}

function updateActiveDot() {
  const dots = skillsDots.querySelectorAll('.carousel-dot')
  const currentPage = getCurrentPage()
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentPage))
}

function goToPage(pageIndex) {
  const pageWidth = skillsTrack.clientWidth
  skillsTrack.scrollTo({ left: pageWidth * pageIndex, behavior: 'smooth' })
}

let scrollTimeout
skillsTrack.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(updateActiveDot, 80)
})

let resizeTimeout
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(buildDots, 150)
})

buildDots()

// Projects carousel
const projectsTrack = document.getElementById('projectsTrack')
const projectsDots = document.getElementById('projectsDots')
const projectCards = projectsTrack.querySelectorAll('.project-card')

function buildProjectDots() {
  projectsDots.innerHTML = ''
  projectCards.forEach((_, i) => {
    const dot = document.createElement('button')
    dot.classList.add('carousel-dot')
    dot.textContent = i + 1
    dot.setAttribute('aria-label', `Go to project ${i + 1}`)
    dot.addEventListener('click', () => goToProjectPage(i))
    projectsDots.appendChild(dot)
  })
  updateActiveProjectDot()
}

function getCurrentProjectPage() {
  const pageWidth = projectsTrack.clientWidth
  return Math.round(projectsTrack.scrollLeft / pageWidth)
}

function updateActiveProjectDot() {
  const dots = projectsDots.querySelectorAll('.carousel-dot')
  const currentPage = getCurrentProjectPage()
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentPage))
}

function goToProjectPage(pageIndex) {
  const pageWidth = projectsTrack.clientWidth
  projectsTrack.scrollTo({ left: pageWidth * pageIndex, behavior: 'smooth' })
}

let projectScrollTimeout
projectsTrack.addEventListener('scroll', () => {
  clearTimeout(projectScrollTimeout)
  projectScrollTimeout = setTimeout(updateActiveProjectDot, 80)
})

let projectResizeTimeout
window.addEventListener('resize', () => {
  clearTimeout(projectResizeTimeout)
  projectResizeTimeout = setTimeout(buildProjectDots, 150)
})

buildProjectDots()

// Experience carousel
const experienceTrack = document.getElementById('experienceTrack')
const experienceDots = document.getElementById('experienceDots')
const experienceCards = experienceTrack.querySelectorAll('.timeline-card')

function buildExperienceDots() {
  experienceDots.innerHTML = ''
  experienceCards.forEach((_, i) => {
    const dot = document.createElement('button')
    dot.classList.add('carousel-dot')
    dot.textContent = i + 1
    dot.setAttribute('aria-label', `Go to experience ${i + 1}`)
    dot.addEventListener('click', () => goToExperiencePage(i))
    experienceDots.appendChild(dot)
  })
  updateActiveExperienceDot()
}

function getCurrentExperiencePage() {
  return Math.round(experienceTrack.scrollLeft / experienceTrack.clientWidth)
}

function updateActiveExperienceDot() {
  const dots = experienceDots.querySelectorAll('.carousel-dot')
  const currentPage = getCurrentExperiencePage()
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentPage))
}

function goToExperiencePage(pageIndex) {
  experienceTrack.scrollTo({
    left: experienceTrack.clientWidth * pageIndex,
    behavior: 'smooth'
  })
}

let experienceScrollTimeout
experienceTrack.addEventListener('scroll', () => {
  clearTimeout(experienceScrollTimeout)
  experienceScrollTimeout = setTimeout(updateActiveExperienceDot, 80)
})

buildExperienceDots()