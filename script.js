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